// Copied from the game (src/course/bossModels.js) plus the Groundskeeper from CourseBuilder.groundskeeperModel.
// Characters for the boss holes of the later stages, built from flat-shaded primitives to
// match the Groundskeeper (CourseBuilder.groundskeeperModel). Every model faces +z and stands
// on y = 0; the caller places the holder and turns it back down the hole.
//
//   buildBossModel(kind) -> { holder, idle(elapsed), bob }
//
// `idle` animates the model's own parts each frame; `bob` is how far the whole figure hops.
import * as THREE from 'three';

const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.85, ...opts });
const glow = (color, intensity = 1.3) => mat(color, { emissive: color, emissiveIntensity: intensity });
const UP = new THREE.Vector3(0, 1, 0);

// A group scaled up so the figure reads from the tee, plus helpers to hang parts on it.
function rig() {
  const body = new THREE.Group();
  body.scale.setScalar(1.5); // the holder's own scale is the vanish animation, so scale the body
  const part = (geometry, material, x, y, z, parent = body) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  // A cone/box pointing along `dir`, for straw, spikes and tines.
  const spike = (geometry, material, pos, dir, parent = body) => {
    const mesh = part(geometry, material, pos.x, pos.y, pos.z, parent);
    mesh.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
    return mesh;
  };
  // A limb hanging from a shoulder pivot; `angle` swings it out to the side (radians from
  // hanging straight down). A negative x is the left arm, which swings the other way.
  const limb = ({ x, y, z = 0.1, angle, length, radius, color, handColor, handRadius = 0.18 }) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, z);
    pivot.rotation.z = Math.sign(x) * angle;
    body.add(pivot);
    part(new THREE.CylinderGeometry(radius * 0.9, radius, length, 8), color, 0, -length / 2, 0, pivot);
    part(new THREE.SphereGeometry(handRadius, 8, 6), handColor, 0, -length - handRadius * 0.4, 0, pivot);
    return pivot;
  };
  // Where a limb's hand ends up, so a held prop can stand there.
  const reach = ({ x, y, angle, length, handRadius = 0.18 }) => {
    const dist = length + handRadius * 0.4;
    return { x: x + Math.sign(x) * dist * Math.sin(angle), y: y - dist * Math.cos(angle) };
  };
  return { body, part, spike, limb, reach };
}

const ARM_ANGLE = 1.9; // radians out from hanging straight down, for the raised arms

// The Frost Warden: a snowman ranger in a navy warden's hat, glaring over an icy scarf,
// with one twig arm shaking a mitten and the other propping up his ice staff.
function frostWarden() {
  const { body, part, limb, reach } = rig();
  const snow = mat(0xeef6ff);
  const coal = mat(0x1c2230);
  const twig = mat(0x6b4a2b);
  const navy = mat(0x23407a);
  const scarf = mat(0x36a3e8);
  const iceGlow = glow(0x8fe3ff, 0.9);

  part(new THREE.SphereGeometry(0.88, 12, 10), snow, 0, 0.8, 0);
  part(new THREE.SphereGeometry(0.68, 12, 10), snow, 0, 1.95, 0);
  for (const dy of [0.2, 0, -0.2]) part(new THREE.SphereGeometry(0.075, 6, 5), coal, 0, 1.95 + dy, Math.sqrt(0.68 ** 2 - dy ** 2) - 0.02);

  // Icy scarf with a tail hanging down his chest.
  const ring = part(new THREE.TorusGeometry(0.5, 0.15, 6, 12), scarf, 0, 2.43, 0);
  ring.rotation.x = Math.PI / 2;
  part(new THREE.BoxGeometry(0.26, 0.75, 0.09), scarf, 0.3, 2.0, 0.55).rotation.z = 0.12;

  // Head: coal eyes under angry brows, a carrot nose and a coal frown.
  const head = new THREE.Group();
  head.position.set(0, 2.9, 0);
  head.scale.setScalar(1.1);
  body.add(head);
  part(new THREE.SphereGeometry(0.52, 12, 10), snow, 0, 0, 0, head);
  for (const side of [-1, 1]) {
    part(new THREE.SphereGeometry(0.075, 6, 5), coal, side * 0.2, 0.06, 0.46, head);
    part(new THREE.BoxGeometry(0.3, 0.07, 0.08), coal, side * 0.2, 0.19, 0.46, head).rotation.z = side * 0.4;
  }
  const nose = part(new THREE.ConeGeometry(0.09, 0.5, 6), mat(0xe8782a), 0, -0.06, 0.64, head);
  nose.rotation.x = Math.PI / 2;
  for (let i = -2; i <= 2; i++) {
    const t = i / 2;
    part(new THREE.SphereGeometry(0.04, 5, 4), coal, t * 0.2, -0.3 + 0.06 * (1 - t * t), 0.46 - Math.abs(t) * 0.05, head);
  }
  // The warden's hat: brim, crown, ice-blue band and a silver badge.
  part(new THREE.CylinderGeometry(0.66, 0.66, 0.06, 14), navy, 0, 0.44, 0, head);
  part(new THREE.CylinderGeometry(0.38, 0.43, 0.42, 12), navy, 0, 0.67, 0, head);
  part(new THREE.CylinderGeometry(0.44, 0.44, 0.09, 12), scarf, 0, 0.5, 0, head);
  part(new THREE.SphereGeometry(0.075, 6, 5), mat(0xdfe6f2, { metalness: 0.4 }), 0, 0.5, 0.45, head);

  // Twig arms. The left shakes; the right grips the ice staff.
  const arm = { length: 1.05, radius: 0.06, color: twig, handColor: scarf, handRadius: 0.17, y: 2.25 };
  const fistArm = limb({ ...arm, x: -0.58, angle: ARM_ANGLE });
  limb({ ...arm, x: 0.58, angle: ARM_ANGLE });
  const hand = reach({ ...arm, x: 0.58, angle: ARM_ANGLE });
  const staff = new THREE.Group();
  staff.position.set(hand.x, 0, 0.1);
  body.add(staff);
  part(new THREE.CylinderGeometry(0.05, 0.05, 3.3, 6), twig, 0, 1.65, 0, staff);
  const crystal = part(new THREE.OctahedronGeometry(0.34), iceGlow, 0, 3.55, 0, staff);
  crystal.scale.set(0.85, 1.7, 0.85);

  const holder = new THREE.Group();
  holder.add(body);
  return {
    holder,
    bob: 0.12,
    idle(t) {
      fistArm.rotation.z = -(ARM_ANGLE + Math.sin(t * 9) * 0.14);
      head.rotation.z = Math.sin(t * 4.2) * 0.05;
      crystal.rotation.y = t * 1.5;
    },
  };
}

// The Castle Warden: a knight in steel with a plumed helm, a royal-blue tabard and shield,
// brandishing the key to the gate he guards.
function castleWarden() {
  const { body, part, limb, reach } = rig();
  const steel = mat(0x98a2b8, { metalness: 0.45, roughness: 0.55 });
  const darkSteel = mat(0x5a6176, { metalness: 0.4, roughness: 0.6 });
  const blue = mat(0x2f4fa8);
  const gold = mat(0xf0c13a, { metalness: 0.35, roughness: 0.45 });
  const red = mat(0xc53030);
  const slit = mat(0x14121a);

  for (const side of [-1, 1]) {
    part(new THREE.BoxGeometry(0.46, 0.3, 0.72), darkSteel, side * 0.3, 0.15, 0.1);
    part(new THREE.CylinderGeometry(0.2, 0.22, 0.85, 8), steel, side * 0.3, 0.72, 0);
    const pauldron = part(new THREE.SphereGeometry(0.32, 8, 6), steel, side * 0.8, 2.22, 0);
    pauldron.scale.set(1.1, 0.75, 1.1);
  }
  part(new THREE.CylinderGeometry(0.7, 0.72, 0.4, 12), blue, 0, 1.2, 0);
  part(new THREE.CylinderGeometry(0.66, 0.7, 1.0, 12), steel, 0, 1.9, 0);
  part(new THREE.BoxGeometry(0.72, 1.3, 0.09), blue, 0, 1.6, 0.68);
  part(new THREE.OctahedronGeometry(0.17), gold, 0, 1.75, 0.76);
  part(new THREE.BoxGeometry(0.78, 0.1, 0.12), gold, 0, 1.42, 0.7);

  // Helm: angry visor slits with glowing eyes, a breather grille and a red plume.
  const head = new THREE.Group();
  head.position.set(0, 2.78, 0);
  head.scale.setScalar(1.12);
  body.add(head);
  const helm = part(new THREE.SphereGeometry(0.5, 12, 10), steel, 0, 0, 0, head);
  helm.scale.set(1, 1.1, 1);
  for (const side of [-1, 1]) {
    part(new THREE.BoxGeometry(0.3, 0.08, 0.1), slit, side * 0.17, 0.1, 0.46, head).rotation.z = side * 0.35;
    part(new THREE.SphereGeometry(0.045, 6, 5), glow(0xffd23a, 1.5), side * 0.17, 0.03, 0.48, head);
    part(new THREE.BoxGeometry(0.05, 0.22, 0.08), slit, side * 0.1, -0.22, 0.47, head);
  }
  part(new THREE.BoxGeometry(0.05, 0.22, 0.08), slit, 0, -0.22, 0.49, head);
  part(new THREE.BoxGeometry(0.1, 0.16, 0.9), darkSteel, 0, 0.55, -0.02, head);
  const plume = part(new THREE.SphereGeometry(0.2, 8, 6), red, 0, 0.72, -0.1, head);
  plume.scale.set(0.5, 1.2, 2.2);

  // Left arm hangs behind the shield; the right holds the key aloft.
  const arm = { length: 0.9, radius: 0.17, color: steel, handColor: darkSteel, handRadius: 0.2, y: 2.2 };
  limb({ ...arm, x: -0.84, angle: 0.3 });
  limb({ ...arm, x: 0.84, angle: ARM_ANGLE });
  const shield = new THREE.Group();
  shield.position.set(-1.12, 1.55, 0.5);
  shield.rotation.y = 0.35;
  body.add(shield);
  part(new THREE.BoxGeometry(1.0, 1.3, 0.1), gold, 0, 0, -0.05, shield);
  part(new THREE.BoxGeometry(0.84, 1.14, 0.12), blue, 0, 0, 0, shield);
  part(new THREE.OctahedronGeometry(0.2), gold, 0, 0.05, 0.09, shield);

  const hand = reach({ ...arm, x: 0.84, angle: ARM_ANGLE });
  const key = new THREE.Group();
  key.position.set(hand.x, hand.y, 0.1);
  body.add(key);
  part(new THREE.CylinderGeometry(0.06, 0.06, 1.7, 6), gold, 0, 0.1, 0, key);
  part(new THREE.TorusGeometry(0.3, 0.075, 6, 12), gold, 0, 1.15, 0, key);
  part(new THREE.BoxGeometry(0.3, 0.13, 0.09), gold, 0.16, -0.58, 0, key);
  part(new THREE.BoxGeometry(0.22, 0.13, 0.09), gold, 0.12, -0.38, 0, key);

  const holder = new THREE.Group();
  holder.add(body);
  return {
    holder,
    bob: 0.05,
    idle(t) {
      head.rotation.y = Math.sin(t * 1.7) * 0.2;
      shield.rotation.z = Math.sin(t * 5) * 0.04;
      key.rotation.z = Math.sin(t * 3.2) * 0.08;
    },
  };
}

// The Scarecrow King: a burlap-sacked scarecrow on his post, in a patched orange coat and
// a crooked gold crown, glaring with glowing eyes, a crow on his shoulder and a pumpkin scepter.
function scarecrowKing() {
  const { body, part, spike, limb, reach } = rig();
  const burlap = mat(0xd1ad74);
  const coat = mat(0xc8641f);
  const straw = mat(0xe8c14a);
  const wood = mat(0x6b4a2b);
  const dark = mat(0x1d1a1f);
  const gold = mat(0xf2c230, { metalness: 0.35, roughness: 0.45 });
  const pumpkin = mat(0xe8761e);

  // The post and crossbar he's hung on.
  part(new THREE.CylinderGeometry(0.1, 0.1, 3.5, 6), wood, 0, 1.75, -0.5);
  part(new THREE.BoxGeometry(1.5, 0.13, 0.13), wood, 0, 2.2, -0.5);
  for (const side of [-1, 1]) {
    part(new THREE.CylinderGeometry(0.19, 0.17, 0.95, 8), mat(0x6a4b2a), side * 0.3, 0.7, 0);
    part(new THREE.BoxGeometry(0.44, 0.28, 0.66), wood, side * 0.3, 0.14, 0.1);
  }

  // Patched coat, a rope belt and straw poking out from the hem.
  part(new THREE.CylinderGeometry(0.52, 0.62, 1.2, 10), coat, 0, 1.7, 0);
  const belt = part(new THREE.TorusGeometry(0.6, 0.05, 5, 12), wood, 0, 1.3, 0);
  belt.rotation.x = Math.PI / 2;
  part(new THREE.BoxGeometry(0.32, 0.32, 0.05), mat(0x6e8b3d), 0.2, 1.85, 0.5).rotation.z = 0.2;
  part(new THREE.BoxGeometry(0.26, 0.3, 0.05), mat(0xb5342c), -0.18, 1.5, 0.58).rotation.z = -0.15;
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    spike(new THREE.ConeGeometry(0.06, 0.32, 4), straw, new THREE.Vector3(Math.cos(a) * 0.55, 1.0, Math.sin(a) * 0.55), new THREE.Vector3(Math.cos(a) * 0.35, -1, Math.sin(a) * 0.35));
  }

  // Head: a sack with glowing eyes under angry brows and a stitched grin, under a crooked crown.
  const head = new THREE.Group();
  head.position.set(0, 2.85, 0);
  head.scale.setScalar(1.12);
  body.add(head);
  const sack = part(new THREE.SphereGeometry(0.5, 12, 10), burlap, 0, 0, 0, head);
  sack.scale.set(1, 1.05, 1);
  for (const side of [-1, 1]) {
    part(new THREE.SphereGeometry(0.08, 6, 5), glow(0xffa020, 1.6), side * 0.2, 0.06, 0.44, head);
    part(new THREE.BoxGeometry(0.3, 0.07, 0.08), dark, side * 0.2, 0.2, 0.45, head).rotation.z = side * 0.4;
  }
  for (let i = -3; i <= 3; i++) {
    part(new THREE.BoxGeometry(0.06, 0.1, 0.04), dark, i * 0.07, -0.24 + (i % 2 ? 0.03 : -0.03), 0.47 - Math.abs(i) * 0.02, head);
  }
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * 0.15 + (i / 8) * Math.PI * 1.7;
    spike(new THREE.ConeGeometry(0.06, 0.34, 4), straw, new THREE.Vector3(Math.cos(a) * 0.48, 0.0, Math.sin(a) * 0.48).setY(0.1), new THREE.Vector3(Math.cos(a), -0.2, Math.sin(a)), head);
  }
  const crown = new THREE.Group();
  crown.position.set(0, 0.5, 0);
  crown.rotation.z = 0.16;
  head.add(crown);
  part(new THREE.CylinderGeometry(0.46, 0.42, 0.22, 10), gold, 0, 0, 0, crown);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    part(new THREE.ConeGeometry(0.1, 0.34, 4), gold, Math.cos(a) * 0.4, 0.26, Math.sin(a) * 0.4, crown);
  }
  part(new THREE.SphereGeometry(0.075, 6, 5), glow(0xd8262f, 0.8), 0, 0, 0.45, crown);

  // A crow on his right shoulder.
  const crow = new THREE.Group();
  crow.position.set(0.5, 2.4, 0.05);
  body.add(crow);
  const crowBody = part(new THREE.SphereGeometry(0.17, 8, 6), dark, 0, 0, 0, crow);
  crowBody.scale.set(1, 0.9, 1.3);
  const crowHead = new THREE.Group();
  crowHead.position.set(0, 0.13, 0.17);
  crow.add(crowHead);
  part(new THREE.SphereGeometry(0.11, 8, 6), dark, 0, 0, 0, crowHead);
  part(new THREE.ConeGeometry(0.04, 0.15, 4), mat(0xe8782a), 0, -0.01, 0.15, crowHead).rotation.x = Math.PI / 2;
  part(new THREE.BoxGeometry(0.12, 0.05, 0.22), dark, 0, 0.0, -0.3, crow).rotation.x = -0.3;

  // Left arm raised and shaking, straw at the cuff; the right arm props up the pumpkin scepter.
  const arm = { length: 1.0, radius: 0.16, color: coat, handColor: straw, handRadius: 0.17, y: 2.25 };
  const fistArm = limb({ ...arm, x: -0.5, angle: ARM_ANGLE });
  limb({ ...arm, x: 0.5, angle: 1.55 });
  const hand = reach({ ...arm, x: 0.5, angle: 1.55 });
  const scepter = new THREE.Group();
  scepter.position.set(hand.x, 0, 0.1);
  body.add(scepter);
  part(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 6), wood, 0, 1.6, 0, scepter);
  const fruit = part(new THREE.SphereGeometry(0.36, 10, 8), pumpkin, 0, 3.4, 0, scepter);
  fruit.scale.set(1.15, 0.88, 1.15);
  part(new THREE.CylinderGeometry(0.05, 0.07, 0.18, 5), mat(0x4f7a2c), 0, 3.78, 0, scepter);

  const holder = new THREE.Group();
  holder.add(body);
  return {
    holder,
    bob: 0.14,
    idle(t) {
      fistArm.rotation.z = -(ARM_ANGLE + Math.sin(t * 8) * 0.12);
      head.rotation.z = Math.sin(t * 3.1) * 0.08;
      crown.rotation.z = 0.16 + Math.sin(t * 6) * 0.03;
      crowHead.rotation.y = Math.sin(t * 2) * 0.6;
    },
  };
}

// The Groundskeeper: a grumpy old caretaker in overalls and a flat cap, leaning on his rake.
// Ported from CourseBuilder.groundskeeperModel in the game so all four bosses share one API.
function groundskeeper() {
  const { body, part } = rig();
  const skin = mat(0xe9a98b);
  const nose = mat(0xdc8576);
  const white = mat(0xecebe2);
  const dark = mat(0x1d1a1f);
  const shirt = mat(0xc2473b);
  const overalls = mat(0x587a3b);
  const brass = mat(0xe0b341, { metalness: 0.3, roughness: 0.5 });
  const boots = mat(0x3d2a1c);
  const cap = mat(0x7a6548);
  const wood = mat(0x9a6a3c);
  const metal = mat(0x868ba1, { metalness: 0.3 });

  for (const side of [-1, 1]) {
    part(new THREE.BoxGeometry(0.42, 0.28, 0.66), boots, side * 0.3, 0.14, 0.1);
    part(new THREE.CylinderGeometry(0.19, 0.2, 0.85, 8), overalls, side * 0.3, 0.7, 0);
  }
  part(new THREE.CylinderGeometry(0.7, 0.72, 0.55, 12), overalls, 0, 1.3, 0);
  part(new THREE.CylinderGeometry(0.6, 0.7, 0.75, 12), shirt, 0, 1.95, 0);
  part(new THREE.BoxGeometry(0.62, 0.62, 0.1), overalls, 0, 1.75, 0.63);
  for (const side of [-1, 1]) {
    part(new THREE.BoxGeometry(0.1, 0.78, 0.1), overalls, side * 0.3, 2.0, 0.6).rotation.z = side * 0.06;
    part(new THREE.SphereGeometry(0.06, 6, 5), brass, side * 0.3, 1.97, 0.7);
  }

  const head = new THREE.Group();
  head.position.set(0, 2.68, 0);
  head.scale.setScalar(1.15);
  body.add(head);
  part(new THREE.SphereGeometry(0.52, 12, 10), skin, 0, 0, 0, head);
  part(new THREE.SphereGeometry(0.15, 8, 6), nose, 0, -0.06, 0.52, head);
  for (const side of [-1, 1]) {
    const stache = part(new THREE.SphereGeometry(0.22, 8, 6), white, side * 0.18, -0.2, 0.46, head);
    stache.scale.set(1.5, 0.7, 0.9);
    stache.rotation.z = side * -0.35;
    part(new THREE.BoxGeometry(0.34, 0.09, 0.1), white, side * 0.2, 0.16, 0.46, head).rotation.z = side * 0.4;
    part(new THREE.SphereGeometry(0.06, 6, 5), dark, side * 0.19, 0.06, 0.47, head);
    part(new THREE.SphereGeometry(0.1, 6, 5), skin, side * 0.52, 0, 0, head);
    part(new THREE.SphereGeometry(0.15, 6, 5), white, side * 0.47, 0.15, -0.05, head);
  }
  part(new THREE.SphereGeometry(0.2, 6, 5), white, 0, 0.1, -0.45, head);
  const capTop = part(new THREE.SphereGeometry(0.56, 12, 8), cap, 0, 0.36, 0.02, head);
  capTop.scale.set(1.08, 0.5, 1.12);
  part(new THREE.BoxGeometry(0.8, 0.07, 0.4), cap, 0, 0.3, 0.55, head).rotation.x = 0.18;

  const arm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.58, 2.2, 0.1);
    pivot.rotation.z = side * ARM_ANGLE;
    body.add(pivot);
    part(new THREE.CylinderGeometry(0.15, 0.17, 0.8, 8), shirt, 0, -0.4, 0, pivot);
    part(new THREE.SphereGeometry(0.19, 8, 6), skin, 0, -0.88, 0, pivot);
    return pivot;
  };
  const fistArm = arm(-1);
  arm(1);

  const rake = new THREE.Group();
  rake.position.set(1.4, 0, 0.18);
  body.add(rake);
  part(new THREE.CylinderGeometry(0.045, 0.045, 3.3, 6), wood, 0, 1.65, 0, rake);
  part(new THREE.BoxGeometry(1, 0.07, 0.12), metal, 0, 0.08, 0, rake);
  for (let i = -2; i <= 2; i++) part(new THREE.BoxGeometry(0.05, 0.2, 0.05), metal, i * 0.2, 0.0, 0, rake);

  const holder = new THREE.Group();
  holder.add(body);
  return {
    holder,
    bob: 0.1,
    idle(t) {
      fistArm.rotation.z = -(ARM_ANGLE + Math.sin(t * 9) * 0.14);
      head.rotation.z = Math.sin(t * 4.2) * 0.05;
    },
  };
}
const BUILDERS = { groundskeeper, scarecrowKing, frostWarden, castleWarden };

export function buildBossModel(kind) {
  const build = BUILDERS[kind];
  if (!build) throw new Error(`Unknown boss model: ${kind}`);
  return build();
}

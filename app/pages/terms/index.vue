<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: `Terms of Service | ${site.name}`,
  description: 'The terms for using the PinkKoala website and our games, including Rough Day.',
  robots: site.privacyIsDraft ? 'noindex' : 'index, follow',
})
</script>

<template>
  <div class="prose">
    <div v-if="site.privacyIsDraft" class="draft-note">
      <strong>Draft.</strong> Items marked <mark>[CHECK]</mark> need confirming (who "we" legally are, where disputes
      are handled, and anything about payments or ads once those ship). This is not legal advice. It uses the same
      draft switch as the privacy policy: <code>privacyIsDraft</code> in <code>app/data/site.ts</code>.
    </div>

    <h1>Terms of Service</h1>
    <p class="meta">Last updated {{ site.privacyUpdated }}</p>

    <p>
      These terms cover this website and the games we publish, including Rough Day: Roguelite Mini Golf (together, the
      "Services"). By using the Services you agree to them. If you do not agree, please do not use the Services.
    </p>

    <h2>Who we are</h2>
    <p>
      The Services are provided by {{ site.name }}, an independent game studio based in Wisconsin, United States
      ("we", "us"). Contact: <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
    </p>

    <h2>Who can play</h2>
    <p>
      Rough Day is for players aged 13 and over. If you are under 18, please check with a parent or guardian before you
      install it. Where the law of your country sets a higher minimum age for using an app like this, that age applies.
    </p>

    <h2>Using the games</h2>
    <p>
      We give you a personal, non-exclusive, non-transferable, revocable licence to install and play our games on
      devices you own or control, for your own non-commercial entertainment. The games are licensed to you, not sold.
    </p>
    <p>You agree not to:</p>
    <ul>
      <li>copy, modify, decompile, reverse engineer or extract the code or assets of a game, except where the law lets you;</li>
      <li>sell, rent, sublicense or redistribute a game or its assets;</li>
      <li>use cheats, bots, tampering tools or other methods that interfere with the game or with other players' experience;</li>
      <li>use the Services for anything unlawful, or to try to break or overload them.</li>
    </ul>
    <p>
      You may share gameplay footage, screenshots and reviews of our games, including on monetised channels, as long
      as you do not present them as your own work or as endorsed by us.
    </p>

    <h2>Accounts, purchases and ads</h2>
    <p>
      Rough Day has no accounts and, today, no in-app purchases. Your progress is stored on your device, so deleting the
      app or clearing its data deletes your progress, and we cannot restore it.
    </p>
    <p>
      If we add ads or in-app purchases, they will be handled by Google Play and the Apple App
      Store under their own terms, including their refund rules. We will update these terms and the privacy policy when
      that happens.
    </p>

    <h2>Our content</h2>
    <p>
      The games, this website and everything in them (code, art we made, audio we made, names and logos) belong to us or
      our licensors and are protected by copyright and other laws. "PinkKoala" and "Rough Day" are names we use for our
      studio and game.
    </p>

    <h2>Feedback</h2>
    <p>
      If you send us ideas or feedback, we may use them without owing you anything, though we will not publish your
      personal details without asking.
    </p>

    <h2>App stores</h2>
    <p>
      If you get a game from the Apple App Store or Google Play, you also agree to that store's terms. Apple and Google
      are not responsible for the game, its maintenance or support, or for any claims about it. Those come to us.
      Unless we publish a custom licence, Apple's standard End User Licence Agreement applies to iOS downloads.
    </p>

    <h2>Availability and changes to the games</h2>
    <p>
      We may update, change or stop a game or this website at any time, for example to fix bugs, rebalance the game or
      remove features. We try to keep things working but do not promise the Services will always be available or free of
      errors.
    </p>

    <h2>Disclaimer</h2>
    <p>
      The Services are provided "as is" and "as available", without warranties of any kind, to the extent the law
      allows. Rough Day is a game and a grumpy Groundskeeper is fictional. Please play safely, take breaks, and do not
      play while driving or doing anything that needs your attention.
    </p>

    <h2>Limit of liability</h2>
    <p>
      To the extent the law allows, we are not liable for indirect or consequential losses, lost progress or data, or
      loss of enjoyment, and our total liability to you for anything connected with the Services is limited to the
      amount you paid us for them in the 12 months before the claim (which may be zero). Nothing in these terms limits
      anything that cannot legally be limited, such as liability for death or personal injury caused by negligence, for
      fraud, or your statutory consumer rights.
    </p>

    <h2>Ending your use</h2>
    <p>
      You can stop using the Services at any time by deleting the game. We may suspend or end your access if you break
      these terms.
    </p>

    <h2>Governing law</h2>
    <p>
      These terms are governed by the laws of the State of Wisconsin, United States, and its courts can hear disputes,
      except that if you are a consumer you keep any right to use the courts and consumer protections of the place where
      you live.
    </p>

    <h2>Changes to these terms</h2>
    <p>
      We may update these terms. The date at the top shows the latest version. If you keep using the Services after a
      change, you accept the new terms. For big changes we will say so in the game or on this website.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these terms: <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Our
      <NuxtLink to="/privacy/">privacy page</NuxtLink> explains how we handle data.
    </p>

    <h3>Changelog</h3>
    <ul>
      <li>{{ site.privacyUpdated }}: added who can play (13 and over).</li>
    </ul>
  </div>
</template>

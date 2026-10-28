<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Rough Day privacy policy',
  description: 'What data Rough Day collects, why, and how to opt out.',
  robots: site.privacyIsDraft ? 'noindex' : 'index, follow',
})
</script>

<template>
  <div class="prose">
    <div v-if="site.privacyIsDraft" class="draft-note">
      <strong>Draft.</strong> Items marked <mark>[CHECK]</mark> still need confirming before the game is published. This
      is not legal advice. Set <code>privacyIsDraft</code> to <code>false</code> in <code>app/data/site.ts</code> when
      it is final.
    </div>

    <h1>Rough Day privacy policy</h1>
    <p class="meta">Last updated {{ site.privacyUpdated }}</p>

    <h2>Who we are</h2>
    <p>
      Rough Day: Roguelite Mini Golf is made by {{ site.name }}. Questions or requests about your data:
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
    </p>

    <h2>The short version</h2>
    <ul>
      <li>No accounts, sign-in, names, email addresses, phone numbers, contacts, photos, microphone or location.</li>
      <li>Your progress and settings stay on your device.</li>
      <li>
        The first time you open the game it asks how old you are (Under 13, 13 to 17, or 18 or older). Your answer stays
        on your device. Nothing is collected before you answer, and nothing at all is collected for players under 13.
      </li>
      <li>
        The Rough Day mobile app uses Google Firebase Analytics to learn how the game is played, and Firebase
        Crashlytics to find out when it crashes, so we can balance and fix it. You can turn both off in the game's
        settings.
      </li>
      <li>We do not sell data and do not share it for advertising.</li>
    </ul>

    <h2>What we collect</h2>
    <table>
      <thead>
        <tr><th>Data</th><th>Why</th><th>Where it lives</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Progress and settings: your saved run, sound volume, coins and silver, bought Upgrades, unlocked and
            equipped ball skins, hats and trails, best stage, and the choices you make in settings
          </td>
          <td>So the game remembers you</td>
          <td>On your device only. Uninstalling the app deletes it.</td>
        </tr>
        <tr>
          <td>Your age bracket (Under 13, 13 to 17, or 18 or older), which you choose on first launch</td>
          <td>To decide whether the game may collect analytics and crash reports</td>
          <td>On your device only. It is never sent to us or to Google.</td>
        </tr>
        <tr>
          <td>
            Gameplay events: run started or ended, stage or hole started or finished, strokes used, time spent,
            hazards hit (water, out of bounds), shop purchases made with in-game coins, which power-up was picked, and
            when the app goes to the background
          </td>
          <td>To balance the game, fix problems and find where players quit</td>
          <td>Google Firebase Analytics</td>
        </tr>
        <tr>
          <td>
            Anonymous properties: number of runs played, best stage reached, how many Upgrades you own, equipped skin,
            and which build of the game you have (for example a test build)
          </td>
          <td>To understand different kinds of players</td>
          <td>Google Firebase Analytics</td>
        </tr>
        <tr>
          <td>
            Standard Firebase data: a random app-instance identifier, device model, OS version, app version, language,
            approximate region from your IP address, session and first-open information
          </td>
          <td>Standard analytics and crash diagnosis</td>
          <td>Google Firebase Analytics and Crashlytics</td>
        </tr>
        <tr>
          <td>
            Crash reports: when the app crashes or hits an error, the technical details of what went wrong (a stack
            trace), the state of the app and device model and OS version at that moment, a random installation ID, and
            where in the game it happened (the stage, the hole, and the random seeds that let us replay it)
          </td>
          <td>To find and fix crashes</td>
          <td>Google Firebase Crashlytics</td>
        </tr>
      </tbody>
    </table>
    <p>
      Events and crash reports are tied to a random per-run ID, a random installation ID and anonymous properties.
      Nothing in them identifies a person. The web demo, if we link one, sends no analytics.
    </p>

    <h2>Analytics, crash reports and how to opt out</h2>
    <p>
      The first time you open the game it asks how old you are. Until you answer, nothing is collected. If you say you
      are under 13, analytics and crash reports stay off for good and you can keep playing. If you say 13 to 17 or 18 or
      older, they switch on, and you can turn both off at any time in the game's settings ("Share usage data"). You can
      also change your age answer in settings; choosing under 13 turns collection off straight away and locks it off.
      Your choices are remembered, and nothing is sent while collection is off.
    </p>
    <p>
      The age question is a statement from you; we do not check it.
    </p>

    <h2>Third parties</h2>
    <p>
      We share analytics and crash data only with Google, which processes it for us under its own terms. Read
      <a href="https://firebase.google.com/support/privacy" rel="noopener">Google's Firebase privacy information</a>.
      We do not sell data.
    </p>
    <!--
      Uncomment this section and update the Play Data safety form at the same time the ads ship.

      <h2>Ads</h2>
      Rough Day may show ads through Google AdMob (interstitials at stage changes and an optional rewarded "+strokes" ad).
      AdMob may collect the advertising ID (Android) or IDFA (iOS, only if you allow it in Apple's tracking prompt) and
      related data. Players in the EEA, UK and Switzerland are asked for consent through Google's User Messaging
      Platform. You can reset your advertising ID or opt out of personalisation in your device settings. No ads are
      shown in a player's first session. Say here what the game's age answer changes for ads (no ads and no advertising
      ID for players under 13; limited, non-personalised ads for 13 to 17); it must match src/age.js in the game repo.
    -->

    <h2>Children</h2>
    <p>
      Rough Day is for players aged 13 and over. It is not directed at children under 13, and a player who says they are
      under 13 in the game's age question is not tracked at all: no analytics and no crash reports. We do not knowingly
      collect data from children under 13. If you are a parent or guardian and think a child under 13 has used the
      game, email <a :href="`mailto:${site.email}`">{{ site.email }}</a> and we will delete what we can find. Some
      countries set a higher age than 13 at which a person can agree to data processing on their own; we handle
      analytics for players in those countries as described in "Your rights" below.
    </p>

    <h2>How long we keep data</h2>
    <p>
      Firebase Analytics event data is kept for 14 months. Crash reports are kept by Firebase Crashlytics for 90 days.
      Data on your device is kept until you uninstall the app.
    </p>

    <h2>Your rights</h2>
    <p>
      You can ask to access or delete data we hold about you, or object to its use. Email
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Because the data is anonymous we may need an app-instance
      ID from you to find it. If you are in the EEA or UK, we process analytics on the basis of our legitimate interest
      in improving the game, or your consent where required.
    </p>

    <h2>International transfers</h2>
    <p>Google may process analytics data in countries other than your own, under its standard safeguards.</p>

    <h2>Changes</h2>
    <p>
      We will update this page when the game's data use changes and change the date at the top. If we add features that
      collect more, such as online leaderboards, cloud saves, or ads, we will update this page before they ship.
    </p>
    <h3>Changelog</h3>
    <ul>
      <li>{{ site.privacyUpdated }}: the game now asks the player's age on first launch and collects nothing before the answer or for players under 13 (the answer stays on the device); stated that Rough Day is for ages 13 and over and added a parent contact; added crash reports (Firebase Crashlytics); described the opt-out and the saved data more exactly.</li>
      <li>2026-10-25: first draft.</li>
    </ul>
  </div>
</template>

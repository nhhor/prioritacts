import React from "react";
import "./Privacy.css";

const LAST_UPDATED = "November 25, 2026";

function Privacy() {
  return (
    <div className="PrivacyText">
      <h1 className="pageTitle">Privacy Policy</h1>
      <p className="privacyUpdated">Last updated {LAST_UPDATED}</p>

      <section className="privacySummary" aria-labelledby="privacy-tldr">
        <h2 id="privacy-tldr">The short version</h2>
        <ul>
          <li>
            <strong>Your contacts never touch my servers.</strong> I don&apos;t
            have any. Prioritacts runs entirely in your browser and talks
            directly to your own Google account.
          </li>
          <li>
            <strong>No one in the middle.</strong> There is no Prioritacts
            database, no backend, and no third party that receives, stores, or
            can see your contact data.
          </li>
          <li>
            <strong>No ads, no analytics, no tracking.</strong> Nothing is sold,
            shared, or profiled.
          </li>
          <li>
            <strong>You&apos;re in control.</strong> Sign out to wipe everything
            from this device, and revoke access from your Google Account at any
            time.
          </li>
        </ul>
      </section>

      <h2>How Prioritacts works</h2>
      <p>
        Prioritacts is a static web page. When you open it, your browser
        downloads the app&apos;s code once, and from then on the app runs on{" "}
        <em>your</em> device. When you sign in, Google gives your browser a
        temporary access token, and your browser uses that token to talk
        directly to the Google People (Contacts) API.
      </p>

      <figure className="privacyFlow" aria-label="Data flow diagram">
        <div className="privacyFlowNode">
          <span className="privacyFlowLabel">Your browser</span>
          <span className="privacyFlowSub">Prioritacts runs here</span>
        </div>
        <div className="privacyFlowArrow" aria-hidden="true">
          <span>⟷</span>
          <span className="privacyFlowSub">direct, encrypted (HTTPS)</span>
        </div>
        <div className="privacyFlowNode">
          <span className="privacyFlowLabel">Your Google account</span>
          <span className="privacyFlowSub">Your contacts live here</span>
        </div>
        <figcaption>
          That&apos;s the whole picture. There is no Prioritacts server in
          between.
        </figcaption>
      </figure>

      <p>
        This means I, the developer, have no way to see your contacts, your
        notes, or your activity in the app, even if I wanted to.
      </p>

      <h2>What the app accesses in your Google account</h2>
      <p>
        When you sign in, Google asks you to grant Prioritacts access to your
        contacts. With that permission, the app <strong>reads</strong> the
        following contact fields, only to display them to you:
      </p>
      <ul>
        <li>Names and profile photos</li>
        <li>Email addresses and phone numbers</li>
        <li>Birthdays and other special dates</li>
        <li>Custom (user-defined) contact fields</li>
      </ul>
      <p>
        The only thing the app ever <strong>writes</strong> back to your Google
        account is two custom fields on a contact, when you set them:
      </p>
      <ul>
        <li>
          <code>~prioritacts~frequency~</code>: how often you want to be in
          touch
        </li>
        <li>
          <code>~prioritacts~lastContact~</code>: when you last reached out
        </li>
      </ul>
      <p>
        These are saved inside your own Google Contacts, so your settings follow
        you across devices without Prioritacts storing anything itself. The app
        never deletes contacts or changes any other contact information.
      </p>

      <h2>What is stored on your device</h2>
      <p>
        To keep you signed in and make the app load quickly, your browser&apos;s
        local storage holds:
      </p>
      <ul>
        <li>The temporary Google access token</li>
        <li>A sync token, so the app only fetches contacts that changed</li>
        <li>A cached copy of your contact list</li>
        <li>Cached copies of contacts' profile photos</li>
      </ul>
      <p>
        This data stays on your device and is never sent anywhere except to
        Google. Choosing <strong>Sign Out</strong> in Settings deletes all of
        it.
      </p>

      <h2>What I don&apos;t do</h2>
      <ul>
        <li>No Prioritacts servers or databases hold your data</li>
        <li>No advertising and no ad networks</li>
        <li>No analytics, tracking pixels, or tracking cookies</li>
        <li>
          No selling, renting, or sharing of personal information. There is
          nothing to share.
        </li>
      </ul>

      <h2>Services involved</h2>
      <p>
        I&apos;m being upfront here, because a privacy-focused app should be:
      </p>
      <ul>
        <li>
          <strong>Google</strong> handles sign-in and stores your contacts, as
          it already does. Your use of your Google account is covered by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Netlify</strong> hosts the app&apos;s static files. Like any
          web host, it may keep standard server logs (such as IP address,
          browser type, and time of request) when the page is loaded. Netlify
          never receives your Google data or your contacts, because those go
          directly between your browser and Google.
        </li>
      </ul>

      <h2>Your control and your rights</h2>
      <p>
        Prioritacts doesn&apos;t collect or keep personal data on any server, so
        there is nothing for me to hand over, correct, or delete on your behalf.
        You can do all of it yourself:
      </p>
      <ul>
        <li>
          <strong>Clear this device:</strong> choose Sign Out in Settings.
        </li>
        <li>
          <strong>Revoke access:</strong> remove Prioritacts in your{" "}
          <a
            href="https://myaccount.google.com/connections"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Account&apos;s third-party connections
          </a>
          .
        </li>
        <li>
          <strong>Remove app fields:</strong> delete the{" "}
          <code>~prioritacts~</code> custom fields from any contact in Google
          Contacts.
        </li>
      </ul>
      <p>
        These steps cover your rights under laws such as the GDPR and CCPA. If
        you have any questions about them, please get in touch.
      </p>

      <h2>Children</h2>
      <p>
        Prioritacts isn&apos;t directed at children under 13 and doesn&apos;t
        knowingly collect information from anyone, including children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If how Prioritacts handles data ever changes, I&apos;ll update this page
        and the date at the top. Any change that weakens these privacy promises
        will be stated clearly here before it takes effect.
        <ul>
          <li>
            <strong>View changes to the actual Privacy Policy's code: </strong>
            <a href="https://github.com/nhhor/prioritacts/commits/master/src/components/Privacy.jsx">
              here
            </a>
            .
          </li>
        </ul>
      </p>
      <h2>Review the app's code</h2>
      <p>
        Every line of Prioritacts&apos; code is available for review on my{" "}
        <strong>GitHub repository </strong>
        <a href="https://github.com/nhhor/prioritacts">here</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or concerns? Noah Horwitz can be reached about this project at{" "}
        <a
          href="https://github.com/nhhor/prioritacts/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/nhhor/prioritacts/issues
        </a>
        .
      </p>
    </div>
  );
}

export default Privacy;

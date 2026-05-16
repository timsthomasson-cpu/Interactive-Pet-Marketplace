import Link from "next/link";

// Privacy & Security section for the Questions page. Anchor: #privacy
// Linked from category intros (AI & Robotic, Premium) and from the camera
// badge on product cards. Provides actionable buying advice rather than
// generic warnings, with authoritative external sources cited.

export function PrivacySecuritySection() {
  return (
    <section id="privacy" className="section-pad scroll-mt-32">
      <div className="container-shell">
        <p className="eyebrow">Privacy &amp; security</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          A buyer&rsquo;s guide to camera-equipped pet robots.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          A camera-equipped robot that moves around your home is functionally different from a fixed security camera, and the privacy questions deserve more than a passing thought. This section is what we tell friends and family who ask: how to think about the trade-offs, what to look for, and what to do after the device is in the house.
        </p>

        <div className="mt-8 space-y-6">
          <details className="group card p-5 sm:p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-slate-900 sm:text-lg">
                Should I be worried about cameras in pet robots?
              </span>
              <span aria-hidden className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Worried may be too strong, but cautious is reasonable. A camera-equipped robot that moves through your home is functionally different from a fixed security camera: it can travel into private spaces, it stays connected to the manufacturer&rsquo;s servers, and like any connected device it can be compromised by software vulnerabilities. There have been real, documented incidents — including one where security researchers demonstrated they could take over a major robot vacuum brand and access the camera without any indicator light, and another where a different manufacturer accidentally exposed thousands of users&rsquo; camera feeds to strangers.
              </p>
              <p>
                None of this means camera-equipped pet robots are unsafe to own; it means the privacy and security features the manufacturer offers should be part of your buying decision, not an afterthought.
              </p>
            </div>
          </details>

          <details className="group card p-5 sm:p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-slate-900 sm:text-lg">
                What should I look for before buying a connected pet robot?
              </span>
              <span aria-hidden className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <li>
                <span className="font-semibold text-slate-900">A clear, readable privacy policy.</span>{" "}
                Look for explicit statements about what data is collected, where it&rsquo;s stored, how long it&rsquo;s kept, and whether it&rsquo;s shared with third parties.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Local processing vs. cloud upload.</span>{" "}
                Products that process AI on-device leak less data than products that upload everything to a manufacturer&rsquo;s cloud. Privacy-focused products will say so explicitly.
              </li>
              <li>
                <span className="font-semibold text-slate-900">A track record.</span>{" "}
                Search &ldquo;[product name] security breach&rdquo; or &ldquo;[brand] privacy&rdquo; before buying. Past incidents are a useful signal.
              </li>
            </ul>

            <p className="mt-6 max-w-3xl font-bold text-slate-900 text-sm sm:text-base">
              For an additional level of privacy, look for the following:
            </p>
            <ul className="mt-3 max-w-3xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <li>
                <span className="font-semibold text-slate-900">Indicator light when the camera is active.</span>{" "}
                It should be impossible to record without a visible LED on.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Physical privacy shutter.</span>{" "}
                A mechanical cover that slides over the camera lens is more trustworthy than a software &ldquo;off&rdquo; button. You can visually confirm the camera can&rsquo;t see. This is uncommon in the pet-robot category; if not present, look for a clearly indicated camera-off mode.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Two-factor authentication on the companion app.</span>{" "}
                A connected camera in your home protected only by a password is a weak link. If the app doesn&rsquo;t visibly support 2FA, use a strong unique password and consider isolating the device on a guest Wi-Fi network.
              </li>
            </ul>
          </details>

          <details className="group card p-5 sm:p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-slate-900 sm:text-lg">
                Steps to take once you own the robot
              </span>
              <span aria-hidden className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <li>
                <span className="font-semibold text-slate-900">Connect it to a guest Wi-Fi network</span>, not your primary home network. Most modern routers offer guest networks; using one keeps the robot isolated from your phones, computers, and other devices.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Enable two-factor authentication</span> on the companion app immediately, if the app supports it.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Disable cloud features you don&rsquo;t use.</span>{" "}
                If you don&rsquo;t need remote access while away from home, turn it off.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Turn off the camera in the app when it&rsquo;s not needed.</span>{" "}
                Even when a robot uses its camera for navigation or legitimate monitoring, you usually don&rsquo;t need it on around the clock. Many of these products (including the Enabot EBO line and Loona) let you disable the camera through the companion app and re-enable it when you actually want it active. Build the habit of toggling it off during private moments — meals, conversations, time in the bedroom — and back on when you need the feature.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Keep firmware updated.</span>{" "}
                Most security incidents involve products running outdated software.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Physically cover the camera as a backup.</span>{" "}
                If your app&rsquo;s privacy toggle doesn&rsquo;t fully reassure you, a piece of tape or a small sticker over the lens is a zero-trust backup. It costs nothing and you can verify it visually.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Review the privacy policy periodically.</span>{" "}
                Manufacturers update their data practices, and the device you bought a year ago may not handle data the same way today.
              </li>
            </ul>
          </details>

          <details className="group card p-5 sm:p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-slate-900 sm:text-lg">
                Where to research a specific product
              </span>
              <span aria-hidden className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                These are independent sources that evaluate connected devices for privacy and security:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://foundation.mozilla.org/en/privacynotincluded/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-trust-700 underline hover:text-trust-900"
                  >
                    Mozilla&rsquo;s *Privacy Not Included*
                  </Link>{" "}
                  — reviews connected products against a published set of minimum security standards.
                </li>
                <li>
                  <Link
                    href="https://www.consumerreports.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-trust-700 underline hover:text-trust-900"
                  >
                    Consumer Reports
                  </Link>{" "}
                  — assesses data handling and privacy alongside other product attributes.
                </li>
                <li>
                  <Link
                    href="https://www.ftc.gov/business-guidance/privacy-security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-trust-700 underline hover:text-trust-900"
                  >
                    U.S. Federal Trade Commission
                  </Link>{" "}
                  — guidance for consumers on connected-device privacy.
                </li>
              </ul>
            </div>
          </details>

          <details className="group card p-5 sm:p-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-slate-900 sm:text-lg">
                Camera-equipped products on this site
              </span>
              <span aria-hidden className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              We mark products in our catalog that include a camera with a small camera icon on the product card. This is informational, not a warning — many buyers want the camera feature. But we want you to see it before you click through.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

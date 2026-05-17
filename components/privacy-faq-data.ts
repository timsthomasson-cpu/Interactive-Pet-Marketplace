// Plain-text Q&A for the Privacy & Security section on /questions.
//
// The rendered UI lives in privacy-security-section.tsx; this file holds the
// schema-friendly plain-text version of each Q&A pair. They need to stay in
// sync — when you edit a question or answer in the UI component, update the
// corresponding entry here too.
//
// Why not share rendering and data from a single source?
// Because the UI uses custom JSX (bulleted lists, inline links, paragraph
// breaks). Schema.org's FAQPage expects answers as plain text or simple HTML
// strings. Two slightly different shapes for the same content, so we keep
// them in two files with a sync expectation.

export const PRIVACY_FAQ_FOR_SCHEMA = [
  {
    question: "Should I be worried about cameras in pet robots?",
    answer:
      "Worried may be too strong, but cautious is reasonable. A camera-equipped robot that moves through your home is functionally different from a fixed security camera: it can travel into private spaces, it stays connected to the manufacturer's servers, and like any connected device it can be compromised by software vulnerabilities. There have been real, documented incidents — including one where security researchers demonstrated they could take over a major robot vacuum brand and access the camera without any indicator light, and another where a different manufacturer accidentally exposed thousands of users' camera feeds to strangers. None of this means camera-equipped pet robots are unsafe to own; it means the privacy and security features the manufacturer offers should be part of your buying decision, not an afterthought."
  },
  {
    question: "What should I look for before buying a connected pet robot?",
    answer:
      "Look for a clear, readable privacy policy that states what data is collected, where it's stored, how long it's kept, and whether it's shared with third parties. Look for products that process AI on-device rather than uploading everything to a manufacturer's cloud. Check the manufacturer's track record by searching for past security incidents. For additional privacy, look for products with a physical privacy shutter (a mechanical cover over the camera lens), an indicator light that activates whenever the camera is recording, and two-factor authentication support on the companion app. Physical shutters are uncommon in the pet-robot category; if a product doesn't have one, look for a clearly indicated camera-off mode. If 2FA isn't available, use a strong unique password and isolate the device on a guest Wi-Fi network."
  },
  {
    question: "What steps should I take once I own the robot?",
    answer:
      "Connect the robot to a guest Wi-Fi network rather than your primary home network. If available, enable two-factor authentication on the companion app. Disable cloud features you don't use, including remote access while away from home. Turn off the camera in the app when it's not needed — many products like the Enabot EBO line and Loona let you toggle the camera off through the companion app, and you should build the habit of disabling it during private moments such as meals, conversations, and time in the bedroom. Keep firmware updated, since most security incidents involve outdated software. As a backup, physically cover the camera with tape or a sticker when you want to be sure it can't see. Periodically review the manufacturer's privacy policy, since data practices change over time."
  },
  {
    question: "Where can I research privacy questions for a specific product?",
    answer:
      "Three independent sources are useful: Mozilla's Privacy Not Included program reviews connected products against a published set of minimum security standards. Consumer Reports assesses data handling and privacy alongside other product attributes. The U.S. Federal Trade Commission publishes consumer guidance on connected-device privacy. Also check the manufacturer's own privacy policy on their product page — that's the authoritative source for what data the product collects, where it's stored, how long it's kept, and who it's shared with. Read it alongside the independent sources rather than instead of them, since manufacturers are accurate about their own practices but tend to present them in the most favorable light."
  },
  {
    question: "Which products on this site have cameras?",
    answer:
      "Products in our catalog that include a camera are marked with a small camera icon on the product card. The badge is informational, not a warning — many buyers want the camera feature for home monitoring or AI interaction. The badge is intended to make camera presence visible before clicking through to a product."
  }
];

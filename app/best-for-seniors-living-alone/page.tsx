import { redirect } from "next/navigation";

// This URL was superseded by /best-pets-for-seniors-living-alone (renamed for consistency with the
// rest of the "best-pets-for-X" audience pages). The permanent (308)
// redirect is configured in next.config.js, which fires before this route
// handler. This file is kept as a safety net: if for any reason the config
// redirect doesn't fire, visitors still land on the correct page.
export default function Page() {
  redirect("/best-pets-for-seniors-living-alone");
}

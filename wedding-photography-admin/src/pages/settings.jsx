import { Helmet } from "react-helmet-async";
import { APP_CONSTANTS } from "src/constants";

import { SettingsView } from "src/sections/settings/view";

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Settings | {APP_CONSTANTS.APP_NAME}</title>
      </Helmet>

      <SettingsView />
    </>
  );
}

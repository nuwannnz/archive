import { Helmet } from 'react-helmet-async';
import { APP_CONSTANTS } from 'src/constants';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>

      <Helmet>
        <title> Login | {APP_CONSTANTS.APP_NAME} </title>
      </Helmet>

      <LoginView />
    </>
  );
}

import { Helmet } from "react-helmet-async";
import { APP_CONSTANTS } from "src/constants";

import { BookingDetails } from "src/sections/booking/view";

// ----------------------------------------------------------------------

export default function BookingPage() {
  return (
    <>
      <Helmet>
        <title> Bookings | {APP_CONSTANTS.APP_NAME} </title>
      </Helmet>

      <BookingDetails />
    </>
  );
}

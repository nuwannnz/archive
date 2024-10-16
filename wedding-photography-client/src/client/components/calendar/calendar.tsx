import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, getJson, setOptions } from "@mobiscroll/react";
import "./calendar.css";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

function Calendar() {
  const min = "2023-11-08T00:00";
  const max = "2024-05-08T00:00";
  const [datetimeLabels, setDatetimeLabels] = React.useState([]);
  const [datetimeInvalid, setDatetimeInvalid] = React.useState([]);

  const onPageLoadingDatetime = React.useCallback((event: any) => {
    getDatetimes(event.firstDay, (bookings: any) => {
      setDatetimeLabels(bookings.labels);
      setDatetimeInvalid(bookings.invalid);
    });
  }, []);

  const getDatetimes = (d: Date, callback: any) => {
    let invalid: any[] = [];
    let labels: any[] = [];

    getJson(
      "https://trial.mobiscroll.com/getbookingtime/?year=" +
        d.getFullYear() +
        "&month=" +
        d.getMonth(),
      (bookings) => {
        for (let i = 0; i < bookings.length; ++i) {
          const booking = bookings[i];
          const bDate = new Date(booking.d);

          if (booking.nr > 0) {
            labels.push({
              start: bDate,
              // title: booking.nr + ' SLOTS',
              textColor: "#2761349c",
            });
            invalid = [...invalid, ...booking.invalid];
          } else {
            invalid.push(d);
          }
        }
        callback({ labels: labels, invalid: invalid });
      },
      "jsonp"
    );
  };

  return (
    <Page className="md-calendar-booking">
      <div className="mbsc-form-group">
        <Datepicker
          display="inline"
          controls={["calendar", "timegrid"]}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          //   width={null}
          labels={datetimeLabels}
          invalid={datetimeInvalid}
          onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
        />
      </div>
    </Page>
  );
}

export default Calendar;

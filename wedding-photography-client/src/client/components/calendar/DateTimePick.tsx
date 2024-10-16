/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Axios from "axios";
// import { red } from "@mui/material/colors";
import "./DateTimePicker.css";
import { Booking } from "../../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

const MarkedDatesCalendar = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [appointmentData, setAppointmentData] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [bookingInfo, setBookingInfo] = useState({
    session: "",
    capacity: 0,
  });
  const [totalCapacity, setTotalCapacity] = useState(0);

  useEffect(() => {
    const filteredData = bookingData.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return selectedDate?.toDateString() === bookingDate.toDateString();
    });
  }, [selectedDate, bookingData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDomain();
  }, []);

  useEffect(() => {
    handleDateClick(new Date());
  }, []);

  const formatSelectedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [selectedDateLabel, setSelectedDateLabel] = useState<string>(
    formatSelectedDate(new Date())
  );

  const fetchDomain = useCallback(async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/domains/public/${process.env.REACT_APP_DOMAIN_ID}`
      );

      if (response.status === 200) {
        console.log("domain data", response.data);
        setTotalCapacity(response.data.total_capacity);
      }
    } catch (error) {
      console.error(error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDateClick = (date: any) => {
    setData([]);
    if (date) {
      const matchingBooking = bookingData.find((booking) => {
        const bookingDate = new Date(booking.event_date);
        return date.toDateString() === bookingDate.toDateString();
      });

      if (matchingBooking) {
        console.log("Matching:", matchingBooking);
        const { session, capacity } = matchingBooking;
        setBookingInfo({ session, capacity });
      } else {
        console.log("No matching booking found");
        setBookingInfo({ session: "", capacity: 0 });
      }

      const filteredData = bookingData.filter((booking) => {
        const bookingDate = new Date(booking.event_date);
        return date.toDateString() === bookingDate.toDateString();
      });

      console.log("filtered data handleclick", filteredData);

      if (filteredData.length > 0) {
        const { session, capacity } = filteredData[0];
        setBookingInfo({ session, capacity });
      } else {
        console.log("No matching booking found");
        setBookingInfo({ session: "", capacity: 0 });
      }

      const timeSlots = generateTimeSlots(date, filteredData);
      setData(timeSlots);
      setSelectedDate(date);

      setSelectedDateLabel(formatSelectedDate(date));
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/bookings/public/by-domain/${process.env.REACT_APP_DOMAIN_ID}`
      );

      if (response.status === 200) {
        // setAppointmentData(response.data);
        // return response.data; // Return the response data
        console.log(response.data);
        setBookingData(response.data);
      }
    } catch (error) {
      console.error(error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleErrorResponse = (error: any) => {
    if (error.response) {
      if (error.response.status === 401) {
        // logout();
        console.log(error.response);
      } else {
        // toast.warn(error.response.data.error || 'An error occurred', {
        //   autoClose: 3000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined
        // });
      }
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateTimeSlots = (date: Date, filteredData: any[]) => {
    console.log("filteredData", filteredData);
    const timeSlots = [];
    const currentTime = new Date(date);
    currentTime.setHours(6, 0, 0, 0);
    const closingTime = new Date(date);
    closingTime.setHours(21, 0, 0, 0);

    const now = new Date();

    // If no bookings for the day, show three separate time slots as "Available"
    if (filteredData.length === 0) {
      const morningSlot = {
        time: "Morning",
        disabled: false,
        startTime: "06:00",
        endTime: "12:00",
        status: "Available",
      };

      const afternoonSlot = {
        time: "Afternoon",
        disabled: false,
        startTime: "12:00",
        endTime: "18:00",
        status: "Available",
      };

      const eveningSlot = {
        time: "Evening",
        disabled: false,
        startTime: "18:00",
        endTime: "21:00",
        status: "Available",
      };

      timeSlots.push(morningSlot, afternoonSlot, eveningSlot);
    } else {
      // Create a Map to store unique sessions and their corresponding data
      const uniqueSessionsMap = new Map();

      // Populate the Map with unique sessions (keeping only the first occurrence)
      filteredData.forEach((booking) => {
        const sessions = booking.session.split(",");
        sessions.forEach((session: any) => {
          const sessionKey = session.trim().toLowerCase(); // Normalize session name
          if (!uniqueSessionsMap.has(sessionKey)) {
            uniqueSessionsMap.set(sessionKey, {
              session: sessionKey,
              capacity: 0,
            });
          }

          // Combine capacities for sessions with the same name
          uniqueSessionsMap.get(sessionKey).capacity += booking.capacity;
        });
      });

      // Iterate through unique sessions
      uniqueSessionsMap.forEach((sessionData) => {
        const session = sessionData.session;
        const capacity = sessionData.capacity;
        console.log("session capacity", capacity);

        const start = new Date(date);
        start.setHours(6, 0, 0, 0);
        const end = new Date(date);
        end.setHours(21, 0, 0, 0);

        const disabled = filteredData.some((booking) => {
          const bookingSessions = booking.session
            .split(",")
            .map((s: string) => s.trim().toLowerCase());

          return (
            bookingSessions.includes(session) &&
            new Date(booking.event_date) <= end &&
            new Date(booking.event_date) >= start
          );
        });

        // Check if the capacity is greater than or equal to totalCapacity
        const status = capacity >= totalCapacity ? "Booked" : "Available";
        console.log("status", status);

        const slot = {
          time: session,
          disabled: status === "Booked", // Set disabled based on status
          startTime: formatTime(start),
          endTime: formatTime(end),
          status, // Set status based on capacity
        };

        // Check if the current date is today
        if (date.toDateString() === now.toDateString()) {
          if (now >= start && now < end) {
            slot.disabled = true;
          } else if (now > end) {
            slot.disabled = true;
          }
        }

        timeSlots.push(slot);
      });
    }

    return timeSlots;
  };

  const formatTime = (time: Date) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <Grid container spacing={2} style={{ paddingBottom: "3rem" }} className="custom-grid-container">
      {/* Left side - Calendar */}
      <Grid item xs={12} md={6} style={{ maxWidth: '37%' }} className="custom-grid">
        <Calendar
          onChange={(v) => setSelectedDate(new Date(v?.toString() ?? ""))}
          value={selectedDate}
          onClickDay={handleDateClick}
          tileClassName={({ date }) =>
            data.length > 0 &&
              date.toDateString() === selectedDate?.toDateString()
              ? "selected-date"
              : null
          }
          tileDisabled={({ date }) => {
            const now = new Date();

            if (
              date < new Date() &&
              date.toDateString() !== new Date().toDateString()
            ) {
              return true;
            }

            if (
              date.toDateString() === now.toDateString() &&
              now.getHours() >= 22
            ) {
              return true;
            }

            return false;
          }}
          className="datetime-pick"
        />
      </Grid>

      <Grid item xs={12} md={4} style={{ maxWidth: '25%' }} className="custom-grid-table">
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            fontFamily: "sans-serif",
            fontWeight: "400",
            overflowX: "hidden",
          }}

        >
          <div className="selectedDateLabel">
            <h4>{selectedDateLabel}</h4>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((timeSlot) => (
                <TableRow key={timeSlot.time}>
                  <TableCell>{timeSlot.time}</TableCell>
                  <TableCell
                    style={{ color: timeSlot.disabled ? "#888" : "#000" }}
                  >
                    {timeSlot.disabled ? (
                      <>
                        Booked
                        <FontAwesomeIcon icon={faBan} style={{ color: "red", marginLeft: "10px" }} />
                      </>
                    ) : (
                      <>
                        Available
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "10px" }} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Grid>
    </Grid>
  );
};

export default MarkedDatesCalendar;

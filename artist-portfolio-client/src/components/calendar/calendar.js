import React, { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FormModal from "../FormModal";
import "./calendar.css";
import SimpleTable from "../Table/SimpleTable";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pending, setPending] = useState(true);
  const [event, setEvent] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [success, setSuccess] = useState({
    message: "",
    has: false,
  });
  const [error, setError] = useState({
    message: "",
    has: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (info) => {
    setIsModalOpen(true);
    setSelectedDate(info.dateStr);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/getEvents");
  
      if (response.status === 200) {
        setEvent(response.data.existingEvents);
      } else {
        fetchData();
      }
    } catch (error) {
      if (error.response.status === 401) {
        window.location.reload();
      } else {
        console.error(error);
        setError({ message: error.message, has: true });
        toast.error("An error occurred while fetching data.");
      }
    } finally {
      setisLoading(false);
    }
  };
  
  const deletedata = async (dataArray) => {
    if (dataArray.length > 0) {
      console.log(dataArray);
  
      // Create a new array with only the 'id' values
      const idArray = dataArray.map((data) => data.id);
  
      console.log(idArray);
  
      try {
        setPending(true);
  
        const response = await axios.delete(
          `http://localhost:3004/delete/${idArray}`
        );
  
        if (response.status === 200) {
          setPending(false);
          fetchData();
          toast.success("Event Deleted successfully!");
          
        } else {
          fetchData();
        }
      } catch (error) {
        if (error.response.status === 401) {
          window.location.reload();
        }
      } finally {
        setPending(false);
      }
    } else {
      // Handle case when dataArray is empty
    }
  };

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    await updateData(row.id, values);
    exitEditingMode();
  };

  const updateData = async (_id, values) => {

    const data = {
      eventName: values.eventName,
      eventDate: values.selectedDate,
      eventTime: values.eventTime,
      EventLocation: values.EventLocation,
      eventDescription: values.eventDescription,
    };

    try {
      setPending(true);

      const response = await axios.put(
        "http://localhost:3004/update/" + _id,
        data,
      );

      if (response.status === 200) {
        setPending(false);
        toast.success("Event updated successfully!");
        fetchData();
      } else if (response.status === 401) {
      } else {
        fetchData();
      }
    } catch (error) {
      if (error.response.status === 401) {
        window.location.reload();
      }
    } finally {
      setPending(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "eventName",
        header: "Event Name",
        enableColumnActions: true,
      },

      {
        accessorKey: "eventDate",
        header: "Event Date",
        enableColumnActions: true,
      },

      {
        accessorKey: "eventTime",
        header: "Event Time",
        enableColumnActions: true,
      },

      {
        accessorKey: "EventLocation",
        header: "Event Location",
        enableColumnActions: true,
      },

      {
        accessorKey: "eventDescription",
        header: "Event Description",
        enableColumnActions: true,
      },
    ],
    []
  );

  return (
    <section id="event">
      <span className="eventTitle">Events</span>
      <h4>Click the Date to Add Event Information</h4>
      <div className="calendarSec">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"80vh"}
          selectable={true}
          dateClick={openModal}
          className="custom-calendar"
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDate={selectedDate}
        />
      </div>

      <div className="tabled">
        <Grid container spacing={2}>
          <Grid item xs={24} sm={12}>
            <SimpleTable
              tableHeading="Event List"
              columns={columns}
              getData={event}
              deletedata={deletedata}
              handleSaveRow={handleSaveRow}
              isLoading={isLoading}
              idName="_id"
              enableClickToCopy
              enableRowNumbers={false}
              enableRowVirtualization={false}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Calendar;

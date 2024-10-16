import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventsFound, setEventsFound] = useState(true);

  return (
    <EventContext.Provider value={{ eventsFound, setEventsFound }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};

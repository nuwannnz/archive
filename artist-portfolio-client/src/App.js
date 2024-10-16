import React  from "react";  //, { useEffect }
import Navbar from "./components/Navbar/nav-bar.js";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EventRoute from "./components/routes/EventRoute.js";
import { EventProvider} from "./components/Events/EventContext.js";

function App() {

  // useEffect(() => {
  //   // test
  //   fetch(`/.netlify/functions/create-domain`)
  //     .then((res) => res.json())
  //     .then((res) => console.log("response ==> ", res));
  // }, []);

  // useEffect(() => {
  //   // test
  //   fetch(`/.netlify/functions/find-all`)
  //     .then((res) => res.json())
  //     .then((res) => console.log("response ==> ", res));
  // }, []);

  // useEffect(() => {
  //   // test
  //   fetch(`/.netlify/functions/delete-domain`)
  //     .then((res) => res.json())
  //     .then((res) => console.log("response ==> ", res));
  // }, []);

  // useEffect(() => {
  //   // test
  //   fetch(`/.netlify/functions/update-domain`)
  //     .then((res) => res.json())
  //     .then((res) => console.log("response ==> ", res));
  // }, []);

  return (
    <div className="App">
      <Router>
        <EventProvider>
          <Navbar />
          <EventRoute />
        </EventProvider>
        {/* <Calendar /> */}
        {/* <ToastContainer /> */}
      </Router>
    </div>
  );
}

export default App;

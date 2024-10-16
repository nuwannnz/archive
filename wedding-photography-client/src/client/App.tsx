import React, { useEffect, useState , CSSProperties } from "react";
import "./App.css";
import { DomainContext } from "./context/DomainContext";
import { fetchDomain } from "./helpers/api";
import { Domain } from "./types";
import LayoutWrapper from "./LayoutWrapper";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "10rem auto",
  borderColor: "black",
};

function App() {
  const [domain, setDomain] = useState<Domain | undefined>(undefined);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    fetchDomain().then((fetchedDomain) => setDomain(fetchedDomain));
  }, []);

  // useEffect(() => {
  
  //   const loadingTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(loadingTimeout);
  // }, []);

  useEffect(() => {

      const handleLoad = () => {
        const loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 3000);
        return () => clearTimeout(loadingTimeout);
      };
  
      // Set loading to false when the entire website has finished loading
      window.addEventListener('load', handleLoad);
  
      return () => {
        window.removeEventListener('load', handleLoad);
      };

  }, []);

  return (
    <div className="App">
      {
        loading ? 
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
       :
       <DomainContext.Provider value={domain}>
        {/* <Head />
        <Navbar />
        <Slideshow />
        <Service />
        <About />
        <Album />
        <Events />
        <Contact />
        <Footer /> */}
        <LayoutWrapper />
      </DomainContext.Provider>
      }
      
    </div>
  );
}

export default App;

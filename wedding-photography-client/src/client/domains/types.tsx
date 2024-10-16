import React from "react";
import Head from "../Head";
import Navbar from "../layout/navbar";
import Slideshow from "../pages/slideshow";
import Service from "../pages/service";
import About from "../pages/about";
import Events from "../pages/events";
import Contact from "../pages/contact";
import Footer from "../layout/footer";
import { Domain } from "../types";
import Album from "../pages/album";

type DomainRenderFunc = (domain?: Domain) => JSX.Element;

export interface DomainStratergy {
  domainId: string;
  name: string;
  images: {
    slideshow: (domainId?: string) => string[];
    logo: () => string;
  };
  render: {
    head: DomainRenderFunc;
    navBar: DomainRenderFunc;
    slideShow: DomainRenderFunc;
    service: DomainRenderFunc;
    about: DomainRenderFunc;
    album: DomainRenderFunc;
    events: DomainRenderFunc;
    contact: DomainRenderFunc;
    footer: DomainRenderFunc;
  };
}

export const BaseDomainStratergy: DomainStratergy = {
  domainId: "6566fad6f23391e789f9004d",
  name: "base",
  images: {
    slideshow: () => {
      return [];
    },
    logo: () => {
      return "";
    },
  },
  render: {
    head: () => <Head />,
    navBar: () => <Navbar />,
    slideShow: () => <Slideshow />,
    service: () => <Service />,
    about: () => <About />,
    album: () => <Album />,
    events: () => <Events />,
    contact: () => <Contact />,
    footer: () => <Footer />,
  },
};

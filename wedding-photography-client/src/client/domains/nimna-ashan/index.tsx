import { BaseDomainStratergy, DomainStratergy } from "../types";
import slide1 from "../../assets/domains/658079f4161bad6cbcbec9ee/slideshow/slide1.jpg";
import slide2 from "../../assets/domains/658079f4161bad6cbcbec9ee/slideshow/slide2.jpg";
import slide3 from "../../assets/domains/658079f4161bad6cbcbec9ee/slideshow/slide3.jpg";
import slide4 from "../../assets/domains/658079f4161bad6cbcbec9ee/slideshow/slide4.jpg";
import logo from "../../assets/domains/658079f4161bad6cbcbec9ee/logo/domain-logo.png";

export const nimnaAshanStratergy: DomainStratergy = {
  ...BaseDomainStratergy,
  domainId: "658079f4161bad6cbcbec9ee",
  images: {
    ...BaseDomainStratergy.images,
    slideshow: () => {
      return [slide1, slide3, slide2, slide4];
    },
    logo: () => {
      return logo;
    },
  },
};

import { useContext } from "react";
import { DomainContext } from "../client/context/DomainContext";

export const useDomain = () => {
  const domain = useContext(DomainContext);

  return domain;
};

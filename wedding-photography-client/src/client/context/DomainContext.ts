import { createContext } from "react";
import { Domain } from "../types";

export const DomainContext = createContext<Domain | undefined>(undefined);

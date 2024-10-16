import React from "react";
import { DomainStratergy, BaseDomainStratergy } from "./types";
import { DefaultDomain } from "./default";
import { nimnaAshanStratergy } from "./nimna-ashan";

export const DomainStratergies: Map<string, DomainStratergy> = new Map([
  ["6566fad6f23391e789f9004d", DefaultDomain],
  ["658079f4161bad6cbcbec9ee", nimnaAshanStratergy],
]);

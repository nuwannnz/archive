import { useEffect, useState } from "react";

import { useDomain } from "./useDomain";
import { DomainStratergy } from "../client/domains/types";
import { DomainStratergies } from "../client/domains";

export const useDomainStratergy = () => {
  const domain = useDomain();
  const [stratergy, setStratergy] = useState<DomainStratergy | undefined>(
    undefined
  );

  useEffect(() => {
    if (domain) {
      setStratergy(DomainStratergies.get(domain._id));
    }
  }, [domain]);

  return stratergy;
};

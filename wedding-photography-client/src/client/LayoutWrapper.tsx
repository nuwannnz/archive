import React, { useMemo } from "react";
import { useDomainStratergy } from "../hooks/useDomainStratergy";

const LayoutWrapper = () => {
  const domainStratergy = useDomainStratergy();

  const sections = useMemo(() => {
    if (!domainStratergy) return <></>;

    const { render } = domainStratergy;
    return (
      <>
        {render.head()}
        {render.navBar()}
        {render.slideShow()}
        {render.service()}
        {render.about()}
        {render.album()}
        {render.events()}
        {render.contact()}
        {render.footer()}
      </>
    );
  }, [domainStratergy]);

  return sections;
};

export default LayoutWrapper;

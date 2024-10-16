import React from "react";
import { Helmet } from "react-helmet";
import { useDomain } from "../hooks/useDomain";

const Head = () => {
  const domain = useDomain();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{domain?.name ?? "..."}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
};

export default Head;

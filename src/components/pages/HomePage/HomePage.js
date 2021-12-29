import React from "react";
import { Helmet } from "react-helmet";
import PageTemplate from "../../templates/PageTemplate";

function HomePage() {
  return (
    <PageTemplate>
      {/** Helmet position */}
      <Helmet>
        <title>홈-MYDBD</title>
        <meta property="og:title" content="홈-MYDBD" />
      </Helmet>
      <h1>HomePage</h1>
    </PageTemplate>
  );
}

export default HomePage;

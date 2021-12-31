import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import ErrorPageTemplate from "../../templates/ErrorPageTemplate";
import { Helmet } from "react-helmet";

function ErrorPage() {
  return (
    <PageTemplate>
      <Helmet>
        <title>404 error page - MYDBD</title>
      </Helmet>
      <ErrorPageTemplate>
        <h1>잘못된 접근입니다.</h1>
        <h2>HTTP 404 Error</h2>
      </ErrorPageTemplate>
    </PageTemplate>
  );
}

export default ErrorPage;

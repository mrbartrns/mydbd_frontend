import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import RegisterTemplate from "../../templates/RegisterTemplate";

function RegisterPage() {
  return (
    <PageTemplate>
      {/** Helmet */}
      <RegisterTemplate>{/* <RegisterContainer /> */}</RegisterTemplate>
    </PageTemplate>
  );
}

export default RegisterPage;

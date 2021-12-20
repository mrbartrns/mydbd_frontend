import React from "react";
import LoginContainer from "../../../containers/LoginContainer/LoginContainer";
import LoginTemplate from "../../templates/LoginTemplate";
import PageTemplate from "../../templates/PageTemplate";

function LoginPage() {
  return (
    <PageTemplate>
      {/** Helmet */}
      <LoginTemplate>
        <LoginContainer />
      </LoginTemplate>
    </PageTemplate>
  );
}

export default LoginPage;

// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports

// css
import "../../css/component/loginform.component.scss";

function LoginComponent(props) {
  return (
    <div className="login">
      <h2>로그인</h2>
      <form className="login__form" onSubmit={props.handleLoginSubmit}>
        <div className="login__form__input">
          <input
            id="login__id"
            type="text"
            onChange={props.handleUsernameChange}
            placeholder="Username(ID)"
          />
        </div>
        <div className="login__form__input">
          <input
            id="login__password"
            type="password"
            onChange={props.handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <input type="submit" className="login__submit" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { message } = state.messageReducer;
  return { message };
}

export default connect(mapStateToProps)(LoginComponent);

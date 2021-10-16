// react imports
import React from "react";

// css
import "../../css/component/form.component.scss";

function RegisterComponent(props) {
  return (
    <div className="form-container register">
      <h2>회원가입</h2>
      <form
        className="form__form register__form"
        onSubmit={props.handleLoginSubmit}
      >
        {props.message && props.message.detail && (
          <ul>
            <li>{props.message.detail}</li>
          </ul>
        )}
        <div className="form__input register__form__input">
          <input
            id="register__id"
            type="text"
            onChange={props.handleUsernameChange}
            placeholder="Username(ID) 입력"
          />
          {props.message && props.message.username && (
            <ul>
              <li>{props.message.username}</li>
            </ul>
          )}
        </div>
        <div className="form__input register__form__input">
          <input
            id="register__password"
            type="password"
            onChange={props.handlePasswordChange}
            placeholder="Password"
          />
          {props.message && props.message.password && (
            <ul>
              <li>{props.message.password}</li>
            </ul>
          )}
        </div>
        <div className="form__input register__form__input">
          <input
            id="register__password-confirm"
            type="password"
            onChange={props.handlePasswordChange}
            placeholder="Password 확인"
          />
          {props.message && props.message.password && (
            // TODO: message 수정 필요
            <ul>
              <li>{props.message.password}</li>
            </ul>
          )}
        </div>
        <div className="form__input register__form__input">
          <input
            id="register__email"
            type="email"
            onChange={props.handlePasswordChange}
            placeholder="email 입력"
          />
          {props.message && props.message.password && (
            // TODO: message 수정 필요
            <ul>
              <li>{props.message.password}</li>
            </ul>
          )}
        </div>
        <input type="submit" className="form__submit register__form__submit" />
      </form>
    </div>
  );
}

export default RegisterComponent;

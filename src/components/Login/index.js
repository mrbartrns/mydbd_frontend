// react imports
import React from "react";
import { connect } from "react-redux";
import Input from "../atoms/Input";
import Wrapper from "../atoms/Wrapper";
import Button from "../atoms/Button";

// custom imports

// css
// import "../../css/component/loginform.component.scss";
import "../../css/component/form.component.scss";

// TODO: create auth reducer and set local message
function LoginComponent(props) {
  return (
    <div className="form-container login">
      <Wrapper border padding borderTopLeftRadius borderTopRightRadius>
        <Input type="text" borderNone fullWidth placeHolder={"아이디"} />
      </Wrapper>
      <Wrapper border padding borderBottomLeftRadius borderBottomRightRadius>
        <Input type="password" borderNone fullWidth placeHolder="비밀번호" />
      </Wrapper>
      <Wrapper className="btn-wrapper">
        <Button fullWidth big>
          로그인
        </Button>
      </Wrapper>

      {/* <h2>로그인</h2>
      <form
        className="form__form login__form"
        onSubmit={props.handleLoginSubmit}
      >
        {props.message && props.message.detail && (
          <ul>
            <li>{props.message.detail}</li>
          </ul>
        )}
        <div className="form__input login__form__input">
          <input
            id="login__id"
            type="text"
            onChange={props.handleUsernameChange}
            placeholder="Username(ID)"
          />
          {props.message && props.message.username && (
            <ul>
              <li>{props.message.username}</li>
            </ul>
          )}
        </div>
        <div className="form__input login__form__input">
          <input
            id="login__password"
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
        <input type="submit" className="login__submit" />
      </form> */}
    </div>
  );
}

function mapStateToProps(state) {
  const { message } = state.messageReducer;
  return { message };
}

export default connect(mapStateToProps)(LoginComponent);

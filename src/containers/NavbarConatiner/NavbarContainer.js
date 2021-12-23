import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/organisms/Navbar";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

function NavbarContainer({ dispatch, isLoggedIn, user }) {
  const history = useHistory();
  const onLogout = useCallback(async () => {
    try {
      await dispatch(logout());
      history.go(0);
    } catch (error) {}
  }, [dispatch, history]);
  return <Navbar onLogout={onLogout} isLoggedIn={isLoggedIn} user={user} />;
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(NavbarContainer);

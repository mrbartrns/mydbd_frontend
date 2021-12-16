import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const style = { display: "none" };
function InlineErrorMessage() {
  const inlineMessageRef = useRef();
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const CLOSED = " closed";
  const CLASS_NAME = "inline_message_wrapper";

  return (
    <div
      className={CLASS_NAME + `${!message ? CLOSED : ""}`}
      style={!message ? style : null} // temp
      ref={inlineMessageRef}
    >
      <div className="inline_message">
        <span className="system_message">{message}</span>
      </div>
      <div className="close_btn">
        <button
          onClick={(e) => {
            dispatch({ type: CLEAR_MESSAGE });
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

// function mapStateToProps(state) {
//   const { message } = state.messageReducer;
//   return { message };
// }

// export default connect(mapStateToProps)(InlineErrorMessage);
export default InlineErrorMessage;

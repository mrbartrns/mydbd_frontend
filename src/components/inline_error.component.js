import React, { useRef } from "react";
import { connect } from "react-redux";

function InlineErrorMessage({ message }) {
  const inlineMessageRef = useRef();
  const CLOSED = " closed";
  const CLASS_NAME = "inline_message_wrapper";
  return (
    <div
      className={CLASS_NAME + `${!message ? CLOSED : ""}`}
      ref={inlineMessageRef}
    >
      <div className="inline_message">
        <span className="system_message">{message}</span>
      </div>
      <div className="close_btn">
        <button
          onClick={(e) => {
            inlineMessageRef.current.className = CLASS_NAME + CLOSED;
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { message } = state.messageReducer;
  return { message };
}

export default connect(mapStateToProps)(InlineErrorMessage);

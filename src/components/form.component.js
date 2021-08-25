import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { capitalize } from "../functions";

const ERROR_STYLE = { color: "red" };

function UsernameForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel controlId="floatingInput" label="ID" className="mb-3">
        <Form.Control
          type="text"
          placeholder={capitalize(props.field)}
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
      <ul style={ERROR_STYLE}>
        {props.errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    </Form.Group>
  );
}

function PasswordForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel controlId={props.field} label={capitalize(props.field)}>
        <Form.Control
          type="password"
          placeholder={capitalize(props.field)}
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
      <ul style={ERROR_STYLE}>
        {props.errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    </Form.Group>
  );
}

function EmailForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel
        controlId="registrationEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
      <ul style={ERROR_STYLE}>
        {props.errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
}

export { UsernameForm, PasswordForm, EmailForm };

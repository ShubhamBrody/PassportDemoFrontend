import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ErrorOccured from "./ErrorOccured";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen.js";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../store/AuthContext";

function Registration() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    reenteredpassword: "",
  });
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const validateDetails = () => {
      if(details.password.length < 7 || details.password !== details.reenteredpassword) return false;
      return true;
  }

  function userRegistration() {
    if(!validateDetails())  {
        setErroroccured(true);
        setError("Bad Credentials");
        return;
    }
    console.log(details);
    axios
      .post(MyBackend("signup/"), {password: details.password, email: details.email})
      .then((data) => {
        console.log("data", data);
        if (data.status !== 200) {
          setErroroccured(true);
        }
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        error.response
          ? setError(error.response.data)
          : setError("ServerError");
        setErroroccured(true);
      });
    }

  const valuesetter = (key, value) => {
    setDetails((prev) => {
      return {
        ...prev,
        ...{ [key]: value },
      };
    });
  };

  return (
    <Container>
      <div
        style={{
          padding: "2rem 1rem",
          marginBottom: "2rem",
          backgroundColor: "#e9ecef",
          borderRadius: ".3rem",
        }}
        className="d-flex justify-content-center"
      >
        <h3>Register Yourself Here!</h3>
      </div>
      {erroroccured ? (
        <ErrorOccured Error={error} Handle={setErroroccured} />
      ) : (
        <></>
      )}
      <Form
        value={details}
        onSubmit={(e) => {
          e.preventDefault();
          userRegistration();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              valuesetter("email", e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            {"We'll never share your email with anyone else :)"}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              valuesetter("password", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              valuesetter("reenteredpassword", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Button variant="primary" type="submit">
            Register
          </Button>{" "}
          <Form.Text>
            Already registered ? Go to <a href="/login">Login</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Registration;

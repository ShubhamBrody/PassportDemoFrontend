import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ErrorOccured from "./ErrorOccured";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen";
import { useNavigate } from "react-router-dom";

function Login() {
  const [details, setDetails] = useState([]);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  var numberOfElements = 2;
  const loginhandler = (arr) => {
    const data = {
      email: arr[0],
      password: arr[1],
    };
    axios
      .post(MyBackend("login/"), data)
      .then((d) => {
        console.log(d);
        if(d.data.message === 'Authentication successful!')
        {
          window.localStorage.setItem("token", d.data.token);
          navigate('/');
        } else {
          setErroroccured(true);
          setError(d.data.message);
        }
      })
      .catch((error) => {
        console.log("This is error : ", error);
        error.response
          ? setError(error.response.data)
          : setError("ServerError");
        setErroroccured(true);
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
        <h3>Login Here!</h3>
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
          var i = 0;
          var arr = [];
          while (i < numberOfElements) {
            arr.push(e.target[i].value);
            i++;
          }
          setDetails(arr);
          loginhandler(arr);
          // setErroroccured(true);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
        <Button variant="primary" type="submit">
          Login
        </Button>{" "}
          <Form.Text>
            Not registered ? Go to <a href="/register">Register</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Login;

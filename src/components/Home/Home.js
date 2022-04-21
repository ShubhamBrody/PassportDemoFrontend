import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyBackend } from "../Api/ApiLinkGen";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token === null) {
      navigate("/register");
    }
    axios.get(MyBackend('tokenvalidator/'), { headers: { Authorization: token } })
      .then((data) => {
        console.log(data);
        if (data.data.status) {
          navigate("/");
        } else {
          localStorage.removeItem("token");
          navigate("/register");
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/register");
      });
  }, [navigate]);
  return (
    <Container>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">Home Page</span>
            <div className="mb-4 lead">
              You have successfully logged in! Hence you are seeing this page.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
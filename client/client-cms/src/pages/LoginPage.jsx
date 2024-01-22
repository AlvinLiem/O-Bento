import { useState } from "react";
import ButtonSubmit from "../components/ButtonSubmit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `https://p2-gc1-restaurant.avprojects.online/login`,
        data: input,
      });

      localStorage.access_token = data.access_token;

      navigate(`/`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }
  return (
    <>
      <div className="nav navbar bg-warning">
        <div className="div container-fluid justify-content-between">
          <div>
            <img
              src="/logo.png"
              style={{ width: "8rem", height: "auto" }}
              alt="Logo"
            />
          </div>
          <div>
            <a href="https://client-p2-gc2-o-bento.web.app" className="btn">
              Home
            </a>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center align-item-center">
        <div className="row">
          <form
            onSubmit={handleSubmit}
            className="bg-light rounded position-absolute top-50 start-50 translate-middle"
            style={{ width: "25rem" }}
          >
            <div className="className mb-3">
              <h2 className="text-center fw-bolder">Login</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="form-email" className="form-label">
                Email address
              </label>
              <input
                onChange={handleInputChange}
                type="email"
                className="form-control"
                id="form-email"
                name="email"
                placeholder="e.g. yourname@mail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="form-password" className="form-label">
                Password
              </label>
              <input
                onChange={handleInputChange}
                type="password"
                className="form-control"
                id="form-password"
                name="password"
              />
            </div>
            <div className="d-flex mb-3 justify-content-center">
              <ButtonSubmit message={"Enter"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

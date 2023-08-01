import React, { useState } from "react";
import "./login.css";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async () => {
    setIsLoading(true);
    const data = {
      email,
      password,
    };

    await axios
      .post("/user/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login Success!", {
            position: "top-left",
          });
          navigator("/");
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error.response.data.message, {
          position: "top-right",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn text-light main-bg login-button"
                    onClick={handlerSubmit}
                    disabled={isLoading}
                  >
                    <div className="d-flex justify-content-center ">
                      {isLoading && (
                        <div
                          className="spinner-border text-info me-1"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "2px",
                          }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      Login
                    </div>
                  </button>
                  <div className="mt-3">
                    <Link to={"/register"}>Create Accout?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

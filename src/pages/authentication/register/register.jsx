import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const formDataState = {
    email: "",
    userName: "",
    phone: "",
    password: "",
  };
  const [formData, setFomData] = useState(formDataState);
  const [pwError, setPwError] = useState();
  const [hide, setHide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    if (name === "password") {
      const passwordMatch = value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
      );
      passwordMatch
        ? setPwError(null)
        : setPwError(
            "Password is least 1 Uppercase 1 Lowercase and least 8 character max 15 character"
          );
    }
    setFomData({
      ...formData,
      [name]: value,
    });
  };

  const handleHideOrShowPassword = () => {
    setHide(!hide);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      alert("Out Screen! Please!");
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.keys(formData).some(
      (x) => formData[x] === null || formData[x] === ""
    );
    if (isEmpty) {
      toast.error("Please input field");
      return;
    }
    setIsLoading(true);
    const data = {
      username: formData.userName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
    };

    await axios
      .post("/user/register", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log({ response });
        if (response.status === 200) {
          toast.success("Register Success!", {
            position: "top-left",
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error.response.data.message, {
          position: "top-right",
        });
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setFomData(formDataState);
  };

  return (
    <div className="container" id="quiz-container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Register</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handlerSubmit(e)}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeData}
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChangeData}
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChangeData}
                    className="form-control"
                    id="phone"
                    max={11}
                    maxLength={11}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type={!hide ? "password" : "text"}
                    value={formData.password}
                    onChange={handleChangeData}
                    className="form-control"
                    id="password"
                  />
                  {pwError && <p className="text-danger">{pwError}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="hide"
                    onChange={handleHideOrShowPassword}
                  />
                  <label htmlFor="hide" className="form-label ms-2">
                    {"Show Password"}
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn text-light main-bg login-button"
                    // onClick={handlerSubmit}
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
                      Register
                    </div>
                  </button>
                  <div className="mt-3">
                    <Link to={"/login"}>Have Account? Login</Link>
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

export default RegisterPage;

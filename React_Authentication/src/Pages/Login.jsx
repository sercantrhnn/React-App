import { React, useState } from "react";
import "../Style/LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useFormik } from "formik";
import Anasayfa from "./anasayfa";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


function Login() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          values
        );
        console.log("giriş başarılı");
        console.log(response);
        navigate("/anasayfa");
      } catch (error) {
        console.log(error.response.data.message);
        setSuccess(true);
      }
      resetForm();
    },
  });
  return (
    <>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Şifre veya Email hatalı. Tekrar deneyiniz.
        </Alert>
      </Snackbar>

      <div className="loginbody">
        <div className="logindiv">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <PersonIcon className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <LockIcon className="icon" />
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

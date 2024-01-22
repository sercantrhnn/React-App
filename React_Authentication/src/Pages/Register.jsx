import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import "../Style/RegisterForm.css";
import { useFormik } from "formik";
import axios from "axios";
import { registerSchema } from "../Schema";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

function Register() {
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: registerSchema,
    // validateOnChange:true,
    // validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          values
        );
        console.log(response.status);
        if (response.status === 201) {
          console.log("Kullanıcı başarılı bir şekilde");
          setSuccess(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
      //console.log(values.username);
      resetForm();
    },
  });

  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Kayıt işlemi başarıyla gerçekleşti. <Link to="/">Lütfen giriş yapınız.</Link> 
        </Alert>
      </Snackbar>
      <div className="registerdiv">
        <div className="wrapper">
          <form onSubmit={handleSubmit} autoComplete="off">
            <h1>Register</h1>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PersonIcon fontSize="small" className="user" />
                {touched.fullname && errors.fullname ? (
                  <p className="error">*{errors.fullname}</p>
                ) : null}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="User Name"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PersonIcon fontSize="small" className="user" />
                {touched.username && errors.username ? (
                  <p className="error">*{errors.username}</p>
                ) : null}
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <EmailIcon fontSize="small" className="user" />
                {touched.email && errors.email ? (
                  <p className="error">*{errors.email}</p>
                ) : null}
              </div>
              <div className="input-field">
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PhoneIcon fontSize="small" className="user" />
                {touched.phone && errors.phone ? (
                  <p className="error">*{errors.phone}</p>
                ) : null}
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <LockIcon fontSize="small" className="user" />
                {touched.password && errors.password ? (
                  <p className="error">*{errors.password}</p>
                ) : null}
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <LockIcon fontSize="small" className="user" />
                {touched.confirmpassword && errors.confirmpassword ? (
                  <p className="error">*{errors.confirmpassword}</p>
                ) : null}
              </div>
            </div>
            <button disabled={isSubmitting} type="submit" className="btn">
              Register
            </button>
            <div className="login-link">
                    <p>Do you already have an account? <Link to='/'>Login</Link></p>
                </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

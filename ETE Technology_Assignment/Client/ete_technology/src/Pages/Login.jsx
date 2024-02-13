import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { signInWithEmailAndPassword } from "firebase/auth";
import "../Styles/LoginForm.css"
import { auth } from "../firebase";
import {LockOutlined, MailOutlined} from "@ant-design/icons"
import {loginSchema} from "../Schema/index"
import {message} from "antd"

function Login() {
    const navigate = useNavigate();
    const {handleChange, handleSubmit, values, errors} = useFormik({
        initialValues: {
        email: "",
        password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async(values, {resetForm}) => {
        try {
            const data = await signInWithEmailAndPassword(auth, values.email,values.password)
            const user = data.user;
            console.log(user);
            if (user) {
                navigate("/home")
                console.log("kullanıcı kayıtlı");
                console.log(user.displayName);
                resetForm();
            }
            } catch (error) {
                console.log(error.message);
                message.error("Login failed. Please check your information.")
            }
        
    },
})

  return (
    <div className="login">
        <div className="loginbody">
            <div className="logindiv">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email}/>
                        <MailOutlined className="icon"/>
                        {errors.email ? (
                            <p className="error">{errors.email}</p>
                        ): null}
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password}/>
                        <LockOutlined className="icon"/>
                        {errors.password ? (
                            <p className="error">{errors.password}</p>
                        ): null}
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
    </div>
  )
}

export default Login;

import {React} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import "../Styles/RegisterForm.css"
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import googleIcon from "../assets/google_icon.png"
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons"
import { registerSchema } from "../Schema";
import {message} from "antd"

function Register() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const {handleChange, handleSubmit, values, errors} = useFormik({
        initialValues:{
            fullname: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
        validationSchema: registerSchema,
        onSubmit: async(values, {resetForm}) => {
            try {
            const data = await createUserWithEmailAndPassword(auth, values.email,values.password)
            const user = data.user;
            console.log(user);
            if (user) {
                await updateProfile(user, {displayName:values.fullname})
                console.log("kullanıcı kayıtlı");
                console.log(user.displayName);
                message.success("The registration process has been completed successfully. Please log in.")
                resetForm();
            }
            } catch (error) {
                console.log(error.message);
                message.error("Registration failed. Please check your information")
            }
            
        }
    })

    const googleLogin = async()=> {
        try {
            const data = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(data);
            const token = credential.accessToken;
            const user = data.user;
            if (user) {
                navigate("/home")
            }
        } catch (error) {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
        }
    }

  return (
    <>
        <div className="registerbody">
            <div className="registerdiv">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="inputbox">
                        <div className="input-field">
                            <input placeholder="Full Name" name="fullname" onChange={handleChange} value={values.fullname} />
                            <UserOutlined className="icon"/>
                            {errors.fullname ? (
                                <p className="error">{errors.fullname}</p>
                            ): null}
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email}/>
                            <MailOutlined className="icon"/>
                            {errors.email ? (
                                <p className="error">{errors.email}</p>
                            ): null}
                        </div>
                    </div>
                    <div className="inputbox">
                        <div className="input-field">
                            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />
                            <LockOutlined className="icon"/>
                            {errors.password ? (
                                <p className="error">{errors.password}</p>
                            ): null}
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={handleChange} value={values.confirmpassword}/>
                            <LockOutlined className="icon"/>
                            {errors.confirmpassword ? (
                                <p className="error">{errors.confirmpassword}</p>
                            ): null}
                        </div>
                    </div>
                    <button type="submit" className="registerbutton">Register</button>
                    <div className="login-link">
                        <p>Do you already have an account? <Link to='/'>Login</Link></p>
                    </div>
                    <button className="googlebutton" onClick={googleLogin}> <img src={googleIcon}/>Google</button>
                </form>
                
            </div>
        </div>
    </>
  )
}

export default Register;

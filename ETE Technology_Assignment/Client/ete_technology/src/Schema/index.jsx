import *as yup from "yup"

export const loginSchema = yup.object().shape({
    email: yup.string().email("*Please enter a valid email address").required("*Required field"),
    password: yup.string().required("*Required field")
})

export const registerSchema = yup.object().shape({
    fullname: yup.string().required("*Required field"),
    email: yup.string().email("*Please enter a valid email address").required("*Required field"),
    password: yup.string().min(6,"*Please enter a minimum of 6 characters").required("*Required field"),
    confirmpassword: yup.string().oneOf([yup.ref('password')],"*The passwords do not match").required("*Required field")
})
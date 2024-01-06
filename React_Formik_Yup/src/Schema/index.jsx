import *as yup from 'yup'
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
    fullname: yup.string().required('Zorunlu alan'),
    username: yup.string().required('Zorunlu alan'),
    email: yup.string().email('Geçerli bir mail giriniz').required('Zorunlu alan'),
    phone: yup.number().required('Zorunlu alan'),
    password: yup.string().min(5,'En az 5 karakter giriniz').matches(passwordRules,{
        message: 'En az 1 büyük harf 1 küçük harf ve 1 rakam giriniz'
    }).required('Zorunlu alan'),
    confirmpassword: yup.string().oneOf([yup.ref('password')], 'Şifreler eşleşmiyor').required('Zorunlu alan')
})
import * as Yup from "yup"

export const RegisterValidation = Yup.object().shape({
    name: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
    email: Yup.string().required("Obligatoire").email("Ceci doit être un email"),
    password: Yup.string().required("Obligatoire").min(6, "Minimum 6 caractères"),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

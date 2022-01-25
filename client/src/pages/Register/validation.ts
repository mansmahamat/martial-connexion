import * as Yup from "yup"

export const RegisterValidation = Yup.object().shape({
    email: Yup.string().required("Obligatoire").email("Ceci doit être un email"),
    password: Yup.string().required("Obligatoire").min(6, "Minimum 6 caractères"),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

import * as Yup from "yup"

export const ResetValidation = Yup.object().shape({
    password: Yup.string().required("Obligatoire").min(6, "Minimum 6 caractères"),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

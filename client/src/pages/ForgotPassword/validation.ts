import * as Yup from "yup"

export const ForgotPasswordValidation = Yup.object().shape({
    email: Yup.string().required("Obligatoire").email("Ceci doit être un email"),
})

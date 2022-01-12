import * as Yup from "yup"

export const LoginValidation = Yup.object().shape({
  email: Yup.string().required("Obligatoire").email("Ceci doit être un email"),
  password: Yup.string().required("Obligatoire").min(6, "Minimum 6 caractères"),
})

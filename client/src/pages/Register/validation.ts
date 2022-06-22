import * as Yup from "yup"

export const RegisterValidation = Yup.object().shape({
    email: Yup.string().required("Obligatoire").email("Ceci doit être un email"),
    password: Yup.string().required("Obligatoire").min(6, "Minimum 6 caractères"),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     firstName: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
    lastName: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
    //discipline: Yup.string().required("Obligatoire"),
    avatar: Yup.mixed()
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test("type", "We only support jpeg", function (value) {
      return value && value[0] && value[0].type === "image/jpeg";
    }),
})

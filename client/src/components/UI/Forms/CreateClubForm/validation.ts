import * as Yup from "yup"

export const CreateClubFormValidation = Yup.object().shape({
  clubName: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
  email: Yup.string().email("Ceci doit être un email").required("Obligatoire").min(2, "Minimum 2 caractères"),
  number: Yup.number().min(10, "Minimum 10 caractères"),
  discipline: Yup.string().required("Obligatoire"),
  about: Yup.string().required("Obligatoire").min(10, "Minimum 10 caractères"),

})

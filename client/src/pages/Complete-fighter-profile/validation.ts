import * as Yup from "yup"

export const CreateFighterValidation = Yup.object().shape({
  firstName: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
  lastName: Yup.string().required("Obligatoire").min(2, "Minimum 2 caractères"),
  city: Yup.string().required("Obligatoire"),
  discipline: Yup.string().required("Obligatoire"),
  avatar: Yup.mixed()
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test("type", "We only support jpeg", function (value) {
      return value && value[0] && value[0].type === "image/jpeg";
    }),
})

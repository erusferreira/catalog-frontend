import * as yup from "yup";

export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .required("Informação obrigatória")
      .email("Email Inválido"),
    password: yup
      .string()
      .required("Informação obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/,
        "A senha deve conter ao menos uma letra minúscula, uma maiúscula, um número e um caractere especial"
      )
      .min(6, "Mínimo 6 caracteres")
      .max(12, "Máximo 12 caracteres"),
  })
  .required();

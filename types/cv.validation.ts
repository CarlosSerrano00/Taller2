
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string()
    .trim()
    .min(3, "Ingresa tu nombre completo")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "El nombre contiene caracteres no válidos"
    ),

  email: z.string()
    .trim()
    .email("Ingresa un correo electrónico válido"),

  phone: z.string()
    .trim()
    .regex(
      /^\+?[0-9\s()-]{7,20}$/,
      "Ingrese un número válido"
    ),

  location: z.string()
    .trim()
    .min(2, "Ingresa tu ubicación"),

  summary: z.string()
    .max(500, "Máximo 500 caracteres"),
});

export type PersonalInfoForm = z.infer<
  typeof personalInfoSchema
>;

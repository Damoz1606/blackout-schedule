import { z } from "zod";

export default z.object({
    document: z.string().refine((e) => /[0-9]/.test(e), {
        message: "Solo numeros"
    }),
    criteria: z.string().min(1, {
        message: "Debe seleccionar una opcion"
    })
});
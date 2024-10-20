'use server'

import apiConfig from "@/lib/config/api.config";
import { CnelPayload } from "@/lib/interface/cnel.interface"

export const fetchBlackout = async (document: string, criteria: string): Promise<CnelPayload> => {
    try {
        const res = await fetch(`${apiConfig.uri}/servicios-linea/v1/notificaciones/consultar/${document}/${criteria}`);
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.mensaje);
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
'use server'

import apiConfig from "@/lib/config/api.config";
import { CnelPayload } from "@/lib/interface/cnel.interface"

export const fetchBlackout = async (document: string, criteria: string): Promise<CnelPayload> => {
    try {
        const res = await fetch(`${apiConfig.uri}/servicios-linea/v1/notificaciones/consultar/${document}/${criteria}`);
        if (!res.ok) {
            const data = await res.json();
            console.error(data);
            throw new Error('Ha ocurrido un error');
        }
        const data = await res.json();
        if (data.resp === 'ERROR') {
            throw new Error(data.mensaje);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
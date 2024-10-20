import { CnelPayload } from "../interface/cnel.interface";
import { fakeDb } from "./data.db";

export const fakeFetcher = async (): Promise<CnelPayload> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeDb);
        }, 1000);
    });
}
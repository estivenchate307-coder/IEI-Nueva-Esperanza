import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const CONFIG = doc(db, "configuracion", "colegio");

export const obtenerConfiguracion = async () => {
    const snap = await getDoc(CONFIG);

    if (snap.exists()) {
        return snap.data();
    }

    return null;
};

export const guardarConfiguracion = async (datos) => {
    await updateDoc(CONFIG, datos);
};
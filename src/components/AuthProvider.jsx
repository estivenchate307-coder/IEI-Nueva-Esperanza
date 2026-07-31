import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function AuthProvider({ children }) {

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const cancelar = onAuthStateChanged(auth, () => {
            setCargando(false);
        });

        return cancelar;

    }, []);

    if (cargando) {

        return <h2>Cargando...</h2>;

    }

    return children;

}

export default AuthProvider;
import { onValue, ref } from "firebase/database";
import { database } from "../../service/firebase.services";
import { useEffect, useState } from "react";
import { IUR3eData } from "../../interfaces/data.interfaces";

export default function CurrentData() {

    const [data, setData] = useState<IUR3eData>()

    useEffect(() => {
        const dataRef = ref(database, "lastData")
        return onValue(dataRef, (snapshot) => {
            const query = snapshot.val()
            setData(query)
        })
    }, [])

    return(
        <>
            
        </>
    )
}
import { onValue, ref } from "firebase/database";
import { database } from "../../service/firebase.services";
import { useEffect, useState } from "react";

export default function CurrentData() {

    const [data, setData] = useState<any>({})

    const dataRef = ref(database, "lastData")

    useEffect(() => {
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
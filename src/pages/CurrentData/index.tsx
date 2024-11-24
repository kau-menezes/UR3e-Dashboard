import { onValue, ref } from "firebase/database";
import { database } from "../../service/firebase.services";
import { useEffect, useState } from "react";
import { IUR3eData } from "../../interfaces/data.interfaces";
import NavBar from "../../components/NavBar";

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
            <NavBar/>

            <div className="bg-[#AAB5C9] h-screen">
                <div className="w-[95%] max-w-[1000px]  m-auto flex flex-col justify-between py-8 md:py-20">

                    <div className="flex flex-wrap w-full justify-center md:justify-between gap-2 font-semibold select-none">
                        <h3 className="text-xl md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110">
                            {data ? "Connection Established" : "Connecting..."}
                        </h3>
                        <h3 className="text-xl md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110">
                            Robot Status: 
                                <span className={data?.status ? "text-green-500" : "text-red-500"}>
                                    {data?.status ? " ACTIVE" : " INACTIVE"}
                                </span>
                        </h3>
                    </div>

                </div>
            </div>
        </>
    )
}
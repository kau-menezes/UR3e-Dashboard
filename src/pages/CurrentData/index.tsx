import { onValue, ref } from "firebase/database";
import { database } from "../../service/firebase.services";
import { useEffect, useState } from "react";
import { IUR3eData } from "../../interfaces/data.interfaces";
import NavBar from "../../components/NavBar";
import TemperatureBall from "./components/DataBall";

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
                <div className="w-[95%] max-w-[1000px]  m-auto flex flex-col justify-between py-8 gap-8 md:py-20">

                    <div className="flex flex-wrap w-full justify-center md:justify-between gap-2 font-semibold select-none">
                        <h3 className="w-[95%] max-w-[450px] text-center text-lg md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110">
                            {data ? "Connection Established" : "Connecting..."}
                        </h3>
                        <h3 className="w-[95%] max-w-[450px] text-center text-xl md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110">
                            Robot Status: 
                                <span className={data?.status ? "text-green-500" : "text-red-500"}>
                                    {data?.status ? " ACTIVE" : " INACTIVE"}
                                </span>
                        </h3>
                    </div>

                    {
                        data &&

                        <div className="p-2 rounded-md w-72 m-auto relative">
                            <img src="/ur3e.png" alt="UR3e" className="w-full m-auto" />

                            <TemperatureBall temperature={data?.temperatures[0]} positions="top-[400px] left-[220px]" title="Base" />
                            <TemperatureBall temperature={data?.temperatures[1]} positions="top-[460px] left-[40px]" title="Shoulder" />
                            <TemperatureBall temperature={data?.temperatures[2]} positions="top-[240px] left-[150px]" title="Elbow" />
                            <TemperatureBall temperature={data?.temperatures[3]} positions="top-[40px] left-[200px]" title="Wrist 1" />
                            <TemperatureBall temperature={data?.temperatures[4]} positions="top-[85px] left-[20px]" title="Wrist 2" />
                            <TemperatureBall temperature={data?.temperatures[5]} positions="top-[-10px] left-[60px]" title="Wrist 3" />
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

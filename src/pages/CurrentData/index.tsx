import { onValue, ref, update } from "firebase/database";
import { database } from "../../service/firebase.services";
import { useEffect, useState } from "react";
import { IUR3eData } from "../../interfaces/data.interfaces";
import NavBar from "../../components/NavBar";
import TemperatureBall from "./components/DataBall";
import Modal from "./components/Modal";

export default function CurrentData() {

    const [data, setData] = useState<IUR3eData>()
    const [userAction, setUserAction] = useState(false)
    const [modal, setModal] = useState(false)

    const unlockProtectiveStop = () => {
        if (userAction) {
            const dataRef = ref(database, "userAction");
            update(dataRef, { action: true })
                .then(() => {
                    console.log("Protective stop unlocked successfully");
                    setModal(false); // Close the modal after success

                })
                .catch((error) =>
                    console.error("Error unlocking protective stop:", error)
                );
        }
    };

    useEffect(() => {
        const dataRef = ref(database, "lastData");
        const unsubscribeData = onValue(dataRef, (snapshot) => {
            const query = snapshot.val();
            setData(query);
        });

        const dataActionRef = ref(database, "userAction");
        const unsubscribeAction = onValue(dataActionRef, (snapshot) => {
            const queryAction = snapshot.val();
            setUserAction(queryAction);
        });

        return () => {
            unsubscribeData();
            unsubscribeAction();
        };
    }, []);

    return(
        <>
            <NavBar/>

            <Modal
                isVisible={modal}
                onClose={() => setModal(false)}
                onUnlock={unlockProtectiveStop}
            />

            <div className="bg-[#AAB5C9]">
                <div className="w-[95%] max-w-[1300px]  h-[100vh] m-auto ml-72 flex flex-row justify-between pt-8 pb-64 gap-12 md:pt-20 md:gap-28">

                    <div className="flex flex-wrap w-1/2 justify-center md:justify-between gap-2 font-semibold select-none">
                        <div className="w-full flex flex-col gap-5">
                            <h3 className="w-[95%] max-w-[450px] text-center text-lg md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110">
                                {data ? "Connection Established" : "Connecting..."}
                            </h3>
                            <h3 className="w-[95%] max-w-[450px] h-[95px] text-center text-xl relative md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-main transition-transform hover:scale-110 hover:cursor-pointer">
                                Robot Status: 
                                    <p className={data?.status == 1  ? "text-green-500" : "text-amber-500"}>
                                        {data?.status == 1 ? " ACTIVE" : " PROTECTIVE STOPPED"}
                                    </p>
                                    {
                                        data?.status != 1 ?
                                        <div 
                                            className="bg-white rounded-full w-[40px] h-[40px] border-amber-500 border-2 text-amber-500 font-bold absolute -top-3 -right-3"
                                            onClick={ () => setModal(true)}    
                                        >
                                            !
                                        </div>
                                        :
                                        ""
                                    }
                            </h3>
                        </div>
                        <div className="w-full m-0 relative bottom-0 ">
                            {
                                data &&
                                <div className="p-2 rounded-md w-72 md:w-[330px] m-auto fixed bottom-0 transition-transform hover:scale-110">
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
                    <div className="flex flex-wrap w-1/2 justify-center md:justify-between gap-2 font-semibold select-none">
                    {
                        data &&
                        <div className="w-full relative md:w-96 md:m-0 flex flex-col gap-10">
                                <img src="/ur3e_side.png" alt="UR3e" className="w-[300px]    fixed right-0 top-44  h-auto" />

                                <div className="bg-white w-[95%] min-w-[450px] p-3  rounded-md flex gap-4 items-center transition-transform hover:scale-110">
                                    <img src="/angles.svg" alt="Angles" className="h-16" />
                                    {/* <h6 className="text-xl font-semibold text-main">Coords: <br/>( { data.tcp_pose.join(", ") } )</h6> */}
                                    <div className="w-full flex">
                                        <div className="w-1/2">
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">X: <span className="text-[#727272]">{data.tcp_pose[0].toFixed(2)}</span></h3>
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">Y: <span className="text-[#727272]">{data.tcp_pose[1].toFixed(2)}</span></h3>
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">Z: <span className="text-[#727272]">{data.tcp_pose[2].toFixed(2)}</span></h3>
                                        </div>
                                        <div className="w-1/2">
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">RX: <span className="text-[#727272]">{data.tcp_pose[3].toFixed(2)}</span></h3>
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">RY: <span className="text-[#727272]">{data.tcp_pose[4].toFixed(2)}</span></h3>
                                            <h3 className="text-2xl font-semibold text-main text-center mb-2">RZ: <span className="text-[#727272]">{data.tcp_pose[5].toFixed(2)}</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="w-[95%] min-w-[450px] h-[95px] text-center mt-24 text-xl relative md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-[#727272] transition-transform hover:scale-110 hover:cursor-pointer">
                                MAIN VOLTAGE 
                                    <p className="text-main">
                                        {data?.main_voltage.toFixed(2)} V
                                    </p>
                                </h3>
                                <h3 className="w-[95%] min-w-[450px] h-[95px] text-center text-xl relative md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-[#727272] transition-transform hover:scale-110 hover:cursor-pointer">
                                ROBOT VOLTAGE 
                                    <p className="text-main">
                                        {data?.robot_voltage.toFixed(2)} V
                                    </p>
                                </h3>
                                <h3 className="w-[95%] min-w-[450px] h-[95px] text-center text-xl relative md:text-3xl bg-white px-5 py-2 uppercase rounded-md text-[#727272] transition-transform hover:scale-110 hover:cursor-pointer">
                                ROBOT AC 
                                    <p className="text-main">
                                        {data?.robot_ac.toFixed(2)} A
                                    </p>
                                </h3>

                            </div>
                    }
                    

                    </div>

                    {/* {
                        data &&
                        <div className="flex flex-col gap-10 md:flex-row md:justify-center items-start">
                            <div className="p-2 rounded-md w-72 md:w-96 m-auto relative">
                                <img src="/ur3e.png" alt="UR3e" className="w-full m-auto" />

                                <TemperatureBall temperature={data?.temperatures[0]} positions="top-[400px] left-[220px]" title="Base" />
                                <TemperatureBall temperature={data?.temperatures[1]} positions="top-[460px] left-[40px]" title="Shoulder" />
                                <TemperatureBall temperature={data?.temperatures[2]} positions="top-[240px] left-[150px]" title="Elbow" />
                                <TemperatureBall temperature={data?.temperatures[3]} positions="top-[40px] left-[200px]" title="Wrist 1" />
                                <TemperatureBall temperature={data?.temperatures[4]} positions="top-[85px] left-[20px]" title="Wrist 2" />
                                <TemperatureBall temperature={data?.temperatures[5]} positions="top-[-10px] left-[60px]" title="Wrist 3" />
                            </div>
                        
                            <div className="w-72 m-auto pt-20 relative md:w-96 md:m-0">
                                <img src="/ur3e_side.png" alt="UR3e" className="w-full" />

                                <div className="bg-white w-64 p-3 absolute top-0 left-0 rounded-md flex gap-4 items-center">
                                    <img src="/angles.svg" alt="Angles" className="h-12" />
                                    <h6 className="text-xl font-semibold text-main">Coords: <br/>( { data.tcp_pose.join(", ") } )</h6>
                                </div>
                            </div>
                        </div>
                    } */}
                </div>
            </div>
        </>
    )
}

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import NavBar from "../../components/NavBar";
import { useEffect, useState } from 'react';

import { onValue, ref } from "firebase/database";
import { database } from "../../service/firebase.services";
// import TemperatureBall from '../CurrentData/components/DataBall';
import { IUR3eData } from '../../interfaces/data.interfaces';
import { IDataGraph } from '../../interfaces/graph.interfaces';

  
  export default function TimeseriesData() {
      
    const [data, setData] = useState<IUR3eData[]>([]);
    const [dataGraph, setDataGraph] = useState<IDataGraph[]>([]);
    
    useEffect(() => {
        const dataRef = ref(database, "data");
        return onValue(dataRef, (snapshot) => {
            const query = snapshot.val();
            console.log(query.data); // Logs the fetched data
            
            setData(query.data); // Updates the state asynchronously
            
            // Use query.data directly instead of data
            const updated = data.map((element: any) => ({
                temperature: element.temperatures,
                timestamp: element.timestamp
            }));
            
            console.log(updated); // Logs the transformed array of temperatures
            
            // Build the dataGraph1 array
            const updatedFinal = updated.map((item: any) => ({
                base: item.temperature[0],
                shoulder: item.temperature[1],
                elbow: item.temperature[2],
                wrist1: item.temperature[3],
                wrist2: item.temperature[4],
                wrist3: item.temperature[5],
                name: item.timestamp
            }));

            setDataGraph(updatedFinal)
            
            console.log(updatedFinal); // Logs the final transformed array
        });
    }, []);
    

    return(
        <>
            <NavBar/>

            <div className="bg-[#AAB5C9]">
                <div className="w-[95%] max-w-[1300px] h-[100vh] m-auto flex justify-between pt-8 pb-64 gap-12 md:pt-20 md:gap-28">
                    <div className='w-full h-full'>
                    <h6 className="text-xl font-semibold text-gray-700 bg-white w-full text-center py-2">Joint's Temperatures per Time, in °C</h6>
                    <ResponsiveContainer width="100%" height="100%"  className={"bg-white p-2"}>
                        <LineChart
                        width={500}
                        height={300}
                        data={dataGraph}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" strokeWidth={2} dataKey="base" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" strokeWidth={2} dataKey="shoulder" stroke="#1f599c" />
                        <Line type="monotone" strokeWidth={2} dataKey="elbow" stroke="#4b65db" />
                        <Line type="monotone" strokeWidth={2} dataKey="wrist1" stroke="#2c83d4" />
                        <Line type="monotone" strokeWidth={2} dataKey="wrist2" stroke="#0d4070" />
                        <Line type="monotone" strokeWidth={2} dataKey="wrist3" stroke= "#3250a8" />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                    <div className='w-full h-full'>
                        <h6 className="text-xl font-semibold text-gray-700 bg-white w-full text-center py-2">Joint's Temperatures per Time, in °C</h6>
                        <ResponsiveContainer width="100%" height="100%"  className={"bg-white p-2"}>
                            <BarChart
                            width={500}
                            height={300}
                            data={dataGraph}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar stackId="a" strokeWidth={2} dataKey="base" fill="#8884d8" />
                            <Bar stackId="b" strokeWidth={2} dataKey="shoulder" fill="#1f599c" />
                            <Bar stackId="c" strokeWidth={2} dataKey="elbow" fill="#4b65db" />
                            <Bar stackId="d" strokeWidth={2} dataKey="wrist1" fill="#2c83d4" />
                            <Bar stackId="e" strokeWidth={2} dataKey="wrist2" fill="#0d4070" />
                            <Bar stackId="f" strokeWidth={2} dataKey="wrist3" fill= "#3250a8" />
                            </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}
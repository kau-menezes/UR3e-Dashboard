interface IDataBallProps {
    title: string
    temperature: number
    positions: string
}

export default function TemperatureBall({ temperature, positions, title }: IDataBallProps) {
    return(
        <div className={`p-1 rounded-full aspect-square w-20 bg-white shadow-2xl absolute flex flex-col items-center pt-2 ${ positions }`}>
            <span className="text-sm text-gray-700 font-semibold text-center">{ title }</span>
            <h5 className="text-xl font-semibold text-main">{ temperature } °C</h5>
        </div>
    )
}
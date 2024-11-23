import { RouterProvider } from "react-router-dom"
import "./styles/global.css"
import router from "./routes/router"


export default function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

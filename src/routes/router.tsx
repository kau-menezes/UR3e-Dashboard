import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../constants/routes";
import CurrentData from "../pages/CurrentData";
import TimeseriesData from "../pages/TimeseriesData";

const router = createBrowserRouter([
    {
        path: Routes.CURRENT_DATA,
        element: <CurrentData/>
    },
    {
        path: Routes.TIMESERIES_DATA,
        element: <TimeseriesData/>
    },
])

export default router
import { Link } from "react-router-dom";
import { Routes } from "../../constants/routes";

export default function NavBar() {
    return (
        <div className="bg-white fixed shadow-2xl p-4 flex justify-between bottom-8 left-0 right-0 w-max m-auto rounded-full md:top-0 md:left-0 md:h-screen md:flex-col md:rounded-none md:bottom-0 md:m-0">
            <img src="/logo.svg" alt="Logo" className="h-12 hidden md:block" />
            <div className="flex gap-5 w-max md:flex-col">
                <AppLink 
                    to={Routes.CURRENT_DATA}
                    iconSrc="/dashboard.png"
                />
                <AppLink 
                    to={Routes.TIMESERIES_DATA}
                    iconSrc="/activity.png"
                />
            </div>
            <span className="hidden md:block"></span>
        </div>
    )
}

interface IAppLinkProps {
    to: string
    iconSrc: string
}
function AppLink({ to, iconSrc }: IAppLinkProps) {
    return (
        <Link to={to}>
            <div className="aspect-square h-16 p-3 rounded-full bg-main">
                <img 
                    src={iconSrc} 
                    alt={to} 
                />
            </div>
        </Link>
    )
}
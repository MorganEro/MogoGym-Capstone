import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const TrainerNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar__item navbar__Home">
                <Link className="navbar__link" to="/" 
            >Mogo Gym </Link>
            </li>
            <li className="navbar__item navbar__clients">  
                 <Link 
                 className="navbar__link" to="/clientList" >Clients</Link>
               
            </li>
            <li className="navbar__item navbar__availability">
                <Link className="navbar__link" to="/availability" 
            >Availability</Link>
            </li>
            {
                localStorage.getItem("mogo_user")
                ? <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("mogo_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            : ""
            }
        </ul>
    )
}
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ClientNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar__item navbar__Home">
                <Link className="navbar__link" to="/" 
            >Mogo Gym</Link>
            </li>
            <li className="navbar__item navbar__sessions">
                 <Link 
                 className="navbar__link" to="/sessions" 
                >Your Current Sessions</Link>
            </li>
            {/* <li className="navbar__item navbar__loginSessions">
                 <Link 
                 className="navbar__link" to="/loginSessions" 
                >Login Sessions</Link>
            </li> */}

            <li className="navbar__item navbar__available">  
                 <Link 
                 className="navbar__link" to="/available" >Available Sessions</Link>    
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


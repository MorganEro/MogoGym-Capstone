import { Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { ClientSessionEdit } from "../sessions/ClientSessionEdit"
import { AvailableSessionsList } from "../sessions/AvailableSessions"


export const ClientViews= () => {

	const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const [client, setClient] = useState({})
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/users?id=${mogoUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const user=data[0]
                setClient(user)
            }) 
        }, [mogoUserObject.id]
    )    


	return (
	<Routes>
		<Route path="/" element= {
			<>
			<h1>Mogo Gym</h1>
			<div>Great Day, {`${client.fullName}`}! Always remember, if it doesn't challenge you, it doesn't change you. </div>
			
			<Outlet />
			
			</>
		} />
		<Route path="available" element={ <AvailableSessionsList/> } />
		<Route path="sessions" element={ <ClientSessionEdit /> } />
		
	</Routes>
	)
}

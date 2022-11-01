import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { ClientList } from "../clients/ClientList"
import { TrainerAvailabilityCreate } from "../sessions/TrainerAvailibiltyCreate"
import { TrainerList } from "../trainers/TrainerList"

export const TrainerViews = () => {

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
                <div> Great day, {`${client.fullName}`}! Train them to train smart!</div>
                
                <Outlet />
                
                </>
            } />
            <Route path="clientList" element={ <ClientList /> } />
            <Route path="trainerList" element={ <TrainerList /> } />
            <Route path="availability" element={ <TrainerAvailabilityCreate /> } />
            
        </Routes>
        )
    
}
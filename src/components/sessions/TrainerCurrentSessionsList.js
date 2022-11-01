import { useEffect, useState } from "react"



export const TrainerCurrentSessionList = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)


    const [sessions, setSessions]=useState ({})

    useEffect (
        ()=> {
            fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
   
   return <article className="currentSessions">
        {
            sessions?.trainerSessions?.map((trainerSession) => {
                return(
                    <ul key={trainerSession?.id} className="trainerSessions" >
                        <li>Day: {trainerSession?.day}</li>
                        <li>Time: {trainerSession?.time}</li>
                    </ul>
                )
            })}
    </article> 
   
    
}

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ClientSession = () => {

    const [sessions, setSessions] = useState([])
    
    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const navigate = useNavigate()
       
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/scheduledSessions?clientId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
   

    const cancelButton = (event, session)=> {

        console.log(event, session)

            fetch(`http://localhost:8088/scheduledSessions/${session.id}`, {
                method: "DELETE",
    })     
            .then(() => {
                fetch(`http://localhost:8088/scheduledSessions?clientId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
                .then(response => response.json())
                .then((newArray) => {
                    setSessions(newArray)
                })
            })
    }
   
   
 

    // todo write ternary 
    // todo button functionality

    return (
        
        <div className= "sessionsList">
            <h2> Your Current Sessions</h2>
                    <>
                        {Array.isArray(sessions) && sessions.map((session) => {
                          return (
                            <ul className="session" key={session.id}>
                            
                                <header>Session Details</header>
                                <li>
                                    Day of Week: {session.trainerSession?.day}
                                </li>
                                <li>
                                    Time of Day: {session.trainerSession?.time}
                                </li>
                                <li>
                                    Trainer: {session.trainer?.name}
                                </li> 
                                <button 
                                   onClick={(clickEvent) => cancelButton  (clickEvent, session)} 
                                   className="btn btn-primary">
                                Cancel</button> 
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}
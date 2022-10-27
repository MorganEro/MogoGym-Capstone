
import { useEffect, useState } from "react"


export const ClientSessionEdit = () => {

    const [sessions, setSessions] = useState([])
    
    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
   
   
    
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/scheduledSessions?clientId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
   

    // todo write ternary 
    // todo button functionality

    return (
        
        <div className= "sessionsList">
            <h2> Your Current Sessions</h2>
                    <>
                        {sessions.map((session) => {
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
                                <button  >Edit</button>   
                                <button  >Cancel</button> 
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AvailableSessionsList = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
    const navigate = useNavigate()

    const [sessions, setSessions] = useState([])
    const [userSelectedSession, setUserSelectedSession] = useState({
        trainerSessionId:  0,
        trainerId: 0,
        day: "",
        time: "",
        clientId: 0
    })
    /*
    "id": 1,
    "name": "Coach Morgan",
    "userId": 1,
    "trainerSessions": [
      {
        "id": 1,
        "day": "Monday",
        "time": "3:00PM",
        "trainerId": 1
     
      } */

   
    
      const addButton = (event)=> {
        event.preventDefault ()

            return fetch(`http://localhost:8088/scheduledSessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSelectedSession)
            })
            .then(() => {
                navigate('/sessions')
            }) 
    }
    
    useEffect (
        ()=> {
            fetch('http://localhost:8088/trainers?_embed=trainerSessions')
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )


    return (
        <div className= "availableSessions">

        <h2> Available Sessions</h2>
        <>
            {Array.isArray(sessions) && sessions.map((session) =>{
                return(
                    <fieldset className="trainer" key={session.id}> 
                        <header>{session.name}</header>
                        {session.trainerSessions?.map((trainerSession) => {
                                return(
                                    <div className="trainer-Session" key={`key---${trainerSession.id}`}>
                                        <label>
                                            <input type="radio" 
                                            required autoFocus
                                            key = {`trainerSession-${trainerSession.id}`}
                                            value={trainerSession.id} 
                                            onChange={(event) => {
                                                const copy = {...userSelectedSession}
                                                copy.trainerSessionId =trainerSession.id
                                                copy.trainerId =trainerSession.trainerId
                                                copy.day =trainerSession.day
                                                copy.time =trainerSession.time
                                                copy.clientId = mogoUserObject.id
                                                setUserSelectedSession(copy)
                                            }}
                                            checked = {userSelectedSession.trainerSessionId === trainerSession.id}
                                            className="radio"/>
                                            {trainerSession.day} 
                                            {trainerSession.time} 
                                            
                                        </label> 
                                    </div> 
                                )
                            }
                            )}
                        
                    </fieldset>
                    
                )
            })
            }
            <div>
                        <button 
                            onClick={(clickEvent) => addButton(clickEvent)} 
                            className="btn btn-primary">
                            Add Session</button> 
                        </div>
        </>
    </div>  
     
    )
}

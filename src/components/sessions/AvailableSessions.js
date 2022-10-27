import { useEffect, useState } from "react"


export const AvailableSessionsList = () => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)

    const [sessions, setSessions] = useState([])
    const [userSelectedSession, setUserSelectedSession] = useState({
        trainerSessionId:  0,
        trainerId: 0,
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

    
    useEffect (
        ()=> {
            fetch('http://localhost:8088/trainers?_embed=trainerSessions')
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )

    // const handleClickedInput = (event) => {
    //     return fetch(`http://localhost:8088/scheduledSessions`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(profile)                  
    //         })
    //             .then(response => response.json())           
    //             .then()
    //         }
   
   
    // todo button functionality

    return (
        <div className= "availableSessions">

        <h2> Available Sessions</h2>
        <>
            {sessions.map((session) =>{
                return(
                    <fieldset>
                        <div className="trainer" key={session.id}>  
                        <header>{session.name}</header>
                        {session.trainerSessions?.map((trainerSession) => {
                                return(
                                    <div className="trainer-Session">
                                        <label>
                                            <input type="radio" 
                                            required autoFocus
                                            value={trainerSession.id} 
                                            onChange={(event) => {
                                                const copy = {...userSelectedSession}
                                                copy.trainerSessionId =trainerSession.id
                                                copy.trainerId =trainerSession.trainerId
                                                copy.clientId = mogoUserObject.id
                                                setUserSelectedSession(copy)
                                            }}
                                            checked = {userSelectedSession.value === trainerSession.id}
                                            className="radio"/>
                                            {trainerSession.day} 
                                            {trainerSession.time} 
                                            
                                        </label>
                                        
                                    </div> 
                                )
                            }
                            )} 
                        </div>
                    </fieldset>
                )
            })

            }
        </>
    </div>  
     
    )
}

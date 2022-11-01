import { useEffect, useState } from "react"
import { TrainerCurrentSessionList } from "./TrainerCurrentSessionsList"


export const TrainerAvailabilityCreate = () => {

    const [sessions, setSessions]=useState ({})
    const [session, setSession]=useState ({
        dayOfWeek: "",
        time: ""
    })

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)
   

    
    /*
       "id": 4,
    "name": "Coach Dee",
    "userId": 4,
    "trainerSessions": [
      {
        "id": 13,
        "day": "Thursday",
        "time": "5:00AM",
        "trainerId": 4
      },
    */
    
    const handleAddSessionButtonClick = (event) => {
        event.preventDefault()

        const sessionToPutInApi ={
            /* 
            {
                "id": 1,
                "day": "Monday",
                "time": "3:00PM",
                "trainerId": 1
            },
            */
            day: session.dayOfWeek,
            time: session.time,
            trainerId: mogoUserObject.id
        }
   
            return fetch("http://localhost:8088/trainerSessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sessionToPutInApi)                  
            })
                .then(response => response.json())
                           
    }
    
    useEffect (
        ()=> {
            fetch(`http://localhost:8088/trainers?id=${mogoUserObject.id}&_embed=trainerSessions`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )

    return (
        <>
        <div className ="availability-page">
            <form className="sessionForm">
                <h2 className= "sessionForm_title">Add More Sessions</h2>
                <fieldset>
                    <div className= "form-group">
                        <label htmlFor="dayOfWeek">Day: </label>
                        <input
                            required autoFocus
                            type= "text"
                            className= "form-field"
                            placeholder="Ex: Monday"
                            value = {session.dayOfWeek}
                            onChange = {
                                (event) => {
                                    const copy ={...session}
                                    copy.dayOfWeek = event.target.value
                                    setSession(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className= "form-group">
                        <label htmlFor="time">Time: </label>
                        <input
                            required autoFocus
                            type= "text"
                            className= "form-field"
                            placeholder="Ex: 5:00PM"
                            value = {session.time}
                            onChange = {
                                (event) => {
                                    const copy ={...session}
                                    copy.time = event.target.value
                                    setSession(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleAddSessionButtonClick(clickEvent)} 
                    className="btn btn-primary">
                    Add Session
                </button>
            </form>       
        </div>
        <div>
            <TrainerCurrentSessionList   />
        </div>

        </>
    )
}
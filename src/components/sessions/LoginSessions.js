import { useEffect, useState } from "react";

export const LoginSessions =() => {

    const localMogoUser = localStorage.getItem("mogo_user")
    const mogoUserObject = JSON.parse(localMogoUser)


    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date()
    let day = weekday[d.getDay()]


    const [sessions, setSessions] = useState([])

    useEffect (
        ()=> {
            fetch(`http://localhost:8088/scheduledSessions?clientId=${mogoUserObject.id}&_expand=trainerSession&_expand=trainer`)
            .then(response => response.json())
            .then((sessionsArray) => {
                setSessions(sessionsArray)
            })
        }, []
    )
       
    //    if (day === "Monday") {
    //       sessions.filter(session => session.trainerSession?.day === Monday)
            
    //     }

        // else if (day === "Tuesday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Tuesday))
        // }
        // else if (day === "Wednesday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Wednesday))
        // }
        // else if (day === "Thursday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Thursday))
        // }
        // else if (day === "Friday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Friday))
        // }
        // else if (day === "Saturday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Saturday))
        // }
        // else (day === "Sunday") {
        //     return (sessions.filter(session => session.trainerSession?.day === Sunday))
        // }
    

}
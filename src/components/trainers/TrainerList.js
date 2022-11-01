
import { useEffect, useState } from "react"

export const TrainerList = () => {
    const [trainers, setTrainers] = useState([])
 
    
    useEffect (
        ()=> {
            fetch("http://localhost:8088/users?isTrainer=true")
            .then(response => response.json())
            .then((trainerArray) => {
                setTrainers(trainerArray)
            })
        }, []
    )

    return (
        
        <div className= "trainerList">
            <h2> List of trainers</h2>
                    <>
                        {trainers.map((trainer) => {
                          return (
                            <ul className="trainer" key={trainer.id}>
                            
                                <header>{trainer.fullName}</header>
                                <li>
                                    address: {trainer.address}
                                </li>
                                <li>
                                    Phone Number: {trainer.phoneNumber}
                                </li>
                                <li>
                                    Email: {trainer.email}
                                </li>
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}

import { useEffect, useState } from "react"

export const ClientList = () => {
    const [clients, setClients] = useState([])
 
    
    useEffect (
        ()=> {
            fetch("http://localhost:8088/users?isTrainer=false")
            .then(response => response.json())
            .then((clientArray) => {
                setClients(clientArray)
            })
        }, []
    )

    return (
        
        <div className= "ClientList">
            <h2> List of Clients</h2>
                    <>
                        {clients.map((client) => {
                          return (
                            <ul className="client" key={client.id}>
                            
                                <header>{client.fullName}</header>
                                <li>
                                    address: {client.address}
                                </li>
                                <li>
                                    Phone Number: {client.phoneNumber}
                                </li>
                                <li>
                                    Email: {client.email}
                                </li>
                                
                            </ul>
                            )     
                            })}
                      </>

            </div>      
    )
}
// Todo Create logic to stop clients from creating trainer accounts 

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [client, setClient] = useState({
        email: "",
        isTrainer: false,
        fullName: "",
        address: "",
        phoneNumber: ""

    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("mogo_user", JSON.stringify({
                        id: createdUser.id,
                        trainer: createdUser.isTrainer
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${client.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateClient = (evt) => {
        const copy = {...client}
        copy[evt.target.id] = evt.target.value
        setClient(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register with Mogo Gym</h1>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateClient}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateClient}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Home Address </label>
                    <input onChange={updateClient}
                        type="text" id="address" className="form-control"
                        placeholder="Enter your Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateClient}
                        type="text" id="phoneNumber" className="form-control"
                        placeholder="000-000-0000" required />
                </fieldset>

                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...client}
                        copy.isTrainer = evt.target.checked
                        setClient(copy)
                    }}
                        type="checkbox" id="isTrainer" />
                    <label htmlFor="email"> I am a Trainer </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}


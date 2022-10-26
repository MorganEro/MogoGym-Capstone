import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("mogo_user", JSON.stringify({
                        id: user.id,
                        trainer: user.isTrainer
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Mogo Gym</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email: </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="BobBob@Bob.com"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member of Mogo Gym yet? Please follow this link to get started!</Link>
            </section>
        </main>
    )
}


import React, {useState} from "react";
import {login} from "../features/loggedUserSlice";
import {useDispatch} from "react-redux";

const Register = () => {
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const handleRegister = (event) => {
        event.preventDefault()

        dispatch(login({
            email: email
        }))
    }

    return <div className="register">
        <form className="register-form" onSubmit={event => handleRegister(event)}>
            <h1>Register</h1>
            <input
                type={"email"}
                placeholder={"Name"}
                value={email}
                onChange={(i) => setEmail(i.target.value)}
            />
            <button type={"submit"} className={"register-submit"}>Register</button>
        </form>
    </div>;
};

export default Register;

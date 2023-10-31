import React, {useState} from "react";
import {login} from "../features/loggedUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../app/store";
import { selectUsers } from "../features/UsersSlice";

const LoginComponent = () => {
    const [email, setEmail] = useState("")
    const users = useSelector(selectUsers)

    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        let user = users.find(user => user.email === email)
        if(user!== undefined) {
            dispatch(login(user))
            return
        }
        console.log("User not found")
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="w-fit px-10 py-5 mx-auto rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={event => handleLogin(event)}>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(i) => setEmail(i.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign up now!
                    </a>
                </p>
                </div>
            </div>
        </div>
    )
};

export default LoginComponent;

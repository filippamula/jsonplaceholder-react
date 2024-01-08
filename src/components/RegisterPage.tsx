import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { registerUser } from "../features/UsersSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [emailTakenError, setEmailTakenError] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    function handleRegister(event: React.FormEvent) {
        event.preventDefault()
        try { dispatch(registerUser({ email, name, phoneNo })) }
        catch (e) {
            setEmailTakenError(true)
            return
        }
        navigate("/")
    };

    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-fit px-10 py-5 mx-auto rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={event => handleRegister(event)}>
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
                            <div className='text-red-700 leading-4 mt-1 text-right'>{emailTakenError && 'Email is already taken!'}</div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                onChange={(i) => setName(i.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-2">
                            <input
                                id="phoneNo"
                                name="phoneNo"
                                type="text"
                                autoComplete="phoneNo"
                                onChange={(i) => setPhoneNo(i.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
};

export default RegisterPage;

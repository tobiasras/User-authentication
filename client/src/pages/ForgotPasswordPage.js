import React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";

const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState("")

    const sendEmail = async (event) => {
        event.preventDefault()
        const promise = fetch(`http://localhost:8080/mail/username/${email}`)
        const response = await promise
        switch (response.status) {
            case 200:
                succesLogin("")
                break
            case 400:
                failLogin("Could not find email")
                break
        }
    }


    const succesLogin = () => {
        NotificationManager.success('Email sent', "", 5000)
    }
    const failLogin = (message) => {
        NotificationManager.warning(message, "", 5000);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div className="flex flex-col justify-center items-center bg-amber-100 h-screen">
            <div className="my-2">
                <h1 className="text-5xl font-bold text-yellow-950 my-2">FORGOT USERNAME</h1>
            </div>

            <a href="/"
               className=" ml-2 text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm   px-5 text-center ">
                GO TO LOGIN
            </a>

            <div className="mb-44 h-1/2 w-1/2 mt-10 bg-white">
                <form className="p-5" onSubmit={sendEmail}>
                    <div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={email} required type="email"
                                onChange={handleEmail}/>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-green-600  hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Send email
                            </button>
                        </div>
                    </div>


                </form>
            </div>
            <NotificationContainer/>
        </div>
    )
}

export default ForgotPasswordPage
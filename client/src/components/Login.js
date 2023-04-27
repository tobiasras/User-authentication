import React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";

const Login = (props) => {

    const [username, setUsername] = React.useState('tobiasras');
    const [password, setPassword] = React.useState('password');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async (event) => {
        event.preventDefault()


        const promise = fetch(`http://localhost:8080/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })

        setUsername("")
        setPassword("")

        const response = await promise

        // eslint-disable-next-line default-case
        switch (response.status){
            case 200:
                succesLogin(await response.json())
                break
            case 400:
                failLogin("Internal server error")
                break
            case 401:
                failLogin("Wrong password or username")
                break
            case 404:
                failLogin("Server not found")
                break
        }
    }

    const succesLogin = (body) => {
        NotificationManager.success('Logged in', "", 3000)
        localStorage.setItem("THE_OFFICE_TOKEN", body.accessToken)
        window.location.href = "http://localhost:3000/quotes"
    }
     const failLogin = (message) => {
         NotificationManager.warning(message, "", 3000);
     }

    return (
        <div>
            <form onSubmit={submitLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username" value={username} onChange={handleUsername}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="**********" value={password}
                        onChange={handlePassword}/>
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-600  hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>

                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       href="http://localhost:3000/forgot">
                        Forgot Username?
                    </a>
                </div>


                <NotificationContainer/>
            </form>
        </div>
    )

}

export default Login
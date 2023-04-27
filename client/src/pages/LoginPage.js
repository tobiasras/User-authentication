import Login from "../components/Login";
const loginPage = () => {

    return (
        <div className="flex flex-col justify-center items-center bg-amber-100 h-screen">
            <div className="mb-44">
                <div className="my-2">
                    <h1 className="text-5xl font-bold text-yellow-950 my-2">THE OFFICE QUOTES</h1>
                    <p>Log in to see, and create quotes</p>
                </div>

                <Login/>
            </div>

        </div>
    )
}

export default loginPage
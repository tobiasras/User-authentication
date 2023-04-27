const Button = (props) => {

    return (
        <button type="button" onClick={props.function}
                className="text-gray-500 bg-neutral-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-4/12 sm:w-auto px-5 py-2.5 text-center ">Submit
        </button>
    )

}

export default Button
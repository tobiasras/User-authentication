import {useEffect, useState} from "react";
import TheOfficeQuotes, {fetchEpisodes, fetchSeasons} from "../lib/TheOfficeQuotes";
import {BrowserRouter} from "react-router-dom";
import Button from "../elements/Button";
import theOfficeQuotes from "../lib/TheOfficeQuotes";


const ContentPage = () => {
    const checkToken = async (token) => {
        if (!token) {
            window.location.href = "http://localhost:3000/"
        }
        const promise = fetch("http://localhost:8080/authorize", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = await promise
        console.log(response)
        if (response.status !== 204) {
            window.location.href = "http://localhost:3000/"
        }
    }


    const logout = () => {
        localStorage.clear()
        window.location.href = "http://localhost:3000/"
    }



    useEffect(() => {
        const token = localStorage.getItem("THE_OFFICE_TOKEN")
        console.log(token)
        checkToken(token)
    }, [])


    const [episode, setEpisode] = useState("Not selected")
    const [season, setSeason] = useState("Not selected")
    const [allSeasons, setAllSeasons] = useState()
    const [allEpisodes, setAllEpisodes] = useState()
    const [isSeasonMenu, setIsSeasonMenu] = useState(true)

    useEffect(() => {
        if (episode && season) {
            if (isSeasonMenu) {
                setSeasons()
            } else {
                if (season !== 'Not selected'){
                    setEpisodes(season)
                }
            }
        }
    }, [isSeasonMenu])

    async function setSeasons() {
        const seasons = await fetchSeasons()
        if (seasons){
            setAllSeasons(() => [...seasons])
        }
    }

    async function setEpisodes(season) {

        const episodes = await fetchEpisodes(season)

        if (episodes && episodes.length > 0){
            setAllEpisodes(() => [...episodes])
        }
    }

    return (
        <div className="flex flex-col justify-center items-center bg-gray-400 h-screen">


            <div className="">
                <h1 className="text-5xl font-bold text-yellow-950 my-2">IT IS YOUR BIRTHDAY</h1>

            </div>

            <button type="button" onClick={logout}
                    className=" ml-2 text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm   px-5 text-center ">
                LOGOUT
            </button>


            <div className="w-1/2">
                <div className="p-5 ">
                    <p className="text-2xl font-bold text-yellow-950 my-2">SELECTED SEASON: <span>{season}</span></p>
                    <p className="text-2xl font-bold text-yellow-950 my-2">SELECTED EPISODE: <span>{episode}</span></p>
                </div>
            </div>

            <div className="bg-white w-1/2 h-2/3">
                <div className="w-full flex justify-between bg-gray-400">
                    <button type="button" onClick={() => setIsSeasonMenu(true)}
                            className="text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full text-sm   px-5 py-2.5 text-center ">
                        SEASONS
                    </button>
                    <button type="button" onClick={() => setIsSeasonMenu(false)}
                            className="ms-2 text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full text-sm px-5 py-2.5 text-center ">
                        EPISODES
                    </button>
                </div>

                <div className="p-5">
                    {isSeasonMenu ?
                        <div>
                            {allSeasons ?
                                allSeasons.map((season) => (
                                    <div className="flex justify-between mb-3">
                                        <div className="flex justify-between">
                                            <p className="mr-5">
                                                Seasons
                                            </p>

                                            <p key={season.id}>
                                                {season.season}
                                            </p>

                                        </div>


                                        <button type="button" onClick={() => setSeason(`${season.season}`)}
                                                className=" ml-2 text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm   px-5 text-center ">
                                           Select season
                                        </button>
                                    </div>))
                                :
                                <p>NONE SELECTED</p>
                            }
                        </div>
                        :
                        <div>
                            {allEpisodes && season ?
                                allEpisodes.map((episode) => (
                                    <div key={episode.episode_number} className="flex justify-between mb-3">
                                        <div className="flex justify-start">
                                            <p className="mr-5">
                                               Episode:
                                            </p>

                                            <p className="mr-5">
                                                {episode.episode_number}
                                            </p>

                                            <p>
                                                {episode.name}
                                            </p>
                                        </div>

                                        <button type="button" onClick={() => setEpisode(`${episode.episode_number}`)}
                                                className=" ml-2 text-white bg-amber-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm   px-5 text-center ">
                                            Select Episode
                                        </button>
                                    </div>))
                                :
                                <p>NONE SELECTED</p>
                            }
                        </div>
                    }
                </div>


            </div>


        </div>
    )
}

export default ContentPage
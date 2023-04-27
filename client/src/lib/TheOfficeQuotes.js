export async function fetchSeasons() {
    const promise = fetch("http://localhost:8080/seasons", {
        headers: {
            authorization: `Bearer ${localStorage.getItem("THE_OFFICE_TOKEN")}`
        }
    })


    const response = await promise
// eslint-disable-next-line default-case
    switch (response.status) {
        case 200:
            return await response.json()
        case 400:
            return 400
        case 401:
            return 401
        case 404:
            return 404
    }
}

export async function fetchEpisodes(season) {
    console.log(season)
    const promise = fetch(`http://localhost:8080/episodes/seasons/${season}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("THE_OFFICE_TOKEN")}`
        }
    })

    const response = await promise
    // eslint-disable-next-line default-case
    switch (response.status) {
        case 200:
            return await response.json()
        case 400:
            return 400
        case 401:
            return 401
        case 404:
            return 404
    }
}

export async function fetchQuotes(season, episode) {
    const promise = fetch(`http://localhost:8080/quotes/seasons/${season}/episodes/${episode}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("THE_OFFICE_TOKEN")}`
        }
    })

    const response = await promise
    // eslint-disable-next-line default-case
    switch (response.status) {
        case 200:
            return await response.json()
        case 400:
            return 400
        case 401:
            return 401
        case 404:
            return 404
    }
}

export default {
    fetchSeasons,
    fetchEpisodes,
    fetchQuotes
}



import axios from "axios";

const FetchHeadshot = async (first_name, last_name, cache) => {

    //CHECK IF THE ENV WORKS
    //Fetch request uses googles api for custom search, we enter the players name,
    //and we from the response take the players id 

    let SEARCH_ENGINE_APIKEY = import.meta.env.VITE_SEARCH_ENGINE_APIKEY
    let SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID

    const { data: { items } } = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${first_name}%${last_name}%20nba.com`, {
        params: {
            key: SEARCH_ENGINE_APIKEY,
            num: 1,
            cx: SEARCH_ENGINE_ID
        }
    })

    let link = items[0].link //https://www.nba.com/player/{PlayerID}/stephen-curry, this is the form of link we have inside "LINK"

    //Some links have a additional last char that is '/', and some arent, so in that case i added a if statement
    //that removes the additional char

    if (link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length - 1)

    const splitLink = link.split('/');
    const playerID = splitLink[splitLink.length - 2]


    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerID}.png`

}

export default FetchHeadshot;

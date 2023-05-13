import axios from "axios";

const FetchHeadshot = async (first_name, last_name) => {

    const SEARCH_ENGINE_APIKEY = "AIzaSyCGmSdMG11c8w-NQrbs4t5G87MGzrY47P8"
    const SEARCH_ENGINE_ID = "06076e97b62e2450f"

    //Fetch request uses googles api for custom search, we enter the players name,
    //and we from the response take the players id 

    const { data: { items } } = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${SEARCH_ENGINE_APIKEY}&cx=${SEARCH_ENGINE_ID}&q=${first_name}%${last_name}%20nba.com`)
    const link = items[0].link //https://www.nba.com/player/{PlayerID}/stephen-curry, this is the form of link we have inside "LINK"

    const splitLink = link.split('/');
    const playerID = splitLink[splitLink.length - 2]

    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerID}.png`

}

export default FetchHeadshot;

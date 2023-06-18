import axios from "axios";

const FetchHeadshot = async (first_name, last_name) => {


    //Fetch request uses googles api for custom search, we enter the players name,
    //and we from the response take the players id 

    const { data: { items } } = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${SEARCH_ENGINE_APIKEY}&cx=${SEARCH_ENGINE_ID}&q=${first_name}%${last_name}%20nba.com`)
    const link = items[0].link //https://www.nba.com/player/{PlayerID}/stephen-curry, this is the form of link we have inside "LINK"
    console.log(items)
    const splitLink = link.split('/');
    const playerID = splitLink[splitLink.length - 2]

    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerID}.png`

}

export default FetchHeadshot;

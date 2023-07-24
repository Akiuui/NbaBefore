import axios from "axios";

async function FetchLogo(team_abbr, cache) {

    try {
        if (cache.hasOwnProperty(team_abbr)) {
            return null
        }
        else {
            const { data: { urlS } } = await axios.get(`http://localhost:3001/get/${team_abbr}`)
            return urlS
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch logo from server");
    }

}

export default FetchLogo;

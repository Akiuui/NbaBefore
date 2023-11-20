import axios from "axios";
import FixGames from "./FixGames";

const FetchGames = async (date, page, first_fetch) => {

    let per_page
    if (screen.height <= 857) {
        per_page = 3
    }
    else if (screen.height <= 947) {
        per_page = 4
    }
    else if (screen.height <= 1240)
        per_page = 5

    if (screen.width >= 765)
        per_page = per_page * 2
    try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}&per_page=${per_page}&page=${page}`)

        const games = FixGames(response.data.data, date)

        if (first_fetch)
            return [response.data.meta.total_pages, games]
        else
            return games

    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch games from server");
    }

}
export default FetchGames
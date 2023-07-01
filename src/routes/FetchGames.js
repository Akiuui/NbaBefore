import axios from "axios";
import useScreenSize from '../hooks/useScreenSize'

const FetchGames = async (date, page) => {

    let per_page = useScreenSize()

    try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}&per_page=${per_page}&page=${page}`)
        return response.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch games from server");
    }

}
export default FetchGames
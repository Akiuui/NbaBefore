import axios from "axios";
import { useQuery } from "react-query";

const FetchGames = async (date) => {
    // try {
    //     const { data, isLoading, isError, error } = useQuery('games', async () => {
    //         const response = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
    //         return response
    //     })

    //     if (isError) {
    //         console.log("EROKEPORJAPJ", error.message)
    //     }

    // } catch (error) {
    //     console.log("U trycathcu:", error.message)
    // }

    try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
        return response.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch games from server");
    }
    // console.log(data)
}

export default FetchGames;
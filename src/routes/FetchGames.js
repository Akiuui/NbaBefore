import axios from "axios";


const FetchGames = async (date) => {

    /*    return useQuery({
            queryKey: ['games'],
            queryFn: async () => {
                const { data } = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
                return data
            }
        })
    }*/



    try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
        return response.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch games from server");
    }

    // console.log(data)
}
export default FetchGames
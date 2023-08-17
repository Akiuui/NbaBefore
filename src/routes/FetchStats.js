import axios from "axios";

const FetchStats = async (id) => {
    try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=${id}`)
        // console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch stats from server");
    }
}
export default FetchStats;
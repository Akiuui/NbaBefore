import axios from "axios";

const FetchStats = async (ids) => {
    try {
        const Stats = await Promise.all(
            ids.map(id => axios.get(`https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=${id}`))
        )

        return Stats;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch stats from server");
    }
}
export default FetchStats;
import FetchStats from "../routes/FetchStats";

const FormatStats = (stats) => {
    const statsArray = stats.map(({ data: { data } }) => { return data }) //Removes nesting from the Array

    const formattedStats = statsArray.map((e) => { //Goes through all elements and only retrieves important properties

        const player = e.map(({ id, player: { first_name, last_name }, pts, ast, reb, blk, stl, min, team: { full_name } }) => {
            return { id, name: `${first_name} ${last_name}`, pts, ast, reb, blk, stl, min, team_name: full_name }
        })
        return player
    })

    return formattedStats
}

const GetStats = async (ids) => {
    const stats = await FetchStats(ids); //Fetches an array of promises that resolve into "nba games"
    const formattedStats = FormatStats(stats, ids) //The "nba games" get formatted
    return formattedStats

}

export default GetStats;

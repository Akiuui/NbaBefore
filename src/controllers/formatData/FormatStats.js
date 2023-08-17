import FetchStats from "../../routes/FetchStats";
import SortStats from "../SortStats";

const FormatStats = (stats) => {

    let acc = stats[0].team.abbreviation
    let first_team = []
    let second_team = []

    stats.map(({ id, player: { first_name, last_name }, pts, ast, reb, blk, stl, min, team: { abbreviation }, turnover }) => {

        if (min === null) {
            pts = 0
            ast = 0
            reb = 0
            blk = 0
            stl = 0
            min = "0"
            turnover = 0
        }

        min = min.split(":")
        min = parseInt(min[0])

        if (abbreviation === acc)
            first_team.push({ id, first_name, last_name, pts, ast, reb, blk, stl, min, team_abbr: abbreviation, turnover })
        else
            second_team.push({ id, first_name, last_name, pts, ast, reb, blk, stl, min, team_abbr: abbreviation, turnover })

    })



    return [SortStats(first_team, "min", true), SortStats(second_team, "min", true)]
}

const GetStats = async (id) => {
    const stats = await FetchStats(id); //Fetches an array of promises that resolve into "nba games"

    const formattedStats = FormatStats(stats) //The "nba games" get formatted
    return formattedStats

}

export default GetStats;

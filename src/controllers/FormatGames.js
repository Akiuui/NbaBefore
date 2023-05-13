import { ConnectionStates } from "mongoose";
import FetchGames from "../routes/FetchGames";

const FormatGames = (games) => {

    const formattedTeams = games.map((e) => {
        const {
            id,
            home_team: { full_name: home_name },
            visitor_team: { full_name: visitor_name },
            home_team_score,
            visitor_team_score,
            home_team: { abbreviation: home_team_abbreviation },
            visitor_team: { abbreviation: visitor_team_abbreviation },
        } = e


        const home_won = home_team_score > visitor_team_score

        return {
            id, home_team: home_name, home_team_abbreviation, visitor_team: visitor_name, visitor_team_abbreviation, home_team_score, visitor_team_score, home_won,

        }
    });

    return formattedTeams;
}

const GetGames = async (date) => {
    try {
        const games = await FetchGames(date);
        // console.log(games)
        const formattedGames = FormatGames(games);
        // console.log("Ovo je niz koji koristimo", formattedGames)
        let games_ids = [];
        formattedGames.forEach(({ id }) => games_ids = [...games_ids, id])
        // console.log("Ovo je niz: ", games_ids)


        return [games_ids, formattedGames];
    } catch (error) {
        console.error(error.messages);
        throw new Error("Failed to fetch teams");
    }
}

export default GetGames;
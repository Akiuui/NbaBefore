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
            postseason,
        } = e

        const home_won = home_team_score > visitor_team_score

        return {
            id, home_team: home_name, home_team_abbreviation, visitor_team: visitor_name,
            visitor_team_abbreviation, home_team_score, visitor_team_score, home_won, postseason
        }
    });

    return formattedTeams;
}


const GetGames = async (date, page, first_fetch) => {
    try {

        let pages, games
        if (first_fetch)
            [pages, games] = await FetchGames(date, page, true);
        else {
            games = await FetchGames(date, page, false);
            pages = null
        }


        const formattedGames = FormatGames(games);

        let games_ids = [];
        formattedGames.forEach(({ id }) => games_ids = [...games_ids, id])

        return [games_ids, formattedGames, pages];
    } catch (error) {
        console.error(error.messages);
        // throw new Error("Failed to fetch teams");
    }
}

export default GetGames;
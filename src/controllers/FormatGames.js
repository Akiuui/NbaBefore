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



const GetGames = async (date, page) => {
    try {
        // let allFormattedGames

        // if (page == 1)
        //     allFormattedGames = []

        const games = await FetchGames(date, page);

        const formattedGames = FormatGames(games);

        // console.log("Formatirane: ", formattedGames)
        // console.log("AllFormatirane: ", allFormattedGames)


        // setAllFormatedGames([...allFormattedGames, ...formattedGames])

        // allFormattedGames = [...allFormattedGames, ...formattedGames]

        // console.log("All: ", allFormattedGames)

        let games_ids = [];
        formattedGames.forEach(({ id }) => games_ids = [...games_ids, id])

        return [games_ids, formattedGames];
    } catch (error) {
        console.error(error.messages);
        // throw new Error("Failed to fetch teams");
    }
}

export default GetGames;
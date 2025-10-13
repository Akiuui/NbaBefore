import axios from "axios";
import FixGames from "./FixGames";
import Game from "../models/Game"
import Team from "../models/Team"

const FetchGames = async (date, page, first_fetch) => {

   
    try {
        const response = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${per_page}&page=${page}`,{
            headers: {"Authorization":"2d796a2f-d206-4579-8aac-b0ccec19f01a"}
        })

        const games = FixGames(response.data.data, date)

        let dataArray = response.data.data

        console.log(dataArray)

        let AllGamesObject = []
        const year = date.split('-')[0]


        dataArray.map(e => {
            
            let obj = new Game({
                id: e.id,
                homeScore: e.home_team_score,
                visitorScore: e.visitor_team_score,
            })

            let home = new Team({id: e.home_team.id, name: e.home_team.full_name, abbr: e.home_team.abbreviation})
            let visitor = new Team({id: e.visitor_team.id, name: e.visitor_team.full_name, abbr: e.visitor_team.abbreviation})
            
            obj.setHomeTeam(home)
            obj.setVisitorTeam(visitor)
           
            obj.teams.home.fetchLogo(year)
            obj.teams.visitor.fetchLogo(year)


        })

        if (first_fetch)
            return [response.data.meta.total_pages, games]
        else
            return games

    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch games from server");
    }

}
export default FetchGames
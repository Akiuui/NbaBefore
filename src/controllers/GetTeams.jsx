import axios from "axios";

const GetTeams = async (date) => {
    //FETCH REQUEST

    const { data: { data } } = await axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
        .catch((error) => alert(error.message))

    //FORMATING
    const formattedTeams = data.map((e) => {

        const {
            home_team: { full_name: home_name },
            visitor_team: { full_name: visitor_name },
            home_team_score,
            visitor_team_score,
        } = e

        const winner = () => home_team_score > visitor_team_score

        return { home_team: home_name, visitor_team: visitor_name, home_team_score, visitor_team_score, home_won: winner() }
    });

    return formattedTeams;
}

export default GetTeams;
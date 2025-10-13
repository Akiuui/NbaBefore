class Game{

    constructor({id, homeScore, visitorScore}){
        this.id = id
        this.homeScore = homeScore
        this.visitorScore = visitorScore
        this.teams = {
            home: null,
            visitor: null
        }
    }

    setHomeTeam(team){
        this.teams.home = team
    }
    setVisitorTeam(team){
        this.teams.visitor = team
    }


}
export default Game
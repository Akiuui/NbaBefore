export default class Player{
    
    constructor(data){
        this.name = data.playerSlug
        this.teamAbbr = data.teamTricode
        this.stats = {
            minutes: data.minutes,
            points: data.points,
            steals: data.steals,
            turnover: data.turnovers,
            rebounds: data.reboundsTotal,
            blocks: data.blocks,
            assists: data.assists 
        }

    }
    
}
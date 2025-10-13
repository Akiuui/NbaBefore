import Player from "../models/Player.js"

export function statsToObjectFormatter(stats) {

    let homeStats = [new Player(stats[0])]
    let visitorStats = []

    for(let i = 1;i<stats.length;i++){

        let obj = new Player(stats[i]) 
        if(homeStats[0].teamAbbr == obj.teamAbbr)
            homeStats.push(obj)
        else
            visitorStats.push(obj)

    }

    return [homeStats, visitorStats]
}

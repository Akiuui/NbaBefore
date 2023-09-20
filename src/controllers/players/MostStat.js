const MostStat = (stats, typeOfStat) => { //TypeOfStat = pts, ast, reb, stl, blk, turnover, min

    let max = stats[0][typeOfStat]
    let player = stats[0]

    for (let i = 1; i < stats.length; i++) {
        if (stats[i][typeOfStat] > max) {
            max = stats[i][typeOfStat]
            player = stats[i]
        }
    }

    return player
}

export default MostStat
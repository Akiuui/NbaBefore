const MostStat = (stats, typeOfStat) => { //TypeOfStat = pts, ast, reb, stl, blk, turnover, min

    return stats.map(game => {

        let max = game[0][typeOfStat]
        let player = game[0]

        for (let i = 1; i < game.length; i++) {
            if (game[i][typeOfStat] > max) {
                max = game[i][typeOfStat]
                player = game[i]
            }
        }

        return player

    })

}

export default MostStat
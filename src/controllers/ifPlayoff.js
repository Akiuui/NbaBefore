
function ifPlayoff(games) {

    if (games[0].postseason)
        return true
    else
        return false
}

export default ifPlayoff;

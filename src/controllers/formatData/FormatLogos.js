import FetchLogo from "../../routes/FetchLogo"
import useHasNullValueObj from "../../hooks/useHasNullValueObj"
import useDeleteNullFromObj from "../../hooks/useDeleteNullFromObj";

async function FormatLogos(formattedGames, cache) {

    //Fetches the logos
    let logos = await Promise.all([
        ...formattedGames.map((game) => FetchLogo(game.home_team_abbreviation, cache)),
        ...formattedGames.map((game) => FetchLogo(game.visitor_team_abbreviation, cache))
    ]);

    //Formatting the logos
    let obj = {}
    let i = 0
    let j = logos.length / 2
    formattedGames.forEach(game => {
        obj[game.home_team_abbreviation] = logos[i]
        obj[game.visitor_team_abbreviation] = logos[j]
        i++
        j++
    })
    //Checks if any element inside the object has a null value, if it does it removes it.
    //If a value has a null value it means that we already fetched it 
    if (useHasNullValueObj(obj))
        useDeleteNullFromObj(obj)

    return obj
}

export default FormatLogos;

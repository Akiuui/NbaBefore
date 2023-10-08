const FixGames = (games, date) => {


    let year = Number(date.split('-')[0])

    games.forEach(game => {
        let teamName = game.home_team.full_name
        let abbr = game.home_team.abbreviation

        if (year >= 1995 && year <= 2008 && teamName === "Oklahoma City Thunder") {
            teamName = "Seattle Sonics"
            abbr = "SEA"
        }
        if (year >= 1971 && year <= 1995 && teamName === "Oklahoma City Thunder") {
            teamName = "Seattle SuperSonics"
            abbr = "SEA"
        }
        if (year >= 1977 && year <= 2012 && teamName === "Brooklyn Nets") {
            teamName = "New Jersey Nets"
            abbr = "NJN"
        }
        if (year >= 1970 && year <= 1978 && teamName === "LA Clippers") {
            teamName = "Buffalo Braves"
            abbr = "BUF"
        }
        if (year >= 1979 && year <= 1984 && teamName === "LA Clippers") {
            console.log("Uslo je")
            teamName = "San Diego Clippers"
            abbr = "SAD"
        }
        if (year >= 1957 && year <= 1972 && teamName === "Sacramento Kings") {
            teamName = "Cincinnati Royals"
            abbr = "CIN"
        }
        if (year >= 1973 && year <= 1975 && teamName === "Sacramento Kings") {
            teamName = "Kansas City Omaha Kings"
            abbr = "KAO"
        }
        if (year >= 1976 && year <= 1985 && teamName === "Sacramento Kings") {
            teamName = "Kansas City Kings"
            abbr = "KAN"
        }
        if (year >= 1995 && year <= 2001 && teamName === "Memphis Grizzlies") {
            teamName = "Vancouver Grizzlies"
            abbr = "VAN"
        }

        if (year >= 1969 && year <= 1971 && teamName === "Golden State Warriors") {
            teamName = "San Francisco Warriors"
            abbr = "SAF"
        }

        game.home_team.full_name = teamName
        game.home_team.abbreviation = abbr

    })

    games.forEach(game => {
        let teamName = game.visitor_team.full_name
        let abbr = game.visitor_team.abbreviation

        if (year >= 1967 && year <= 2009 && teamName === "Oklahoma City Thunder") {
            teamName = "Seattle Sonics"
            abbr = "SEA"
        }
        if (year >= 1977 && year <= 2012 && teamName === "Brooklyn Nets") {
            teamName = "New Jersey Nets"
            abbr = "NJN"
        }
        if (year >= 1970 && year <= 1978 && teamName === "LA Clippers") {
            teamName = "Buffalo Braves"
            abbr = "BUF"
        }
        if (year >= 1957 && year <= 1972 && teamName === "Sacramento Kings") {
            teamName = "Cincinnati Royals"
            abbr = "CIN"
        }
        if (year >= 1995 && year <= 2001 && teamName === "Memphis Grizzlies") {
            teamName = "Vancouver Grizzlies"
            abbr = "VAN"
        }

        game.visitor_team.full_name = teamName
        game.visitor_team.abbreviation = abbr

    })

    console.log(games)


    return games

};

export default FixGames;

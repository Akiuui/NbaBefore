function TeamsColor(team_abbr) {
    let nba_color
    switch (team_abbr) {
        case "ATL":
            nba_color = "E03A3E";
            break;
        case "BOS":
            nba_color = "008348";
            break;
        case "BKN":
            nba_color = "000000";
            break;
        case "CHA":
            nba_color = "00788C";
            break;
        case "CHI":
            nba_color = "CE1141";
            break;
        case "CLE":
            nba_color = "6F263D";
            break;
        case "DAL":
            nba_color = "6F263D";
            break;
        case "DEN":
            nba_color = "0E2240";
            break;
        case "DET":
            nba_color = "1D428A";
            break;
        case "GSW":
            nba_color = "006BB6";
            break;
        case "HOU":
            nba_color = "000000";
            break;
        case "IND":
            nba_color = "002D62";
            break;
        case "LAC":
            nba_color = "C8102E";
            break;
        case "LAL":
            nba_color = "FDB927";
            break;
        case "MEM":
            nba_color = "5D76A9";
            break;
        case "MIA":
            nba_color = "000000";
            break;
        case "MIL":
            nba_color = "00471B";
            break;
        case "MIN":
            nba_color = "0C2340";
            break;
        case "NOP":
            nba_color = "002B5C";
            break;
        case "NYK":
            nba_color = "006BB6";
            break;
        case "OKC":
            nba_color = "007AC1";
            break;
        case "ORL":
            nba_color = "0077C0";
            break;
        case "PHI":
            nba_color = "002B5C";
            break;
        case "PHX":
            nba_color = "E55F1F";
            break;
        case "POR":
            nba_color = "E03A3E";
            break;
        case "SAC":
            nba_color = "5A2B81";
            break;
        case "SAS":
            nba_color = "000000";
            break;
        case "TOR":
            nba_color = "CE1141";
            break;
        case "UTA":
            nba_color = "002B5C";
            break;
        case "WAS":
            nba_color = "C4CDD3";
            break;
    }
    return `#${nba_color}`
}

export default TeamsColor;
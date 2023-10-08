
function useNumberToMonth(number) {
    let name
    switch (number) {
        case "01":
            name = "JAN"
            break;
        case "02":
            name = "FEB"
            break;
        case "03":
            name = "MAR"
            break;
        case "04":
            name = "APR"
            break;
        case "05":
            name = "MAY"
            break;
        case "06":
            name = "JUN"
            break;
        case "07":
            name = "JUL"
            break;
        case "08":
            name = "AUG"
            break;
        case "09":
            name = "SEP"
            break;
        case "10":
            name = "OCT"
            break;
        case "11":
            name = "NOV"
            break;
        case "12":
            name = "DEC"
            break;
    }

    return name
}

export default useNumberToMonth;

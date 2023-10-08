const useMonthToNumber = (month) => {

    let number
    switch (month) {
        case "JAN":
            number = "01"
            break;
        case "FEB":
            number = "02"
            break;
        case "MAR":
            number = "03"
            break;
        case "APR":
            number = "04"
            break;
        case "MAY":
            number = "05"
            break;
        case "JUN":
            number = "06"
            break;
        case "JUL":
            number = "07"
            break;
        case "AUG":
            number = "08"
            break;
        case "SEP":
            number = "09"
            break;
        case "OCT":
            number = "10"
            break;
        case "NOV":
            number = "11"
            break;
        case "DEC":
            number = "12"
            break;
    }

    return number
}

export default useMonthToNumber;

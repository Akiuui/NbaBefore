
function FormatDate() { //Move can be 1 or -1; That decides if we will increment or decrement 

    const currentDate = new Date();

    let month = currentDate.getMonth() + 1 //getMonth returns from zero-based index, so we add plus 1
    month < 10 ? month = `0${month}` : null

    let day = currentDate.getDate()
    day < 10 ? day = `0${day}` : null

    return `${currentDate.getFullYear() - 10}-${month}-${day}`

}

export default FormatDate;
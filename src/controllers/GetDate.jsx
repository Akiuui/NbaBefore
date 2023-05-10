
function GetDate() {

    const currentDate = new Date();

    let month = currentDate.getMonth() + 1 //getMonth returns from zero-based index, so we add plus 1
    month < 10 ? month = `0${month}` : null

    let day = currentDate.getDate()
    day < 10 ? day = `0${day}` : null

    return `${currentDate.getFullYear() - 10}-${month}-${day}`

}

export default GetDate;

function useDate(date, move) { //the date arg should be in form of yyyy-mm-dd; move can be 1 or -1, decides if to inc/decrement
    let [yr, mnt, dy] = date.split('-')

    yr = parseInt(yr)
    mnt = parseInt(mnt)
    dy = parseInt(dy)

    if (move == -1) { //Decrement

        if (dy != 1)
            dy--

        else {
            if (mnt == 1) { //Checks if we should change the year
                mnt = 12
                yr--

            } else mnt++

            if (mnt == 4 || mnt == 6 || mnt == 9 || mnt == 11) //Checks if we should put days to 30 or 31
                dy = 30

            else if (mnt == 2) {
                if (yr % 4 == 0) //Checks if the year is leap
                    dy = 29
                else
                    dy = 28
            } else
                dy = 31
        }
    }
    if (move == 1) {

        if (mnt == 12 && dy == 31) {
            yr++
            mnt = 1
            dy = 1
        }
        else if ((mnt == 4 || mnt == 6 || mnt == 9 || mnt == 11) && dy == 30) {
            dy = 1
            mnt++
        }
        else if ((mnt == 1 || mnt == 3 || mnt == 5 || mnt == 7 || mnt == 8 || mnt == 10) && dy == 31) {
            dy = 1
            mnt++
        }
        else if (mnt == 2 && dy == 29) {
            dy = 1
            mnt++
        }
        else if (mnt == 2 && dy == 28) {
            if (yr % 4 == 0) //Checks if the year is leap
                dy++
            else {
                dy = 1
                mnt++
            }
        }
        else dy++
    }

    mnt < 10 ? mnt = `0${mnt}` : null
    dy < 10 ? dy = `0${dy}` : null

    return `${yr}-${mnt}-${dy}`


}

export default useDate;

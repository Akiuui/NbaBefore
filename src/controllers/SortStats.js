function SortStats(stats, typeOfStat, isFalling) { //If isFalling is true we will sort the elements falling?
    let sortedStats = [...stats]

    const n = stats.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            if (isFalling) {
                if (sortedStats[j][typeOfStat] < sortedStats[j + 1][typeOfStat]) {

                    const temp = sortedStats[j];
                    sortedStats[j] = sortedStats[j + 1];
                    sortedStats[j + 1] = temp;
                }
            } else {
                if (sortedStats[j][typeOfStat] > sortedStats[j + 1][typeOfStat]) {

                    const temp = sortedStats[j];
                    sortedStats[j] = sortedStats[j + 1];
                    sortedStats[j + 1] = temp;
                }
            }

        }
    }

    return sortedStats
}

export default SortStats;

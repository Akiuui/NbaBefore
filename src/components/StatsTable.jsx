import sortStats from "../controllers/sortStats"

const StatsTable = ({ displayedStats, setDisplayedStats }) => {

    function HandleSortedStats(stats, typeOfStat, isFalling) {

        const sortedStats = sortStats(stats, typeOfStat, isFalling)

        setDisplayedStats(sortedStats)

    }

    return <>
        <ul className="grid border overflow-auto">
            <li className="sticky top-0 bg-white grid border boxshadow statsgrid">
                <span className="grid_header px-2">name</span>
                <span onClick={() => HandleSortedStats(displayedStats, "points", true)} className="grid_header">pts</span>
                <span onClick={() => HandleSortedStats(displayedStats, "rebounds", true)} className="grid_header">reb</span>
                <span onClick={() => HandleSortedStats(displayedStats, "steals", true)} className="grid_header">stl</span>
                <span onClick={() => HandleSortedStats(displayedStats, "assists", true)} className="grid_header">ast</span>
                <span onClick={() => HandleSortedStats(displayedStats, "blocks", true)} className="grid_header">blk</span>
                <span onClick={() => HandleSortedStats(displayedStats, "turnovers", true)} className="grid_header">tov</span>
                <span onClick={() => HandleSortedStats(displayedStats, "minutes", true)} className="grid_header">min</span>
            </li>

            {
                displayedStats ? (
                    displayedStats.map((player, index) => {
                        return <li key={index} className="grid statsgrid border hover:bg-gray-200"
                            style={index % 2 == 1 ? { backgroundColor: "rgb(239, 242, 245)" } : null}
                        >

                            <span className="px-2 border-r-2">{player.name}</span>
                            <span className="grid_item">{player.stats.points}</span>
                            <span className="grid_item">{player.stats.rebounds}</span>
                            <span className="grid_item">{player.stats.steals}</span>
                            <span className="grid_item">{player.stats.assists}</span>
                            <span className="grid_item">{player.stats.blocks}</span>
                            <span className="grid_item">{player.stats.turnover}</span>
                            <span className="flex justify-center items-center">{player.stats.minutes == "" ? "0:00" : player.stats.minutes}</span>

                        </li>
                    })
                )
                    :

                    <div className="placeholder">
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </div>

            }
        </ul>
    </>
};

export default StatsTable
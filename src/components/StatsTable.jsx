import SortStats from "../controllers/SortStats";

const StatsTable = ({ displayedStats, setDisplayedStats }) => {

    function HandleSortedStats(stats, typeOfStat, isFalling) {

        const sortedStats = SortStats(stats, typeOfStat, isFalling)

        setDisplayedStats(sortedStats)

    }

    return <>
        <ul className="grid border overflow-auto">
            <li className="sticky top-0 bg-white grid border boxshadow statsgrid">
                <span className="grid_header px-2">name</span>
                <span onClick={() => HandleSortedStats(displayedStats, "pts", true)} className="grid_header">pts</span>
                <span onClick={() => HandleSortedStats(displayedStats, "reb", true)} className="grid_header">reb</span>
                <span onClick={() => HandleSortedStats(displayedStats, "stl", true)} className="grid_header">stl</span>
                <span onClick={() => HandleSortedStats(displayedStats, "ast", true)} className="grid_header">ast</span>
                <span onClick={() => HandleSortedStats(displayedStats, "blk", true)} className="grid_header">blk</span>
                <span onClick={() => HandleSortedStats(displayedStats, "turnover", true)} className="grid_header">tov</span>
                <span onClick={() => HandleSortedStats(displayedStats, "min", true)} className="grid_header">min</span>
            </li>

            {
                displayedStats ? (
                    displayedStats.map((player, index) => {
                        return <li key={index} className="grid statsgrid border hover:bg-gray-200"
                            style={index % 2 == 1 ? { backgroundColor: "rgb(239, 242, 245)" } : null}
                        >

                            <span className="px-2 border-r-2">{player.first_name} {player.last_name}</span>
                            <span className="grid_item">{player.pts}</span>
                            <span className="grid_item">{player.reb}</span>
                            <span className="grid_item">{player.stl}</span>
                            <span className="grid_item">{player.ast}</span>
                            <span className="grid_item">{player.blk}</span>
                            <span className="grid_item">{player.turnover}</span>
                            <span className="flex justify-center items-center">{player.min}</span>

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
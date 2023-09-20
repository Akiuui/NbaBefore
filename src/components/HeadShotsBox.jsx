import { useEffect, useState } from "react";
import MostStat from "../controllers/players/MostStat"
import FetchHeadshot from "../routes/FetchHeadshot";
// import headshot_placeholder from "../../public/images/headshot_placeholder"

const HeadShotsBox = ({ stats }) => {

    const [players, setPlayers] = useState([])
    const [error, setError] = useState()

    const [playersImages, setPlayersImages] = useState({})

    const wantedStats = ["pts", "ast"]
    // , "reb", "blk" 

    useEffect(() => {//Here we get top perfoming players when we get stats state

        async function GetTopPerformingPlayers() {

            const topPerformingPlayers = wantedStats.map(stat => {
                return MostStat(stats, stat)
            })

            setPlayers(topPerformingPlayers)
        }

        GetTopPerformingPlayers()

    }, [stats]);

    function FullNameOfStat(stat) {
        if (stat === "pts")
            stat = "points"
        if (stat === "ast")
            stat = "assists"
        if (stat === "reb")
            stat = "rebounds"
        if (stat === "blk")
            stat = "blocks"

        return stat
    }

    function PlayerInfo({ player, index, playersImages, setPlayersImages }) {

        const [imageURL, setImageURL] = useState('');
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {

            async function fetchImage() {
                try {
                    const imageUrl = await FetchHeadshot(player.first_name, player.last_name)

                    setImageURL(imageUrl);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error)
                    if (error.response.status === 429) {
                        console.log("We reached todays api limit")
                        setError(`${error.response.status}`)
                    }
                }
            }

            fetchImage();
        }, [player]);

        // useEffect(() => {
        //     if (imageURL) {
        //         setPlayersImages(prevPlayersImages => ({
        //             ...prevPlayersImages,
        //             [`${player.first_name}_${player.last_name}`]: imageURL
        //         }));
        //     }
        // }, [imageURL, player]);

        return <li className="flex flex-col justify-center items-center border border-gray-300 rounded-xl bg-gray-100 hover:bg-gray-200">
            <h2>Stat leader in {FullNameOfStat(wantedStats[index])}</h2>
            <p className="font-bold pb-2">{`${player.first_name} ${player.last_name}`}</p>

            {isLoading ? (
                <img className="w-[200px] h-[150px]" src="/images/headshot_placeholder.png" />
            ) : (
                <img className="w-[200px] h-[150px]" src={imageURL} />
            )}

        </li>
    }

    return <ul className="py-2  overflow-auto flex flex-col items-center border-y-2">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 ">
            {
                players.map((player, index) => {
                    return < PlayerInfo key={index} index={index} player={player} playersImages={playersImages} setPlayersImages={setPlayersImages} />
                })
            }
        </div>
        {
            error === "429" ?
                <p className="pt-4 text-xl">Sorry, but we reached our image apis limit 😔 </p> :
                <p className="pt-4 text-xl font-semibold">Yay, our image api still works!! 😁 </p>
        }

    </ul>;
};

export default HeadShotsBox;

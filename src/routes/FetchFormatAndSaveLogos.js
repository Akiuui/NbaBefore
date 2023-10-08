import axios from "axios";

const FetchFormatAndSaveLogos = async (arrayOfTeams, year, setLogos) => {
    try {


        const namesOfTeams = arrayOfTeams.map(game => [game.home_team, game.visitor_team]).flat() //Get only the names from the object

        const response = await axios.get(`http://localhost:3000/nbalogos?teamName=${namesOfTeams}&teamYear=${year}`)

        let data = response.data

        //Formating data from the server
        const formattedLogos = data.map((obj, index) => ({
            [namesOfTeams[index]]: `data:image/png;base64,${obj.Base64String}`
        }
        ))

        const combinedLogos = Object.assign({}, ...formattedLogos);

        setLogos(prevLogos => ({ ...prevLogos, ...combinedLogos }))


    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch logos from server");
    }

};

export default FetchFormatAndSaveLogos;

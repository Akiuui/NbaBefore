import TeamsColor from "../controllers/TeamsColor"
import placeholderLogo from "../../public/images/logo"
import axios from "axios"

class Team{

    constructor({id, name, abbr}){
        this.id = id
        this.name = name
        this.abbr = abbr
        this.logo = placeholderLogo
        this.color = TeamsColor(abbr);
    }

    async fetchLogo(year){

        try{
            const res = await axios.get(`http://localhost:3000/nbalogos?teamName=${this.name}&teamYear=${year}`)
            this.logo = res.data[0].Base64String
            console.log(res.data[0].teamName)
        }catch(error){

            console.error("Error fetching logo:", error);

        }


    }

}
export default Team
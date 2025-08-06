import axios from "axios";

const RaceService = (()=>{

    const raceController = "http://localhost:5039/api/races";

    const getAllRaces = async () => {
        try{
            const result = await axios.get(raceController);
            return result.data;
        }
        catch(err){
            console.log("Not connected to Racer API");
            return [];
        }
    }

    const getRaceById = async (id) => {
        try {
            const result = await axios.get(`${raceController}/${id}`);
            return result.data;
        } catch (error) {
            console.error(`Error fetching race with id ${id}:`, error);
        }
    };

    const putRace = async (raceToUpdate) => {
        try{
            const result = await axios.put(raceController, raceToUpdate);
            console.log(result);
        }
        catch(err){
            console.log("Not connected to Race API");
        }
    }

    const postRace = async (newRace) => {
        try {
            const result = await axios.post(raceController, newRace);
    
            console.log("Race created successfully:", result.data);
    
            return result.data;
        } catch (error) {
            console.error("Error creating race:", error);
        }
    };

    const deleteRace = async (id) => {
        try {
            const result = await axios.delete(`${raceController}/${id}`);
            console.log(result);
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }


    return {
        getAllRaces,
        postRace,
        putRace,
        getRaceById,
        deleteRace
    }

})();

export default RaceService;
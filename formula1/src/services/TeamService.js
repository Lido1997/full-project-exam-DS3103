import axios from "axios";

const TeamService = (()=>{

    const teamController = "http://localhost:5039/api/teams";
    const imageUploadController = "http://localhost:5039/api/imageupload";
    const imageUrl = "http://localhost:5039/images";


    const getAllTeams = async () => {
        try{
            const result = await axios.get(teamController);
            return result.data;
        }
        catch(err){
            console.log("Not connected to Team API");
            return [];
        }
    }

    const getTeamById = async (id) => {
        try {
            const result = await axios.get(`${teamController}/${id}`);
            return result.data;
        } catch (error) {
            console.error(`Error fetching team with id ${id}:`, error);
        }
    };

    const putTeam = async (teamToUpdate) => {
        try{
            const result = await axios.put(teamController, teamToUpdate);
            console.log(result);
        }
        catch(err){
            console.log("Not connected to Team API");
        }
    }

    const postTeam = async (newTeam, image) => {
        try {
            const formData = new FormData();
            formData.append("formFile", image);
    
            const result = await axios.post(teamController, newTeam);
    
            const resultImageUpload = await axios({
                url: imageUploadController,
                method: "POST",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            formData.delete("file");
    
            console.log("Team post result:", result);
            console.log("Image upload result:", resultImageUpload);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const deleteTeam = async (id) => {
        try {
            const result = await axios.delete(`${teamController}/${id}`);
            console.log(result);
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }

    const getImageUrl = () => {
        try {
            return imageUrl;
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return {
        getAllTeams,
        postTeam,
        putTeam,
        getTeamById,
        getImageUrl,
        deleteTeam
    }

})();

export default TeamService;
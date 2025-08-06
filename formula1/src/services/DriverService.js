import axios from "axios";

const DriverService = (()=>{

    const driverController = "http://localhost:5039/api/drivers";
    const imageUploadController = "http://localhost:5039/api/imageupload";
    const imageUrl = "http://localhost:5039/images";


    const getAllDrivers = async () => {
        try{
            const result = await axios.get(driverController);
            return result.data;
        }
        catch(err){
            console.log("Not connected to Driver API");
            return [];
        }
    }

    const getDriverById = async (id) => {
        try {
            const result = await axios.get(`${driverController}/${id}`);
            return result.data;
        } catch (error) {
            console.error(`Error fetching driver with id ${id}:`, error);
        }
    };

    const putDriver = async (driverToUpdate) => {
        try{
            const result = await axios.put(driverController, driverToUpdate);
            console.log(result);
        }
        catch(err){
            console.log("Not connected to Driver API");
        }
    }

    const postDriver = async (newDriver, image) => {
        try {
            const formData = new FormData();
            formData.append("formFile", image);
    
            const result = await axios.post(driverController, newDriver);
    
            const resultImageUpload = await axios({
                url: imageUploadController,
                method: "POST",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            formData.delete("file");
    
            console.log("Driver post result:", result);
            console.log("Image upload result:", resultImageUpload);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const deleteDriver = async (id) => {
        try {
            const result = await axios.delete(`${driverController}/${id}`);
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
        getAllDrivers,
        postDriver,
        putDriver,
        getDriverById,
        getImageUrl,
        deleteDriver
    }

})();

export default DriverService;
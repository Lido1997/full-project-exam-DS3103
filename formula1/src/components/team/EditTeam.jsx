import { useContext, useState } from 'react';
import { TeamContext } from '../../contexts/TeamContext'; 

const EditTeam = () => {
    const { getTeamById, editTeam } = useContext(TeamContext);

    const [id, setId] = useState("");
    const [teamToUpdate, setTeamToUpdate] = useState({
        manufacturer: "",
        driver1: "",
        driver2: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successMessage2, setSuccessMessage2] = useState("");

    const handleChange = (e) => {
        switch (e.currentTarget.name) {
            case "id":
                setId(e.currentTarget.value);
            break;
            case "manufacturer":
                setTeamToUpdate({ ...teamToUpdate, manufacturer: e.currentTarget.value });
            break;
            case "driver1":
                setTeamToUpdate({ ...teamToUpdate, driver1: e.currentTarget.value });
            break;
            case "driver2":
                setTeamToUpdate({ ...teamToUpdate, driver2: e.currentTarget.value });
            break;
        }
    }
   
    const getByIdFromContext = async () => {
        try {
            if (!id) {
                setErrorMessage("Please enter a valid ID.");
                return;
            }
    
            const teamFromContext = await getTeamById(id);
            if (teamFromContext) {
                setTeamToUpdate(teamFromContext);
                setSuccessMessage(`Team with ID ${id} found!`);
                console.log(teamFromContext);
            } else {
                setErrorMessage("Team not found. Please enter a valid ID.");
                console.log("Team not found. Please enter a valid ID.");
            }
        } catch (error) {
            console.error("Error getting team by id:", error);
            setErrorMessage("Invalid ID. Please try another ID.");
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    }
    

    const saveChanges = () => {
        try {
            if (!teamToUpdate.manufacturer || !teamToUpdate.driver1 || !teamToUpdate.driver2 || !id) {
                setErrorMessage2("Fill in all fields to save changes.");
                return;
            }
    
            const success = editTeam(teamToUpdate);
    
            if (success) {
                setSuccessMessage2(`Team with ID ${id} updated successfully!`);
            } else {
                setErrorMessage(`Error saving changes to team with ID ${id}. Please try again.`);
            }
        } catch (error) {
            console.error("Error saving changes to team:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setErrorMessage2("");
                setSuccessMessage2("");
            }, 4000);
        }
    }

    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Edit team information:</h2>
            
            <div className='form-group'>
                <label><strong>Enter ID of team:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='id' 
                    value={id} 
                    type="number" 
                    placeholder='Enter ID here' 
                    className="form-control mt-1" 
                />
            </div>
            <div className='form-group mt-1'>
                <button 
                    onClick={getByIdFromContext} 
                    type="button" 
                    className="btn btn-primary mb-2">Get team by ID
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
            <div className="form-group mt-3">
                <label><strong>Manufacturer:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='manufacturer' 
                    value={teamToUpdate.manufacturer} 
                    type="text" 
                    placeholder='Enter ID to display manufacturer' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>Driver1:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='driver1' 
                    value={teamToUpdate.driver1} 
                    type="text" 
                    placeholder='Enter ID to display driver1' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>Driver2:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='driver2' 
                    value={teamToUpdate.driver2} 
                    type="text" 
                    placeholder='Enter ID to display driver2' 
                    className="form-control mt-1" 
                />
            </div>
            
            <div className="form-group mt-3">
                <button 
                    onClick={saveChanges} 
                    type="button" 
                    className="btn btn-success mb-2">Save changes
                </button>
                {successMessage2 && <div style={{color: 'green'}}>{successMessage2}</div>}
                {errorMessage2 && <div style={{color: 'red'}}> {errorMessage2}</div>}
            </div>
        </section>
    );
}

export default EditTeam;


import { useContext, useState } from 'react';
import { RaceContext } from '../../contexts/RaceContext'; 

const EditRace = () => {
    const { getRaceById, editRace } = useContext(RaceContext);

    const [id, setId] = useState("");
    const [raceToUpdate, setRaceToUpdate] = useState({
        winnerName: "",
        winnerTime: "",
        grandPrix: "",
        numberOfLaps: ""
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
            case "winnerName":
                setRaceToUpdate({ ...raceToUpdate, winnerName: e.currentTarget.value });
            break;
            case "winnerTime":
                setRaceToUpdate({ ...raceToUpdate, winnerTime: e.currentTarget.value });
            break;
            case "grandPrix":
                setRaceToUpdate({ ...raceToUpdate, grandPrix: e.currentTarget.value });
            break;
            case "numberOfLaps":
                setRaceToUpdate({ ...raceToUpdate, numberOfLaps: e.currentTarget.value });
            break;
        }
    }
   
    const getByIdFromContext = async () => {
        try {
            if (!id) {
                setErrorMessage("Please enter a valid ID.");
                return;
            }
    
            const raceFromContext = await getRaceById(id);
            if (raceFromContext) {
                setRaceToUpdate(raceFromContext);
                setSuccessMessage(`Race with ID ${id} found!`);
                console.log(raceFromContext);
            } else {
                setErrorMessage("Race not found. Please enter a valid ID.");
                console.log("Race not found. Please enter a valid ID.");
            }
        } catch (error) {
            console.error("Error getting race by id:", error);
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
            if (!raceToUpdate.winnerName || !raceToUpdate.winnerTime || !raceToUpdate.grandPrix || !raceToUpdate.numberOfLaps || !id) {
                setErrorMessage2("Fill in all fields to save changes.");
                return;
            }
    
            const success = editRace(raceToUpdate);
    
            if (success) {
                setSuccessMessage2(`Race with ID ${id} updated successfully!`);
            } else {
                setErrorMessage(`Error saving changes to race with ID ${id}. Please try again.`);
            }
        } catch (error) {
            console.error("Error saving changes to race:", error);
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
            <h2 className='mt-2 text-danger'>Edit race information:</h2>
            
            <div className='form-group'>
                <label><strong>Enter ID of race:</strong></label>
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
                    className="btn btn-primary mb-2">Get race by ID
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
            <div className="form-group mt-3">
                <label><strong>Winner name:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='winnerName' 
                    value={raceToUpdate.winnerName} 
                    type="text" 
                    placeholder='Enter ID to display winner name' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>Winner time:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='winnerTime' 
                    value={raceToUpdate.winnerTime} 
                    type="text" 
                    placeholder='Enter ID to display winner time' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>GrandPrix:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='grandPrix' 
                    value={raceToUpdate.grandPrix} 
                    type="text" 
                    placeholder='Enter ID to display GrandPrix' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>Number of laps:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='numberOfLaps' 
                    value={raceToUpdate.numberOfLaps} 
                    type="number" 
                    placeholder='Enter ID to display number of laps' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-1">
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

export default EditRace;


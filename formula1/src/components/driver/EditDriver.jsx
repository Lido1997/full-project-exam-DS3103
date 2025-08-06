import { useContext, useState } from 'react';
import { DriverContext } from '../../contexts/DriverContext';

const EditDriver = () => {
    const { getDriverById, editDriver } = useContext(DriverContext);

    const [id, setId] = useState("");
    const [driverToUpdate, setDriverToUpdate] = useState({
        name: "",
        age: "",
        nationality: "",
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
            case "name":
                setDriverToUpdate({ ...driverToUpdate, name: e.currentTarget.value });
            break;
            case "age":
                setDriverToUpdate({ ...driverToUpdate, age: e.currentTarget.value });
            break;
            case "nationality":
                setDriverToUpdate({ ...driverToUpdate, nationality: e.currentTarget.value });
            break;
        }
    }
   
    const getByIdFromContext = async () => {
        try {
            if (!id) {
                setErrorMessage("Please enter a valid ID.");
                return;
            }
    
            const driverFromContext = await getDriverById(id);
            if (driverFromContext) {
                setDriverToUpdate(driverFromContext);
                setSuccessMessage(`Driver with ID ${id} found!`);
                console.log(driverFromContext);
            } else {
                setErrorMessage("Driver not found. Please enter a valid ID.");
                console.log("Driver not found. Please enter a valid ID.");
            }
        } catch (error) {
            console.error("Error getting driver by id:", error);
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
            if (!driverToUpdate.name || !driverToUpdate.age || !driverToUpdate.nationality || !id) {
                setErrorMessage2("Fill in all fields to save changes.");
                return;
            }
    
            const success = editDriver(driverToUpdate);
    
            if (success) {
                setSuccessMessage2(`Driver with ID ${id} updated successfully!`);
            } else {
                setErrorMessage(`Error saving changes to driver with ID ${id}. Please try again.`);
            }
        } catch (error) {
            console.error("Error saving changes to driver:", error);
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
            <h2 className='mt-2 text-danger'>Edit driver information:</h2>

            <div className='form-group'>
                <label><strong>Enter ID of driver:</strong></label>
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
                    className="btn btn-primary mb-2">Get driver by ID
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
            <div className="form-group mt-3">
                <label><strong>Name:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='name' 
                    value={driverToUpdate.name} 
                    type="text" 
                    placeholder='Enter ID to display name' 
                    className="form-control mt-1" 
                />
            </div> 
            <div className="form-group mt-3">
                <label><strong>Age:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='age' 
                    value={driverToUpdate.age} 
                    type="number" 
                    placeholder='Enter ID to display age' 
                    className="form-control mt-1" 
                />
            </div>
            <div className="form-group mt-3">
                <label><strong>Nationality:</strong></label>
                <input 
                    onChange={handleChange} 
                    name='nationality' 
                    value={driverToUpdate.nationality} 
                    type="text" 
                    placeholder='Enter ID to display nationality' 
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

export default EditDriver;


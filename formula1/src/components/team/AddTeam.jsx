import { useState, useContext, useRef } from 'react';
import { TeamContext } from '../../contexts/TeamContext'; 

const AddTeam = () => {
    const {postTeam} = useContext(TeamContext);
    const [manufacturer, setManufacturer] = useState("");
    const [driver1, setDriver1] = useState("");
    const [driver2, setDriver2] = useState("");
    const [image, setImage] = useState(null);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case "manufacturer":
                setManufacturer(value);
            break;
            case "driver1":
                setDriver1(value);
            break;
            case "driver2":
                setDriver2(value);
            break;
            case "image":
                setImage(e.currentTarget.files[0]);
            break;
        }
    }

    const resetForm = () => {
        setManufacturer("");
        setDriver1("");
        setDriver2("");
        setImage(null);
    }

    const saveTeam = async () => {
        if (!manufacturer || !driver1 || !driver2 || !image) {
            setErrorMessage("Please fill in all fields.");
            setTimeout(() => {setErrorMessage("")}, 4000);
            return;
        }

        const newTeam = {
            manufacturer: manufacturer,
            driver1: driver1,
            driver2: driver2,
            image: image.name
        };

        try {
            await postTeam(newTeam, image);
            setSuccessMessage("Team saved successfully!"); 
            setErrorMessage("");
            resetForm(); 
        } catch (error) {
            console.error("Error saving team:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    };

    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Add new team:</h2>
            
            <div className="form-group">
                <label><strong>Manufacturer:</strong></label>
                <input 
                    name='manufacturer' 
                    value={manufacturer} 
                    onChange={handleChange} 
                    placeholder='Enter manufacturer here' 
                    type="text" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group">
                <label><strong>Driver1:</strong></label>
                <input 
                    name='driver1' 
                    value={driver1} 
                    onChange={handleChange} 
                    placeholder='Enter driver1 here' 
                    type="text" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group">
                <label><strong>Driver2:</strong></label>
                <input 
                    name='driver2' 
                    value={driver2} 
                    onChange={handleChange} 
                    placeholder='Enter driver2 here' 
                    type="text" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group">
                <label><strong>Image:</strong></label>
                <input 
                    name='image' 
                    onChange={handleChange} 
                    type="file"
                />
            </div>
            <div className='form-group mt-1'>
                <button 
                    onClick={saveTeam} 
                    type="button" 
                    className='btn btn-success mb-2'>Save new team
                </button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </div>
        </section>
    );
}

export default AddTeam;
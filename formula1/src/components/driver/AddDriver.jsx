import { useState, useContext, useRef } from 'react';
import { DriverContext } from '../../contexts/DriverContext';

const AddDriver = () => {
    const {postDriver} = useContext(DriverContext);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");
    const [image, setImage] = useState(null);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case "name":
                setName(value);
            break;
            case "age":
                setAge(value);
            break;
            case "nationality":
                setNationality(value);
            break;
            case "image":
                setImage(e.currentTarget.files[0]);
            break;
        }
    }

    const resetForm = () => {
        setName("");
        setAge("");
        setNationality("");
        setImage(null);
    }

    const saveDriver = async () => {
        if (!name || !age || !nationality || !image) {
            setErrorMessage("Please fill in all fields.");
            setTimeout(() => {setErrorMessage("")}, 4000);
            return;
        }

        const newDriver = {
            name: name,
            age: age,
            nationality: nationality,
            image: image.name
        };

        try {
            await postDriver(newDriver, image);
            setSuccessMessage("Driver saved successfully!"); 
            setErrorMessage("");
            resetForm(); 
        } catch (error) {
            console.error("Error saving driver:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    };

    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Add new driver:</h2>
            
            <div className="form-group">
                <label><strong>Name:</strong></label>
                <input 
                    name='name'
                    value={name} 
                    onChange={handleChange} 
                    placeholder='Enter name here' 
                    type="text" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group">
                <label><strong>Age:</strong></label>
                <input 
                    name='age' 
                    value={age} 
                    onChange={handleChange} 
                    placeholder='Enter age here' 
                    type="number" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group mt-2">
                <label><strong>Nationality:</strong></label>
                <input 
                    name='nationality' 
                    value={nationality} 
                    onChange={handleChange} 
                    placeholder='Enter nationality here' 
                    type="text" 
                    className='form-control mt-1'
                />
            </div>
            <div className="form-group">
                <label><strong>Image:</strong></label>
                <input name='image' onChange={handleChange} type="file"/>
            </div>
            <div className='form-group mt-1'>
                <button 
                    onClick={saveDriver} 
                    type="button" 
                    className='btn btn-success mb-2'>Save new driver
                </button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </div>
        </section>
    );
}

export default AddDriver;
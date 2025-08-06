import { useState, useContext } from 'react';
import { DriverContext } from '../../contexts/DriverContext';

const DeleteDriver = () => {
    const { deleteDriver } = useContext(DriverContext);
    const [id, setId] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setId(e.currentTarget.value);
    }

    const resetForm = () => {
        setId("");
    }

    const handleClick = async () => {
        try {
            const success = await deleteDriver(id);

            if (success === true) {
                setSuccessMessage(`Driver with ID ${id} deleted successfully`);
                resetForm();
            } else {
                setErrorMessage(`Driver with ID ${id} not found. Driver may not exist.`);
            }
        } catch (error) {
            console.error("Error deleting driver:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    }


    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Delete driver:</h2>

            <div className="form-group">
                <label><strong>Driver ID to delete:</strong></label>
                <p><em>Driver ID is located above each driver</em></p>
                <input 
                    onChange={handleChange} 
                    name='id' 
                    value={id} 
                    type='number' 
                    placeholder='Enter ID here' 
                    className="form-control" 
                />
            </div>
            <div className="form-group mt-1 ">
                <button 
                    onClick={handleClick} 
                    type='button' 
                    className="btn btn-danger mb-2">Delete driver
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
        </section>
    );
}

export default DeleteDriver;
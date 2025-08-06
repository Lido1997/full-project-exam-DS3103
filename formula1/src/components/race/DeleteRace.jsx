import { useState, useContext } from 'react';
import { RaceContext } from '../../contexts/RaceContext'; 

const DeleteRace = () => {
    const { deleteRace } = useContext(RaceContext);
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
            const success = await deleteRace(id);

            if (success === true) {
                setSuccessMessage(`Race with ID ${id} deleted successfully`);
                resetForm();
            } else {
                setErrorMessage(`Race with ID ${id} not found. Race may not exist.`);
            }
        } catch (error) {
            console.error("Error deleting race:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    }


    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Delete race:</h2>

            <div className="form-group">
                <label><strong>Race ID to delete:</strong></label>
                <p><em>Race ID is located above each race</em></p>
                <input 
                    onChange={handleChange} 
                    name='id' 
                    value={id} 
                    type='number' 
                    placeholder='Enter ID here' 
                    className="form-control" 
                />
            </div>
            <div className="form-group mt-1">
                <button 
                    onClick={handleClick} 
                    type='button' 
                    className="btn btn-danger mb-2">Delete race
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
        </section>
    );
}

export default DeleteRace;
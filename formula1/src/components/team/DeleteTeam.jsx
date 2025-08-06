import { useState, useContext } from 'react';
import { TeamContext } from '../../contexts/TeamContext'; 

const DeleteTeam = () => {
    const { deleteTeam } = useContext(TeamContext);
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
            const success = await deleteTeam(id);

            if (success === true) {
                setSuccessMessage(`Team with ID ${id} deleted successfully`);
                resetForm();
            } else {
                setErrorMessage(`Team with ID ${id} not found. Team may not exist.`);
            }
        } catch (error) {
            console.error("Error deleting team:", error);
        } finally {
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 4000);
        }
    }


    return (
        <section className='font_1'>
            <h2 className='mt-2 text-danger'>Delete team:</h2>

            <div className="form-group">
                <label><strong>Team ID to delete:</strong></label>
                <p><em>Team ID is located above each team</em></p>
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
                    className="btn btn-danger mb-2">Delete team
                </button>
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {errorMessage && <div style={{color: 'red'}}> {errorMessage}</div>}
            </div>
        </section>
    );
}

export default DeleteTeam;
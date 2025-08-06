import React, { useState, useContext } from 'react';
import { RaceContext } from '../../contexts/RaceContext';

const AddRace = () => {
  const { postRace } = useContext(RaceContext);
  const [winnerName, setWinnerName] = useState('');
  const [winnerTime, setWinnerTime] = useState('');
  const [grandPrix, setGrandPrix] = useState('');
  const [numberOfLaps, setNumberOfLaps] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formatWinnerTime = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
  
    let formattedTime = '';
    for (let i = 0; i < formattedInput.length; i++) {
      if (i === 2 || i === 4) {
        formattedTime += ':';
      } else if (i === 6) {
        formattedTime += '.';
      }
      formattedTime += formattedInput[i];
    }
  
    return formattedTime;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
  
    switch (name) {
      case 'winnerName':
        setWinnerName(value);
        break;
      case 'winnerTime':
        const formattedTime = formatWinnerTime(value);
        setWinnerTime(formattedTime);
        break;
      case 'grandPrix':
        setGrandPrix(value);
        break;
      case 'numberOfLaps':
        setNumberOfLaps(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setWinnerName('');
    setWinnerTime('');
    setGrandPrix('');
    setNumberOfLaps('');
  };

  const saveRace = async () => {
    if (!winnerName || !winnerTime || !grandPrix || !numberOfLaps) {
      setErrorMessage('Please fill in all fields.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
      return;
    }

    const newRace = {
      winnerName: winnerName,
      winnerTime: winnerTime,
      grandPrix: grandPrix,
      numberOfLaps: numberOfLaps,
    };

    try {
      await postRace(newRace);
      setSuccessMessage('Race saved successfully!');
      setErrorMessage('');
      resetForm();
    } catch (error) {
      console.error('Error saving race:', error);
    } finally {
      setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 4000);
    }
  };

    return (
        <section className="font_1">
            <h2 className="mt-2 text-danger">Add new Race:</h2>

            <div className="form-group mt-2">
                <label><strong>GrandPrix:</strong></label>
                <input 
                    name="grandPrix" 
                    value={grandPrix} 
                    onChange={handleChange} 
                    placeholder="Enter GrandPrix location here" 
                    type="text" 
                    className="form-control mt-1"
                />
            </div>
            <div className="form-group">
                <label><strong>Winner name:</strong></label>
                <input 
                    name="winnerName" 
                    value={winnerName} 
                    onChange={handleChange} 
                    placeholder="Enter winner name here" 
                    type="text" 
                    className="form-control mt-1"
                />
            </div>
            <div className="form-group">
                <label><strong>Winner time: </strong><em><small>(HH:mm:ss.SSS)</small></em></label>
                <input 
                    name="winnerTime" 
                    value={winnerTime} 
                    onChange={handleChange} 
                    placeholder="Enter winner time here" 
                    type="text" 
                    className="form-control mt-1"
                />
            </div>
            <div className="form-group">
                <label><strong>Number of laps:</strong></label>
                <input 
                    name="numberOfLaps" 
                    value={numberOfLaps} 
                    onChange={handleChange} 
                    placeholder="Enter number of laps here"
                    type="number" 
                    className="form-control mt-1"
                />
            </div>
            <div className="form-group mt-1">
                <button 
                    onClick={saveRace} 
                    type="button" 
                    className="btn btn-success mb-2">Save new race
                </button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </div>
        </section>
    );
}

export default AddRace;
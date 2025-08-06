import {createContext, useState, useEffect} from 'react'
import RaceService from '../services/RaceService';

export const RaceContext = createContext(null);

export const RaceProvider = ({children}) => {

    const [race, setRace] = useState([]);    

    useEffect(()=>{
        setTimeout(()=>{
            getRaceFromService();
        }, 2000);
    }, [])

    const getRaceFromService = async () => {
        const raceFromService = await RaceService.getAllRaces();
        setRace(raceFromService);
    }

    const getRaceById = async (id) => {
        const raceToUpdate = await RaceService.getRaceById(id);
        return raceToUpdate;
    }

    const editRace = async (raceToUpdate) => {
        await RaceService.putRace( raceToUpdate );
        getRaceFromService();
    }

    const deleteRace = async (id) => {
        const result = await RaceService.deleteRace(id);
        getRaceFromService();
        return result;
    }

    const postRace = async (newRace) => {
        await RaceService.postRace(newRace);
        getRaceFromService();
    }

    return (
        <RaceContext.Provider value={{race, getRaceById, editRace, deleteRace, postRace}}>
            {children}
        </RaceContext.Provider>
    )
}

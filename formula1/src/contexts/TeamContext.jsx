import {createContext, useState, useEffect} from 'react'
import TeamService from '../services/TeamService';

export const TeamContext = createContext(null);

export const TeamProvider = ({children}) => {

    const [team, setTeam] = useState([]);    

    useEffect(()=>{
        setTimeout(()=>{
            getTeamFromService();
        }, 2000);
    }, [])

    const getTeamFromService = async () => {
        const teamFromService = await TeamService.getAllTeams();
        setTeam(teamFromService);
    }

    const getTeamById = async (id) => {
        const teamToUpdate = await TeamService.getTeamById(id);
        return teamToUpdate;
    }

    const editTeam = async (teamToUpdate) => {
        await TeamService.putTeam( teamToUpdate );
        getTeamFromService();
    }

    const deleteTeam = async (id) => {
        const result = await TeamService.deleteTeam(id);
        getTeamFromService();
        return result;
    }

    const postTeam = async (newTeam, image) => {
        await TeamService.postTeam(newTeam, image);
        getTeamFromService();
    }

    return (
        <TeamContext.Provider value={{team, getTeamById, editTeam, deleteTeam, postTeam}}>
            {children}
        </TeamContext.Provider>
    )
}

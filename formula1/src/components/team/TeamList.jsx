import {useContext, useEffect} from 'react';
import TeamItem from './TeamItem';
import { TeamContext } from '../../contexts/TeamContext'; 

const TeamList = () => {

    const {team} = useContext(TeamContext);

    const getTeamJSX = () =>{
        const teamJSX = team.map( (_team, index) => (
            <TeamItem key={index} 
            id={_team.id} 
            manufacturer={_team.manufacturer} 
            driver1={_team.driver1} 
            driver2={_team.driver2} 
            image={_team.image} 
            />
        ) );
        return teamJSX;
    }

    return (
        <section className='pb-3 font_1'>
            <h2 className='pt-3 text-danger'>Teams:</h2>
            <p><strong>Total number of drivers: {team.length}</strong></p>
            <section className='row g-3'>
                {getTeamJSX()}
            </section>
        </section>
    )
}

export default TeamList;
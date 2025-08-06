import {useContext, useEffect} from 'react';
import RaceItem from './RaceItem';
import { RaceContext } from '../../contexts/RaceContext'; 

const RaceList = () => {

    const {race} = useContext(RaceContext);

    const getRaceJSX = () =>{
        const raceJSX = race.map( (_race, index) => (
            <RaceItem key={index} 
            id={_race.id} 
            winnerName={_race.winnerName} 
            winnerTime={_race.winnerTime} 
            grandPrix={_race.grandPrix} 
            numberOfLaps={_race.numberOfLaps} 
            />
        ) );
        return raceJSX;
    }

    return (
        <section className='pb-3 font_1'>
            <h2 className='pt-3 text-danger'>Races:</h2>
            <p><strong>Total number of races: {race.length}</strong></p>
            <section className='row g-3'>
                {getRaceJSX()}
            </section>
        </section>
    )
}

export default RaceList;
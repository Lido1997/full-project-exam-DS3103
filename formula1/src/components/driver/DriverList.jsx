import {useContext, useEffect} from 'react';
import DriverItem from './DriverItem';
import { DriverContext } from '../../contexts/DriverContext';

const DriverList = () => {

    const {driver} = useContext(DriverContext);

    const getDriverJSX = () =>{
        const driverJSX = driver.map( (_driver, index) => (
            <DriverItem key={index} 
            id={_driver.id} 
            name={_driver.name} 
            age={_driver.age} 
            nationality={_driver.nationality} 
            image={_driver.image} 
            />
        ) );
        return driverJSX;
    }

    return (
        <section className='pb-3 font_1'>
            <h2 className='pt-3 text-danger'>Drivers:</h2>
            <p><strong>Total number of drivers: {driver.length}</strong></p>
            <section className='row g-3'>
                {getDriverJSX()}
            </section>
        </section>
    )
}

export default DriverList;
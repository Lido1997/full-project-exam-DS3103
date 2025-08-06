import {createContext, useState, useEffect} from 'react'
import DriverService from '../services/DriverService';

export const DriverContext = createContext(null);

export const DriverProvider = ({children}) => {

    const [driver, setDriver] = useState([]);    

    useEffect(()=>{
        setTimeout(()=>{
            getDriverFromService();
        }, 2000);
    }, [])

    const getDriverFromService = async () => {
        const driverFromService = await DriverService.getAllDrivers();
        setDriver(driverFromService);
    }

    const getDriverById = async (id) => {
        const driverToUpdate = await DriverService.getDriverById(id);
        return driverToUpdate;
    }

    const editDriver = async (driverToUpdate) => {
        await DriverService.putDriver( driverToUpdate );
        getDriverFromService();
    }

    const deleteDriver = async (id) => {
        const result = await DriverService.deleteDriver(id);
        getDriverFromService();
        return result;
    }

    const postDriver = async (newDriver, image) => {
        await DriverService.postDriver(newDriver, image);
        getDriverFromService();
    }

    return (
        <DriverContext.Provider value={{driver, getDriverById, editDriver, deleteDriver, postDriver}}>
            {children}
        </DriverContext.Provider>
    )
}

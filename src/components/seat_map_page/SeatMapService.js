
import data_md from './seat_map/Equipments Data/NH1709_data';
import data_sm from './seat_map/Equipments Data/NH4915_data';
import data_lg from './seat_map/Equipments Data/NH51_data';
class SeatMapService
{
  
    getFlightInfo(key)
    {
        const data = key==="lg" ? data_lg : key==="md" ? data_md : data_sm;
        return data.flightInfo;
    }
    
    getEconomySeatAttributes(isEconomy, key)
    {    
        const data = key==="lg" ? data_lg : key==="md" ? data_md : data_sm;   
        return isEconomy?data.seatAttributes.economy.seats:data.seatAttributes.premium.seats;
    }

    getEconomyBlockDetails(isEconomy, key)
    {   
        const data = key==="lg" ? data_lg : key==="md" ? data_md : data_sm;
        return isEconomy?data.seatAttributes.economy.blocks:data.seatAttributes.premium.blocks;
    }
     

}


export default new SeatMapService();
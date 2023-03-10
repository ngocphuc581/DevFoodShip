import axios from "axios";
import { API_General } from "./API_General";

const API = API_General+'/HistoryShipper';
export const GetHistoryShipperAPI = (id_Shipper, setHistory)=>{
    axios({
        method : 'post',
        url : API+'/getHistory',
        data : {
            id_Shipper : id_Shipper
        }
    }).then(res=>res.data)
    .then(res=>setHistory(res))
}
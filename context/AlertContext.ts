import {createContext} from "react";
import {CustomAlert} from "../interfaces/CutsomAlert";


const alertContext = createContext<{setAlert: (alert: CustomAlert) => void}>(
    { setAlert: (alert : CustomAlert) : void  => {}} )

export default alertContext
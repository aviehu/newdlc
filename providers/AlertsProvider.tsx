import React, {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {CustomAlert} from "../interfaces/CutsomAlert";
import AlertContext from "../context/AlertContext";

export default function AlertsProvider({ children }: {
    children: React.ReactNode
}) {

    const [alert, setAlert] = useState<CustomAlert>({message: '', type: 'success', open: false})

    function handleClose() {
        setAlert({message: '', type: 'success', open: false})
    }

    return (
        <AlertContext.Provider value={{setAlert}}>
            <Snackbar open={alert.open} anchorOrigin={{horizontal: 'center', vertical: 'top'}} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={alert.type}>{alert.message}</Alert>
            </Snackbar>
            { children }
        </AlertContext.Provider>
    )
}
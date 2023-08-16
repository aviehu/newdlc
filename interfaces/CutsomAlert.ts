import {AlertColor} from "@mui/material";

export interface CustomAlert {
    message: string,
    type: AlertColor,
    open: boolean
}
import {useContext} from "react";
import AlertContext from "../context/AlertContext";

export default function useAlert() {
    return useContext(AlertContext)
}


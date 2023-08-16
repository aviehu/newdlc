import React, {useState} from "react";
import {LinearProgress} from "@mui/material";
import LoadingContext from "../context/LoadingContext";

export default function LoadingProvider({ children }: {
    children: React.ReactNode
}) {

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading ? <LinearProgress color={'secondary'}/> : <div style={{width: '100%', height: 4}}  />}
            {children}
        </LoadingContext.Provider>
    )


}
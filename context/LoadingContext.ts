import {createContext} from "react";

const LoadingContext = createContext<{ loading: boolean, setLoading: (state: boolean) => void }>(
    { loading: false, setLoading: (state : boolean) : void  => {}} )

export default LoadingContext
import axios from "axios";
import {useCallback, useState} from "react";
export function useAxios(url:string, method:string, params:any) {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(0);
    const [data, setData] = useState<any>({});

    const fetchData = useCallback(async () => {
        console.log(url,method);
        setLoading(true);
        try{
            const result = await axios({
                url: url,
                method: method,
                data: params,
            });
            setCode(result.status);
            setData(result.data);
        }catch(error:any) {
            setCode(error.response.status);
            setData(error.response.data);
        }
        setLoading(false);
        console.log(code, data);
    }, [url, method, params]);

    return {loading, code, data, fetchData, setCode};
}
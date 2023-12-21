import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {

    const[fetchError,setFetchError]=useState(null);
    const[data,setData]=useState([]);
    const[isLoading,setIsLoading]=useState(false);



    useEffect(()=>{
        let isMounted=true;
        const source =axios.CancelToken.source();


        const fetchData =async(url)=>{
            setIsLoading(true);
            try{
                const response=await axios.get(url,{cancelToken:source.token});
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }
            catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }

            }
            finally{
                isMounted && setTimeout(()=>setIsLoading(false),2000);
            }
        }
        fetchData(dataUrl);
    
    },[dataUrl])
       

    

    return {data,fetchError,isLoading};
        
}

export default useAxiosFetch

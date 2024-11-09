import { useEffect, useState } from "react";

const useAppwrite = (fetchFunction) => {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const data = await fetchFunction();
         setData(data);
      } catch (error) {
         Alert.alert("Error", error.messsage);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const refetch = () => fetchData(); 
   
   return {data, isLoading, refetch}
};


export default useAppwrite;
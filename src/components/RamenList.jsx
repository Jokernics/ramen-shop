import React, { useEffect, useState } from 'react';
import RamenItem from './UI/RamenItem/RamenItem';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';



const RamenList = () => {
  const [ramens, setRamens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let list = [] 
        const querySnapshot = await getDocs(collection(db, "ramens"));
        querySnapshot.forEach((doc) => {
          list.push(doc.data())
        });
        setRamens(list)
        console.log(ramens)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);
   

  return (
    <div style={{display: "flex", gap: 20}}>
      {ramens.map( (item, id) => 
      <RamenItem key={id} ramen={item} />
    )}
    </div>
  );
}

export default RamenList;

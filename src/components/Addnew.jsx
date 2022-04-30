import React, { useEffect, useState } from 'react';
import { doc, setDoc, onSnapshot, collectionGroup } from "firebase/firestore"; 
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import RamenItem from './UI/RamenItem/RamenItem';


const Addnew = () => {
  const [input, setInput] = useState({
    name: 'Рамен', 
    description: 'очень полезный', 
    price: '100', 
    weight: '200 г', 
    imgURL: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
  });

  const [file, setFile] = useState('');

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, name);
      console.log(file.name)
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break
          }
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInput((prev) =>({...prev, imgURL: downloadURL}))
          });
        }
      );  
    }
    file && uploadFile()
  }, [file]);



  const handleAdd = async (e) => {
    e.preventDefault()
    await setDoc(doc(db, "ramens", input.name), {
      ...input
    });
  }
  
  const getData = () => {
    const unsub = onSnapshot(doc(db, "ramens"), (doc) => {
      console.log("Current data: ", doc.data());
    });
  
  }

  return (
    <div style={{display: "flex"}}>
      <div className='form'>
        <form onSubmit={handleAdd}>
          <input type="text" onChange={(e)=>setInput({...input, name: e.target.value})} placeholder="Название" />
          <input type="text" onChange={(e)=>setInput({...input, description: e.target.value})} placeholder="Описание" />
          <input type="text" onChange={(e)=>setInput({...input, price: e.target.value})} placeholder="Цена" />
          <input type="text" onChange={(e)=>setInput({...input, weight: e.target.value})} placeholder="Вес" />
          
          <button type='submit'>Click</button>
        </form>
        <button style={{margin: 10}} onClick={getData}>ПОлучить данные с сервера</button>
        <div className="formInput">
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          }
          alt=""
        />
      </div>
      <div className='preview'>
        <RamenItem ramen={input} />
      </div>
    </div>
  );
}

export default Addnew;

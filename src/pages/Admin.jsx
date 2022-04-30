import { doc, onSnapshot, setDoc } from "firebase/firestore";
import './admin.scss'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import RamenItem from "../components/UI/RamenItem/RamenItem";
import { db, storage } from '../firebase';


const Admin = () => {
  const [input, setInput] = useState({
    name: 'Рамен', 
    description: 'очень полезный', 
    price: '100', 
    weight: '200 г', 
    imgURL: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
  });

  const [file, setFile] = useState('');
  const [per, setPer] = useState(null);

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
          setPer(progress)
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
  
  return (
    <div className="admin__wrapper">
      <div className='form'>
        <form onSubmit={handleAdd}>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" onChange={(e)=>setInput({...input, name: e.target.value})} placeholder="Название" />
          <input type="text" onChange={(e)=>setInput({...input, description: e.target.value})} placeholder="Описание" />
          <input type="text" onChange={(e)=>setInput({...input, price: e.target.value})} placeholder="Цена" />
          <input type="text" onChange={(e)=>setInput({...input, weight: e.target.value})} placeholder="Вес" />
          
          <button disabled={per !== null && per < 100} type='submit'>Отправить</button>
        </form>
        
      </div>
      <div className='preview'>
        <RamenItem ramen={input} />
      </div>
    </div>
  );
}

export default Admin;

import { useEffect, useState } from 'react';
import { storage } from './Firebase';
import { ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

export default function Uploader(){
    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([])

        const styles = {
        backgroundColor: 'lightblue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        };
  
    const imageListRef = ref(storage, "/images")
    const uploadImage = () => {
      if (imageUpload==null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`) //search
      uploadBytes(imageRef, imageUpload)
      .then((snapshot)=>{
        getDownloadURL(snapshot.ref)
        .then((url)=>{
          setImageList((prev)=>[...prev, url])
        })
      })
    }
  
    useEffect(()=>{
      listAll(imageListRef)
      .then((response)=>{
        response.items.forEach((item)=>{
          getDownloadURL(item)
          .then((url)=>{
            setImageList((prev)=>[...prev, url])
  
          })
        })
      })
    }, [])
  
  
    return (
       <div style={styles}>
          <input
            type="file" 
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
  
          <div style={{width:'100%'}}>{imageList.map((url)=>{
            return(
              <img src={url} alt="" />
            )
          })}</div>
  
       </div>
    );
}
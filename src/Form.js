import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc ,doc} from "firebase/firestore";
import { db} from "./Firebase.js";

export default function Form(){
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userEmail: '',
        userPhone: ''
    });

   


    function handleUserInfo(e){
        const {name, value} = e.target;
        setUserInfo((prev)=>({...prev, [name]:value}));
    }
    
    const handleSubmitObject = async (e) => {
        e.preventDefault();
        // if(editItem){
        //     handleUpdate(editItem);
        //}else{

        addDoc(collection(db, "obj"), userInfo)
        .then((docRef)=>{
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((err)=>{
            console.error("Error adding document: ", err);
        })

        setUserInfo({
            userName: '',
            userEmail: '',
            userPhone: ''
        });
    };

    // const handleUpdate = (item)=>{
    //     const docRef = doc(db, "obj", item.id);
    //     updateDoc(docRef, editedData);
    //     setEditedData({
    //         userName: '',
    //         userEmail: '',
    //         userPhone: ''
    //     });
    // }
    














    return(
        <div>
            <h1>Enter Information</h1>

            <form onSubmit={handleSubmitObject}>
                <label>Name:</label>
                <input 
                    type="text"
                    name='userName'
                    onChange={handleUserInfo}
                    value={userInfo.userName}
                /> <br />
                <label>Email:</label>
                <input 
                    type="email" 
                    name='userEmail'
                    onChange={handleUserInfo}
                    value={userInfo.userEmail}
                /> <br />
                <label>Phone:</label>
                <input
                    type="text"
                    name='userPhone'
                    onChange={handleUserInfo} 
                    value={userInfo.userPhone}
                /> <br />

                <button type='submit'>Submit</button>
            </form>

            
        


            <div>
                {userInfo.userName} <br />
                {userInfo.userEmail} <br />
                {userInfo.userPhone}
            </div>



        </div>
    )
}
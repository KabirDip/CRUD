import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc , doc, onSnapshot} from "firebase/firestore";
import { db} from "./Firebase.js";
import DataTable from './DataTable.js';

export default function Form(){
    const [isEditing, setIsEditing] = useState();
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userEmail: '',
        userPhone: ''
    });


    useEffect(() => {
        const fetchData = onSnapshot(
            collection(db, "obj"),
            (snapShot) => {
                let users = [];
                snapShot.docs.forEach((doc) => {
                    users.push({ id: doc.id, ...doc.data() });
                });
                setUsers(users)
                console.log(users)
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            fetchData();
        };
    }, []);

    function handleUserInfo(e){
        const {name, value} = e.target;
        setUserInfo((prev)=>({...prev, [name]:value}));
    }

    const handleAdd = () => {

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

    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "obj", isEditing);
            await updateDoc(docRef, userInfo);
            setIsEditing(false)
            setUserInfo({
                userName: '',
                userEmail: '',
                userPhone: ''
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isEditing!==false){handleUpdate()}
        else{handleAdd()}
    }
    
    return(
        <div>
            <h1>Enter Information</h1>

            <form onSubmit={handleSubmit}>
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

            <DataTable users={users} editing={setIsEditing}/>

            



        </div>
    )
}
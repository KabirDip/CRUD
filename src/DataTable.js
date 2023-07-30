import React from "react";
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot, doc} from "firebase/firestore";
import { db} from "./Firebase.js";

export default function DataTable(){

    const [users, setUsers]=useState([]);


    useEffect(() => {
        const fetchData = onSnapshot(
            collection(db, "obj"),
            (snapShot) => {
                let listt = [];
                snapShot.docs.forEach((doc) => {
                    listt.push({ id: doc.id, ...doc.data() });
                });
                setUsers(listt);
                console.log(listt)
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            fetchData();
        };
    }, []);

    const handleDelete = (id)=>{
        deleteDoc(doc(db, "obj", id));
        
    }

    
    
    
    // const handleUpdate = async (item) => {
    //     try {
    //         const docRef = doc(db, "users", item.id);
    //         await updateDoc(docRef, editedData);
    //         setEditedData({
    //             userName: '',
    //             userEmail: '',
    //             userPhone: ''
    //         });
    //         setEditItem(null); // Clear the edit item after update
    //     } catch (error) {
    //         console.error("Error updating document: ", error);
    //     }
    // };



    return(
        <div>
            <table>
            <thead>
                <tr>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userPhone}</td>
                            <td>
                                <button onClick={()=>handleDelete(user.id)}>Delete</button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        

        </div>
    )
};

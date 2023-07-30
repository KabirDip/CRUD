import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function AddObjectToDatabase() {
  const [newObject, setNewObject] = useState({
    name: '',
    age: 0,
    email: '',
    phone:
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewObject((prevObject) => ({ ...prevObject, [name]: value }));
  };

  const handleAddObject = () => {
    // Get a reference to the database
    const database = firebase.database();
    const objectsRef = database.ref('objects'); // 'objects' is the path to the location where you want to store the objects

    // Add the object to the database using the push() method
    objectsRef.push(newObject)
      .then(() => {
        console.log('Object added to the database successfully!');
        // Clear the input fields after successful addition
        setNewObject({
          name: '',
          age: 0,
          email: '',
        });
      })
      .catch((error) => {
        console.error('Error adding object to the database:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={newObject.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={newObject.age}
        onChange={handleInputChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="email"
        value={newObject.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button onClick={handleAddObject}>Add Object</button>
    </div>
  );
}

export default AddObjectToDatabase;

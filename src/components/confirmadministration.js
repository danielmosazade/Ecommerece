import React, { useEffect, useState } from 'react'
import  "firebase/firestore";
import { getUsers } from "../pages/FirebaseConfig";

const ConfirmAdministration = () => {

    // What user signed currently in
    let isAdmin = false;
    let currentEmail = localStorage.getItem('currentEmail');
    
    // console.log('shit2',getUsers)
    if(currentEmail) {
        
    //    // Get a reference to the collection
    //     const collectionRef = getUsers.firestore().collection('users');

    //     // Get the data from the collection
    //     collectionRef.get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, doc.data());
    //         });
    //     });

        return isAdmin;
    }
    else{
        return false;
    }
}

export default ConfirmAdministration;


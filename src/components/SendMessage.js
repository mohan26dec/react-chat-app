// Import the functions from the SDKs

import React, { useState } from 'react'
import { db, auth } from '../firebase/firebase';
import firebase from 'firebase/compat/app';

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Input, Button } from '@mui/material/'

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";


const SendMessage = ({ scroll }) => {

    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const storage = getStorage();

    // Add emojis function

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

     // form on submit send message function 

    const sendMessage = (e) => {
        
        

        // if(input.trim().length === 0) {
        //     return;
        // }

        e.preventDefault()
        const { uid, photoURL } = auth.currentUser

        const uploadFiles = (file) => {
            const storageRef = ref(storage, file.name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                // case 'paused':
                //     console.log('Upload is paused');
                //     break;
                // case 'running':
                //     console.log('Upload is running');
                //     break;
                // }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    db.collection('messages').add({
                        photoURL,
                        downloadURL,
                        uid,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    setInput('')
                    scroll.current.scrollIntoView({ behavior: 'smooth' })
                });
            }
            );
        };
        
        

        const file = e.target[0].files[0];
        if(file) {
            uploadFiles(file);
        }

        //add the form details to the database
        if(input.trim().length !== 0) {
            db.collection('messages').add({
                text: input,
                photoURL,
                uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setInput('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        }
    };

    
    
    
    
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
  
            <input type="file" />


                    <Button className="button" onClick={() => setShowEmojis(!showEmojis)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </Button>
                    
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" 
                        value={input} onChange={(e) => setInput(e.target.value)}
                    />
                    
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                    {showEmojis && (
                        <div>
                        <Picker onSelect={addEmoji} />
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SendMessage
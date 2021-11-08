// Import the functions from the SDKs

import React from 'react'
import { auth } from '../firebase/firebase';
import Button from '@mui/material/Button'

const SignOut = () => {
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', backgroundColor: '#FAFAFA', top: 0, borderBottom: 'solid 1px lightgray', zIndex: '10'
        }}>
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </div>
    )
}

export default SignOut
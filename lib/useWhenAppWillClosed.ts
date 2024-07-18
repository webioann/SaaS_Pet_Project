'use client';
import React, { useEffect } from 'react'
import { signOut } from "next-auth/react"

useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
    }
})

const handleTabClosing = () => {
    signOut({callbackUrl: '/'})
    console.log('handleTabClosing function call')
}

const alertUser = (event:any) => {
    event.preventDefault()
    event.returnValue = 'SSSSSSSSSSSSSSSSSSSSSSSSSSS ==='
    console.log('alertUser function call')
}

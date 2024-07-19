'use client';
import React, { useEffect } from 'react'
import { signOut } from "next-auth/react"

export const useWhenAppWillClosed = () => {

    sessionStorage.setItem('status', JSON.stringify(false))
};
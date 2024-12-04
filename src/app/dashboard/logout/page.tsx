'use client';
import React, { useEffect } from 'react'
const Logout = () => {
    useEffect(() => {
      localStorage.clear();
       window.location.href = '/auth/sign-in';
    }, [])
  return (
    <div>Please wait.....</div>
  )
}

export default Logout
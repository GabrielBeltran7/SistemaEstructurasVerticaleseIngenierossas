import React from 'react'
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from '../../../api/firebase/FirebaseConfig/FirebaseConfig';

const ComponentsProtection = () => {
    const navigate = useNavigate();
    
  return (
    <div>ComponentsProtection</div>
  )
}

export default ComponentsProtection
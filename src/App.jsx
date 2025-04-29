import { useEffect, useState, useTransition } from "react";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import './App.scss'
import { useUser } from "./userContext";

import E_login from "./ecomManagement/E_login";
import O_login from "./orderManagement/employee/O_login";

export default function App() {
    const {setUser} = useUser()
    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'
    const navigate = useNavigate()
  const [page, setPage]= useState('')
 useEffect(()=>{
  localStorage.removeItem('user')
  let token = localStorage.getItem('gstar_om_employee')
  token?  checklogin(token) : null
 },[])
  async function checklogin(token) {
    console.log('functon')
    let res = await fetch(`${api}/om/employee/getprofile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    res = await res.json();
    if (res.status) {
      setUser(res.employee)
      localStorage.setItem('user', JSON.stringify(res.employee))
        navigate('/om/employee')
    } else {
        navigate('/')
    }
}
  return (
      <div style={{ alignContent: 'center', minHeight:'100vh'}}>
         <motion.h1
                className="shinetxt text-white text-center font-weight-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 2,
                        scale: { type: "spring", bounce: 0.2 }
                    }}
                >
                    Welcome to Gstar Business
                </motion.h1>

         <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '40px' }}>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.8 }} // Shrinks when clicked
            transition={{
              duration: 2,
              delay: 0.2,
              scale: { type: "spring", bounce: 0.2 },
            }}
            className="hmbutn me-4"
            onClick={()=>setPage('o_login')}
          >
            <h2>Order Management</h2>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.8 }} // Shrinks when clicked
            transition={{
              duration: 2,
              delay: 0.3,
              scale: { type: "spring", bounce: 0.2 },
            }}
            className="hmbutn"
            onClick={()=>setPage('e_login')}
          >
            <h2>E-commerce Management</h2>
          </motion.button>
        </div>

      {page == 'o_login'? <O_login/>: page == 'e_login'? <E_login/> : null}
      </div>
  );
}

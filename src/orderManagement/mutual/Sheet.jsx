
import '../../App.scss'
import { useState, useEffect } from 'react'
import React, { lazy, Suspense } from "react";

import { useNavigate, Link, Outlet } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { motion } from "framer-motion";
import { useUser } from "../../userContext";
import { Button } from 'react-bootstrap';
const Entrysheet = lazy(() => import("../employee/Entrysheet"));
const Product = lazy(() => import("../employee/Product"));


export default function Sheet() {
    const { user } = useUser()

    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait');
    const [token, setToken] = useState({})
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
        const [selected, setSelected] = useState("Amazon Order id");
        const [searchkey, setSearchkey] = useState("");
        const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const url = new URL(window.location.href);
        const tokensParam = url.searchParams.get("tokens");
        if (tokensParam) {
            localStorage.setItem("google_token", tokensParam);
            setToken(tokensParam)
        } 

        let user_details = user ? user : JSON.parse(localStorage.getItem('user'))
        setProfile(user_details)
    }, [])

    const search = () => {
        setSearchParams({ key: searchkey, searchby: selected });
        setShowSearch(true);
    };
    const cancel = () => {
        setSearchkey('')
        setShowSearch(false);
    }

    const startAuth = async (clientid, secretkey) => {
        const response = await fetch("http://localhost:10000/api/google/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: clientid,
                clientSecret: secretkey,
            }),
        });
        const data = await response.json();
        window.location.href = data.url;
    };

    const [sheetrange, setRange] = useState()
    const [selectedSheet, setSelectedsheet] = useState('')
    const [result, setResult] = useState([])
    const [data, setData] = useState([])

    const [showInventory, setShowInventory] = useState(false)
    const [showProduct, setShowproduct]= useState(false)

    const [sheetdetails, setSheetdetail] = useState(null)

    function handlesheetselection(sheetname) {
        let range = sheetrange ? sheetrange : profile.sheet[sheetname].range
        let sheeturl = profile.sheet[sheetname].url
        let clientId = profile.clientid
        let clientSecret = profile.secretkey
        let account = profile.account
        setSheetdetail({ token, sheetname, sheeturl, range, clientId, clientSecret, account })
        setShowInventory(true)
    }

 

    return (
        <>
            {loading && (
                <div className="sweet-loading fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div style={{ display: 'grid', placeItems: 'center', justifyItems: 'center', }}>
                        <div style={{ display: 'grid', placeItems: 'center', marginTop: "200px" }}>
                            <ClockLoader color="white" loading={loading} cssOverride={{ display: "block", margin: "0 auto", borderColor: "red" }} size={100} aria-label="Loading Spinner" data-testid="loader" />
                            <h3 className='mt-2 text-center'>{msg}</h3>
                        </div>

                    </div>
                </div>
            )}

            <div className="container ps-4 pe-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight: '100vh' }}>
                 <div className="container-fluid p-2 searchboxcontanier">
                                    <div className="row">
                                        <div className="col-md-7 d-flex align-items-center col-sm-12">
                                            <ul className=' fs-5 links d-flex justify-content-evenly m-0 p-0' style={{ listStyle: 'none' }}>
                                                <Link to='/om/employee'>Home Page</Link>
                                                <Link to='/ecom/inventory-update'>Sync Product</Link>
                                                <Link to='/om/employee'>Brand Scrapping</Link>
                                            </ul>
                                        </div>
                                        <div className="col-md-5 col-sm-12">
                                            <div className="searchbox d-flex justify-content-evenly w-100">
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="success pt-2 pb-2">{selected}</Button>
                
                                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setSelected("ASINs")}>ASINs</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelected("Vendor ID")}>Vendor ID</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelected("SKUs to match")}>SKUs to match</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelected("Vendor Tracking #")}>Vendor Tracking</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <input type="text" value={searchkey} onChange={(e) => setSearchkey(e.target.value)} placeholder='Search in database' />
                                                <button onClick={search} className='border border-secondary ms-2 p-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                                    </svg>
                                                </button>
                
                                                <button onClick={cancel} className='border border-secondary ms-2 p-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                <div className="d-flex justify-content-center align-items-center mb-4" style={{ marginTop: '40px' }}>
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
                        onClick={() => handlesheetselection('Inventory')}
                    >
                        <h2>Order Sheet</h2>
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
                        onClick={() => setShowproduct(true)}
                    >
                        <h2>Product List</h2>
                    </motion.button>
                </div>


                {showProduct &&
                    <div id="invsheet" >
                        {/* <button className='closebtn bg-danger' onClick={() => setShowneworders(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button> */}
                        <Suspense fallback={<div>Loading...</div>}>
                            {showProduct && <Product key={`${showProduct}`} />}
                        </Suspense>
                    </div>
                }

                {showInventory &&
                    <div id="invsheet" >
                        <button className='closebtn bg-danger' onClick={() => setShowneworders(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {showInventory && <Entrysheet key={`${showInventory}`} state={sheetdetails} />}
                        </Suspense>
                    </div>
                }
            </div>
        </>
    )
}
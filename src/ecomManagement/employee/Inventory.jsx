import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx'
import Header from '../../Header';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { lazy, Suspense } from "react";
const InvCard = lazy(() => import('./InvCard'))
const InvThread = lazy(() => import('./InvThread'))

import { motion } from "motion/react"
import ClockLoader from "react-spinners/ClockLoader";

export default function Inventory() {

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const navigate = useNavigate()
    const location = useLocation();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [showthread, setShowthread] = useState(false)
    const [msg, setMsg] = useState('Please wait..')
    const [alrtmsg, setAltmsg] = useState('Done')
    const [token, setToken] = useState({})
    const [thread, setThread] = useState(15)
    const [selected, setSelected] = useState('Synced Product')
    const [searchkey, setSearchkey] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const search = () => {
        setSearchParams({ key: searchkey, searchby: selected });
        setShowSearch(true);
    };
    const cancel = () => {
        setSearchkey('')
        setShowSearch(false);
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        setProfile(user)
        getproductlink(user.account)
    }, [])


    const [link, setLink] = useState([])
    const [synced, setSynced] = useState()
    const [backupfile, setBackupfile] = useState({})

    async function getproductlink(account) {
        console.log(account)
        if (account) {
            setLoading(true)
            let res = await fetch(`${local}/inv/getproductlink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account }) // wrap it in an object
            });
            res = await res.json();
            console.log(res)
            setLoading(false)
            if (res.status) {
                setLink(res.data)
                setSynced(res.synced)
                setBackupfile({ backup: res.backup, date: res.date })
            } else {
                console.log(res)
            }
        }
    }

    // ------download synced product shee-----------
    async function downloadSyncedProduct() {
        try {
            setLoading(true)
            const response = await fetch(`${local}/inv/downloadSyncedProduct`, {
                method: "POST",
                body: JSON.stringify({ account: profile.account }),
                headers: { 'Content-Type': 'application/json' }
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setLoading(false)
            const a = document.createElement("a");
            a.href = url;
            a.download = `${profile.account}-synced-sheet.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error("Download failed", err);
        }
    }

    const downloadBackup = async () => {
        try {
            const response = await fetch(`${local}/inv/downloadBackup`, {
                method: "GET",
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${profile.account}-backup-${backupfile.date}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error("Download failed", err);
        }
    }
    const [refresh, setRefresh]= useState(false)
        function refreshcard(){
            setRefresh(!refresh)
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

            <div className="container ps-4 pe-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight: '88vh' }}>
                <div className="container-fluid pt-1 searchboxcontanier">
                    <div className="row ps-4 pe-4">
                        <div className="col-md-7 d-flex align-items-center col-sm-12">
                            <ul className=' fs-5 links d-flex justify-content-evenly align-items-center m-0 p-0' style={{ listStyle: 'none' }}>
                                <li><Link to='/om/employee'>Home Page</Link></li>
                                <li><Link to='/google-sheet' className='text-white ms-3'>Upload Data</Link></li>
                                <li><Link to='' className='text-white ms-3'>Products</Link></li>
                                <li><Link to='' className='text-white ms-3'>Orders</Link></li>
                                <li><Link to='' className='text-white ms-3'>Boscovs Scrapping</Link></li>
                                <li><Link to='' className='text-white ms-3'>Backup</Link></li>
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
                {link.length > 0 && <h1 className=' mt-2 mb-2 text-center'>Total Url To Synced - {link.length}</h1>}
                {profile &&
                    <Suspense fallback={<div>Loading...</div>}>
                        {profile && <InvCard state={{ account: profile.account }} key={refresh} />}
                    </Suspense>
                }

                <div >
                    {link.length > 0 ?
                        <motion.div
                            initial={{ opacity: 0, x: -80, y: 0 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="d-flex w-100 justify-content-center align-items-center mt-4 mb-2"
                        >
                            <h5>Select Number of Thread</h5>
                            <Dropdown className='d-flex'>
                                <Dropdown.Toggle variant="" className='text-white border me-3 ms-3 ps-4 pe-4' id="dropdown-basic">
                                    {thread}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                    <Dropdown.Item onClick={() => setThread(6)}>6X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(7)}>7X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(8)}>8X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(9)}>9X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(10)}>10X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(11)}>11X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(12)}>12X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(13)}>13X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(14)}>14X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(15)}>15X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(16)}>16X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(17)}>17X</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setThread(18)}>18X</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            <button className='m-2 themebtn' onClick={() => setShowthread(true)}>Show Thread</button>
                            <button className='m-2 themebtn' onClick={refreshcard}>Current Status</button>
                        </motion.div> : <h2 className='text-center mt-4'>You have no url to Scrap.Go back to home page and fetch sheet</h2>
                    }
                </div>
                {showthread &&
                    <Suspense fallback={<div>Loading...</div>}>
                        {profile && <InvThread key={`${link}-${thread}`} state={{ account: profile.account, url: link, thread: thread }} />}
                    </Suspense>
                }

                <div className="d-flex w-100 justify-content-center">
                    {synced > 0 && <button className='themebtn fs-5' onClick={downloadSyncedProduct}>Download Synced File-{synced}</button>}
                    {backupfile.backup !== undefined && backupfile?.backup > 0 && <button className='themebtn fs-5' onClick={downloadBackup}>Backup -{backupfile?.backup} ({backupfile?.date})</button>}
                </div>
            </div>
        </>
    )
}
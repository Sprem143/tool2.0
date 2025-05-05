import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-circular-progressbar/dist/styles.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { lazy, Suspense } from "react";
const Threads = lazy(() => import('./Threads'))
const Urllist = lazy(() => import('./Urllist'))
import { motion } from "motion/react"
import ClockLoader from "react-spinners/ClockLoader";


export default function Academy() {

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const navigate = useNavigate()
    const [profile, setProfile] = useState(null);
    const [showthread, setShowthread] = useState(false)

    async function checklogin(token) {
        let res = await fetch(`${api}/om/employee/getprofile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        res = await res.json();
        if (res.status) {
            setProfile(res.employee);
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('gstar_om_employee');
        token ? checklogin(token) : navigate('/')
    }, [])


    const [url, setUrl] = useState('');
    const [num, setNum] = useState(0);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState([]);
    const [brand, setBrand] = useState('')
    const [msg, setMsg] = useState('Please wait')
    const [thread, setThread] = useState(10)

    useEffect(() => {
        // getproductslink();
        // getupdatedproduct();
        // checkifbusy()
    }, [profile]);

    const [isbusy, setBusy] = useState(false)
    const checkifbusy = async () => {
        let res = await fetch(`${api}/inv/checkifbusy`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json();
        setBusy(res.status)
    }


    const getupdatedproduct = async () => {
        try {
            if (profile?.account) {
                let res = await fetch(`${api}/scrap/academy/currentdetails`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ account: profile.account })
                })
                res = await res.json();
                if (res.status) {
                    setCurrentstatus(prev => ({ ...prev, producturl: res.url, fetchedproduct: res.fetched }))
                    setLink(res.link)
                }
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    function checkbrandname(url, wordsArray) {
        wordsArray = wordsArray.split(' ').filter(Boolean)
        url = url?.toLowerCase()
        if (url.includes('%20') && wordsArray.length == 1) {
            alert('Incorrect Brand Name');
            return false
        }
        for (let word of wordsArray) {
            if (!url.includes(word)) {
                return false;
            }
        }
        return true;
    }
    const [refresh, setRefresh] = useState(false)
    const fetchbrand = async () => {
        if (!url || typeof url !== 'string' || !url.startsWith('https')) {
            alert('Invalid url');
            return;
        }
        let resp = confirm('All Previous data will be deleted.Are you sure?');
        if (resp) {
            if (num > 0) {
                setRefresh(true)
                let brandname = brand.toLowerCase();
                let ans = checkbrandname(url, brandname)
                if (ans) {
                    setLoading(true)
                    let result = await fetch(`${api}/scrap/academy/fetchbrand`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url, num, brandname, profile })
                    })
                    result = await result.json();
                    setLoading(false)
                    setRefresh(false)

                    if (result.status == 'exist') {
                        alert(`This brand is already scrapped by ${result.data?.name} on date ${result.data?.Date}. There are total ${result.data?.urls} products url found in that scrapping searched url was - ${result.data?.brandurl} .  You can't scrap this brand again. `)
                    }
                    else if (result.status) {
                        setLink(result.url);
                        setCurrentstatus(prev => ({ ...prev, producturl: result?.url.length }))
                    } else if (result.status == false) {
                        alert(result.msg)
                    }
                } else {
                    alert('Please enter correct brand name');
                    setLoading(false)
                }
            } else {
                alert("Please enter number of products on vender website");
                setLoading(false)
            }
        }
    }
    // --------refresh details while fetcing url-------
    const [currentstatus, setCurrentstatus] = useState(null)
    async function refreshdetails() {
        let res = await fetch(`${api}/scrap/academy/refreshdetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: profile.account })
        })
        res = await res.json();
        if (res.status) {
            setCurrentstatus({ page: res.page, producturl: res.url })
            setMsg(`Total pages -${res.page} and ${res.url} urls fetched`)
        }
    }
    useEffect(() => {
        let interval;
        if (refresh) {
            interval = setInterval(() => {
                refreshdetails();
            }, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [refresh]);


    const scrapproduct = async () => {
        setShowthread(true)
    }

    const downloadProductExcel = async () => {
        let res = await fetch(`${api}/scrap/academy/downloadProductExcel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: profile.account })
        });
        res = await res.json();
        if (res.status && Array.isArray(res.data) && res.data.length > 0) {
            res.count > 0 ? alert(`${res.count} already listed so these products will be deleted from sheet`) : null
            let products = res.data.filter((d) => d.quantity > 2)
            let jsondata = products.map((d) => {
                return {
                    'UPC': 'UPC' + d.upc,
                    'upc2': d.upc,
                    'upc3': d.upc,
                    'SKU': d.sku,
                    'Size': d.size,
                    'Color': d.color,
                    'Product price': d.price,
                    'Price Range': d.pricerange,
                    'Quantity': d.quantity,
                    'Belk link': d.url,
                    'Image link': d.imgurl,
                    'ASIN': '',
                    'Title': ''
                }
            })
            jsondata = Array.from(jsondata.reduce((map, item) => map.set(item.UPC, item), new Map()).values());
            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.json_to_sheet(jsondata);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
            const sheet = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            const blob = new Blob([sheet], { type: 'application/octet-stream' })

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Row_product_list.xlsx';
            link.click();
        } else {
            alert('No data found');
            console.log(res.msg)
        }
    }

    // ---------new code--------
    const [selected, setSelected] = useState('upc')
    const [searchkey, setSearchkey] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showbox, setShowbox] = useState(false)

    function handleshow(item) {
        item == 'url' && setShowbox(true)
    }

    const search = () => {
        setSearchParams({ key: searchkey, searchby: selected });
        setShowSearch(true);
    };
    const cancel = () => {
        setSearchkey('')
        setShowSearch(false);
    }

    const uploadamzsheet = async (file) => {
        setLoading(true);
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('account', profile.account);
            var resp = await axios.post(`${api}/scrap/academy/uploadforcheck`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            if(resp.data.status){
                let dataarray = resp.data.data.length
                alert(`${dataarray} products found on amazon. Now you are redirecting to Check-product page`)
                navigate('/ecom/check-product')
            }else{
                alert(resp.data.msg)
                console.log(resp)
            }
        }
       
    };
    const handleFileChange = (doc) => {
        setFile(doc);
        uploadamzsheet(doc)
    };

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

                <div className="container-fluid pt-1 searchboxcontanier">
                    <div className="row ps-4 pe-4">
                        <div className="col-md-7 d-flex align-items-center col-sm-12">
                            <ul className=' fs-5 links d-flex justify-content-evenly m-0 p-0' style={{ listStyle: 'none' }}>
                                <li><Link to='/om/employee'>Home Page</Link></li>
                                <li><Link to='' className='text-white ms-3'>Inventory Updation</Link></li>
                                <li><Link to='' className='text-white ms-3'>Products</Link></li>
                                <li><Link to='' className='text-white ms-3'>Orders</Link></li>
                                <li><Link to='/ecom/boscovs-brand-scrapping' className='text-white ms-3'>Boscovs Scrapping</Link></li>
                                <li><Link to='' className='text-white ms-3'>Backup</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-12">
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
                <div className="d-flex justify-content-center align-items-center">
                    <h4 className='text-center ps-4 pe-4 pb-2 pt-2 headingtxt'>Academy Product Scrapping</h4>

                </div>
                <div className="p-4 pt-1">

                    <div className='d-flex flex-column justify-content-center align-items-center w-100'>

                        <div className='w-100 d-flex justify-content-center'>
                            <input type="text" onChange={(e) => setUrl(e.target.value)} placeholder='Brand URL' className='w-25 p-2' />
                            <input type="number" className='ms-3 p-2' onChange={(e) => setNum(e.target.value)} placeholder='Number of Pages' />
                            <input type="text" className='ms-3 p-2' onChange={(e) => setBrand(e.target.value)} placeholder='Brand Name' />
                            <button className='ms-4 p-3 ps-4 pe-4 themebtn' onClick={fetchbrand} disabled={isbusy}>Fetch product URLs</button>
                        </div>
                    </div>

                    {currentstatus &&
                        <div className="container w-100 d-flex justify-content-center align-items-center">
                            <button className='m-2' onClick={() => handleshow('url')}> <a href="#urllist" className='text-dark'>Total product url - {currentstatus?.producturl}</a> </button>
                            <button className='m-2' onClick={getupdatedproduct}> <div className="timer" >
                                Total fetched Product : {currentstatus?.fetchedproduct} <span ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                </svg></span>
                            </div></button>

                            {link.length > 0 &&
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="" className='text-white border m-0 p-2' id="dropdown-basic">
                                            Select Speed
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>

                                            <Dropdown.Item onClick={() => setThread(6)}>6</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(7)}>7</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(8)}>8</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(9)}>9</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(10)}>10</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(11)}>11</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(12)}>12</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(13)}>13</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(14)}>14</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(15)}>15</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(16)}>16</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(17)}>17</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setThread(18)}>18</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button className='m-2' onClick={scrapproduct} disabled={isbusy}>Start Scraping UPCs</button>

                                </>
                            }
                            {currentstatus?.fetchedproduct > 0 &&
                                <>
                                    <button className='ms-4 mt-4 mb-3' variant="secondary" onClick={downloadProductExcel}>
                                        Download Products List
                                    </button>
                                    <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} accept=".xlsx, .xls, .xlsm" />                                </>
                            }
                        </div>
                    }

                    {showthread &&
                        <div id="profile" className='mt-4'>
                            <button className='closebtn bg-danger' onClick={() => setShowthread(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Threads state={{ urls: link, thread: thread, account: profile.account }} />
                            </Suspense>
                        </div>
                    }

                    {showbox && link.length > 0 &&
                        <div id="urllist" className='mt-4'>
                            <button className='closebtn bg-danger' style={{ right: '3%' }} onClick={() => setShowbox(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Urllist state={{ link: link, account: profile.account }} />
                            </Suspense>
                        </div>

                    }


                    <br />
                    {currentstatus?.fetchedproduct > 0 && <h5 className='text-center mt-3'> <Link to='/ecom/check-product'>Check Final Data</Link></h5>}
                    <hr />
                </div>
            </div >
            <Outlet />
        </>
    )
}


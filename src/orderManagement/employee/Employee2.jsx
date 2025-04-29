
import '../../App.scss'
import { useState, useEffect } from 'react'
import React, { lazy, Suspense } from "react";

import { useNavigate, Link, Outlet } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Card from '../mutual/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { motion, useScroll } from "framer-motion";
import ClockLoader from "react-spinners/ClockLoader";
const Search = lazy(() => import("../mutual/Search"));
const Untrackable = lazy(() => import("../mutual/Untrackable"));
const Pdfrequire = lazy(() => import("../mutual/Pdfrequire"));
const Unshipped = lazy(() => import("../mutual/Unshipped"));
const Deadline = lazy(() => import("../mutual/Deadline"));
const Return = lazy(() => import("../mutual/Return"));
const TodayEntry = lazy(() => import("../mutual/TodayEntry"));
const OmEmProfile = lazy(() => import("../employee/OmEmProfile"));
const Entrysheet = lazy(() => import("../employee/Entrysheet"));

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useUser } from "../../userContext";

export default function Employee2() {

    const { user } = useUser()
    const { setUser } = useUser()
    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'
    const navigate = useNavigate();

    const [profile, setProfile] = useState({})

    useEffect(() => {
        let token = localStorage.getItem('gstar_om_employee')
        token ? getprofile(token) : navigate('/')
    }, []);

    async function getprofile(token) {
        let res = await fetch(`${api}/om/employee/getprofile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        res = await res.json();
        if (res.status) {
            setProfile(res.employee);
            setUser(res.employee)
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(res.employee))
            getcarddetails(res.employee.account)
        } else {
            navigate('/')
        }
    }

    function newentry() {
        setShowneworders(true)
    }

    const [islogin, setIslogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pdflink, setPdflink] = useState('')
    const [msg, setMsg] = useState('Please Wait..');
    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showpdfrequire, setSowpdfrequire] = useState(true)
    const [showunshipped, setShowunshipped] = useState(false)
    const [showdeadline, setShowdeadline] = useState(false)
    const [showreturn, setShowReturn] = useState(false)
    const [showuntrackable, setShowuntrackable] = useState(true)
    const [showtodayentry, setShowtodayentry] = useState(false)

    function pdfrequire() {
        setSowpdfrequire(true)
    }
    function unshipped() {
        setShowunshipped(true)
    }
    function deadlineorder() {
        setShowdeadline(true)
    }
    function returnorder() {
        setShowReturn(true)
    }
    function showuntrack() {
        setShowuntrackable(true)
    }
    function todayentrytable() {
        setShowtodayentry(true)
    }
    const [showprofile, setShowprofile] = useState(false)
    function setting() {
        setShowprofile(true)
    }

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    const [order, setOrder] = useState({
        'Date ordered': '',
        'Retailer': '',
        'Amazon Order id': '',
        'Vendor ID': '',
        'Description': '',
        'SKUs to match': '',
        'Vendor Tracking #': '',
        'ASINs': '',
        'last date': '',
        'Qty': '',
        "Qty Rec'd": '',
        'Date Received': '',
        'Qty Shipped': '',
        'Shoes': '',
        'Date Shipped': '',
        'Notes': '',
        'Replacement Shoe Box': '',
        'Vendor Return': '',
        'Return date': '',
        pdf: pdflink || ''
    })
    const [todayEntry, setTodayEntry] = useState([{}]);
    const [file, setFile] = useState(null);
    const [id, setId] = useState('')
    const [editid, setEditid] = useState('')
    const [show, setShow] = useState(false);
    const [showtodaydata, setShowtodaydata] = useState(true)
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState([])
    //  get card details -------
    async function getcarddetails(account) {
        let res = await fetch(`${api}/om/data/getcarddetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: account })
        })
        res = await res.json();
        if (res.status) {
            setCards(res.data);
            setTodayEntry(res.todayEntry)
        }
    }

    const formFields = [
        { label: "Date ordered", id: "dateOrdered", type: "date", editable: false },
        { label: "Retailer", id: "retailer", type: "text", editable: false },
        { label: "Amazon Order id", id: "amazonOrderId", type: "text", editable: false },
        { label: "Vendor ID", id: "vendorId", type: "text", editable: false },
        { label: "SKUs to match", id: "sku", type: "text", editable: false },
        { label: "Vendor Tracking #", id: "vendorTracking", type: "text", editable: true },
        { label: "ASINs", id: "asins", type: "text", editable: false },
        { label: "last date", id: "lasDate", type: "date", editable: false },
        { label: "Qty", id: "quantity", type: "number", editable: false },
        { label: "Qty Rec'd", id: "quantityReceived", type: "number", editable: false },
        { label: "Date Received", id: "dateReceived", type: "date", editable: true },
        { label: "Qty Shipped", id: "quantityShipped", type: "number", editable: true },
        { label: "Shoes", id: "shoes", type: "text", editable: true },
        { label: "Date Shipped", id: "dateShipped", type: "date", editable: true },
        { label: "Notes", id: "notes", type: "textarea", editable: true },
        { label: "Description", id: "description", type: "textarea", editable: true },
        { label: "Replacement Shoe Box", id: "replacement", type: "text", editable: true },
        { label: "Vendor Return", id: "vendorReturn", type: "text", editable: true },
        { label: "Return date", id: "returnDate", type: "date", editable: true }
    ];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addproduct = async () => {
        try {
            let res = await fetch(`${api}/om/data/addproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: order, id: profile.name, editid: editid })
            });
            res = await res.json();
            if (res.status == 'invalid') {
                alert(res.msg)
            }
            if (res.status) {
                setAlrtmsg('Order details submitted')
                handleShowAlert()
                setOrder({
                    'Date ordered': '',
                    'Retailer': '',
                    'Amazon Order id': '',
                    'Vendor ID': '',
                    'Description': '',
                    'SKUs to match': '',
                    'Vendor Tracking #': '',
                    'ASINs': '',
                    'Qty': '',
                    "Qty Rec'd": '',
                    'Date Received': '',
                    'Qty Shipped': '',
                    'Shoes': '',
                    'Date Shipped': '',
                    'Notes': '',
                    'Replacement Shoe Box': '',
                    'Vendor Return': '',
                    'Return date': '',
                    pdf: pdflink || ''
                })
                if (Array.isArray(todayEntry) && todayEntry[0]?.ASINs) {
                    setTodayEntry(prev => [res.data, ...prev])
                }
                else {
                    setTodayEntry(res.data)
                }
                setEditid('')
                setPdflink('')
                setShowForm();
            }
        } catch (err) {
            console.log(err);
            alert("Error while saving product details. Please retry")
        }
    }
    const reset = () => {
        setEditid('')
        setOrder({
            'Date ordered': '',
            'Retailer': '',
            'Amazon Order id': '',
            'Vendor ID': '',
            'Description': '',
            'SKUs to match': '',
            'Vendor Tracking #': '',
            'ASINs': '',
            'Qty': '',
            "Qty Rec'd": '',
            'Date Received': '',
            'Qty Shipped': '',
            'Shoes': '',
            'Date Shipped': '',
            'Notes': '',
            'Replacement Shoe Box': '',
            'Vendor Return': '',
            'Return date': '',
        })
    }

    const updatepdflink = async () => {
        if (!file || !id) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("id", id);
        formData.append("uploadedby", profile.name)
        let res = await fetch(`${api}/upload/updatepdflink`, {
            method: "POST",
            body: formData,
            headers: {
            },
        });
        res = await res.json()
        setLoading(false)
        handleClose()
        if (res.status) {
            setAlrtmsg(res.msg)
            handleShowAlert()
        }


    };
    // ------upload for get pdf link in form---
    async function getpdflink() {
        if (!file) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        setLoading(true)
        setMsg("Uploading pdf.. Wait..")
        const formData = new FormData();
        formData.append("pdf", file);
        let res = await fetch(`${api}/upload/getpdflink`, {
            method: "POST",
            body: formData,
            headers: {}
        });
        res = await res.json()
        setLoading(false)
        if (res.status) {
            setOrder({ ...order, pdf: res.pdfurl })
            setPdflink(res.pdfurl)
        } else {
            setLoading(false)
            console.log(res.msg)
        }
    }

    const groupedFields = [];
    for (let i = 0; i < formFields.length; i += 3) {
        groupedFields.push(formFields.slice(i, i + 3));
    }

    const [selected, setSelected] = useState("Amazon Order id");
    const [searchkey, setSearchkey] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [sk, setSearchParams] = useState(null);
    const [showneworders, setShowneworders] = useState(false)

    const search = () => {
        setSearchParams({ key: searchkey, searchby: selected });
        setShowSearch(true);
    };
    const cancel = () => {
        setSearchkey('')
        setShowSearch(false);
    }
    const startAuth = async () => {
        const clientid = profile.clientid
        const secretkey = profile.secretkey
        console.log(clientid, secretkey)
        const response = await fetch(`${api}/api/google/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: clientid,
                clientSecret: secretkey,
            }),
        });
        const data = await response.json();
        window.location.href = data.url;
    }


    return (
        <>
            {loading && (
                <div className="sweet-loading fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div style={{ placeItems: 'center' }}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', position: 'absolute', left: '45%' }}>
                            <ClockLoader color="white" loading={loading} cssOverride={{ display: "block", margin: "0 auto", borderColor: "red" }} size={100} aria-label="Loading Spinner" data-testid="loader" />
                            <h3 className='mt-2 text-center'>{msg}</h3>
                        </div>

                    </div>
                </div>
            )}

            {showAlert && (
                <div className="d-flex justify-content-end">
                    <h5
                        className="fixed top-2 bg-success text-white w-20 px-4 py-3 shadow-lg"
                        style={{ zIndex: 1000, position: 'fixed' }}
                    >
                        {alrtmsg}
                    </h5>
                </div>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Uplaod PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updatepdflink}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container ps-4 pe-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight: '150vh' }}>
                <div className="container-fluid p-2 searchboxcontanier">
                    <div className="row">
                        <div className="col-md-7 d-flex align-items-center col-sm-12">
                            <ul className=' fs-5 links d-flex justify-content-evenly m-0 p-0' style={{ listStyle: 'none' }}>
                                <li><button className='nobtn' onClick={showuntrack}><a href="#untrackable" className='text-white'>Untrackable</a></button></li>
                                <li><button className='nobtn text-white' onClick={pdfrequire}><a href="#pdfrequire" className='text-white'>PDF Require</a></button></li>
                                <li><button className='nobtn text-white' onClick={unshipped}><a href="#unshipped" className='text-white'>Unshipped</a></button></li>
                                <li><button className='nobtn text-white' onClick={deadlineorder}><a href="#deadline" className='text-white'>Deadline</a></button></li>
                                <li><button className='nobtn text-white' onClick={returnorder}><a href="#returned" className='text-white'>Return</a></button></li>
                                <li><button className='nobtn text-white' onClick={todayentrytable}><a href="#todayentry" className='text-white'>Today's Entry</a></button></li>
                                <li><Link to='/om/date-wise' className='text-white ms-3'>Date-wise Entry</Link></li>
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
                {showSearch && (
                    <div id='untrackable'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Search sk={sk} />
                        </Suspense>
                    </div>
                )}
                <Card cards={cards} />



                <div className="container mt-4 pb-4">
                    <div className="row">
                        <div className="col-md-2 col-sm-6">
                            <Button onClick={() => setShowForm(!showForm)} className='themebtn'>
                                {showForm ? <span className='linktext'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-2 bi bi-arrows-collapse" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z" />
                                    </svg>
                                    Hide</span> :
                                    <div className='d-flex justify-content-center align-items-center'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-patch-plus-fill" viewBox="0 0 16 16">
                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
                                    </svg> <span className="linktext">Add New Order</span>
                                    </div>}
                            </Button>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <Button className='themebtn' onClick={startAuth}>
                                <div className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-2 bi bi-table" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                                    </svg>
                                    <span className="linktext">New Entry Sheet</span>
                                </div>
                            </Button>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <Button className='themebtn' onClick={startAuth}>
                                <motion.div className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-2 bi bi-arrow-repeat" viewBox="0 0 16 16">
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                                    </svg>
                                    <span className="linktext">Sync Product</span>
                                </motion.div>
                            </Button>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <Button className='themebtn' onClick={setting}>
                                <motion.div className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-gear" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                    </svg>
                                    <a href="#profile" className='ms-2' style={{ textDecoration: 'none' }}> <span className='linktext'>Profile Setting</span></a>
                                </motion.div>
                            </Button>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            {/* <Button className='themebtn'> */}
                            <motion.div className='d-flex align-items-center themebtn m-0' style={{ borderRadius: '28px' }}>
                                <Dropdown style={{ background: 'transparent' }}>
                                    <Dropdown.Toggle style={{ background: 'transparent', border: 'none' }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-2 bi bi-amazon" viewBox="0 0 16 16">
                                            <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
                                            <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
                                        </svg> <span className="linktext">Brand Scrapping</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/ecom/belk-brand-scrapping">Belk</Dropdown.Item>
                                        <Dropdown.Item href="/ecom/boscovs-brand-scrapping">Boscovs</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </motion.div>
                            {/* </Button> */}
                        </div>

                        <div className="col-md-2 col-sm-6">
                            <Button className='themebtn'>
                                <motion.div className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-2 bi bi-card-list" viewBox="0 0 16 16">
                                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                    </svg>
                                    <Link to='#'> <span className="linktext">Inventory Sheet</span></Link>
                                </motion.div>
                            </Button>
                        </div>
                    </div>

                    {showForm && (
                        <div className="mt-3 cardboard" id="form_container" style={{ transition: '1s' }}>
                            {groupedFields.map((group, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -70, x: -20 }}
                                    animate={{ opacity: 1, y: 0, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg row d-flex flex-wrap"
                                >
                                    {group.map((field) => (
                                        <div key={field.id} className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor={field.id}>{field.label}</label>
                                                {field.type === "textarea" ? (
                                                    <textarea
                                                        id={field.id}
                                                        name={field.id}
                                                        style={{ background: 'transparent', color: 'white' }}
                                                        rows="1"
                                                        onChange={(e) =>
                                                            setOrder({ ...order, [field.label]: e.target.value })
                                                        }
                                                        value={order[field.label] || ""}
                                                    ></textarea>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        id={field.id}
                                                        name={field.id}
                                                        disabled={editid && !field.editable ? true : false}
                                                        style={{ background: '#ffffff26', color: 'white' }}
                                                        onChange={(e) =>
                                                            setOrder({ ...order, [field.label]: e.target.value })
                                                        }
                                                        value={order[field.label] || ""}
                                                        required
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ))}
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5 col-sm-6 d-flex align-items-center">
                                        <h5 className="text-align-start me-4">Upload label - </h5>
                                        <input type="file" accept=".pdf" onChange={handleFileChange} />
                                    </div>
                                    <div className="col-md-3 col-sm-6 d-flex align-items-center">
                                        <Button variant="primary" className="mt-4 btn w-100" onClick={getpdflink}>
                                            {!pdflink ? 'Upload' : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                                                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                                            </svg>}
                                        </Button>
                                        {pdflink && <a href={pdflink} className='text-white mt-4 ms-2' target='_blank'>View</a>}
                                    </div>
                                    <div className="col-md-2 col-sm-6">
                                        <Button className="mt-4 btn btn-primary w-100" onClick={addproduct}>Submit</Button>

                                    </div>
                                    <div className="col-md-2 col-sm-6">
                                        <Button className="mt-4 btn btn-secondary w-100" onClick={reset}>Reset</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {profile.account && showprofile &&
                    <div id="profile" className='mt-4'>
                        <button className='closebtn bg-danger' onClick={() => setShowprofile(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showprofile && <OmEmProfile state={profile} />}
                        </Suspense>
                    </div>
                }
                {showneworders &&
                    <div id="invsheet" >
                        <button className='closebtn bg-danger' onClick={() => setShowneworders(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showneworders && <Entrysheet state={{ profile: profile }} />}
                        </Suspense>
                    </div>
                }
                {showuntrackable &&
                    <div id="untrackable bg-danger" className='mt-4'>
                        <button className='closebtn' onClick={() => setShowuntrackable(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showuntrackable && <Untrackable state={{ account: profile.account }} />}
                        </Suspense>
                    </div>
                }

                {showpdfrequire &&
                    <div id="pdfrequire bg-danger" className='mt-4'>
                        <button className='closebtn' onClick={() => setSowpdfrequire(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>

                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showpdfrequire && <Pdfrequire state={{ account: profile.account }} />}
                        </Suspense>
                    </div>
                }

                {showunshipped && <div id="unshipped" className='mt-4'>
                    <button className='closebtn' onClick={() => setShowunshipped(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                    <Suspense fallback={<div>Loading...</div>}>
                        {profile?.account && showunshipped && <Unshipped state={{ account: profile.account }} />}
                    </Suspense>
                </div>
                }
                {showdeadline &&
                    <div id="deadline" className='mt-4'>
                        <button className='closebtn' onClick={() => setShowdeadline(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showdeadline && <Deadline state={{ account: profile.account }} />}
                        </Suspense>
                    </div>}

                {showreturn &&
                    <div id="returned" className='mt-4'>
                        <button className='closebtn' onClick={() => setShowForm(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showreturn && <Return state={{ account: profile.account }} />}
                        </Suspense>
                    </div>}

                {showtodayentry &&
                    <div id="todayentry" className='mt-4'>
                        <button className='closebtn' onClick={() => setShowtodayentry(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            {profile?.account && showtodayentry && <TodayEntry state={{ account: profile.account }} />}
                        </Suspense>
                    </div>
                }



            </div>

            <Outlet />

        </>

    )
}
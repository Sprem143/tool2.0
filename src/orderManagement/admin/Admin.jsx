import '../../App.scss'
import { useState, useEffect } from 'react'
import React, { lazy, Suspense } from "react";

import { useNavigate } from 'react-router-dom'
import Header from '../../Header';
import Card from '../mutual/Card';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { TypeAnimation } from 'react-type-animation';
import ClockLoader from "react-spinners/ClockLoader";
const Search = lazy(() => import("../mutual/Search"));
const Untrackable = lazy(() => import("../mutual/Untrackable"));
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Sidebar from './Sidebar';

import Button from 'react-bootstrap/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'
    const navigate = useNavigate();
    const [profile, setProfile] = useState({})
    const [islogin, setIslogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pdflink, setPdflink] = useState('')
    const [msg, setMsg] = useState('Please Wait');
    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
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
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    useEffect(() => {
        let token = localStorage.getItem('gstar_admin')
        token ? getprofile(token) : navigate('/')
    }, [])
    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState([])
    //  get card details -------
    async function getcarddetails() {
        let res = await fetch(`${local}/om/data/getadmincarddetails`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        res = await res.json();
        if (res.status) {
            console.log(res.data)
            setCards(res.data);
            setTodayEntry(res.todayentry)
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
    async function getprofile(token) {
        let res = await fetch(`${local}/om/admin/getprofile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        res = await res.json();
        if (res.status) {
            setIslogin(true)
            setProfile(res.admin);
            getcarddetails();
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addproduct = async () => {
        try {
            let res = await fetch(`${local}/om/data/addproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: order, id: profile.name, editid: editid })
            });
            res = await res.json();
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
                setTodayEntry(prev => [res.data, ...prev])
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
        let res = await fetch(`${local}/ulpoad/updatepdflink`, {
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
        let res = await fetch(`${local}/ulpoad/getpdflink`, {
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
    const edit = (id) => {
        let editItem = todayEntry.filter((t) => t._id === id);
        setOrder(editItem[0]);
        setEditid(id);
        setShowForm(true)
    }
    const groupedFields = [];
    for (let i = 0; i < formFields.length; i += 3) {
        groupedFields.push(formFields.slice(i, i + 3));
    }


    async function deleteentry(id) {
        if (id) {
            let res = await fetch(`${local}/om/data/deleteentry`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            res = await res.json();
            if (res.status) {
                setAlrtmsg('Order deleted')
                let updatedentry = todayEntry.filter((d) => d._id !== id)
                setTodayEntry(updatedentry)
                handleShowAlert()
            }
        } else {
            alert('Please select order first')
        }
    }

    const [selected, setSelected] = useState("Amazon Order id");
    const [searchkey, setSearchkey] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [sk, setSearchParams] = useState(null);

    const search = () => {
        setSearchParams({ key: searchkey, searchby: selected });
        setShowSearch(true);
    };
    const cancel = () => {
        setSearchkey('')
        setShowSearch(false);
    }

    return (
        <>
            <Header profile={{ user: profile.name, role: 'gster_om_employee', img: profile.img }} />
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
 <Sidebar />
            <div className="container" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight:'100vh' }}>

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
                {/* -------main content */}

               
                <Card cards={cards} />

                <div className="container mt-3 p-4">
                    <Button onClick={() => setShowForm(!showForm)} className='ps-4 pe-4 w-25' style={{ minHeight: '50px' }}>
                        {showForm ? <motion.span initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.5 }} className='fs-4'>Hide</motion.span> : <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 1.0 }} className=' d-flex justify-content-center align-items-center fs-4'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-patch-plus-fill" viewBox="0 0 16 16">
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
                            </svg><p className='p-0 m-0'>Add Order</p></motion.div>}
                    </Button>
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: -70 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.5 }}
                                className="mt-3 cardboard"
                                id="form_container"
                            >
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
                                                            disabled={editid && !field.editable}
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
                                {/* Upload and Submit Row remains unchanged */}
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-6 d-flex align-items-center">
                                            <h5 className="text-align-start me-4">Upload label - </h5>
                                            <input type="file" accept=".pdf" onChange={handleFileChange} />
                                        </div>
                                        <div className="col-md-3 col-sm-6 d-flex align-items-center">
                                            <Button variant="primary" className="mt-4 btn w-100" onClick={getpdflink}>
                                                {!pdflink ? 'Upload' : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                                                    </svg>
                                                )}
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
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
                {Array.isArray(todayEntry) && todayEntry[0]?._id &&
                    <>
                        <div className='hd'>
                            <TypeAnimation
                                sequence={[
                                    "Today's Entry",
                                    4000,
                                ]}
                                wrapper="span"
                                speed={20}
                            />
                        </div>
                        <Table striped bordered hover variant="dark" >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-6">
                                                    Amazon Order id
                                                </div>
                                                <div className="col-md-4 col-sm-6">
                                                    Vendor ID
                                                </div>
                                                <div className="col-md-4 col-sm-6">
                                                    SKUs to match
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>Status</th>
                                    <th style={{ width: '90px' }}>
                                        View PDF
                                    </th>
                                    <th style={{ width: '90px' }}>
                                        Upload
                                    </th>
                                    <th style={{ width: '90px' }}>
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todayEntry.map((d, i) => (
                                        <motion.tr
                                            key={d._id}
                                            initial={{ opacity: 0, x: -80, y: -40 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                        >
                                            <td>{i + 1}</td>
                                            <td>
                                                <Accordion flush={false}>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-md-4 col-sm-6">
                                                                        {d['Amazon Order id']}
                                                                    </div>
                                                                    <div className="col-md-4 col-sm-6">
                                                                        {d['Vendor ID']}
                                                                    </div>
                                                                    <div className="col-md-4 col-sm-6">
                                                                        {d['SKUs to match']}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="container-fluid">
                                                                <div className="row">
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Amazon Order id -  <b>{d['Amazon Order id']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Vendor ID - <b> {d['Vendor ID']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        SKUs to match - <b>{d['SKUs to match']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Vendor Tracking- <b>{d['Vendor Tracking #']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        ASINs- <b>{d['ASINs']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Date ordered - <b>{d['Date ordered']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Retailer - <b>{d['Retailer']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Qty - <b>{d['Qty']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Qty Rec'd - <b>{d["Qty Rec'd"]}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Date Received - <b>{d['Date Received']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Qty Shipped  - <b>{d['Qty Shipped']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Date Shipped - <b>{d['Date Shipped']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Vendor Return  - <b>{d['Vendor Return']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Return date  - <b>{d['Return date']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Entry Date - <b>{d['Date']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Replacement Shoe Box - <b>{d['Replacement Shoe Box']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Notes - <b>{d['Notes']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Description  - <b>{d['Description']}</b>
                                                                    </div>

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Shoes  - <b>{d['Shoes']}</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </td>
                                            <td style={{ placeContent: 'center', fontWeight: 'bold' }}>
                                                {d['Vendor Return'] !== '' ? 'Return' : 'Unshipped'}
                                            </td>
                                            <td style={{ width: '90px' }} className='d-flex justify-content-center align-items-center'>
                                                {d.pdf && <a href={d.pdf} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                                    <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                                    <path fillRule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                                </svg></a>}
                                            </td>
                                            <td style={{ maxWidth: '100px' }}>
                                                <button className="nobtn" onClick={() => handleShow(d._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="nobtn" onClick={() => edit(d._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </button>
                                            </td>

                                        </motion.tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                }
            </div>
        </>
    )
}
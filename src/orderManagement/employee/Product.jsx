import { useEffect, useState } from "react"
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from 'react-type-animation';
import { Table, Button } from 'react-bootstrap';
import { motion } from "framer-motion";
import Accordion from 'react-bootstrap/Accordion';
import '../../App.scss'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

export default function Product() {

    const local = 'http://localhost:10000'
    const api = 'https://gstar-backend2-0.onrender.com'
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait');
    const [profile, setProfile] = useState({})

    const [result, setResult] = useState([{}])
    const [data, setData] = useState([{}])
    const [tables, setTables] = useState([])
    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        setProfile(user)
        handletable(user)
        alreadysaved(user.account)
    }, [])

    const [savedData, setSaveddata] = useState([])
    async function alreadysaved(account) {
        let res = await fetch(`${local}/inv/alreadysavedproduct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: account })
        })
        res = await res.json()
        if (res.status) {
            console.log(res)
            setSaveddata(res.data)
        }
    }

    function handletable(user) {
        console.log(user)
        let sheetlist = user.sheetlist || []
        console.log(sheetlist)
        let showtable = sheetlist.filter((s) => s.toLowerCase().includes('belk') || s.toLowerCase().includes('boscov'))
        setTables(showtable)
    }
    const startAuth = async () => {
        const response = await fetch("http://localhost:10000/api/google/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: profile.clientid,
                clientSecret: profile.secretkey,
            }),
        });

        const data = await response.json();
        window.location.href = data.url;
    };

    const [prange, setRange] = useState()
    async function fetchsheet(sheetname) {
        try {
            // let prevDate = await getsavedentry()
            let token = localStorage.getItem('google_token')
            let sheeturl = profile.sheet[sheetname].url
            let range = prange ? prange : profile.sheet[sheetname].range
            let clientId = profile.clientid
            let clientSecret = profile.secretkey
            let account = profile.account

            let sheetdetails = { token, sheetname, sheeturl, range, clientId, clientSecret, account }

            setLoading(true)
            let res = await fetch(`${local}/api/google/sheet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sheetdetails })
            });
            res = await res.json();
            console.log(res)
            setLoading(false)
            if (res.status) {
                Array.isArray(res.data[0]) && setResult(res.data[0])
                Array.isArray(res.data[0]) && setData(res.data[0])
                setSaveddata(res.updated)
            }
            else {
                startAuth()
            }
        } catch (err) {
            console.log(err)
            startAuth()
        }
    }

    const [selected, setSelected] = useState('Amazon Order id')
    const [searchkey, setSearchkey] = useState("");
    function search() {
        let newresult = result.filter((r) => r[selected] == searchkey);
        setResult(newresult)
    }
    function cancel() {
        setResult(data);
        setSearchkey('')
    }

    async function savedata() {
        setLoading(true)
        let res = await fetch(`${local}/om/data/savenewdata`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: result, name: profile.name })
        });
        res = await res.json();
        setLoading(false)

        if (res.status) {
            alert(`${res.count} New Data saved`)
            if (res.existingCount > 0) {
                alert(`${res.existingCount} entry already exist`)
            }
        } else {
            alert(res.msg)
            console.log(res.msg)
        }
    }
    const [newData, setNewdata] = useState([])


    function setRangeofsheet(r) {
        setRange(r)
    }

    async function deleteInventory(vendor) {
        let account = profile.account
        let res = await fetch(`${local}/inv/deleteinventory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vendor, account })
        })
        res = await res.json();
        if (res.status) {
            setAlrtmsg(`${res.msg}`)
            setSaveddata(res.data)
            handleShowAlert()
        }
    }

    async function deletesynced() {
        let res = await fetch(`${local}/inv/deletesynced`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: profile.account })
        })
        res = await res.json()
        if (res.status) {
            setSaveddata(res.data)
        }
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

            <div className="container ps-4 pe-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight: '150vh' }}>


                <div className="container mb-4">
                    <div className="row d-flex justify-content-center">
                        {savedData.length==3  && savedData[2].num > 0 && <Button className="text-center themebtn w-50 m-4 p-3" onClick={deletesynced}><h4>Please Clear Old Synced Data before starting new Sync <br /> (Old synced Data - {savedData[2].num})</h4> </Button>}
                        <div className="col-md-6 col-sm-12 pt-1">
                            {
                                tables.length > 0 &&
                                <div className="">
                                    {tables.map((t, i) => (
                                        <>
                                            <div className="tables container" key={i}>

                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                                                        <span className="fs-4">{t}</span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                                                        Range- <input type="text" placeholder={`Predefine Range - 0-${profile.sheet[t].range}`} onChange={(e) => setRangeofsheet(e.target.value)} />
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                                                        <button className="themebtn" onClick={() => fetchsheet(t)}>Fetch Product</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="col-md-6 col-sm-12 ps-4">
                            <h5><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="me-2 bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                            </svg>Already Saved Data</h5>
                            {
                                savedData.length > 0 &&
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th style={{ maxWidth: '40px' }}>Vendor</th>
                                            <th>Number of Product</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            savedData.map((s, i) => (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{s.vendor}</td>
                                                        <td>{s.num}</td>
                                                        <td>
                                                            <button className="nobtn" onClick={() => {
                                                                if (i === 2) {
                                                                   deletesynced();
                                                                } else {
                                                                    deleteInventory(s.vendor.toLowerCase());
                                                                }
                                                            }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            }
                        </div>
                    </div>
                </div>


                <div className="datacontainer" style={{ transition: '2s' }}>
                    <div className="container-fluid searchboxcontanier">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-8 col-sm-6 tableheading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="me-3 mb-2 bi bi-table" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                                </svg>
                                <h4>Total Data Saved - {Array.isArray(data) && data.length}</h4>
                            </div>

                            {Array.isArray(result) && result.length > 0 &&
                                <div className="col-md-4 col-sm-12" style={{ paddingRight: '5vw' }}>
                                    <div className="searchbox d-flex justify-content-evenly w-100">
                                        <Dropdown as={ButtonGroup}>
                                            <Button variant="success pt-2 pb-2">{selected}</Button>

                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setSelected("ASINs")}>ASINs</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setSelected("Vendor ID")}>Vendor ID</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setSelected("SKUs to match")}>SKUs to match</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setSelected("Vendor Tracking #")}>Vendor Tracking</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setSelected("Date ordered")}>Date ordered</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <input type="text" value={searchkey} onChange={(e) => setSearchkey(e.target.value)} placeholder='Search in Table' className="w-25" />
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
                                </div>}

                        </div>
                    </div>

                    {Array.isArray(result) && result.length > 0 &&
                        <div className="datatable">
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th style={{ maxWidth: '40px' }}>SKU</th>
                                        <th>Brand</th>
                                        <th>ASIN</th>
                                        <th>UPC</th>
                                        <th>Price</th>
                                        <th>Fulfillment</th>
                                        <th>Shipping Template</th>
                                        <th>Amazon Fees%</th>
                                        <th>Min Profit</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((d, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td style={{ maxWidth: '250px' }}>{d['SKU']}</td>
                                                <td style={{ maxWidth: '150px' }}>{d['Brand Name']}</td>
                                                <td style={{ maxWidth: '100px' }}>{d['ASIN']}</td>
                                                <td style={{ maxWidth: '120px' }}>{d['Input UPC']}</td>
                                                <td style={{ maxWidth: '30px' }}>{d['Product price']}</td>
                                                <td style={{ maxWidth: '30px' }}>{d['Fulfillment']}</td>
                                                <td style={{ maxWidth: '30px' }}>{d['Shipping Template']}</td>
                                                <td style={{ maxWidth: '30px' }}>{d['Amazon Fees%']}</td>
                                                <td style={{ maxWidth: '30px' }}>{d['Min Profit']}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

import { useEffect, useState } from "react"
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from 'react-type-animation';
import { Table, Button } from 'react-bootstrap';
import { motion } from "framer-motion";
import Accordion from 'react-bootstrap/Accordion';
import '../../App.scss'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
export default function Entrysheet({ state }) {

    const local = 'http://localhost:9000'
    const api = 'https://brand-b-1.onrender.com'
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait');
    const [profile, setProfile] = useState({})
    const [sheetdetails, setSheetdetail]=useState(null)

    useEffect(() => {
       fetchsheet(state)
       setSheetdetail(state)
       
    }, [])


    const [result, setResult] = useState([])
    const [data, setData] = useState([])

    const [selectedSheet, setSelectedsheet] = useState('Select')
    const [predata, setPrevdata] = useState([])
    async function getsavedentry() {
        let res = await fetch(`${api}/om/data/getsavedentry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: state.account })
        })
        res = await res.json();
        if (res.status) {
            res.data.length > 0 && setPrevdata(res.data)

            return res.data
        }
    }

    const startAuth = async () => {
        const response = await fetch("http://localhost:9000/api/google/auth", {
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


    async function fetchsheet(sheetdetails) {
        try {
                let prevDate = await getsavedentry()
                setLoading(true)
                console.log(sheetdetails.token)
                let res = await fetch(`${api}/api/google/sheet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sheetdetails})
                });
                res = await res.json();
                setLoading(false)
                if (res.status) {
                    if (res.sheet.toLowerCase() == 'inventory') {
                        const headers = ['Row #', 'Date ordered', 'Retailer', 'Amazon Order id', 'Vendor ID', 'Description', 'SKUs to match', 'Vendor Tracking #', 'ASINs', 'Qty', "Qty Rec'd", 'Date Received', 'Qty Shipped', 'Shoes', 'Date Shipped', 'Notes', 'Replacement Shoe Box', 'Vendor Return', 'Return date']
                        const result = res.data.map(row => {
                            return headers.reduce((obj, key, index) => {
                                obj[key] = row[index];
                                return obj;
                            }, {});
                        });
                        setResult(result)
                        setData(result);
                        const predataRows = prevDate.map((p) => p['Row #'])
                        const newEntries = result.filter(d => !predataRows.includes(Number(d['Row #'])));
                        setNewdata(newEntries)
                    } 
                }
                else {
                    startAuth()
                }
        } catch (err) {
            console.log(err)
            startAuth()
        }
    }

    async function fetchcustomsheet() {
        try {
                let prevDate = await getsavedentry()
                console.log(sheetdetails)
                setLoading(true)
                let res = await fetch(`${api}/api/google/sheet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sheetdetails})
                });
                res = await res.json();
                setLoading(false)
                if (res.status) {
                    if (res.sheet.toLowerCase() == 'inventory') {
                        const headers = ['Row #', 'Date ordered', 'Retailer', 'Amazon Order id', 'Vendor ID', 'Description', 'SKUs to match', 'Vendor Tracking #', 'ASINs', 'Qty', "Qty Rec'd", 'Date Received', 'Qty Shipped', 'Shoes', 'Date Shipped', 'Notes', 'Replacement Shoe Box', 'Vendor Return', 'Return date']
                        const result = res.data.map(row => {
                            return headers.reduce((obj, key, index) => {
                                obj[key] = row[index];
                                return obj;
                            }, {});
                        });
                        setResult(result)
                        setData(result);
                        const predataRows = prevDate.map((p) => p['Row #'])
                        const newEntries = result.filter(d => !predataRows.includes(Number(d['Row #'])));
                        setNewdata(newEntries)
                    } 
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
        let res = await fetch(`${api}/om/data/savenewdata`, {
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

    const [range, setRange] = useState()
    function setRangeofsheet(r) {
       setSheetdetail((prev)=>({...prev, range:r}))
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

            <div className="datacontainer" style={{ transition: '2s' }}>
                <div className="container-fluid searchboxcontanier">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4 col-sm-6 tableheading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="me-3 mb-2 bi bi-table" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                            </svg>
                           <input type="text" className="w-25" placeholder={`Range- ${state.range}`} onChange={(e)=> setRangeofsheet(e.target.value)}  />
                           <button className="themebtn" onClick={fetchcustomsheet}>Fetch Custom Range Data</button>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <>
                                <button className="nobtn text-white" onClick={() => setResult(predata)}>Old Data({predata.length})</button>
                                <button className="nobtn text-white" onClick={() => setResult(newData)}>New Data({newData.length})</button>
                                <button className="nobtn text-white" onClick={() => setResult(data)}>All Data({data.length})</button>
                                <Button className="btn ms-3" onClick={savedata}>Save Data ({result.length})</Button>
                            </>

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
                                    <th style={{ maxWidth: '20px' }}>Row #</th>
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
                                                    ASINs
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>Date Ordered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map((d, i) => (
                                        <motion.tr
                                            key={d._id}
                                            initial={{ opacity: 0, x: -80, y: -40 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                        >
                                            <td>{i + 1}</td>
                                            <td style={{ maxWidth: '50px' }}>{d['Row #']}</td>
                                            <td>
                                                <Accordion flush={false}>
                                                    <Accordion.Item eventKey="0" style={{ border: `2px solid ${d['Vendor Return'] !== undefined ? 'red' : d['Qty'] > 1 ? 'yellow' : 'white'}` }}>
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
                                                                        {d['ASINs']}
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

                                                                    <div className="col-md-3 col-sm-6">
                                                                        Entry Date - <b>{d['Date']}</b>
                                                                    </div>
                                                                    <div className="col-md-3 col-sm-6">
                                                                        Entry By - <b>{d['entryby']}</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </td>
                                            <td>{d['Date ordered']}</td>

                                        </motion.tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                }
            </div>

        </>
    )
}
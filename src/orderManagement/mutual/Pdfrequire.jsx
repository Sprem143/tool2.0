import { useEffect, useState } from "react"
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from 'react-type-animation';
import { Table, Button } from 'react-bootstrap';
import { motion ,useScroll } from "framer-motion";
import Accordion from 'react-bootstrap/Accordion';
import '../../App.scss'
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
export default function Pdfrequire({ state }) {

    const local = 'http://localhost:9000'
    const api = 'https://brand-b-1.onrender.com'
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait');
    const [file, setFile] = useState(null);
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }
    const [showtable, setShowTable] = useState(true)
    useEffect(() => {
        setShowTable(true)
        state?.account && nopdf(state.account)
    }, [])
    const [result, setResult] = useState([])
    const [data, setData] = useState([])
    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { scrollYProgress } = useScroll()

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };
    async function nopdf(account) {
        setLoading(true)
        let res = await fetch(`${api}/om/data/pdfrequire`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account })
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setResult(res.data)
            setData(res.data)
        } else if (res.status == 'notfound') {
            alert(res.msg)
        }
    }


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const updatepdflink = async () => {
        if (!file || !id) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("id", id);
        formData.append("uploadedby", state.name)
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

    const [selected, setSelected] = useState('Amazon Order id')
    const [searchkey, setSearchkey] = useState("");
    function search() {
        let newresult = result.filter((r) => r[selected] == searchkey);
        if (newresult.length > 0) {
            setResult(newresult)
        } else { alert('No result found') }
    }
    function cancel() {
        setResult(data);
        setSearchkey('')
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

            {Array.isArray(result) && result.length > 0 ?
                <div className="datacontainer" style={{ transition: '2s' }}>
                    <div className="container-fluid searchboxcontanier">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-4 col-sm-12 tableheading"><img src="/static/pdf.png" alt="" /> <TypeAnimation sequence={[`PDF require -  ${result.length}`, 4000,]} wrapper="span" speed={20} />
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
                                            <Dropdown.Item onClick={() => setSelected("Date ordered")}>Date ordered</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <input type="text" value={searchkey} onChange={(e) => setSearchkey(e.target.value)} placeholder='Search in Table' />
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
                            <div className="col-md-3 col-sm-12 d-flex">
                                <div className="fw-bolder" style={{ height: '40px', width: '120px', background: 'red', placeItems: 'center', display: 'grid' }}>Cancel Order</div>
                                <div className="fw-bolder" style={{ height: '40px', width: '170px', background: 'yellow', placeItems: 'center', display: 'grid', color: 'red' }}>Quantity more than 1</div>
                            </div>
                        </div>
                    </div>


                    <div className="datatable">

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
                                                    ASINs
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th style={{ width: '70px' }}>Quantity</th>
                                    <th>Download Label</th>

                                    <th style={{ width: '90px' }}>
                                        Upload
                                    </th>

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
                                            <td className="align-content-center">{d['Qty']}  </td>
                                            <td className="align-content-center"><a className="text-white" href={`https://sellercentral.amazon.com/orders-v3/order/${d['Amazon Order id']}`} target="_blank"> Download Label </a></td>

                                            <td style={{ maxWidth: '100px' }}>
                                                <button className="nobtn" onClick={() => handleShow(d._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
                : null}
        </>
    )
}
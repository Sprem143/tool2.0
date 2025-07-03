import { useState, useEffect, useRef } from "react"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
import Spinner from 'react-bootstrap/Spinner';
import '../../App.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import ClockLoader from "react-spinners/ClockLoader";
import { Link } from "react-router-dom";


export default function CheckProduct() {

    const navigate = useNavigate()
    const [islogin, setLogin] = useState(false)
    const [profile, setProfile] = useState({})
    const [msg, setMsg] = useState('Please Wait...')

    async function checklogin(token) {
        let res = await fetch(`${api}/om/employee/getprofile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        res = await res.json();
        console.log(res)
        if (res.status) {
            setProfile(res.employee);
            setLogin(true)
            getdata(res.employee.account);
        } else {
            navigate('/')
        }
    }
    useEffect(() => {
        let token = localStorage.getItem('gstar_om_employee');
        token ? checklogin(token) : navigate('/')
    }, [])

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('gstarpage'));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [edititem, setEdititem] = useState({})
    const [newSku, setNewsku] = useState('')
    const handleShow = (obj) => {
        setEdititem(obj)
        setNewsku(obj.SKU)
        setShow(true)
    };
    useEffect(() => {
        let pagenumber = localStorage.getItem('gstarpage');
        setCurrentPage(pagenumber)
    }, [])

    useEffect(() => {
        localStorage.setItem('gstarpage', currentPage)
    }, [currentPage])
    const [data, setData] = useState([{}])
    const [realdata, setRealData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(1);
    const [uncheck, setUnCheck] = useState([{}]);
    const [check, setCheck] = useState(0)

    const [value, setValue] = useState('')
    const [id, setId] = useState('')
    const itemsPerPage = 50;
    // Pagination calculation for displaying the current page's data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate the page numbers to be displayed
    const paginationRange = () => {
        const range = [];
        const maxPageNumbers = 5; // Max page numbers to show
        let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
        let endPage = startPage + maxPageNumbers - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxPageNumbers + 1, 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        return range;
    };

    const local = 'http://localhost:9000'
    const api = 'https://gstar-backend2-0.onrender.com'


    const setcurrentpage = async (n) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        n > 0 ? setCurrentPage(n) : setCurrentPage(1)
        setLoading(false)
    }

    const getdata = async (account) => {
        setLoading(true);
        let res = await fetch(`${api}/brand/getfiltersheetforcheck`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account: account })
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setRealData(res.data);
            let unchecked = res.data.filter((d) => d['Available Quantity']>4)
            setUnCheck(unchecked)
            setData(unchecked);
            setCheck(res.data.length - unchecked.length);
        } else {
            setLoading(false)
        }
    }

    const openlink = (url1, url2) => {
        window.open(url2, '_blank', 'noopener,noreferrer');
        window.open(url1, '_blank', 'noopener,noreferrer');
    }

    const deleteproduct = async (id) => {
        let ans = confirm('Are you sure, You want to delete?')
        if (ans) {
            let res = await fetch(`${api}/brand/deleteproduct`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            res = await res.json();
            if (res.status) {
                setAltmsg(`${res.count} Product deleted successfully`)
                handleShowAlert()
            } else {
                alert('Error while deleting product')
            }
        }
    }

    function filterProduct() {
        let filtered = realdata.filter((r) => r.SKU.length <= 40 && r['Product price']<80)
    
        setData(filtered)
    }

    const editsku = async () => {
        let res = await fetch(`${api}/brand/editsku`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: edititem._id, newsku: newSku })
        });
        res = await res.json();
        if (res.status) {
            setAltmsg('SKU edited successfully')
            setShow(false);
            handleShowAlert()
        }
        else {
            alert('Error, plz retry')
        }
    }

    const downloadfinalexcel = () => {
        let Brand = prompt('Enter Brand Name')

        let jsondata = data.map((d) => {
            return {
                'Date': new Date().toDateString().slice(4).replaceAll(" ", '-'),
                'SKU': d.SKU,
                'Vendor': d['Belk link'].includes('walmart')? 'Walmart':d['Belk link'].includes('belk')?'Belk':d['Belk link'].includes('boscovs')?'Boscovs': '',
                'SKU length': d.SKU.length,
                'Amz Title': d.Title,
                'Belk link': d['Belk link'],
                'Brand': d.Brand || Brand,
                'upc': "'" + d.UPC,
                'UPC': 'UPC' + d.UPC,
                'ASIN': d.ASIN,
                'gap1': '',
                'gap2': '',
                'gap3': '',
                'size': d.Size,
                'sku2': d.SKU,
                'Product price': d['Product price'],
                'Vendor Shipping': '0.00',
                'Fulfillment Shipping': d['Fulfillment Shipping'],
            };
        })
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(jsondata);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Final_Product_list.xlsx';
        link.click();
    }


    const setUncheckproduct = () => {
        setData(uncheck)
    }

    const all = () => {
        setData(realdata)
    }
    const refresh = () => {
        window.location.reload()
    }
    const editshippingcost = (value, id) => {
        setValue(value)
        setId(id)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [value]);
    const inputRef = useRef(null);

    const handleOutsideClick = async (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            if (value) {
                let res = await fetch(`${api}/brand/editshippingcost`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, value })
                })
                res = await res.json();
                if (res.status) {
                    handleShowAlert()
                }
                setValue('')
                setId('')
            }
        }
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alrtmsg, setAltmsg] = useState('Done')

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    // ---------check box
    const [idarr, setIdarr] = useState([])
    const handleCheckboxChange = (id) => {
        setIdarr((prevIdArr) => {
            if (prevIdArr.includes(id)) {
                return prevIdArr.filter((item) => item !== id); // Remove id if it exists
            } else {
                return [...prevIdArr, id]; // Add id if not exists
            }
        });
        console.log(idarr)
    };
    const deletemanyproduct = async () => {
        let res = await fetch(`${api}/brand/deletemanyproduct`, {
            method: 'DELETE',
            body: JSON.stringify({ arr: idarr, account: profile.account }),
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json()
        if (!res.status) {
            alert('Error while deleting')
        } else {
            setAltmsg(`${res.count} products deleted`)
            setRealData(res.data)
            setData(res.data)
            handleShowAlert()
        }
    }

    // ----------set shipping  cost in bulk------------
    const [shippingcost, setshippingcost] = useState('')
    const setbulkshippingcost = async () => {
        let res = await fetch(`${api}/brand/setbulkshippingcost`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idarr, shippingcost, account: profile.account })
        })
        res = await res.json();
        if (res.status) {
            setAltmsg(`${res.count} products S.C updated`)
            setIdarr([])
            handleShowAlert()
        }
    }
    return (

        <>
            {
                loading && (
                    <div className="sweet-loading fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div style={{ display: 'grid', placeItems: 'center', justifyItems: 'center', }}>
                            <div style={{ display: 'grid', placeItems: 'center', marginTop: "200px" }}>
                                <ClockLoader color="white" loading={loading} cssOverride={{ display: "block", margin: "0 auto", borderColor: "red" }} size={100} aria-label="Loading Spinner" data-testid="loader" />
                                <h3 className='mt-2 text-center'>{msg}</h3>
                            </div>

                        </div>
                    </div>
                )
            }

            <div className="container ps-4 pe-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', width: '100vw', minHeight: '100vh' }}>
                <div className="importantlink">
                    <ul className="links d-flex align-items-center" >
                        <li className="ps-4 pe-4"> <Link to='/om/employee'>Home Page</Link> </li>
                    </ul>
                </div>
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

                <Modal show={show} data-bs-theme='dark' className="border border-secondary" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <input type="text" value={edititem.SKU} className="me-4 w-25" /> */}
                        <input type="text" className="me-4 w-75" placeholder="Enter new SKU" value={newSku} onChange={(e) => setNewsku(e.target.value)} />
                        <button onClick={editsku} className="text-dark">Submit</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="container d-flex justify-content-center border border-secondary p-4 align-items-center flex-column">
                    <div className="tableheader row w-100">
                        <div className="col-md-2"> <button className="nobtn p-2 text-white" onClick={all}><h5>Total Products : {data.length}</h5></button></div>
                        <div className="col-md-3"> <button onClick={setUncheckproduct} className="nobtn p-2 text-white"><h5>Unchecked Products : {realdata.length - check}</h5></button></div>
                        <div className="col-md-3"> <button onClick={filterProduct} className="nobtn p-2 text-white"><h5>Filter</h5></button></div>
                        <div className="col-md-2"> <button onClick={refresh} className="nobtn p-2 text-white"><h5> Refresh <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ms-2 mb-1 bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg></h5></button></div>
                        <div className="col-md-2"> <h5 className="text-white">Current Page {currentPage}</h5></div>
                        <div className="col-md-3 d-flex align-items-center">
                            <h5 className="text-white">Go to Page </h5>
                            <input type="text" className="w-25 ms-4 p-1 " onChange={(e) => setcurrentpage(e.target.value)} />
                        </div>
                    </div>

                    <Table striped bordered hover variant="dark" style={{ width: '90vw', fontSize: '1.2em' }} >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th style={{ maxWidth: '50px' }}>Select</th>
                                <th>Amz Img</th>
                                <th>ASIN</th>
                                <th>SKU</th>
                                <th>SKU len.</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Shp. Cost</th>
                                <th>Open Link</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                                <tr key={i} style={{ maxHeight: '50px' }}>
                                    <td>{indexOfFirstItem + i + 1}</td>
                                    <td className="p-0" style={{ maxWidth: '50px', placeContent: 'center' }}>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(detailArray.ASIN)}
                                            className="hidden inptbox"
                                            style={{ maxWidth: '50px' }}
                                        />
                                    </td>
                                    <td className="p-0"><img src={detailArray['Img link']} alt="img" height='70px' className="brand_img" /></td>
                                    <td>{detailArray['ASIN']}</td>
                                    {
                                        detailArray['SKU'] &&
                                        <>
                                            <td style={{ border: detailArray['SKU'].length > 40 ? '2px solid red' : null }}>
                                                {detailArray['SKU']}
                                                <button className="nobtn" onClick={() => handleShow(detailArray)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="white" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td>{detailArray['SKU'].length}</td>
                                        </>
                                    }
                                    <td>{detailArray['Product price'] && detailArray['Product price'].toFixed(2)}</td>
                                    <td>{detailArray['Available Quantity']}</td>
                                    <td> <input style={{ width: '50px', margin: '8px', padding: '4px 3px' }} ref={inputRef} type="text" onChange={(e) => editshippingcost(e.target.value, detailArray._id)} on placeholder={detailArray['Fulfillment Shipping']} /></td>
                                    <td><button className='pt-1 pb-1 ps-2 pe-2' onClick={() => openlink(detailArray['Amazon link'], detailArray['Belk link'])}>Check links</button></td>
                                    <td><button className='pt-1 pb-1 ps-2 pe-2' onClick={() => deleteproduct(detailArray._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={() => handlePaginationClick(currentPage - 1)} disabled={currentPage === 1} />

                        {/* Display page numbers with ellipses if needed */}
                        {currentPage > 1 && <Pagination.Item onClick={() => handlePaginationClick(1)}>1</Pagination.Item>}
                        {currentPage > 3 && <Pagination.Ellipsis />}
                        {paginationRange().map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === currentPage}
                                onClick={() => handlePaginationClick(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                        {currentPage < totalPages && <Pagination.Item onClick={() => handlePaginationClick(totalPages)}>{totalPages}</Pagination.Item>}

                        <Pagination.Next onClick={() => handlePaginationClick(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
                <h1>
                    <Button className="btn btn-primary mb-4" onClick={downloadfinalexcel}>Download Final Sheet</Button>
                </h1>

                {
                    idarr.length > 0 &&
                    <div className="bulk">
                        <div className="upclist">{idarr.join(", ")}</div>
                        <div className="action mt-3">
                            <button className='pt-1 pb-1 ps-2 pe-2 me-3' onClick={deletemanyproduct}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                            </button>

                            <input type="text" className="w-0 rounded-pill p-2 me-2 border-opacity-10" placeholder="Shipping" onChange={(e) => setshippingcost(e.target.value)} />
                            <button onClick={setbulkshippingcost}>Set</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-circular-progressbar/dist/styles.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'

import ClockLoader from "react-spinners/ClockLoader";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ExtractSKU() {

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const navigate = useNavigate()
    const [profile, setProfile] = useState(null);
    const [showthread, setShowthread] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        user && setProfile(user)
    }, [])


    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState([]);
    const [msg, setMsg] = useState('Please wait')
    const [currentstatus, setCurrentstatus] = useState(null)




    const downloadProductExcel = async () => {
        let res = await fetch(`${api}/scrap/belk/downloadProductExcel`, {
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



    const uploadamzsheet = async (file) => {
        setLoading(true);
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('account', profile.account);
            var resp = await axios.post(`${api}/scrap/belk/uploadforcheck`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            if (resp.data.status) {
                let dataarray = resp.data.data.length
                if(dataarray==0){
                    alert('No product found on amazon')
                    return;
                }
                alert(`${dataarray} products found on amazon. Now you are redirecting to Check-product page`)
                navigate('/ecom/check-product')
            } else {
                alert(resp.data.msg)
                console.log(resp)
            }
        }
        setLoading(false);
    };
    const handleFileChange = (doc) => {
        setFile(doc);
        uploadamzsheet(doc)
    };
    const [html, setHtml] = useState('')

    function extractSKUFromRow() {

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find all elements that contain the SKU label
        const skuElements = doc.querySelectorAll('.sku');
        const skuList = Array.from(skuElements).map(el => {
          const text = el.textContent || '';
          const match = text.match(/SKU\s*:\s*(\S+)/);
          return match ? match[1] : null;
        })
        
        console.log(skuList);
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

                <div className="container-fluid pt-1 pb-3 searchboxcontanier">
                    <div className="row ps-4 pe-4">
                        <div className="col-md-7 d-flex align-items-center col-sm-12">
                            <ul className=' fs-5 links d-flex justify-content-evenly m-0 p-0' style={{ listStyle: 'none' }}>
                                <li><Link to='/om/employee'>Home Page</Link></li>
                                <li><Link to='' className='text-white ms-3'>Inventory Updation</Link></li>
                                <li><Link to='' className='text-white ms-3'>Products</Link></li>
                                <li><Link to='' className='text-white ms-3'>Orders</Link></li>
                                <li><Link to='/ecom/belk-brand-scrapping' className='text-white ms-3'>Belk Scrapping</Link></li>
                                <li><Link to='' className='text-white ms-3'>Backup</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-12">

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <h4 className='text-center ps-4 pe-4 pb-2 pt-2 headingtxt'>Extract SKU</h4>
                </div>


                <div className="p-4 pt-1">
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Copy and Paste Source Code here</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea name="htmlcode" id="htmlcode" cols={50} rows={10} placeholder='paste source code here' onChange={(e) => setHtml(e.target.value)} >

                            </textarea>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={()=>{handleClose(), extractSKUFromRow()}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="d-flex justify-content-center align-items-center">
                        <button className="themebtn" onClick={handleShow}>Add html</button>
                    </div>
                    

                   



                  
                </div>
            </div >
            <Outlet />
        </>
    )
}



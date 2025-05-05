import { useEffect, useState } from "react"
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from 'react-type-animation';
import { Table, Button } from 'react-bootstrap';
import { motion, useScroll } from "framer-motion";
import '../../App.scss'

export default function Urllist({ state }) {

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait');
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [account, setAccount]=useState('')
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }
    useEffect(() => {
        setResult(state.link)
        setData(state.link)
        setAccount(state.account)
    }, [])
    const [result, setResult] = useState([])
    const [data, setData] = useState([])
    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    async function deleteurl(url) {
        if(account){
      let res= await fetch(`${local}/scrap/belk/deleteurl`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({account,url})
       })
       res = await res.json()
       if(res.status){
        console.log(res)
        setResult(res.data)
        setData(res.data)
       }
        }else{
            alert('Please re-login and try again')
        }
    }

    const [searchkey, setSearchkey] = useState("");
    function search() {
        let searchresult = data.filter((d)=> d.includes(searchkey))
        setResult(searchresult)
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
                            <div className="col-md-4 col-sm-12 tableheading"><img src="/static/url.png" alt="" className="mb-1"/> <TypeAnimation sequence={[`Fetched url list-  ${result.length}`, 4000,]} wrapper="span" speed={20} />
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="searchbox d-flex justify-content-evenly w-100">
                                    <input type="text" value={searchkey} onChange={(e) => setSearchkey(e.target.value)} placeholder='Search in Table' className="w-100" />
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


                    <div className="datatable">

                        <Table striped bordered hover variant="dark" >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>URL</th>
                                    <th style={{ width: '90px' }}>Delete </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map((d, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -80, y: -40 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                        >
                                            <td>{i + 1}</td>

                                            <td className="align-content-center"><a href={d} >{d} </a> </td>
                                            <td style={{ maxWidth: '100px' }}>
                                                <button className="nobtn" onClick={() => deleteurl(d)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
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
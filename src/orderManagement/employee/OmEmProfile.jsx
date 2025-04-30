import { useEffect, useState } from "react"
import ClockLoader from "react-spinners/ClockLoader";
import { TypeAnimation } from 'react-type-animation';
import '../../App.scss'
import Modal from 'react-bootstrap/Modal';
import { input, ol } from "motion/react-client";
import { Table, Button } from 'react-bootstrap';
import { motion } from "framer-motion";

export default function OmEmProfile({ state }) {

    const local = 'http://localhost:10000'
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

    const [changefiled, setChangefield] = useState('')
    const [profile, setProfile] = useState()
    useEffect(() => {
        console.log(state)
        setProfile(state)
    }, [])

    const [alrtmsg, setAlrtmsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };


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
    const [secretkey, setSecretkey] = useState('')
    const [editkey, setEditkey] = useState(false)

    async function addsecretkey() {
        if (!secretkey || !state.email) {
            alert('Please add secret key')
            return;
        }
        if (secretkey && state.email) {
            setLoading(true)
            let res = await fetch(`${api}/om/employee/addsecretkey`, {
                method: 'POSt',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: state.email, key: secretkey })
            })
            res = await res.json();
            setLoading(false)
            if (res.status) {
                setAlrtmsg('Secret key updated')
                setEditkey('')
                setProfile(res.profile)
                handleShowAlert()
            } else {
                console.log(res.msg)
            }
        }
    }

    const [sheetdetails, setSheetdetails] = useState({})
    const [editsheet, setEditsheet] = useState(false)

    async function addsheetdetails() {
        if (!sheetdetails.url || !sheetdetails.range || !sheetdetails.sheetname) {
            alert('Please fill all field')
            return;
        }
        let id = profile._id
        setLoading(true)
        let newsheet = ({ ...sheetdetails, email: profile.email })
        let res = await fetch(`${api}/om/employee/addsheetdetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newsheet,id })
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            console.log(res.profile)
            setSheetdetails(null)
            setEditsheet(false)
            setAlrtmsg('Sheet details added successfully');
            setProfile(res.profile)
            handleShowAlert()
        }
    }

    function editseetdetail(name) {
        setEditsheet(true)
        setSheetdetails(profile.sheet[name])
    }
    const [clientId, setClientid] = useState('')
    const [editclientidkey, setEditclientid] = useState(false)
    async function addclientid() {
        if (!clientId) {
            alert('Enter client id first')
            return;
        }
        let id = profile._id
        let res = await fetch(`${api}/om/employee/addclientid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientId, id })
        })
        res = await res.json()
        console.log(res)
        if (res.status) {
            setAlrtmsg('Client ID added')
            setProfile(res.profile)
            setClientid('')
            handleShowAlert(true)
        } else {
            console.log(res.msg)
            alert('Error while adding client id')
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


            <div className="datacontainer" style={{ transition: '2s' }}>
                <div className="container-fluid searchboxcontanier">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-10 col-sm-10 tableheading"><img src={state.img} alt="" style={{ borderRadius: '50%' }} /> <TypeAnimation sequence={[`Hello ${state.name}, Update your Profile`, 4000,]} wrapper="span" speed={20} />
                        </div>
                        <div className="col-md-2 col-sm-22">
                            <button className="nobtn text-white">Logout</button>
                        </div>
                    </div>
                </div>

                <div className="datatable">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-sm-12">
                                <h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-3 bi bi-key-fill" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                    Your Current Secret key</h5>
                                {profile?.secretkey == '' &&
                                    <>
                                        <p>You Don't have any secret key. Add new Key </p>
                                        <div className="d-flex">
                                            <input type="text" name="secretkey" placeholder="Secreat key" onChange={(e) => setSecretkey(e.target.value)} />
                                            <button className="nobtn" onClick={addsecretkey}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                }
                                {
                                    profile?.secretkey &&
                                    <>
                                        <span className="fs-5 id">{profile.secretkey}</span>
                                        <button className="nobtn" onClick={() => setEditkey(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className=" ms-3 bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                            </svg>
                                        </button>

                                        {editkey &&
                                            <div className="d-flex">
                                                <input type="text" name="secretkey" placeholder={profile.secretkey} id={state._id} onChange={(e) => setSecretkey(e.target.value)} />
                                                <button className="nobtn" onClick={addsecretkey}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                    </>
                                }
                                <h5 className="mt-3 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="me-3 bi bi-table" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                                    </svg>
                                    Sheet Access</h5>
                                {
                                    profile?.sheet == undefined &&
                                    <>
                                        <p>You have not added any sheet details yet.</p>
                                        <div>
                                            <input type="text" placeholder="Sheet url" onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['url']: e.target.value }))} />
                                            <input type="text" placeholder="Sheet Name" onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['sheetname']: e.target.value }))} />
                                            <input type="text" placeholder="Number of docs." onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['range']: e.target.value }))} />
                                            <button className="nobtn" onClick={addsheetdetails}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                }
                                {
                                  Array.isArray(profile?.sheetlist) && profile.sheetlist.length > 0 &&
                                    <div className="datatable m-0">
                                        <Table striped bordered hover variant="dark" >
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '40px' }}>No</th>
                                                    <th style={{ width: '110px' }}>
                                                        Sheet Name
                                                    </th>
                                                    <th style={{ width: '90px' }}>
                                                        Sheet ID
                                                    </th>
                                                    <th style={{ width: '90px' }}>
                                                        Range
                                                    </th>
                                                    <th>Edit</th>
                                                    <th>View Sheet</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    profile.sheetlist.map((d, i) => (
                                                        <motion.tr
                                                            key={d._id}
                                                            initial={{ opacity: 0, x: -80, y: -40 }}
                                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                                        >
                                                            <td>{i + 1}</td>
                                                            <td> {profile.sheet[d]?.sheetname}  </td>
                                                            <td> {profile.sheet[d]?.url.split('/')[5]}  </td>
                                                            <td> {profile.sheet[d]?.range}  </td>

                                                            <td> <button className="nobtn" onClick={() => editseetdetail(profile.sheet[d]?.sheetname)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className=" ms-3 bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                                </svg>
                                                            </button></td>
                                                            <td><a href={profile.sheet[d]?.url} target="_blank">view</a></td>

                                                        </motion.tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                                <Button className="btn mt-2 " onClick={() => setEditsheet(true)}>Add New Sheet</Button>
                                {editsheet &&
                                    <>
                                        <div>
                                            <input type="text" placeholder="Sheet url" value={sheetdetails?.url || ''} onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['url']: e.target.value }))} />
                                            <input type="text" placeholder="Sheet Name" value={sheetdetails?.sheetname ||''} onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['sheetname']: e.target.value }))} />
                                            <input type="text" placeholder="Number of docs" value={sheetdetails?.range||''} onChange={(e) => setSheetdetails((prev) => ({ ...prev, ['range']: e.target.value }))} />
                                            <button className="nobtn" onClick={addsheetdetails}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                                                </svg>
                                            </button>
                                            <button className="nobtn ms-4" onClick={() => setEditsheet('')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                                </svg>
                                            </button>

                                        </div>

                                    </>
                                }
                            </div>
                            <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-start align-items-start">

                                <h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-person-gear" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>Client ID</h5>
                                {profile && profile.clientid !== '' ?
                                    <>
                                        <div className="d-flex mb-4 w-100">
                                            <span className="fs-4 id w-75"> {profile.clientid}</span>
                                            <button className="nobtn" onClick={() => setEditclientid(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className=" ms-3 bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {editclientidkey &&
                                            <div className="d-flex">
                                                <input type="text" name="secretkey" placeholder={profile.clientid} id={state._id} onChange={(e) => setClientid(e.target.value)} />
                                                <button className="nobtn" onClick={addclientid}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                    </> :
                                    <>
                                        <p>You haven't added any client id. Add here</p>
                                        <input type="text" onChange={(e) => setClientid(e.target.value)} />
                                        <button className="themebtn" onClick={addclientid}>Add</button>
                                    </>
                                }

                                <button className="nobtn text-white fs-5" onClick={() => setChangefield('password')}>Change Password</button>
                                {changefiled == 'password' &&
                                    <>
                                        <input type="text" placeholder="Enter Old password" />
                                        <input type="text" placeholder="Enter New password" />
                                        <div className="d-flex">
                                            <button>Submit</button>
                                            <Button className="btn btn-secondary ms-2 ps-4 pe-4" onClick={() => setChangefield('')}>Cancel</Button>
                                        </div>
                                    </>
                                }
                                <button className="nobtn text-white fs-5" onClick={() => setChangefield('img')}>Change Profile Photo</button>
                                {changefiled == 'img' &&
                                    <>
                                        <input type="file" placeholder="Enter Old password" />
                                        <div className="d-flex">
                                            <button>Submit</button>
                                            <Button className="btn btn-secondary ms-2 ps-4 pe-4" onClick={() => setChangefield('')}>Cancel</Button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
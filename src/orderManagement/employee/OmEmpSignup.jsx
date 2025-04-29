import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../App.scss'
import ClockLoader from "react-spinners/ClockLoader";

export default function OsEmpSignup() {

    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        account: '',
        role: '',
        name: "",
        mobile: "",
        email: "",
        img:"",
        password: "",
        addedby: 'Admin'
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('Please Wait....');
    const [otp, setOpt] = useState('')
    const [enteredotp, setEnteredotp] = useState('')
    const [isVerified, setVerified] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) newErrors[key] = `${key} is required`;
        });
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 1) {
            setErrors(validationErrors);
        } else {

            setErrors({});
            setLoading(true)
            let res = await fetch(`${api}/om/employee/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData })
            })
            res = await res.json();
            setLoading(false)
            alert("Signed up successfully!");
            navigate('/')
        }
    };

    const sendOpt = async () => {
        let email = formData.email;
        !email ? alert('Please Enter Email') : null
        setLoading(true)

        if (email) {
            let res = await fetch(`${api}/om/employee/sendotp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            res = await res.json();
            if (res.status) {
                setOpt(res.otp)
            } else {
                alert(res.msg)
            }
        }
        setLoading(false)
    }
    const Verifyotp = () => {
        if (!enteredotp) {
            alert('Please Enter opt')
        }
        if (otp == enteredotp) {
            setVerified(true)
        } else {
            alert("Incorrect OTP")
        }
    }

    async function uploadprofilepic(file) {
        if (!file) {
            alert('Please select file first')
            return
        }
        setLoading(true)
        let formData2 = new FormData();
        formData2.append('file', file);
        let res = await fetch(`${api}/upload/uploadprofilepic`, {
            method: 'POST',
            body: formData2,
            headers: {}
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setFormData({ ...formData, ['img']: res.img })
        } else {
            alert('Error while uploading img')
            console.log(res.msg)
        }
    }
    return (
        <>
            {loading && (
                <div className="sweet-loading fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div style={{ placeItems: 'center' }}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'absolute', left: '45%' }}>
                            <ClockLoader color="white" loading={loading} cssOverride={{ display: "block", margin: "0 auto", borderColor: "red" }} size={100} aria-label="Loading Spinner" data-testid="loader" />
                            <h3 className='mt-2 text-center'>{msg}</h3>
                        </div>

                    </div>
                </div>
            )}

            <div className="container" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', paddingLeft: '5vw', paddingRight: '5vw' }}>
                <motion.h1
                    className="shinetxt text-white text-center font-weight-bold mb-0"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 2,
                        scale: { type: "spring", bounce: 0.2 }
                    }}
                >
                    Welcome to Gstar Business
                </motion.h1>
                <hr />
                <h1 className="text-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="white" className="me-4 bi bi-person-fill-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                    Create Your Account</h1>
                <hr />
                <div className="row">
                    <div className="col-md-7 col-sm-12">
                        <motion.img
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            transition={{
                                duration: 2,
                                scale: { type: "spring", bounce: 0.2 }
                            }}
                            src="/static/signup.png" alt="" height='80%' />
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-100 bg-dark"
                                style={{ maxWidth: "400px" }}
                            >
                                <Card className="p-4 mb-4 shadow-sm bg-dark text-white login">
                                    <h2 className="text-center">Sign Up</h2> <hr />
                                    {formData.img &&
                                        <div className="mb-2" style={{ display: 'grid', placeItems: 'center' }}>
                                            <img src={formData?.img} alt="" style={{ borderRadius: '50%', height: '120px', width: '120px' }} />
                                        </div>
                                    }
                                    <div className="text-white">
                                       
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-white">Role of Employee</Form.Label>
                                            <div className="d-flex gap-3">
                                                <Form.Check
                                                    type="radio"
                                                    label="Prep"
                                                    name="role"
                                                    value="prep"
                                                    checked={formData.selection === "prep"}
                                                    onChange={handleChange}
                                                    inline
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Operator"
                                                    name="role"
                                                    value="operator"
                                                    checked={formData.selection === "operator"}
                                                    onChange={handleChange}
                                                    inline
                                                />
                                            </div>
                                            {errors.selection && <div className="text-danger mt-1">{errors.selection}</div>}
                                        </Form.Group>

                                        { formData.role == 'operator' &&
                                             <Form.Group className="mb-3">
                                             <Form.Label className="text-white">Select Account</Form.Label>
                                             <Form.Select
                                                 name="account"
                                                 value={formData.account}
                                                 onChange={handleChange}
                                                 isInvalid={!!errors.role}
                                             >
                                                 <option value="">-- Select Account --</option>
                                                 <option value="rcube">Rcube</option>
                                                 <option value="bijak">Bijak</option>
                                                 <option value="zenith">Zenith</option>
                                                 <option value="om">Om</option>
                                             </Form.Select>
                                             <Form.Control.Feedback type="invalid">
                                                 {errors.role}
                                             </Form.Control.Feedback>
                                         </Form.Group>
                                        }

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="tel"
                                                name="mobile"
                                                placeholder="Mobile Number"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                isInvalid={!!errors.mobile}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.mobile}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {otp && <p >OTP sent successfully</p>}

                                        <div className="d-flex mb-3">
                                            <button onClick={sendOpt} className="me-2">Get OTP</button>
                                            <Form.Control
                                                type="text"
                                                name="OTP"
                                                placeholder="Enter OTP"
                                                onChange={(e) => setEnteredotp(e.target.value)}
                                                style={{ width: '150px' }}
                                            />
                                            <button className="ms-2" onClick={Verifyotp} >Verify</button>
                                        </div>
                                        {isVerified && <p>OPT verified</p>}


                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <p>Upload Profile Pic</p>
                                        <input className="mb-2 mt-2" type="file" accept=".jpg ,.png, .jpeg" onChange={(e) => uploadprofilepic(e.target.files[0])} />

                                        {isVerified &&
                                            <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit}>
                                                Sign Up
                                            </Button>

                                        }
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-evenly mt-1">
                                        <p>Already registered </p>
                                        <Link style={{ textDecoration: 'none' }} to='/' >Login</Link>
                                    </div>
                                </Card>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

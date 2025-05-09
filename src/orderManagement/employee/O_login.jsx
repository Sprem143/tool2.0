import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "motion/react"
import ClockLoader from "react-spinners/ClockLoader";
import { useUser } from '../../userContext';
const O_login = () => {
    const navigate = useNavigate()
    const {setUser}= useUser()
    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait....');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('employee');
    useEffect(() => {
        localStorage.removeItem('user')
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setValidated(true);
        if (loginType == 'admin') {
            try {
                let result = await fetch(`${api}/om/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: password, loginType: loginType  })
                });
                result = await result.json();
                if (result.token) {
                    localStorage.setItem('gstar_admin', result.token)
                    navigate('/om/admin')
                }
            } catch (err) { 
                console.log(err);
            }
        } else if (loginType == 'employee') {
            try {
                let result = await fetch(`${api}/om/employee/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, loginType })
                });
                result = await result.json();
                setLoading(false)
                if (result.token) {
                    
                    setUser(result.profile)
                    localStorage.setItem('user', JSON.stringify(result.profile))
                    result.role == 'operator'?   localStorage.setItem('gstar_om_employee', result.token):  localStorage.setItem('gstar_prep_employee', result.token)
                  result.role == 'operator'? navigate('/om/employee') : navigate('/om/prep-employee')
                } else {
                    alert(result.msg)
                }
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log(err);
                alert(err)
            }
        }
        setError('');
    };

    const handleTabSelect = (key) => {
        setLoginType(key);
        setEmail('');
        setPassword('');
        setError('');
        setValidated(false);
    };
    // ---------order management login----------
  function redirectsignup(){
    if(loginType=='employee'){
           navigate('om/employee/signup')
    }else if(loginType=='admin'){
        navigate('om/admin/signup')
    }
  }
   
    return (
        <>
            {loading && (
                <div className="sweet-loading fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div style={{ placeItems: 'center' }}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', position: 'absolute', left: '45%' }}>
                            <ClockLoader color="white" loading={loading} cssOverride={{display: "block",margin: "0 auto", borderColor: "red"}} size={100} aria-label="Loading Spinner" data-testid="loader" />
                            <h3 className='mt-2 text-center'>{msg}</h3>
                        </div>

                    </div>
                </div>
            )}

            <div id='o_login' className="container pt-4 mt-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000', paddingLeft:'12vw', paddingRight:'12vw' }}>

                <TypeAnimation
                    sequence={[
                        'After login you can add new orders, upload and download label, manage return orders, view and track new orders etc..',
                        4000,
                    ]}
                    wrapper="span"
                    speed={80}
                    style={{ fontSize: '1.5rem' }}
                    repeat={Infinity}
                />
                <div className="mt-4 row d-flex justify-content-evenly">
                    <div className="col-md-8 col-sm-12">
                        <motion.img
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 2,
                                scale: { type: "spring", bounce: 0.2 }
                            }}
                            src="/static/login.png" alt="" height='80%' />

                    </div>

                    <div className="col-md-4 col-sm-12">
                        <Container className="mt-5">
                            <Row className="justify-content-center border login">
                                <Col xs={12} md={10} className='pb-4 pt-4 '>
                                    <h3 className="mb-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="me-3 bi bi-person-fill-lock" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                        </svg>
                                        Order Management</h3>
                                    <hr />
                                    <Tabs
                                        activeKey={loginType}
                                        onSelect={handleTabSelect}
                                        className="mb-3 justify-content-center"
                                    >
                                        <Tab eventKey="employee" title="Employee" />
                                        <Tab eventKey="admin" title="Admin" />
                                    </Tabs>

                                    {error && <Alert variant="danger">{error}</Alert>}

                                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100'>
                                        <Form.Group controlId="formEmail" className="mb-3 d-flex flex-column align-items-start">
                                            <Form.Label >email</Form.Label>
                                            <Form.Control
                                                className='text-white'
                                                type="text"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="formPassword" className="mb-3 d-flex flex-column align-items-start">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className='text-white'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your password.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100">
                                            {loginType === 'admin' ? 'Login as Admin' : loginType === 'superadmin' ? 'Login as Super Admin' : loginType === 'employee' ? 'Login as Employee' : null}
                                        </Button>
                                    </Form>
                                    <hr />
                                    <div className="d-flex justify-content-between mt-4 mb-3">
                                        <button className='nobtn text-white' onClick={redirectsignup}>Create New Account</button>
                                        <Link style={{ textDecoration: 'none' }} >Forgot Password</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default O_login;

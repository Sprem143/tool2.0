import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import { TypeAnimation } from 'react-type-animation';

const E_login = () => {
    const navigate = useNavigate()
    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Please Wait....');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('employee');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }
        let res = await fetch(`${api}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, loginType })
        })
        res = await res.json();
        if (res.status) {
            localStorage.setItem(`gstar_${loginType}`, res.token);
            // loginType == 'admin' ? navigate('/admin') : navigate('/brand')

        } else {
            alert(res.msg)
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

    return (
        <>
            {loading && (
                <div className="fixed top-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ top: '40%' }}>
                    <div style={{ placeItems: 'center' }}>
                        <Spinner animation="border" variant="primary" title='Wait' />
                        <h3 className='mt-2'>{msg}</h3>
                    </div>
                </div>
            )}
            <div id='e_login' className="container pt-4 mt-4" style={{ opacity: loading ? 0.1 : 1, color: loading ? 'black' : null, zIndex: '10000',  paddingLeft:'12vw', paddingRight:'12vw'  }}>
        
             <TypeAnimation
                    sequence={[
                        'After login you can find new products for listing, brand scrapping, inventory updation, track out of stock products  etc..',
                        4000,
                    ]}
                    wrapper="span"
                    speed={50}
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 2,
                            scale: { type: "spring", bounce: 0.2 }
                        }}
                        className="col-md-4 col-sm-12">
                        <Container className="mt-5">
                            <Row className="justify-content-center border login">
                                <Col xs={12} md={10} className='pb-4 pt-4 '>
                                    <h3 className="mb-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="me-3 bi bi-person-fill-lock" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                        </svg>
                                        E-commerce Login</h3>
                                    <hr />
                                    <Tabs
                                        activeKey={loginType}
                                        onSelect={handleTabSelect}
                                        className="mb-3 justify-content-center"
                                    >
                                        <Tab eventKey="employee" title="Employee Login" />
                                        <Tab eventKey="admin" title="Admin Login" />
                                    </Tabs>

                                    {error && <Alert variant="danger">{error}</Alert>}

                                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100'>
                                        <Form.Group controlId="formEmail" className="mb-3 d-flex flex-column align-items-start">
                                            <Form.Label >Email address</Form.Label>
                                            <Form.Control
                                                type="email"
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
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your password.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100">
                                            {loginType === 'admin' ? 'Login as Admin' : 'Login as Employee'}
                                        </Button>
                                    </Form>
                                    <div className="d-flex justify-content-between mt-4 mb-3">
                                        <Link style={{ textDecoration: 'none' }} to='/signup' >Create New Account</Link>
                                        <Link style={{ textDecoration: 'none' }} >Forgot Password</Link>
                                    </div>
                                </Col>

                            </Row>

                        </Container>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default E_login;

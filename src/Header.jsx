import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useUser } from './userContext';

function Header() {

  const { user } = useUser()
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    let user_detail = user ? user : JSON.parse(localStorage.getItem('user'))
    setProfile(user_detail)
  }, [])
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('gstar_om_employee');
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <>

      {
        profile &&
        ['lg'].map((expand) => (
          <Navbar key={expand} expand={expand} style={{ background: 'black', color: 'white' }} className="border text-white border-secondary border-start-0 border-end-0 ps-4" >
            <Container fluid className='p-0'>
              <Navbar.Brand href="/" className='fs-3'><img src="/static/gstar.png" height={60} alt="logo" className='me-4' /><span className="text-white">Gstar Tool</span>

              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='text-white'>
                    Gstar   </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 align-items-center" style={{ paddingRight: '5vw' }}>
                    <Link to='/pdf-rotator' className='text-white me-4'>PDF Rotator</Link>
                    <Link to='/label-generation' className='text-white me-4'>Label Generation</Link>

                    {profile &&
                      <>
                        <div className='ps-4' style={{ borderLeft: '1px solid gray' }}>
                          <p style={{ color: 'white' }} className='fs-6 mb-0'>Hello, {profile.name}</p>
                          <span className='text-white'>
                            Account :  {profile?.account}
                          </span>
                        </div>
                        {profile.img ? <img src={profile.img} alt="" className='p-1 ms-2' style={{ height: '60px', width: '60px', borderRadius: '50%', border: '1px solid gray' }} /> :
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="ms-3 bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                          </svg>

                        }

                        <button className='nobtn text-white' onClick={logout}>Log out</button>
                      </>
                    }
                  </Nav>

                </Offcanvas.Body>
                <div className='gifimage' style={{ width: '200px', height: '65px', backgroundImage: `url("/static/flying.gif")` }}>
                </div>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}

    </>
  );
}

export default Header;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { lazy, Suspense } from "react";
const Search = lazy(() => import("../mutual/Search"));
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

export default function Sidebar() {

  const [selected, setSelected] = useState("Amazon Order id");
  const [searchkey, setSearchkey] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sk, setSearchParams] = useState(null);

  const search = () => {
    setSearchParams({ key: searchkey, searchby: selected });
    setShowSearch(true);
  };
  const cancel = () => {
    setSearchkey('')
    setShowSearch(false);
  }
  return (
    <>
      <Navbar key={false} expand={false} className="mb-3 ps-4 border mt-0" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/om/admin/signup">Add Admin</Navbar.Brand>
          <Navbar.Brand href="/om/employee/signup">Add Employee</Navbar.Brand>
          <Navbar.Brand href="#">Add Prep-Center Employee</Navbar.Brand>
          {/* -----search box */}
          <div>
            <div className="searchbox d-flex justify-content-evenly w-100">
              <Dropdown as={ButtonGroup}>
                <Button variant="success pt-2 pb-2">{selected}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelected("ASINs")}>ASINs</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelected("Vendor ID")}>Vendor ID</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelected("SKUs to match")}>SKUs to match</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelected("Vendor Tracking #")}>Vendor Tracking</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input type="text" value={searchkey} onChange={(e) => setSearchkey(e.target.value)} placeholder='Search in database' />
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
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
            className="bg-dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className='text-white' id={`offcanvasNavbarLabel-expand-${false}`}>
                <div className='strap'>
                  <h3 className='text-white'>Gstar</h3>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='text-white'>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {showSearch && (
        <div id='untrackable'>
          <Suspense fallback={<div>Loading...</div>}>
            <Search sk={sk} />
          </Suspense>
        </div>
      )}
    </>
  )
}

import React, { useState } from 'react';
import axios from 'axios';
import ClockLoader from "react-spinners/ClockLoader";

function PDFRotator() {

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const [files, setFiles] = useState([]);
    const [msg, setMsg] = useState('Please Wait...')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        setLoading(true)
        for (let file of files) {
            formData.append('pdfs', file);
        }
        formData.append('angle', 90);

        const response = await axios.post(`${api}/shortcut/rotate-pdfs`, formData, {
            responseType: 'blob',
        });
        setLoading(false)

        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rotated_pdfs.zip';
        a.click();
    };

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


                <div className="App" style={{ padding: 40 }}>
                    <h1>PDF Rotator</h1>
                    <input type="file" multiple accept="application/pdf" onChange={handleChange} />
                    <br /><br />
                    <button onClick={handleUpload}>Upload and Rotate PDFs</button>
                </div>
            </div>
        </>

    );
}

export default PDFRotator;

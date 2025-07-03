
import {useState} from 'react'
import axios from 'axios'

export default function BabyName() {

    const local = 'http://localhost:9000'
    const api = 'https://brand-b-1.onrender.com'
    const [loading, setLoading] = useState(false);

    async function getname() {
        let res = await fetch(`${api}/name/scrapeNames`, {
            method: 'POST',
            headers: { 'COntent-Type': 'application/json' },
            body: JSON.stringify({ url: 'https://d1rinkb47qrxws.cloudfront.net' })
        })
         res = await res.json();
         console.log(res)
    }

    const handleDownload = async () => {
        try {
          const response = await axios.get(`${api}/name/downloadExcel`, {
            responseType: 'blob', // Important to specify this for file download
          });
    
          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(new Blob([response.data]));
          link.download = 'names_data.xlsx'; // Default file name
          link.click(); // Simulate a click to start the download
        } catch (error) {
          console.error('Error downloading the file', error);
        }
      };
    return (
        <>
            <h1 className="text-center">
                Baby Name Calculator
            </h1>
            <button onClick={getname}>Get</button>
            <button onClick={handleDownload}>Download</button>
        </>
    )
}
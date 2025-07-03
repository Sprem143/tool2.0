
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import '../App.scss'

export default function Label() {

  const local = 'http://localhost:9000'
  const api = 'https://gstar-backend2-0.onrender.com'
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    settext()
    // saveorder()
  }, [data])

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      let parsedData = XLSX.utils.sheet_to_json(sheet);
      parsedData = parsedData.slice(0, 25);
      parsedData = parsedData.map(p => {
        let vendorId = p['Vendor ID'] || '';
        vendorId = vendorId.toString()
        if (vendorId.toLowerCase().includes('return')) {
          return { ...p, 'Vendor Tracking #': vendorId };
        } else {
          return p;
        }
      });
      setData(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };
  // 					 						
  const downloadformat = () => {
    let jsondata =
      [{
        'Row #':'',
        'Shipping Company': '',
        'Date ordered': '',
        'Vendor': '',
        'Amazon Order id': ' ',
        'Vendor ID ': '',
        'Customer Name/Address': '',
        'Title': '',
        'SKUs': '',
        'ASINs': '',
        'Qty': '',
        'Vendor Tracking #': '',
        "Qty. Rec'd": '',
        "Qty Shipped": '',
        "Shoes": '',
        "Date Shipped": '',
        "Notes": '',
        "Replacement Shoe Box": '',
        "Vendor Return": '',
        "Return date": ''
      }];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsondata);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelFile], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Generate_label_text.xlsx';
    link.click();
  }

  const settext = () => {

    const msg = `Hello Sir,\nPlease ship the following orders. Please remove all the vendor-related evidence from the package before sending them to customers. \n \n`
    const msg1 = `AZ id: ${data[0] && data[0]['Amazon Order id']}\nProduct: ${data[0] && data[0]['Title']}\nTracking id: ${data[0] && data[0]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[0] && data[0]['Qty']}\nASIN: ${data[0] && data[0]['ASINs']}\nRow No: ${data[0] && data[0]['Row #']}\nVendor name: ${data[0] && data[0]['Vendor']}\n\n`

    const msg2 = `AZ id: ${data[1] && data[1]['Amazon Order id']}\nProduct: ${data[1] && data[1]['Title']}\nTracking id: ${data[1] && data[1]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[1] && data[1]['Qty']}\nASIN: ${data[1] && data[1]['ASINs']}\nRow No: ${data[1] && data[1]['Row #']}\nVendor name: ${data[1] && data[1]['Vendor']}\n\n`

    const msg3 = `AZ id: ${data[2] && data[2]['Amazon Order id']}\nProduct: ${data[2] && data[2]['Title']}\nTracking id: ${data[2] && data[2]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[2] && data[2]['Qty']}\nASIN: ${data[2] && data[2]['ASINs']}\nRow No: ${data[2] && data[2]['Row #']}\nVendor name: ${data[2] && data[2]['Vendor']}\n\n`

    const msg4 = `AZ id: ${data[3] && data[3]['Amazon Order id']}\nProduct: ${data[3] && data[3]['Title']}\nTracking id: ${data[3] && data[3]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[3] && data[3]['Qty']}\nASIN: ${data[3] && data[3]['ASINs']}\nRow No: ${data[3] && data[3]['Row #']}\nVendor name: ${data[3] && data[3]['Vendor']}\n\n`

    const msg5 = `AZ id: ${data[4] && data[4]['Amazon Order id']}\nProduct: ${data[4] && data[4]['Title']}\nTracking id: ${data[4] && data[4]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[4] && data[4]['Qty']}\nASIN: ${data[4] && data[4]['ASINs']}\nRow No: ${data[4] && data[4]['Row #']}\nVendor name: ${data[4] && data[4]['Vendor']}\n\n`

    const msg6 = `AZ id: ${data[5] && data[5]['Amazon Order id']}\nProduct: ${data[5] && data[5]['Title']}\nTracking id: ${data[5] && data[5]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[5] && data[5]['Qty']}\nASIN: ${data[5] && data[5]['ASINs']}\nRow No: ${data[5] && data[5]['Row #']}\nVendor name: ${data[5] && data[5]['Vendor']}\n\n`

    const msg7 = `AZ id: ${data[6] && data[6]['Amazon Order id']}\nProduct: ${data[6] && data[6]['Title']}\nTracking id: ${data[6] && data[6]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[6] && data[6]['Qty']}\nASIN: ${data[6] && data[6]['ASINs']}\nRow No: ${data[6] && data[6]['Row #']}\nVendor name: ${data[6] && data[6]['Vendor']}\n\n`

    const msg8 = `AZ id: ${data[7] && data[7]['Amazon Order id']}\nProduct: ${data[7] && data[7]['Title']}\nTracking id: ${data[7] && data[7]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[7] && data[7]['Qty']}\nASIN: ${data[7] && data[7]['ASINs']}\nRow No: ${data[7] && data[7]['Row #']}\nVendor name: ${data[7] && data[7]['Vendor']}\n\n`

    const msg9 = `AZ id: ${data[8] && data[8]['Amazon Order id']}\nProduct: ${data[8] && data[8]['Title']}\nTracking id: ${data[8] && data[8]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[8] && data[8]['Qty']}\nASIN: ${data[8] && data[8]['ASINs']}\nRow No: ${data[8] && data[8]['Row #']}\nVendor name: ${data[8] && data[8]['Vendor']}\n\n`

    const msg10 = `AZ id: ${data[9] && data[9]['Amazon Order id']}\nProduct: ${data[9] && data[9]['Title']}\nTracking id: ${data[9] && data[9]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[9] && data[9]['Qty']}\nASIN: ${data[9] && data[9]['ASINs']}\nRow No: ${data[9] && data[9]['Row #']}\nVendor name: ${data[9] && data[9]['Vendor']}\n\n`

    const msg11 = `AZ id: ${data[10] && data[10]['Amazon Order id']}\nProduct: ${data[10] && data[10]['Title']}\nTracking id: ${data[10] && data[10]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[10] && data[10]['Qty']}\nASIN: ${data[10] && data[10]['ASINs']}\nRow No: ${data[10] && data[10]['Row #']}\nVendor name: ${data[10] && data[10]['Vendor']}\n\n`

    const msg12 = `AZ id: ${data[11] && data[11]['Amazon Order id']}\nProduct: ${data[11] && data[11]['Title']}\nTracking id: ${data[11] && data[11]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[11] && data[11]['Qty']}\nASIN: ${data[11] && data[11]['ASINs']}\nRow No: ${data[11] && data[11]['Row #']}\nVendor name: ${data[11] && data[11]['Vendor']}\n\n`

    const msg13 = `AZ id: ${data[12] && data[12]['Amazon Order id']}\nProduct: ${data[12] && data[12]['Title']}\nTracking id: ${data[12] && data[12]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[12] && data[12]['Qty']}\nASIN: ${data[12] && data[12]['ASINs']}\nRow No: ${data[12] && data[12]['Row #']}\nVendor name: ${data[12] && data[12]['Vendor']}\n\n`

    const msg14 = `AZ id: ${data[13] && data[13]['Amazon Order id']}\nProduct: ${data[13] && data[13]['Title']}\nTracking id: ${data[13] && data[13]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[13] && data[13]['Qty']}\nASIN: ${data[13] && data[13]['ASINs']}\nRow No: ${data[13] && data[13]['Row #']}\nVendor name: ${data[13] && data[13]['Vendor']}\n\n`

    const msg15 = `AZ id: ${data[14] && data[14]['Amazon Order id']}\nProduct: ${data[14] && data[14]['Title']}\nTracking id: ${data[14] && data[14]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[14] && data[14]['Qty']}\nASIN: ${data[14] && data[14]['ASINs']}\nRow No: ${data[14] && data[14]['Row #']}\nVendor name: ${data[14] && data[14]['Vendor']}\n\n`

    const msg16 = `AZ id: ${data[15] && data[15]['Amazon Order id']}\nProduct: ${data[15] && data[15]['Title']}\nTracking id: ${data[15] && data[15]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[15] && data[15]['Qty']}\nASIN: ${data[15] && data[15]['ASINs']}\nRow No: ${data[15] && data[15]['Row #']}\nVendor name: ${data[15] && data[15]['Vendor']}\n\n`

    const msg17 = `AZ id: ${data[16] && data[16]['Amazon Order id']}\nProduct: ${data[16] && data[16]['Title']}\nTracking id: ${data[16] && data[16]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[16] && data[16]['Qty']}\nASIN: ${data[16] && data[16]['ASINs']}\nRow No: ${data[16] && data[16]['Row #']}\nVendor name: ${data[16] && data[16]['Vendor']}\n\n`

    const msg18 = `AZ id: ${data[17] && data[17]['Amazon Order id']}\nProduct: ${data[17] && data[17]['Title']}\nTracking id: ${data[17] && data[17]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[17] && data[17]['Qty']}\nASIN: ${data[17] && data[17]['ASINs']}\nRow No: ${data[17] && data[17]['Row #']}\nVendor name: ${data[17] && data[17]['Vendor']}\n\n`


    const msg19 = `AZ id: ${data[18] && data[18]['Amazon Order id']}\nProduct: ${data[18] && data[18]['Title']}\nTracking id: ${data[18] && data[18]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[18] && data[18]['Qty']}\nASIN: ${data[18] && data[18]['ASINs']}\nRow No: ${data[18] && data[18]['Row #']}\nVendor name: ${data[18] && data[18]['Vendor']}\n\n`

    const msg20 = `AZ id: ${data[19] && data[19]['Amazon Order id']}\nProduct: ${data[19] && data[19]['Title']}\nTracking id: ${data[19] && data[19]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[19] && data[19]['Qty']}\nASIN: ${data[19] && data[19]['ASINs']}\nRow No: ${data[19] && data[19]['Row #']}\nVendor name: ${data[19] && data[19]['Vendor']}\n\n`

    const msg21 = `AZ id: ${data[20] && data[20]['Amazon Order id']}\nProduct: ${data[20] && data[20]['Title']}\nTracking id: ${data[20] && data[20]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[20] && data[20]['Qty']}\nASIN: ${data[20] && data[20]['ASINs']}\nRow No: ${data[20] && data[20]['Row #']}\nVendor name: ${data[20] && data[20]['Vendor']}\n\n`

    const msg22 = `AZ id: ${data[21] && data[21]['Amazon Order id']}\nProduct: ${data[21] && data[21]['Title']}\nTracking id: ${data[21] && data[21]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[21] && data[21]['Qty']}\nASIN: ${data[21] && data[21]['ASINs']}\nRow No: ${data[21] && data[21]['Row #']}\nVendor name: ${data[21] && data[21]['Vendor']}\n\n`

    const msg23 = `AZ id: ${data[22] && data[22]['Amazon Order id']}\nProduct: ${data[22] && data[22]['Title']}\nTracking id: ${data[22] && data[22]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[22] && data[22]['Qty']}\nASIN: ${data[22] && data[22]['ASINs']}\nRow No: ${data[22] && data[22]['Row #']}\nVendor name: ${data[22] && data[22]['Vendor']}\n\n`


    const msg24 = `AZ id: ${data[23] && data[23]['Amazon Order id']}\nProduct: ${data[23] && data[23]['Title']}\nTracking id: ${data[23] && data[23]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[23] && data[23]['Qty']}\nASIN: ${data[23] && data[23]['ASINs']}\nRow No: ${data[23] && data[23]['Row #']}\nVendor name: ${data[23] && data[23]['Vendor']}\n\n`

    const msg25 = `AZ id: ${data[24] && data[24]['Amazon Order id']}\nProduct: ${data[24] && data[24]['Title']}\nTracking id: ${data[24] && data[24]['Vendor Tracking #'] || "Will update soon"}\nQty: ${data[24] && data[24]['Qty']}\nASIN: ${data[24] && data[24]['ASINs']}\nRow No: ${data[24] && data[24]['Row #']}\nVendor name: ${data[24] && data[24]['Vendor']}\n\n`

    const message = msg + (msg1.length < 140 ? '' : msg1) + (msg2.length < 140 ? '' : msg2) + (msg3.length < 140 ? '' : msg3) + (msg4.length < 140 ? '' : msg4) + (msg5.length < 140 ? '' : msg5) + (msg6.length < 140 ? '' : msg6) + (msg7.length < 140 ? '' : msg7) + (msg8.length < 140 ? '' : msg8) + (msg9.length < 140 ? '' : msg9) + (msg10.length < 140 ? '' : msg10) + (msg11.length < 140 ? '' : msg11) + (msg12.length < 140 ? '' : msg12) + (msg13.length < 140 ? '' : msg13) + (msg14.length < 140 ? '' : msg14) + (msg15.length < 140 ? '' : msg15) + (msg16.length < 140 ? '' : msg16) + (msg17.length < 140 ? '' : msg17) + (msg18.length < 140 ? '' : msg18) + (msg19.length < 140 ? '' : msg19) + (msg20.length < 140 ? '' : msg20) + (msg21.length < 140 ? '' : msg21) + (msg22.length < 140 ? '' : msg22) + (msg23.length < 140 ? '' : msg23) + (msg24.length < 140 ? '' : msg24) + (msg25.length < 140 ? '' : msg25)

    if (data.length > 0) {
      document.getElementById('txtarea').style.display = 'block'
    }

    document.getElementById("myTextarea").value = message;
  }

  function copyText() {
    const textarea = document.getElementById("myTextarea");
    navigator.clipboard.writeText(textarea.value)
      .then(() => {
        setCopied(true)
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
  const [clicked, setClicked] = useState(null);

  const handleClick = (id) => {
    setClicked(id);
    getpdf(id);
  };
  const getpdf = (id) => {
    let link = `https://sellercentral.amazon.com/orders-v3/order/${id}`
    navigator.clipboard.writeText(`${id}-Shipping label ${id}-Packaging Slip`);
    window.open(link, "_blank");
  }

  const saveorder = async () => {
    if (data.length > 0) {
      let orders = data.map((d) => {
        const newObj = { ...d };
        delete newObj['Row #'];
        delete newObj['Date'];
        delete newObj['Vendor ID'];
        delete newObj['ASINs'];
        delete newObj['Qty'];
        delete newObj['Vendor Tracking #'];
        return newObj;
      }
      )
      let res = await fetch(`${api}/inv/saveorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders })
      })
    }
  }
  return (
    <>
      <div style={{ padding: '20px 5vw' }}>
        <h3 className="text-center mb-4">
          Label Generation
        </h3>
        <div className="container-fluid mt-4 mb-4" style={{ padding: '0 10vw' }}>
          <div className="row border  p-4 m-2">
            <div className="col-md-4 border d-flex justify-content-center flex-column align-items-center">
              <h5 className="mb-2">Download Format </h5>
              <button onClick={downloadformat}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </button>
            </div>
            <div className="col-md-4 border p-2 d-flex justify-content-center flex-column align-items-center">
              <h5 className="mb-3">Upload for Generate Label Generation</h5>
              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            </div>
            <div className="col-md-4 border p-2 d-flex justify-content-center flex-column align-items-center">
              <h5 className="mb-3">Send Email</h5>
              <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="ms-4 me-4 bi bi-envelope-plus-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
                </svg>
              </a>
            </div>

          </div>


        </div>


        <div style={{ position: 'relative', display: 'none' }} className="container-fluid p-4 bg-dark" id="txtarea">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <button className="mb-2 text-white border-white" style={{ position: 'absolute', right: '28%', top: '1%', background: 'transparent' }} onClick={copyText}>
                {
                  copied ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-copy me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                  </svg>
                }
                Copy  </button>

              <textarea id="myTextarea" rows="210" cols="130" className="bg-dark text-white border-0">
              </textarea>
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
              <h3><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-3 bi bi-amazon" viewBox="0 0 16 16">
                <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
                <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
              </svg>Amazon order link</h3>
              <div className="d-flex">
                <div style={{ height: '30px', background: 'red' }} className="p-1 fw-bold d-flex justify-content-center align-items-center">Return</div>
                <div style={{ height: '30px', background: 'yellow' }} className=" text-dark p-1 fw-bold d-flex justify-content-center align-items-center">Return</div>
              </div>
              <ol>
                {
                  data.map((d, i) => (
                    d['Amazon Order id'] && (
                      <li className="fs-5" key={i} style={{ color: !d['Vendor Tracking #'] ? 'yellow' : d['Vendor Tracking #'].toString().toLowerCase().includes('return') ? 'red' : 'white' }}>
                        {d['Amazon Order id']} -
                        <button className="p-2 m-0 border-0 text-white" style={{ background: clicked === d["Amazon Order id"] ? "red" : "transparent" }} onClick={() => handleClick(d["Amazon Order id"])}>PDF </button>
                      </li>
                    )
                  ))
                }
              </ol>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}
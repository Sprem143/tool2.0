import { useEffect, useState } from "react";
import axios from "axios";

function Sheet() {
  const [data, setData] = useState([]);
  const[token, setToken]=useState({})
  const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'
  const fetchSheet = async () => {
    try {
      let res = await fetch(`${local}/api/google/sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }) // wrap it in an object
      });
      res = await res.json();
      console.log(res)
      if(res.status){
        setData(res.data)
      }else{
        window.location.href = "http://localhost:10000/api/google/auth";
      }
    } catch (err) {
      alert("Not authenticated. Redirecting...");
      window.location.href = "http://localhost:10000/api/google/auth";
    }
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("google_token"));
    console.log(token)
    setToken(token)
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={fetchSheet}>get</button>
      <h1>Google Sheet Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Sheet;

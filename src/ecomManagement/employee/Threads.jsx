import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import * as XLSX from 'xlsx'
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { motion } from "motion/react"



export default function Threads({ state }) {


    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [account, setAccount] = useState('')
    useEffect(() => {
        state?.account && setAccount(state.account)
        divideArrayIntoParts(state.urls, state.thread)
    }, [])

    const [link, setLinks] = useState([])
    const [index, setIndex] = useState({ index1: 0, index2: 0, index3: 0, index4: 0, index5: 0, index6: 0, index7: 0, index8: 0, index9: 0, index10: 0, index11: 0, index12: 0, index13: 0, index14: 0, index15: 0, index16: 0, index17: 0, index18: 0 });
    const [l, setL] = useState({ l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false, l8: false, l9: false, l10: false, l11: false, l12: false, l13: false, l14: false, l15: false, l16: false, l17: false, l18: false, })
     const[l1,setL1]=useState(false)

    function divideArrayIntoParts(array, num) {
        const totalParts = num;
        const partSize = Math.ceil(array.length / totalParts);
        const result = [];

        for (let i = 0; i < totalParts; i++) {
            const start = i * partSize;
            const end = start + partSize;
            result.push(array.slice(start, end));
        }
        setLinks(result)
        console.log(result)
    }


    const thread1 = async () => {
        setL((prev) => (
            { ...prev, l1: true }
        ))
        setL1(true)
        let urls = link[0];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-I - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index1: index
            }));
        }
        setL((prev) => (
            { ...prev, l1: false }
        ))
    }

    const thread2 = async () => {
        setL((prev) => (
            { ...prev, l2: true }
        ))
        let urls = link[1];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-II- ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index2: index
            }));
        }
        setL((prev) => (
            { ...prev, l2: false }
        ))
    }

    const thread3 = async () => {
        setL((prev) => (
            { ...prev, l3: true }
        ))
        let urls = link[2];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-III - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index3: index
            }));
        }
        setL((prev) => (
            { ...prev, l3: false }
        ))
    }

    const thread4 = async () => {
        setL((prev) => (
            { ...prev, l4: true }
        ))
        let urls = link[3];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread4`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index4: index
            }));
        }
        setL((prev) => (
            { ...prev, l4: false }
        ))
    }

    const thread5 = async () => {
        setL((prev) => (
            { ...prev, l5: true }
        ))
        let urls = link[4];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread5`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-V - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index5: index
            }));
        }
        setL((prev) => (
            { ...prev, l5: false }
        ))
    }

    const thread6 = async () => {
        setL((prev) => (
            { ...prev, l6: true }
        ))
        let urls = link[5];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread6`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index6: index
            }));
        }
        setL((prev) => (
            { ...prev, l6: false }
        ))
    }

    const thread7 = async () => {
        setL((prev) => (
            { ...prev, l7: true }
        ))
        let urls = link[6];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread7`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index7: index
            }));
        }
        setL((prev) => (
            { ...prev, l7: false }
        ))
    }

    const thread8 = async () => {
        setL((prev) => (
            { ...prev, l8: true }
        ))
        let urls = link[7];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread8`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index8: index
            }));
        }
        setL((prev) => (
            { ...prev, l8: false }
        ))
    }

    const thread9 = async () => {
        setL((prev) => (
            { ...prev, l9: true }
        ))
        let urls = link[8];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread9`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IX - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index9: index
            }));
        }
        setL((prev) => (
            { ...prev, l9: false }
        ))
    }

    const thread10 = async () => {
        setL((prev) => (
            { ...prev, l10: true }
        ))
        let urls = link[9];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread10`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-X - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index10: index
            }));
        }
        setL((prev) => (
            { ...prev, l10: false }
        ))
    }

    const thread11 = async () => {
        setL((prev) => (
            { ...prev, l11: true }
        ))
        let urls = link[10];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread11`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index11: index
            }));
        }
        setL((prev) => (
            { ...prev, l11: false }
        ))
    }
    const thread12 = async () => {
        setL((prev) => (
            { ...prev, l12: true }
        ))
        let urls = link[11];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread12`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index12: index
            }));
        }
        setL((prev) => (
            { ...prev, l12: false }
        ))
    }

    const thread13 = async () => {
        setL((prev) => (
            { ...prev, l13: true }
        ))
        let urls = link[12];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread13`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index13: index
            }));
        }
        setL((prev) => (
            { ...prev, l13: false }
        ))
    }

    const thread14 = async () => {
        setL((prev) => (
            { ...prev, l14: true }
        ))
        let urls = link[13];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread14`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index14: index
            }));
        }
        setL((prev) => (
            { ...prev, l14: false }
        ))
    }
    const thread15 = async () => {
        setL((prev) => (
            { ...prev, l15: true }
        ))
        let urls = link[14];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread15`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index15: index
            }));
        }
        setL((prev) => (
            { ...prev, l15: false }
        ))
    }

    const thread16 = async () => {
        setL((prev) => (
            { ...prev, l16: true }
        ))
        let urls = link[15];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread16`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index16: index
            }));
        }
        setL((prev) => ({ ...prev, l16: false }))
    }

    const thread17 = async () => {
        setL((prev) => (
            { ...prev, l17: true }
        ))
        let urls = link[16];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread17`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index17: index
            }));
        }
        setL((prev) => ({ ...prev, l17: false }))
    }
    const thread18 = async () => {
        setL((prev) => (
            { ...prev, l18: true }
        ))
        let urls = link[17];
        let index = 0;
        while (index < urls.length) {
            let url = urls[index]
            let res = await fetch(`${api}/scrap/belk/thread18`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            setIndex((prevState) => ({
                ...prevState,
                index18: index
            }));
        }
        setL((prev) => ({ ...prev, l18: false }))
    }
    const threads = {
        thread1, thread2, thread3, thread4, thread5, thread6, thread7, thread8, thread9, thread10, thread11, thread12, thread13, thread14, thread15, thread16, thread17, thread18
    };
    async function start() {
        const totalthread = link.length;
      thread1()
        // for (let i = 0; i < totalthread; i++) {
        //     const threadName = `thread${i + 1}`;

        //     if (threads[threadName]) {
        //         threads[threadName]();
        //         await delay(1000)
        //     } else {
        //         console.log(`No function defined for ${threadName}`);
        //     }
        // }
    }
    return (
        <>
            <div className="container">
                <button onClick={start}> start</button>
                <div className="row">
                    {link.length > 0 &&
                        <>
                            {
                                link.map((l, i) => (
                                    <>
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -80, y: -40 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                            className="col-lg-3 col-md-4 col-sm-6" >
                                            <div className={index[`index${i + 1}`]>0  && index[`index${i + 1}`]< link[i].length ? 'threadbox2' : 'threadbox1'}>
                                                <div className="d-flex flex-column align-items-center">
                                                    <h5>Thread - {i + 1} &nbsp;|| &nbsp;Total urls- {link[i].length} </h5>
                                                    <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                                                        <CircularProgressbar
                                                            value={(index[`index${i + 1}`] / link[i].length * 100)}
                                                            text={link[i]?.length? `${((index[`index${i + 1}`] / link[i].length) * 100).toFixed(0)}%`: '0%'}
                                                        />
                                                    </div>
                                                    <a href={link[i][index[`index${i + 1}`]]} target='_blank'>Visit Link</a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </>
                                ))
                            }
                        </>}
                </div>
            </div >
        </>
    )
}
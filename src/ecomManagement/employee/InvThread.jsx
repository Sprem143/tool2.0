import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { motion } from "motion/react"


export default function InvThread({ state }) {

    const local = 'http://localhost:10000'
    const api = 'https://tool-b.onrender.com'

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [account, setAccount] = useState('')
    useEffect(() => {
        console.log(state)
        state?.account && setAccount(state.account)
        divideArrayIntoParts(state.url, state.thread)
    }, [])

    const [link, setLinks] = useState([])
    // const [index, setIndex] = useState({ index1: 0, index2: 0, index3: 0, index4: 0, index5: 0, index6: 0, index7: 0, index8: 0, index9: 0, index10: 0, index11: 0, index12: 0, index13: 0, index14: 0, index15: 0, index16: 0, index17: 0, index18: 0 });
    const [index1, setIndex1] = useState(0)
    const [index2, setInde2] = useState(0)
    const [index3, setIndex3] = useState(0)
    const [index4, setIndex4] = useState(0)
    const [index5, setIndex5] = useState(0)
    const [index6, setIndex6] = useState(0)
    const [index7, setIndex7] = useState(0)
    const [index8, setIndex8] = useState(0)
    const [index9, setIndex9] = useState(0)
    const [index10, setIndex10] = useState(0)
    const [index11, setIndex11] = useState(0)
    const [index12, setIndex12] = useState(0)
    const [index13, setIndex13] = useState(0)
    const [index14, setIndex14] = useState(0)
    const [index15, setIndex15] = useState(0)
    const [index16, setIndex16] = useState(0)
    const [index17, setIndex17] = useState(0)
    const [index18, setIndex18] = useState(0)
    const [loading, setL] = useState({ l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false, l8: false, l9: false, l10: false, l11: false, l12: false, l13: false, l14: false, l15: false, l16: false, l17: false, l18: false, })
    const [speed, setSpeed] = useState({})
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
        let urls = link[0];
        let index = 0;
        while (index < urls.length) {
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account, })
            })
            res = await res.json();
            console.log(`Thread-I - ${res.status}|| ${url}`);

            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed1: timeTaken.toFixed(1) }));
            index += 1;
            setIndex1(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-II- ${res.status}|| ${url}`);

            !res.status && await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed2: timeTaken.toFixed(1) }));
            index += 1;
            setIndex2(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-III - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed3: timeTaken.toFixed(1) }));
            index += 1;
            setIndex3(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread4`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed4: timeTaken.toFixed(1) }));
            index += 1;
            setIndex4(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread5`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-V - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed5: timeTaken.toFixed(1) }));
            index += 1;
            setIndex5(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread6`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed6: timeTaken.toFixed(1) }));
            index += 1;
            setIndex6(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread7`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed7: timeTaken.toFixed(1) }));
            index += 1;
            setIndex7(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread8`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed8: timeTaken.toFixed(1) }));
            index += 1;
            setIndex8(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread9`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IX - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed9: timeTaken.toFixed(1) }));
            index += 1;
            setIndex9(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread10`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-X - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed10: timeTaken.toFixed(1) }));
            index += 1;
            setIndex10(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread11`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed11: timeTaken.toFixed(1) }));
            index += 1;
            setIndex11(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread12`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed12: timeTaken.toFixed(1) }));
            index += 1;
            setIndex12(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread13`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed13: timeTaken.toFixed(1) }));
            index += 1;
            setIndex13(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread14`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed14: timeTaken.toFixed(1) }));
            index += 1;
            setIndex14(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread15`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XV - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed15: timeTaken.toFixed(1) }));
            index += 1;
            setIndex15(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread16`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVI - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed16: timeTaken.toFixed(1) }));
            index += 1;
            setIndex16(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread17`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed17: timeTaken.toFixed(1) }));
            index += 1;
            setIndex17(index);
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread18`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVIII - ${res.status}|| ${url}`);
            res.status ? index++ : await delay(5000)
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed18: timeTaken.toFixed(1) }));
            index += 1;
            setIndex18(index);
        }
        setL((prev) => ({ ...prev, l18: false }))
    }
    const threads = {
        thread1, thread2, thread3, thread4, thread5, thread6, thread7, thread8, thread9, thread10, thread11, thread12, thread13, thread14, thread15, thread16, thread17, thread18
    };
    async function start() {
        const totalthread = link.length;
        // thread1()
        for (let i = 0; i < totalthread; i++) {
            const threadName = `thread${i + 1}`;

            if (threads[threadName]) {
                threads[threadName]();
                await delay(1000)
            } else {
                console.log(`No function defined for ${threadName}`);
            }
        }
    }
    return (
        <>
            <div className="container-fluid border border-secondary ps-4 pe-4 pb-4" style={{ borderRadius: '10px' }}>
                <div className="thread-header">
                    <button className="themebtn" onClick={start}>Start</button>
                </div>
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
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="col-lg-3 col-md-4 col-sm-6"
                                        >
                                            <div className={loading[`l${i + 1}`] ? 'threadbox2' : 'threadbox1'}>
                                                <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
                                                    <h5>Thread - {i + 1} &nbsp;</h5>
                                                    <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
                                                    <div className='container mt-2 mb-2' >
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <h6> Speed : {speed[`speed${i + 1}`] || 0} s/url</h6>
                                                            </div>
                                                            <div className="col-md-6 col-sm-6">
                                                                <h6>Status : {`index${i + 1}`}/{link[i].length}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(`index${i + 1}` / link[i].length * 100)} label={`${(`index${i + 1}` / (link[i].length == 0 ? 1 : link[i].length)) * 100}%`} />

                                                    <a href={link[i][`index${i + 1}`]} target='_blank'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
                                                            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
                                                        </svg>
                                                        Visit Product link</a>
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
import { useState, useEffect } from 'react'
import '../../App.scss'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { motion } from "motion/react"


export default function InvThread({ state }) {

    const local = 'http://localhost:9000'
    const api = 'https://brand-b-1.onrender.com'

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [account, setAccount] = useState('')
    useEffect(() => {
       let user = JSON.parse(localStorage.getItem('user'))
       console.log(user)
        state?.account ? setAccount(state.account) : setAccount(JSON.parse(localStorage.getItem('user')).account)
        divideArrayIntoParts(state.url, state.thread)
    }, [])

    const [link, setLinks] = useState([])
    const [index, setIndex] = useState({ index1: 0, index2: 0, index3: 0, index4: 0, index5: 0, index6: 0, index7: 0, index8: 0, index9: 0, index10: 0, index11: 0, index12: 0, index13: 0, index14: 0, index15: 0, index16: 0, index17: 0, index18: 0 });
    // const [index1, setIndex1] = useState(0)
    // const [index2, setIndex2] = useState(0)
    // const [index3, setIndex3] = useState(0)
    // const [index4, setIndex4] = useState(0)
    // const [index5, setIndex5] = useState(0)
    // const [index6, setIndex6] = useState(0)
    // const [index7, setIndex7] = useState(0)
    // const [index8, setIndex8] = useState(0)
    // const [index9, setIndex9] = useState(0)
    // const [index10, setIndex10] = useState(0)
    // const [index11, setIndex11] = useState(0)
    // const [index12, setIndex12] = useState(0)
    // const [index13, setIndex13] = useState(0)
    // const [index14, setIndex14] = useState(0)
    // const [index15, setIndex15] = useState(0)
    // const [index16, setIndex16] = useState(0)
    // const [index17, setIndex17] = useState(0)
    // const [index18, setIndex18] = useState(0)
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

    // const thread1 = async () => {
    //     setL((prev) => (
    //         { ...prev, l1: true }
    //     ))
    //     let urls = link[0];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread1`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account, })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-I - ${res.status}|| ${url}`);

    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed1: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex1(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l1: false }
    //     ))
    // }

    // const thread2 = async () => {
    //     setL((prev) => (
    //         { ...prev, l2: true }
    //     ))
    //     let urls = link[1];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread2`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-II- ${res.status}|| ${url}`);

    //         !res.status && await delay(5000)
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed2: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex2(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l2: false }
    //     ))
    // }

    // const thread3 = async () => {
    //     setL((prev) => (
    //         { ...prev, l3: true }
    //     ))
    //     let urls = link[2];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread3`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-III - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed3: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex3(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l3: false }
    //     ))
    // }

    // const thread4 = async () => {
    //     setL((prev) => (
    //         { ...prev, l4: true }
    //     ))
    //     let urls = link[3];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread4`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-IV - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed4: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex4(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l4: false }
    //     ))
    // }

    // const thread5 = async () => {
    //     setL((prev) => (
    //         { ...prev, l5: true }
    //     ))
    //     let urls = link[4];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread5`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-V - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed5: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex5(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l5: false }
    //     ))
    // }

    // const thread6 = async () => {
    //     setL((prev) => (
    //         { ...prev, l6: true }
    //     ))
    //     let urls = link[5];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread6`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-VI - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed6: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex6(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l6: false }
    //     ))
    // }

    // const thread7 = async () => {
    //     setL((prev) => (
    //         { ...prev, l7: true }
    //     ))
    //     let urls = link[6];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread7`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-VII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed7: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex7(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l7: false }
    //     ))
    // }

    // const thread8 = async () => {
    //     setL((prev) => (
    //         { ...prev, l8: true }
    //     ))
    //     let urls = link[7];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread8`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-VIII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed8: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex8(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l8: false }
    //     ))
    // }

    // const thread9 = async () => {
    //     setL((prev) => (
    //         { ...prev, l9: true }
    //     ))
    //     let urls = link[8];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread9`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-IX - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed9: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex9(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l9: false }
    //     ))
    // }

    // const thread10 = async () => {
    //     setL((prev) => (
    //         { ...prev, l10: true }
    //     ))
    //     let urls = link[9];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread10`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-X - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed10: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex10(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l10: false }
    //     ))
    // }

    // const thread11 = async () => {
    //     setL((prev) => (
    //         { ...prev, l11: true }
    //     ))
    //     let urls = link[10];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread11`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XI - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed11: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex11(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l11: false }
    //     ))
    // }
    // const thread12 = async () => {
    //     setL((prev) => (
    //         { ...prev, l12: true }
    //     ))
    //     let urls = link[11];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread12`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed12: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex12(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l12: false }
    //     ))
    // }

    // const thread13 = async () => {
    //     setL((prev) => (
    //         { ...prev, l13: true }
    //     ))
    //     let urls = link[12];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread13`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XIII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed13: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex13(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l13: false }
    //     ))
    // }

    // const thread14 = async () => {
    //     setL((prev) => (
    //         { ...prev, l14: true }
    //     ))
    //     let urls = link[13];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread14`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XIV - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed14: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex14(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l14: false }
    //     ))
    // }
    // const thread15 = async () => {
    //     setL((prev) => (
    //         { ...prev, l15: true }
    //     ))
    //     let urls = link[14];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread15`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XV - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed15: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex15(index);
    //     }
    //     setL((prev) => (
    //         { ...prev, l15: false }
    //     ))
    // }

    // const thread16 = async () => {
    //     setL((prev) => (
    //         { ...prev, l16: true }
    //     ))
    //     let urls = link[15];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread16`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XVI - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed16: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex16(index);
    //     }
    //     setL((prev) => ({ ...prev, l16: false }))
    // }

    // const thread17 = async () => {
    //     setL((prev) => (
    //         { ...prev, l17: true }
    //     ))
    //     let urls = link[16];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread17`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XVII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed17: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex17(index);
    //     }
    //     setL((prev) => ({ ...prev, l17: false }))
    // }
    // const thread18 = async () => {
    //     setL((prev) => (
    //         { ...prev, l18: true }
    //     ))
    //     let urls = link[17];
    //     let index = 0;
    //     while (index < urls.length) {
    //         const startTime = performance.now();
    //         let url = urls[index]
    //         let res = await fetch(`${api}/inv/thread18`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url, account: account })
    //         })
    //         res = await res.json();
    //         console.log(`Thread-XVIII - ${res.status}|| ${url}`);
            
    //         const endTime = performance.now();
    //         const timeTaken = (endTime - startTime) / 1000;
    //         setSpeed(prev => ({ ...prev, speed18: timeTaken.toFixed(1) }));
    //         index += 1;
    //         setIndex18(index);
    //     }
    //     setL((prev) => ({ ...prev, l18: false }))
    // }


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
            !res.status && await delay(5000)
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
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-III - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed3: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread4`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IV - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed4: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread5`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-V - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed5: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread6`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VI - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed6: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread7`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed7: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread8`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-VIII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed8: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread9`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-IX - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed9: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread10`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-X - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed10: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread11`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XI - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed11: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread12`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed12: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread13`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed13: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread14`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XIV - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed14: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread15`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XV - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed15: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread16`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVI - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed16: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread17`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed17: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
            const startTime = performance.now();
            let url = urls[index]
            let res = await fetch(`${api}/inv/thread18`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, account: account })
            })
            res = await res.json();
            console.log(`Thread-XVIII - ${res.status}|| ${url}`);
            
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000;
            setSpeed(prev => ({ ...prev, speed18: timeTaken.toFixed(1) }));
            index += 1;
            !res.status && await delay(5000)
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
        // <>
        //     <div className="container-fluid border border-secondary ps-4 pe-4 pb-4" style={{ borderRadius: '10px' }}>
        //         <div className="thread-header">
        //             <button className="themebtn" onClick={start}>Start</button>
        //         </div>
        //         <div className="row">
        //             {/* {link.length > 0 &&
        //                 <>
        //                     {
        //                         link.map((l, i) => (
        //                             <>
        //                                 <motion.div key={i}
                                            
        //                                     initial={{ opacity: 0, x: -80, y: -40 }}
        //                                     animate={{ opacity: 1, x: 0, y: 0 }}
        //                                     transition={{ duration: 0.5, delay: i * 0.1 }}
        //                                     className="col-lg-3 col-md-4 col-sm-6"
        //                                 >
        //                                     <div className={loading[`l${i + 1}`] ? 'threadbox2' : 'threadbox1'}>
        //                                         <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                                             <h5>Thread - {i + 1} &nbsp;</h5>
        //                                             <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                                             <div className='container mt-2 mb-2' >
        //                                                 <div className="row">
        //                                                     <div className="col-md-6 col-sm-6">
        //                                                         <h6> Speed : {speed[`speed${i + 1}`] || 0} s/u</h6>
        //                                                     </div>
        //                                                     <div className="col-md-6 col-sm-6">
        //                                                         <h6>Status : {`index${i + 1}`}/{link[i].length}</h6>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                             <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(`index${i + 1}` / link[i].length * 100)} label={`${(`index${i + 1}` / (link[i].length == 0 ? 1 : link[i].length)) * 100}%`} />

        //                                             <a href={link[i][`index${i + 1}`]} target='_blank'>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                                     <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                                     <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                                                 </svg>
        //                                                 Visit Product link</a>
        //                                         </div>
        //                                     </div>
        //                                 </motion.div>
        //                             </>
        //                         ))
        //                     }
        //                 </>} */}

        //             {link.length > 0 && <motion.div initial={{ opacity: 0, x: -80, y: -40 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 0.0 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l1`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - I </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed1`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index1} / {link[0].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index1 / link[0].length * 100)} label={`${(index1 / (link[0].length == 0 ? 1 : link[0].length)) * 100}%`} />

        //                         <a href={link[0][index1]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}
        //             {/* ----------second thread---------- */}
        //             {link.length > 1 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l2`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - II </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed2`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index2} / {link[1].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index2 / link[1].length * 100)} label={`${(index2 / (link[1].length == 0 ? 1 : link[1].length)) * 100}%`} />

        //                         <a href={link[1][index2]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}
        //             {/* ------------third thread----------- */}

        //             {link.length > 2 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l3`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - III </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed3`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index3} / {link[2].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index3 / link[2].length * 100)} label={`${(index3 / (link[2].length == 0 ? 1 : link[2].length)) * 100}%`} />

        //                         <a href={link[2][index3]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------forth thread---------- */}
        //             {link.length > 3 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l4`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - IV </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed4`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index4} / {link[3].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index4 / link[3].length * 100)} label={`${(index4 / (link[3].length == 0 ? 1 : link[3].length)) * 100}%`} />

        //                         <a href={link[3][index4]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------fifth thread---------- */}
        //             {link.length > 4 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l5`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - V </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed5`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index5} / {link[4].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index5 / link[4].length * 100)} label={`${(index5 / (link[4].length == 0 ? 1 : link[4].length)) * 100}%`} />

        //                         <a href={link[4][index5]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------sixth thread---------- */}
        //             {link.length > 5 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l6`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - VI </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed6`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index6} / {link[5].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index6 / link[5].length * 100)} label={`${(index6 / (link[5].length == 0 ? 1 : link[5].length)) * 100}%`} />

        //                         <a href={link[5][index6]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------seventh thread---------- */}
        //             {link.length > 6 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l7`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - VII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed7`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index7} / {link[6].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index7 / link[6].length * 100)} label={`${(index7 / (link[6].length == 0 ? 1 : link[6].length)) * 100}%`} />

        //                         <a href={link[6][index7]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------eighth thread---------- */}
        //             {link.length > 7 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 1.4 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l8`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - VIII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed8`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index8} / {link[7].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index8 / link[7].length * 100)} label={`${(index8 / (link[7].length == 0 ? 1 : link[7].length)) * 100}%`} />

        //                         <a href={link[7][index8]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------ninth thread---------- */}
        //             {link.length > 8 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 1.6 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l9`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - IX </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed9`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index9} / {link[8].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index9 / link[8].length * 100)} label={`${(index9 / (link[8].length == 0 ? 1 : link[8].length)) * 100}%`} />

        //                         <a href={link[8][index9]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------tenth thread---------- */}
        //             {link.length > 9 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 1.8 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l9`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - X </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed10`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index10} / {link[9].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index10 / link[9].length * 100)} label={`${(index10 / (link[9].length == 0 ? 1 : link[9].length)) * 100}%`} />
        //                         <a href={link[9][index10]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}


        //             {/* ------------eleventh thread---------- */}
        //             {link.length > 10 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.0 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l10`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XI </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed11`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index11} / {link[10].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index11 / link[10].length * 100)} label={`${(index11 / (link[10].length == 0 ? 1 : link[10].length)) * 100}%`} />
        //                         <a href={link[10][index11]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------twelve thread---------- */}
        //             {link.length > 11 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.1 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l12`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed12`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index12} / {link[11].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index12 / link[11].length * 100)} label={`${(index12 / (link[11].length == 0 ? 1 : link[11].length)) * 100}%`} />
        //                         <a href={link[11][index12]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------thirteen thread---------- */}
        //             {link.length > 12 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.2 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l13`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XIII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed13`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index13} / {link[12].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index13 / link[12].length * 100)} label={`${(index13 / (link[12].length == 0 ? 1 : link[12].length)) * 100}%`} />
        //                         <a href={link[12][index13]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------forteen thread---------- */}
        //             {link.length > 13 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.3 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l14`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XIV </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed14`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index14} / {link[13].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index14 / link[13].length * 100)} label={`${(index14 / (link[13].length == 0 ? 1 : link[13].length)) * 100}%`} />
        //                         <a href={link[13][index14]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //             {/* ------------fifteen thread---------- */}
        //             {link.length > 14 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.4 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l15`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XV </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed15`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index15} / {link[14].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index15 / link[14].length * 100)} label={`${(index15 / (link[14].length == 0 ? 1 : link[14].length)) * 100}%`} />
        //                         <a href={link[14][index15]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //                {/* ------------sixteen thread---------- */}
        //                {link.length > 15 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.5 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l15`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XVI </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed16`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index16} / {link[15].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index16 / link[15].length * 100)} label={`${(index16 / (link[15].length == 0 ? 1 : link[15].length)) * 100}%`} />
        //                         <a href={link[15][index16]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //              {/* ------------seventeen thread---------- */}
        //              {link.length > 16 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.6 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l17`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XVII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed17`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index17} / {link[16].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index17 / link[16].length * 100)} label={`${(index17 / (link[16].length == 0 ? 1 : link[16].length)) * 100}%`} />
        //                         <a href={link[16][index17]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}

        //               {/* ------------eithteen thread---------- */}
        //               {link.length > 17 && <motion.div initial={{ opacity: 0, x: -80, y: -0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.5, delay: 2.7 }} className="col-lg-3 col-md-4 col-sm-6" >
        //                 <div className={loading[`l18`] ? 'threadbox2' : 'threadbox1'}>
        //                     <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{ background: '#00000078' }}>
        //                         <h5>Thread - XVIII </h5>
        //                         <div style={{ width: '100%', height: '1px', background: 'blue' }}></div>
        //                         <div className='container mt-2 mb-2' >
        //                             <div className="row">
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6> Speed : {speed[`speed18`] || 0} s/u</h6>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-6">
        //                                     <h6>Status : {index18} / {link[17].length}</h6>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <ProgressBar className='w-100 mb-2' style={{ height: '25px' }} now={(index18 / link[17].length * 100)} label={`${(index18 / (link[17].length == 0 ? 1 : link[17].length)) * 100}%`} />
        //                         <a href={link[17][index18]} target='_blank'>
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-link" viewBox="0 0 16 16">
        //                                 <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        //                                 <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        //                             </svg>
        //                             Visit Product link</a>
        //                     </div>
        //                 </div>
        //             </motion.div>}
        //         </div>
        //     </div >
        // </>


        <>
        <div className="container-fluid border border-secondary p-0 " style={{borderRadius:'15px'}}>
          <div className="thread-header">
            <button className="themebtn" onClick={start}>Start Syncing</button>
          </div>
            <div className="row ps-4 pe-4 pb-4">
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
                                        className="col-lg-3 col-md-4 col-sm-6"
                                    >
                                        <div className={loading[`l${i + 1}`] ? 'threadbox2' : 'threadbox1'}>
                                            <div className="d-flex w-100 ps-2 pe-2 flex-column align-items-center" style={{background:'#00000078'}}>
                                                <h5>Thread - {i + 1} &nbsp;</h5>
                                                <div style={{width:'100%', height:'1px', background:'blue'}}></div>
                                                <div className='container mt-2 mb-2' >
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-6">
                                                            <h5> Speed : {speed[`speed${i + 1}`] || 0} s/url</h5>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6">
                                                           <h5>Status : {index[`index${i+1}`]}/{link[i].length}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ProgressBar className='w-100 mb-2' style={{height:'25px'}} now={(index[`index${i + 1}`]/ link[i].length * 100)} label={`${(index[`index${i + 1}`] / (link[i].length==0?1:link[i].length))*100}%`} />

                                                <a href={link[i][index[`index${i + 1}`]]} target='_blank'>
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
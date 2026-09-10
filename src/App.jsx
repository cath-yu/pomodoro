// REACT
import { useEffect, useState, useRef } from "react";

// ASSETS
import Cloud from "./assets/cloud.svg";
import MatterhornDark from "./assets/matterhorn_dark.png";
import MatterhornLight from "./assets/matterhorn_light.jpg";
import Moon from "./assets/moon.svg";
import Pause from "./assets/pause.svg";
import Play from "./assets/play.svg";
import RainCloud from "./assets/rain_cloud.svg";
import Sun from "./assets/sun.svg";
import Alarm from "../public/alarm.mp3";

// CSS
import "./App.css";

export default function App() {
    // time consts
    const workTime = 1500;
    const breakTime = 300;
    const longBreakTime = 900;

    // timer states
    const [time, setTime] = useState(workTime);
    const [running, setRunning] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [sessionCount, setSessionCount] = useState(0);

    // timer ref and values
    const timerRef = useRef(null);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // visual states
    const [lightMode, setLightMode] = useState(true);
    const [rainToggle, setRainToggle] = useState(false);

    // alarm sound effect
    const alarm = new Audio(Alarm);
    alarm.volume = 0.1;
    
    // update timer
    useEffect(() => {
        if (!running) return;

        timerRef.current = setInterval(() => {
            // if time is 0, mark as a completed session, otherwise decrement
            setTime(prev => {
                if (prev <= 0) {
                    handleSessionComplete();
                }
                return prev-1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [running, isWorkSession])

    // set timer based on the session
    const handleSessionComplete = () => {
        // play the alarm sound effect
        alarm.play();

        // set the next session
        if (isWorkSession) {
            // add 1 to a const because of stale state
            const tempCount = sessionCount+1;
            setSessionCount(tempCount);
            // if it is the fourth session, take a longer break
            setTime(tempCount % 4 === 0 ? longBreakTime : breakTime);
            setIsWorkSession(false);
        } else {
            setTime(workTime);
            setIsWorkSession(true);
        }
    }

    const handlePlay = () => {
        setRunning(true);
    }

    const handlePause = () => {
        setRunning(false);
        clearInterval(timerRef.current);
    }

    // switch between backgrounds for light and dark mode
    useEffect(() => {
        const background = lightMode ? MatterhornLight : MatterhornDark;
        document.body.style.backgroundImage = `url(${background})`;
    }, [lightMode]);

    const handleSiteMode = () => {
        setLightMode(prev => !prev);
    }

    const handleRain = () => {
        setRainToggle(prev => !prev);
    }

    return (
        <div className="main-page">
            <div className="header">
                <img src={rainToggle ? Cloud : RainCloud} draggable="false" onClick={handleRain}/>
                <img src={lightMode ? Moon : Sun} draggable="false" onClick={handleSiteMode}/>
            </div>
            
            <div className="body">
                <div id="time" className="timer">
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </div>

                <div className="icons">
                    {running === false && <img src={Play} draggable="false" onClick={handlePlay}/>}
                    {running === true && <img src={Pause} draggable="false" onClick={handlePause}/>}
                </div>
            </div>
        </div>
    )
}

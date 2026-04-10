// REACT
import { useEffect, useState } from "react";

// ASSETS
import Cloud from "./assets/cloud.svg";
import MatterhornDark from "./assets/matterhorn_dark.png"
import MatterhornLight from "./assets/matterhorn_light.jpg";
import Moon from "./assets/moon.svg";
import RainCloud from "./assets/rain_cloud.svg";
import Sun from "./assets/sun.svg";


// CSS
import "./App.css";

export default function App() {
    const [lightMode, setLightMode] = useState(true);
    const [rainToggle, setRainToggle] = useState(false);
    
    // Switch between backgrounds for light and dark mode
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
                <img src={rainToggle ? Cloud : RainCloud} onClick={handleRain}/>
                <img src={lightMode ? Moon : Sun} onClick={handleSiteMode}/>
            </div>

            <div className="body">
            </div>
        </div>
    )
}

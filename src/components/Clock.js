import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'; // Import ReactPlayer for YouTube video

const Clock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Timer in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [currentSession, setCurrentSession] = useState('Session'); // 'Session' or 'Break'

    // Create a reference for the beep audio element
    const beepRef = useRef(null);

    // Format time to mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Timer logic using useEffect
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
            switchSession(); // Switch between Session & Break
        }
        return () => clearInterval(timer); // Cleanup on unmount or stop
    }, [isRunning, timeLeft]);

    // Start/Stop button handler
    const handleStartStop = () => {
        setIsRunning((prev) => !prev); // Toggle running state
    };

    // Reset button handler
    const handleReset = () => {
        setIsRunning(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        setCurrentSession('Session');
        beepRef.current.pause();
        beepRef.current.currentTime = 0;
    };

    // Increment & Decrement Handlers
    const handleBreakChange = (amount) => {
        setBreakLength((prev) => {
            const newLength = prev + amount;
            return newLength > 0 && newLength <= 60 ? newLength : prev;
        });
    };

    const handleSessionChange = (amount) => {
        setSessionLength((prev) => {
            const newLength = prev + amount;
            if (newLength > 0 && newLength <= 60) {
                setTimeLeft(newLength * 60); // Update the timer when session changes
                return newLength;
            }
            return prev;
        });
    };

    // Switch between Session & Break
    const switchSession = () => {
        if (currentSession === 'Session') {
            setCurrentSession('Break');
            setTimeLeft(breakLength * 60);
        } else {
            setCurrentSession('Session');
            setTimeLeft(sessionLength * 60);
        }

        // Play beep sound when session switches
        if (beepRef.current) {
            beepRef.current.play().catch((error) => console.log('Audio play prevented:', error));
        }
    };

    return (
        <div className="clock">
            {/* Background Music - YouTube video with Hanz Zimmer score */}
            <ReactPlayer
                url="https://www.youtube.com/watch?v=IqiTJK_uzUY"
                playing
                loop
                muted
                width="0" // Hides the player
                height="0" // Hides the player
            />

            {/* Break Length Controls */}
            <label id="break-label">Break Length</label>
            <div>
                <button id="break-decrement" onClick={() => handleBreakChange(-1)}>-</button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={() => handleBreakChange(1)}>+</button>
            </div>

            {/* Session Length Controls */}
            <label id="session-label">Session Length</label>
            <div>
                <button id="session-decrement" onClick={() => handleSessionChange(-1)}>-</button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={() => handleSessionChange(1)}>+</button>
            </div>

            {/* Timer Display */}
            <div>
                <h2 id="timer-label">{currentSession}</h2>
                <h1 id="time-left">{formatTime(timeLeft)}</h1>
            </div>

            {/* Timer Controls */}
            <div>
                <button id="start_stop" onClick={handleStartStop}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button id="reset" onClick={handleReset}>Reset</button>
            </div>

            {/* Beep Sound - Timer End */}
            <audio ref={beepRef} id="beep" preload="auto">
                <source src="https://www.soundjay.com/misc/sounds/magic-chime-02.mp3" type="audio/mpeg" />
            </audio>

            {/* Optional Background Video (if you want a video instead of YouTube music) */}
            <video autoPlay loop muted id="background-video">
                <source src="/videos/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Clock;

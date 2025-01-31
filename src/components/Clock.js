import React, { useState } from 'react';

const Clock = () => {
    const [breakLength, setBreakLength] = useState(5); // Default value for Break
    const [sessionLength, setSessionLength] = useState(25); // Default value for Session

    return (
        <div className="clock">
            <label id="break-label">Break Length</label>
            <div>
                <button id="break-decrement">-</button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment">+</button>
            </div>

            <label id="session-label">Session Length</label>
            <div>
                <button id="session-decrement">-</button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment">+</button>
            </div>
        </div>
    );
};

export default Clock;

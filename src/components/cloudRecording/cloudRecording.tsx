import { useState } from "react";
import { agoraAcquire, agoraRecordingStart } from "../../service";


const CloudRecording = () => {
    const [rID,setRID] = useState('');

    const acquire = async () => {
        const resourceId = await agoraAcquire();
        setRID(resourceId);
    }

    const start = async () => {
        await agoraRecordingStart(rID);
    }

    return (
        <div>
            <button onClick={acquire}>cloudRecording - Acquire</button>
            <button onClick={start}>cloudRecording - Start</button>
            <button>cloudRecording - Stop</button>
        </div>
    );
}

export default CloudRecording;
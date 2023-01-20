import styled from "styled-components"

interface VRoomProps {
    text : string,
    rtcJoin : () => Promise<void>,
    rtcLeave : () => Promise<void>,
    localAudioChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    remoteAudioChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    handelChannelName : (e : React.ChangeEvent<HTMLInputElement>) => void,
    handelToken : (e : React.ChangeEvent<HTMLInputElement>) => void
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`

const AgoraBtn = styled.button`
    height: 25px;
    margin-left: 10px;
    margin-right: 10px;
`

const AgoraStatus = styled.div`
    margin-top: 10px;
`

const AgoraVolumnCtrl = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 30px;
`
const AgoraVolumnLabel = styled.label`
    font-size: 16px;
    margin-right: 5px;
`
const AgoraVolumnRange = styled.input`
    width: 150px;   
`


const VRoom = ({text,rtcJoin,rtcLeave,localAudioChange,remoteAudioChange,handelChannelName,handelToken} : VRoomProps) => {
    return (
        <Wrapper>
            <h1>채널 접속</h1>
            <AgoraVolumnLabel >채널명</AgoraVolumnLabel>
            <AgoraVolumnRange placeholder="채널명을 입력해주세요" type="text" onChange={handelChannelName}/>&nbsp;&nbsp;
            <AgoraVolumnLabel >Token</AgoraVolumnLabel>
            <AgoraVolumnRange placeholder="Token을 입력해주세요" type="text" onChange={handelToken}/><br/>
            <br/>
            <AgoraBtn onClick={rtcJoin}>Channel Join</AgoraBtn>
            <AgoraBtn onClick={rtcLeave}>Channel Leave</AgoraBtn>
            <AgoraStatus>
                채널 상태 : {text}
            </AgoraStatus>
            <AgoraVolumnCtrl>
                <AgoraVolumnLabel>Local Volumn</AgoraVolumnLabel>
                <AgoraVolumnRange type="range" min={0} max={100} step={1} onChange={localAudioChange}/>
                <br/>
                <AgoraVolumnLabel>Remote Volumn</AgoraVolumnLabel>
                <AgoraVolumnRange type="range" min={0} max={100} step={1} onChange={remoteAudioChange}/>
            </AgoraVolumnCtrl>
        </Wrapper>
    )
}
export default VRoom;
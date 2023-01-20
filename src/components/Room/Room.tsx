import {createClient,createMicrophoneAudioTrack} from "agora-rtc-react"
import { useState,useEffect } from "react"
import VRoom from "./VRoom";

const useClient = createClient({ mode: "rtc", codec: "vp8" });
const useMicrophoneTrack = createMicrophoneAudioTrack();

let channelParameters =
{
  localAudioTrack: null as any,
  remoteAudioTrack: null as any,
  remoteUid: 0 as number | string ,
};


const Room = () => {
  const [text,setText] = useState<string>('');
  const client = useClient();
  const {track} = useMicrophoneTrack();
  const [options,setOptions] = useState({
    appId : '0b2bbee1fc9e499fb3dd76e43cb576a6',
    channel : '',
    token : '',
    uid : 2
  })
  

  useEffect(()=>{
    client.on("user-published",async (user,mediaType) => {
      await client.subscribe(user,mediaType);
      console.log('subscribe success');

      if(mediaType === "audio"){
        channelParameters.remoteUid = user.uid;
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteAudioTrack.play();
        console.log('remote user connected' + user.uid)
        setText("Remote user connected: " + user.uid)
      }

      client.on("user-unpublished", (user) => {
        console.log(user.uid + " has left the channel");
        setText("Remote user has left the channel")
      })
    })
  },[client])


  /**
   * 채널 접속
   */
  const rtcJoin = async () => {
      await client.join(options.appId,options.channel,options.token,options.uid);
      channelParameters.localAudioTrack = track;
      setText("Joined channel: " + options.channel)
      await client.publish(channelParameters.localAudioTrack);
      console.log("publish success!");
  }

  /**
   * 채널 나가기
   */
  const rtcLeave = async () => {
    channelParameters.localAudioTrack.close();
    await client.leave();
  }


  /**
   * 로컬 오디오 불륨 조절
   * @param e 
   */
  const localAudioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    channelParameters.localAudioTrack.setVolume(parseInt(e.target.value));
  }

  /**
   * 원격 오디오 불륨 조절
   * @param e 
   */
  const remoteAudioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    channelParameters.remoteAudioTrack.setVolume(parseInt(e.target.value));
  }

  const handelChannelName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => {
      return {
        ...prev,
        channel : e.target.value
      }
    })
  }

  const handelToken = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => {
      return {
        ...prev,
        token : e.target.value
      }
    })
  }

  const props = {
    text,
    rtcJoin,
    rtcLeave,
    localAudioChange,
    remoteAudioChange,
    handelChannelName,
    handelToken
  }


  return (
    <VRoom {...props}/>
  );
}
export default Room;
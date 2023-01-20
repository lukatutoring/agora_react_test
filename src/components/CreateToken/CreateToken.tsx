import React from "react";
import { useState } from "react";
import { createChannel } from "../../service";
import VCreateToken from "./VCreateToken";

const CreateToken = () => {
  const [channelName,setChannelName] = useState('');
  const [token,setToken] = useState('');

  const handelChannel = (e : React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  }

  const makeChannel = async () => {
    const channelToken = await createChannel(channelName);
    setToken(channelToken);
  }

  const props = {
    token,
    handelChannel,
    makeChannel
  }
  return (
    <VCreateToken {...props}/>
  );
}

export default CreateToken;
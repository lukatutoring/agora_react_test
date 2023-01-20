import axios from "axios"
const APP_ID = '0b2bbee1fc9e499fb3dd76e43cb576a6'


export const createChannel = async (channelName) => {
  const params = {
    channelName
  }
  const {channelToken} = await (await axios.post(`https://testagora-api.heytutoring.com/api/v1/channel`,params)).data;
  return channelToken;
}



/**
 * cloud recording get resource id
 */
export const agoraAcquire = async () => {
  const params = {
    "cname": "test_luka_2",
    "uid": "253",
    "clientRequest":{
    }
  }

  const response = await axios.post(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/acquire`,params,{
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    auth : {
      "username" : '0cec33e3c7da42a0a50966a12a91f080',
      "password": '6995261539844e9f9b1e66c190c8f19e'
    }
  })
  console.log();
  const {resourceId} = response.data;
  return resourceId;
}


export const agoraRecordingStart = async (resourceId) => {
  const params = {
    cname: "test_luka_2",
    uid: "253",
    clientRequest: {
      token: "0060b2bbee1fc9e499fb3dd76e43cb576a6IADqwYIo7eapFqAIrldfRGL9obnwejaBwrT6/3mOYGjxoR3H2TgAAAAAIgCarNkvq47HYwQAAQA7S8ZjAgA7S8ZjAwA7S8ZjBAA7S8Zj",
      recordingConfig:{
        channelType: 0
      }
    },
  }

  await axios.post(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/resourceid/${resourceId}/mode/mix/start`,params,{
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    auth : {
      "username" : '0cec33e3c7da42a0a50966a12a91f080',
      "password": '6995261539844e9f9b1e66c190c8f19e'
    }
  });
}


import styled from "styled-components";


interface VCreateTokenProps {
    token : string,
    makeChannel : () => Promise<void>,
    handelChannel : (e : React.ChangeEvent<HTMLInputElement>) => void,
}

const Wrapper = styled.div`
    width: 100%;
`

const Title = styled.h1`
    font-size: 26px;
`

const ChannelInput = styled.input`
  margin-right: 10px;
`

const ChannelBtn = styled.button``

const VCreateToken = ({token,makeChannel,handelChannel}:VCreateTokenProps) => {
    return (
        <Wrapper>
        <Title>채널 생성</Title>
        <ChannelInput 
          placeholder="채널 명을 입력해주세요"
          type="text"
          onChange={handelChannel}
        />
        <ChannelBtn onClick={makeChannel}>Create Channel</ChannelBtn>
        <h5>Token : {token}</h5>
        <p>Token 텍스트 와 입력한 채널명을 를 복사한후 아래 입력칸에 넣어주세요</p>
      </Wrapper>
    )
}
export default VCreateToken
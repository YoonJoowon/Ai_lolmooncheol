import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

const Chatting_copy = () => {
  const [keywords1, setKeywords1] = useState("");
  const [keywords2, setKeywords2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleChange1 = (event) => {
    setKeywords1(event.target.value);
  };
  const handleChange2 = (event) => {
    setKeywords2(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system", // 행동지정, 역할부여
        content:
          "당신의 작업은 롤 게임 관련해서 옳은 판단을 말해주는 것입니다. 두 가지 선택지가 주어지면 중립적인 문구없이 한 선택지를 선택하여 이유와 함께 답해주세요. 이전 내용과 똑같은 형식으로 답을 말해주세요. "+
          "(제드는 5킬 1데스 14어시스트,  3800gold, 레벨은 11 그리고 아무무는 1킬 6데스 2어시스트, 2000gold 레벨은 9) 내용도 함께 분석해주세요." +
          "다음 형식을 사용합니다:" +
          // "1- 주어진 정보들을 종합해서 분석 및 요약해주세요." +
          // "2- 상황을 요약해주세요." +
          // "3- 분석을 토대로 첫 번째 판단을 정리해주세요." +
          // "4- 분석을 토대로 두 번째 판단을 정리해주세요" +
          // "5- 분석을 토대로 어느 판단이 맞았는지 이유를 설명해주세요.",
          "주어진 상황에서 두 챔피언의 상황을 고려해보겠습니다." +
          "A의 지표분석 : ```" +
          "B의 지표분석 : ```" +
          
          "A의 주장 : ```" +
          "B의 주장 : ```" +
          "결론 : ```",
      },
      {
        role: "assistant", // 이전대화 기억
        content:
          "주어진 상황에서 두 챔피언의 상황을 고려해보겠습니다.\n\n" +
          "A:\n" +
          "킬/데스/어시스트: a/b/c\n" +
          "골드: d\n" +
          "레벨: e\n\n" +
         
          "B:\n" +
          "킬/데스/어시스트: h/i/j\n" +
          "골드: k\n" +
          "레벨: l\n\n" +
          "상황: ```\n\n" +
         
          "A의 주장:\n" +
          "```\n\n" +
          "B의 주장:\n" +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "user",
        content: keywords1 + keywords2 + "둘 중 누구의 판단이 맞습니까?",
      },
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: messages,
    };

    axios
      .post("https://api.openai.com/v1/chat/completions", data, {
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        setResponseMessage(response.data.choices[0].message.content);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("이용 토큰이 만료되었습니다.");
      });
  };

  return (
    <Background>
      <Title>롤 판결 AI</Title>
      <Wrapper>
        <></>
        <div>1번 주장</div>
        <Input
          type="text"
          value={keywords1}
          onChange={handleChange1}
          required
        />

        <div>2번 주장</div>
        <Input
          type="text"
          value={keywords2}
          onChange={handleChange2}
          required
        />
        <AskAi onClick={handleSubmit}>입력</AskAi>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isLoading && (
          <Loading>
            <img
              src="https://studentrights.sen.go.kr/images/common/loading.gif"
              alt="로딩"
            />
          </Loading>
        )}

        {responseMessage && !isLoading && (
          <ApiResponse>
            <ApiResponseTitle>AI 응답:</ApiResponseTitle>
            <ApiResponseAnswer>{formattedMessage}</ApiResponseAnswer>
          </ApiResponse>
        )}
      </Wrapper>
    </Background>
  );
};

export default Chatting_copy;

const Background = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* margin-top: 40px; */
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #333;
`;

const Input = styled.textarea`
  min-width: 90%;
  max-width: 90%;
  min-height: 100px;
  max-height: 100%;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
  margin-bottom: 10px;
`;

const AskAi = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-bottom: 10px;
`;

const ApiResponse = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const ApiResponseTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ApiResponseAnswer = styled.div`
  font-size: 14px;
  width: 100%;
  font-family: "Arial", sans-serif;
  color: #333;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-wrap;
`;

const Loading = styled.p`
  color: #007bff;
  font-size: 18px;
  margin-top: 10px;
`;

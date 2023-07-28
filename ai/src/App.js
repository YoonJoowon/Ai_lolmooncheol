import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

const App = () => {
  const [keywords1, setKeywords1] = useState("");
  const [keywords2, setKeywords2] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const formattedMessage = responseMessage.replace(/\\n/g, '\n');

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
        role: "system",
        content: "너는 한국에서 리그오브레전드 분쟁의 판결을 가장 잘 내려주는 사람이야! 그리고 입장 중 하나를 무조건 선택 해줘야 돼",
      },
      {
        role: "user",
        content: keywords1 + keywords2 + "에 대하여 정확한 판결을 내려줘",
      },
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: messages,
    };

    const api_key = "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"; // ChatGPT API 키

    axios
      .post("https://api.openai.com/v1/chat/completions", data, {
        headers: {
          Authorization: "Bearer " + api_key,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        setResponseMessage(response.data.choices[0].message.content);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("하루 이용량이 초과 됐습니다.");
      });
  };

  return (
    <Wrapper>
      <Title>롤 판결 AI</Title>
      <div>1번 주장</div>
      <Input type="text" value={keywords1} onChange={handleChange1} required />

      <div>2번 주장</div>
      <Input type="text" value={keywords2} onChange={handleChange2} required />
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
          <ApiResponseAnswer>
            {formattedMessage}
          </ApiResponseAnswer>
        </ApiResponse>
      )}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
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

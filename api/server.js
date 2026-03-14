const express = require('express');
const app = express();
app.use(express.json());

// 선택항목 임시 저장소
const tempStorage = new Map();

// 선택항목 저장 API (홈페이지에서 호출)
app.post('/api/save-selection', (req, res) => {
  const { items } = req.body;
  const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
  tempStorage.set(sessionId, items);
  
  res.json({ sessionId });
});

// 기업위챗 콜백 API (고객이 QR 스캔하면 호출됨)
app.post('/api/wechat-callback', (req, res) => {
  const { sessionId } = req.body;
  const items = tempStorage.get(sessionId);
  
  if (items) {
    // 여기서 기업위챗 API로 메일 보내는 코드가 들어갈 예정
    console.log('선택항목:', items);
    tempStorage.delete(sessionId);
  }
  
  res.send('ok');
});

// 기업위챗 URL 검증용 GET
app.get('/api/wechat-callback', (req, res) => {
  const { msg_signature, timestamp, nonce, echostr } = req.query;
  // 검증 로직은 나중에 추가
  res.send(echostr);
});

module.exports = app;

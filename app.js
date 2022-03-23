const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect(); 

const articlesRouter = require("./routes/articles");

const requestMiddleWare = (req, res, next) => {                
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 참고문서: https://www.geeksforgeeks.org/express-js-express-urlencoded-function/    Express에 내장된 미들웨어 기능, JSON 페이로드로 들어오는 요청을 구문 분석하고 body-parser를 기반으로 합니다.
app.use(requestMiddleWare);

app.use("/api", [articlesRouter]);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/list.html')
}); 

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/static/write.html')
});

app.get('/detail', (req, res) => {
  res.sendFile(__dirname + '/static/detail.html')
});

app.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/static/edit.html')
});

app.listen(port, () => {
  console.log(port, "Server is listening...")
})
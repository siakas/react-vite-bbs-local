const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// スレッドの新規作成とバリデーション
server.post("/threads", (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "スレッドのタイトルが入力されていません",
    });
  }
  next();
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

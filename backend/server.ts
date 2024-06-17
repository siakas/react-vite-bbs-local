const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
import fetch from 'node-fetch'

// クッキーを解析するためのミドルウェアを使用
server.use(cookieParser())

// リクエストボディの JSON データを解析するためのミドルウェアを使用
server.use(jsonServer.bodyParser)

// API のベース URL を定義
const BASE_URL = 'http://localhost:8000'

// 引数の name に一致するユーザを返す関数
const getUserByName = async (name: string) => {
  try {
    const fetchedUsers = await fetch(`${BASE_URL}/users`)
    const users: any = await fetchedUsers.json()
    return users.find((user) => name === user.name)
  } catch (error) {
    console.error('ユーザーの取得に失敗しました。', error)
  }
}

// ユーザがログインしているかチェック
server.use(async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const userToken = await jwt.verify(
        req.cookies.token,
        process.env.ACCESS_TOKEN_SECRET,
      )
      const user = await getUserByName(userToken.name)
      req.user = user
    } catch (err) {
      res.clearCookie('token', {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/',
      })
      console.error('無効なトークンなので削除しました', err)
    }
  }
  next()
})

// スレッドの新規作成
server.post('/threads', (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: 'スレッドのタイトルが入力されていません',
    })
  }
  if (!req.body.topic) {
    return res.status(400).json({
      message: 'スレッドのトピックが入力されていません',
    })
  }

  const now = new Date()
  const japanTimeOffset = 9 * 60 // 日本時間のオフセット（分）
  // 現在の UTC 時刻に日本時間のオフセットを加算
  now.setMinutes(now.getMinutes() + japanTimeOffset)
  // 日本時間の日時文字列を作成
  const formattedDate = now.toISOString().replace('Z', '+09:00')
  req.body.createdAt = formattedDate
  req.body.commentTotal = 0

  next()
})

server.use(middlewares)
server.use(router)
server.listen(8000, () => {
  console.log('JSON Server is running')
})

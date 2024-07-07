const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// import fetch from 'node-fetch'

// クッキーを解析するためのミドルウェアを使用
server.use(cookieParser())

// リクエストボディの JSON データを解析するためのミドルウェアを使用
server.use(jsonServer.bodyParser)

// API のベース URL を定義
const BASE_URL = 'http://localhost:8080'

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

// コメント投稿
server.post('/threads/:threadId/comments', async (req, res, next) => {
  const threadId = req.params.threadId

  // threadId が数値でない場合はエラーを返す
  if (isNaN(Number(threadId))) {
    return res.status(400).json({
      message: '無効なスレッドIDです',
    })
  }

  // コメント本文が入力されていない場合はエラーを返す
  if (!req.body.commentContent) {
    return res.status(400).json({
      message: 'コメントが入力されていません',
    })
  }

  // コメントを取得
  const response = await fetch(`${BASE_URL}/comments`)
  const comments: any = await response.json()

  // 現在のスレッドのコメント数を取得
  const commentsInThread =
    comments.length > 0
      ? comments.filter((comment) => comment.threadId === threadId).length
      : 0

  // スレッドのコメント数が 10 個以上の場合はエラーを返す
  if (commentsInThread >= 10) {
    return res.status(400).json({
      message: 'スレッドのコメントは10個までです',
    })
  }

  try {
    const threadResponse = await fetch(`${BASE_URL}/threads/${threadId}`)
    if (!threadResponse.ok) {
      throw new Error('スレッドのデータを取得できませんでした')
    }
    const threadData: any = await threadResponse.json()

    // コメント数をカウントアップ
    threadData.commentTotal += 1
    const newCommentTotal = threadData.commentTotal

    // コメントデータの作成
    const updateResponse = await fetch(`${BASE_URL}/threads/${threadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(threadData),
    })

    // スレッドのコメント数の更新に失敗した場合はエラーを返す
    if (!updateResponse.ok) {
      throw new Error('スレッドの総コメント数の更新に失敗しました')
    }

    // コメント番号、投稿者名、ユーザ ID の設定
    req.body.commentNo = newCommentTotal
    if (!req.body.commenter) {
      req.body.commenter = ''
    }
    if (!req.user) {
      req.body.userId = 0
    } else {
      req.body.userId = req.user.id
    }

    const now = new Date()
    const japanTimeOffset = 9 * 60 // 日本時間のオフセット（分）
    // 現在の UTC 時刻に日本時間のオフセットを加算
    now.setMinutes(now.getMinutes() + japanTimeOffset)
    // 日本時間の日時文字列を作成
    const formattedDate = now.toISOString().replace('Z', '+09:00')
    req.body.createdAt = formattedDate
  } catch (error) {
    return res.status(500).json({
      message: `コメント投稿のサーバーサイドでの処理中にエラーが発生しました。${error}`,
    })
  }
  next()
})

// サインアウト
server.post('/users/signout', (req, res) => {
  // トークンを削除することでサインアウトをおこなう
  res.clearCookie('token', {
    sameSite: 'lax',
    secure: false,
    httpOnly: false,
    path: '/',
  })
  res.status(200).json({ message: 'トークンを削除しました' })
})

// すべてのデータを削除
const deleteAll = async (category: string) => {
  const fetchedAllData = await fetch(`${BASE_URL}/${category}`)
}

server.use(middlewares)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})

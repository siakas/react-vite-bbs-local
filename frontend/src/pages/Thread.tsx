import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CreateCommentDialog } from '@/components/CreateCommentDialog'
import { ThreadComment } from '@/components/ThreadComment'
import {
  commentReducer,
  commentsInitialState,
  threadReducer,
  threadsInitialState,
} from '@/reducers/reducers'

export const Thread = () => {
  const { threadId } = useParams()
  const [threadsState, threadDispatch] = useReducer(
    threadReducer,
    threadsInitialState,
  )
  const {
    currentThread,
    isLoading: threadsLoading,
    error: threadsError,
  } = threadsState
  const [commentsState, commentDispatch] = useReducer(
    commentReducer,
    commentsInitialState,
  )
  const {
    comments,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = commentsState

  // スレッドデータとコメントデータの取得
  useEffect(() => {
    const fetchData = async () => {
      // 現在のページのスレッドの取得
      try {
        const fetchedThreadData = await axios.get(`/api/threads/${threadId}`)
        const threadData = fetchedThreadData.data
        // スレッドの取得が成功したら、スレッドのデータをセット
        threadDispatch({ type: 'set_thread', currentThread: threadData })
      } catch (error) {
        threadDispatch({
          type: 'set_error',
          error: `スレッドデータの取得でエラーが発生しました。${error}`,
        })
      }

      // 現在のページのスレッドのコメントの取得
      try {
        const fetchedCommentsData = await axios.get(
          `/api/threads/${threadId}/comments`,
        )
        const commentsData = fetchedCommentsData.data
        // コメントの取得が成功したら、コメントのデータをセット
        commentDispatch({ type: 'set_comments', comments: commentsData })
      } catch (error) {
        commentDispatch({
          type: 'set_error',
          error: `コメントの取得でエラーが起きました。${error}`,
        })
      }
    }
    fetchData()
  }, [threadId])

  return (
    <>
      {threadsLoading ? null : (
        <div className="m-auto w-full max-w-4xl py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentThread?.title}</h1>
            <CreateCommentDialog commentDispatch={commentDispatch} />
          </div>
          {currentThread && (
            <div className="space-y-6">
              <ThreadComment
                root={true}
                content={currentThread.topic}
                createdAt={currentThread.createdAt}
              />
              {comments.map((comment) => (
                <ThreadComment
                  key={comment.id}
                  content={comment.commentContent}
                  createdAt={comment.createdAt}
                />
              ))}
              {/* <ThreadComment />
                <ThreadComment />
                <ThreadComment /> */}
            </div>
          )}
        </div>
      )}
    </>
  )
}

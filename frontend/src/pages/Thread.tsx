import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { PlusIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ThreadComment } from '@/components/ThreadComment'
import { Button } from '@/components/ui/button'
import { threadReducer, threadsInitialState } from '@/reducers/reducers'

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
      // TODO: ここにコメントの取得処理を追加
    }
    fetchData()
  }, [threadId])

  return (
    <>
      {threadsLoading ? null : (
        <div className="m-auto w-full max-w-4xl py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentThread?.title}</h1>
            <Button variant="outline">
              <PlusIcon className="mr-2 size-4" />
              New Comment
            </Button>
          </div>
          <div className="space-y-6">
            <ThreadComment root={true} />
            <ThreadComment />
            <ThreadComment />
            <ThreadComment />
          </div>
        </div>
      )}
    </>
  )
}

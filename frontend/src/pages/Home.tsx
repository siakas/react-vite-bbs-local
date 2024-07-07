import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { DeleteAllButton } from '@/components/DeleteAllButton'
import { useUserContext } from '@/hooks/useUserContext'
import { threadReducer, threadsInitialState } from '@/reducers/reducers'
import type { Comment, Thread } from '@/types/types'

export const Home = () => {
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({})
  const [threadsState, threadsDispatch] = useReducer(
    threadReducer,
    threadsInitialState,
  )
  const {
    threads,
    isLoading: threadsIsLoading,
    error: threadsError,
  } = threadsState
  const { userDispatch } = useUserContext()

  // スレッドのコメント数を取得
  const getCommentCount = async (threadId: number): Promise<number> => {
    const res = await axios.get<Comment[]>(`/api/threads/${threadId}/comments`)
    const comments = res.data
    return comments.length
  }

  // スレッドの取得と各スレッドのコメント数を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        // スレッドの取得
        const fetchedThreadsData = await axios.get<Thread[]>('/api/threads')
        const threadsData = fetchedThreadsData.data
        await threadsDispatch({ type: 'set_threads', threads: threadsData })

        if (threadsData && threadsData.length > 0) {
          // 各スレッドのコメント数を取得し、counts[thread.id] に thread のコメント数を格納
          const counts: Record<number, number> = {}
          for (const thread of threadsData) {
            counts[thread.id] = await getCommentCount(thread.id)
          }
          // 各スレッドのコメント数をセット
          setCommentCounts(counts)
        }
      } catch (error) {
        threadsDispatch({
          type: 'set_error',
          error: `スレッドデータの取得でエラーが発生しました。${error}`,
        })
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="flex justify-end gap-4 bg-gray-100 px-6 py-4">
        <CreateThreadDialog threadsDispatch={threadsDispatch} />
        <DeleteAllButton threadsDispatch={threadsDispatch} />
      </div>

      {threadsIsLoading ? null : (
        <div className="grid flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          {threads && threads.length > 0 ? (
            threads.map((thread) => (
              <Board
                key={thread.id}
                {...thread}
                commentCounts={commentCounts[thread.id] || 0}
              />
            ))
          ) : (
            <p>スレッドはまだありません</p>
          )}
        </div>
      )}
    </>
  )
}

import { useEffect } from 'react'
import axios from 'axios'
import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { DeleteAllButton } from '@/components/DeleteAllButton'
import type { Comment } from '@/types/types'

export const Home = () => {
  // スレッドのコメント数を取得
  const getCommentCount = async (threadId: number): Promise<number> => {
    const res = await axios.get<Comment[]>(`/api/threads/${threadId}/comments`)
    const comments = res.data

    return comments.length
  }

  // スレッドの取得と各スレッドのコメント数を取得
  useEffect(() => {}, [])

  return (
    <>
      <div className="flex justify-end gap-4 bg-gray-100 px-6 py-4">
        <CreateThreadDialog />
        <DeleteAllButton />
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* {threadsData.map((thread) => (

        )} */}
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </>
  )
}

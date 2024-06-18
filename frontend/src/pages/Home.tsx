import { useEffect } from 'react'
import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { DeleteAllButton } from '@/components/DeleteAllButton'

export const Home = () => {
  // スレッドの一覧を取得
  useEffect(() => {}, [])

  return (
    <>
      <div className="flex justify-end gap-4 bg-gray-100 px-6 py-4">
        <CreateThreadDialog />
        <DeleteAllButton />
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </>
  )
}

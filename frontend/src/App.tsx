import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { DeleteAllButton } from '@/components/DeleteAllButton'
import { SiteHeader } from '@/components/SiteHeader'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <>
      <div className="flex flex-col">
        <SiteHeader />
        <div className="flex justify-end gap-4 bg-gray-100 p-4">
          <CreateThreadDialog />
          <DeleteAllButton />
        </div>
        <main className="grid flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          <Board />
          <Board />
          <Board />
          <Board />
        </main>
      </div>
      <Toaster />
    </>
  )
}

export default App

import { Trash2Icon } from 'lucide-react'
import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <>
      <div className="flex flex-col">
        <SiteHeader />
        <div className="flex justify-end gap-4 bg-gray-100 p-4">
          <CreateThreadDialog />
          <Button variant="destructive">
            <Trash2Icon className="mr-2 size-4" />
            Delete All
          </Button>
        </div>
        <main className="grid flex-1 grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          <Board />
          <Board />
          <Board />
          <Board />
        </main>
      </div>
    </>
  )
}

export default App

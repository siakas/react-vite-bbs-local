import { PlusIcon } from 'lucide-react'
import { ThreadComment } from '@/components/ThreadComment'
import { Button } from '@/components/ui/button'

export const Thread = () => {
  return (
    <div className="m-auto w-full max-w-4xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Product Launch</h1>
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
  )
}

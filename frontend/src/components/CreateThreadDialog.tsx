import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const CreateThreadDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-4" />
          Create New Thread
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Thread</DialogTitle>
          <DialogDescription>
            Enter a title and topic for your new post.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-8">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter a title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Textarea id="topic" placeholder="Enter a topic" className="h-32" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Thread</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

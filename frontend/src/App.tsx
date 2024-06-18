import { PlusIcon } from 'lucide-react'
import { Board } from '@/components/Board'
import { CreateThreadDialog } from '@/components/CreateThreadDialog'
import { DeleteAllButton } from '@/components/DeleteAllButton'
import { SiteHeader } from '@/components/SiteHeader'
import { ThreadComment } from '@/components/ThreadComment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <div className="flex flex-col">
        <SiteHeader />
        <div>
          <h1 className="p-4 text-xl font-bold">ホーム画面</h1>
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
        </div>
        <div>
          <h1 className="p-4 text-xl font-bold">スレッド画面</h1>
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
        </div>
        <div className="bg-gray-100 dark:bg-gray-950">
          <h1 className="p-4 text-xl font-bold">ログイン画面</h1>
          <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-6 flex items-center justify-between gap-4">
                <Button className="flex-1">Sign In</Button>
                <Button variant="outline" className="flex-1">
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  )
}

export default App

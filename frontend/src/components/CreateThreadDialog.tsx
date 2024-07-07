import type { FormEventHandler } from 'react'
import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
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
import type { ThreadFormProps } from '@/types/types'

export const CreateThreadDialog = ({ threadsDispatch }: ThreadFormProps) => {
  const [inputError, setInputError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const threadTitleRef = useRef<HTMLInputElement>(null)
  const threadTopicRef = useRef<HTMLTextAreaElement>(null)

  // スレッドの新規作成
  const handleSubmit = useCallback<FormEventHandler>(
    async (event) => {
      event.preventDefault()

      // スレッドの新規作成時にフォームに入力がなければエラー文を設定
      setInputError(null)
      if (!threadTitleRef.current?.value) {
        setInputError('タイトルを入力してください。')
      }
      if (!threadTopicRef.current?.value) {
        setInputError((prevError) =>
          prevError
            ? `${prevError} トピックを入力してください。`
            : 'トピックを入力してください。',
        )
      }
      if (inputError) return

      try {
        // 新しいスレッドを作成し、db.json に新しいスレッドを追加する
        const fetchedNewThread = await axios.post('/api/threads', {
          title: threadTitleRef.current?.value,
          topic: threadTopicRef.current?.value,
        })
        const newThread = fetchedNewThread.data
        // state の threadsState に新しいスレッドを追加する
        threadsDispatch({ type: 'add_thread', newThread })
        // 入力フォームをリセット
        formRef.current?.reset()
        // ダイアログを閉じる
        setIsOpen(false)
      } catch (error) {
        threadsDispatch({
          type: 'set_error',
          error: `新しいスレッド作成時にエラーが発生しました。${error}`,
        })
      }
    },
    [inputError, threadsDispatch],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-4" />
          スレッドの新規作成
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>スレッドの新規作成</DialogTitle>
            <DialogDescription>
              スレッドのタイトルと内容を入力してください。
            </DialogDescription>
            {inputError && (
              <p className="text-sm font-bold text-red-500">{inputError}</p>
            )}
          </DialogHeader>
          <div className="space-y-4 py-8">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                placeholder="タイトルを入力してください"
                ref={threadTitleRef}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">内容</Label>
              <Textarea
                id="topic"
                placeholder="内容を入力してください"
                className="h-32"
                ref={threadTopicRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">投稿</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

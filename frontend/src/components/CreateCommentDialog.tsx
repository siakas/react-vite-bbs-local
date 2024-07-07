import type { FormEventHandler } from 'react'
import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { PlusIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUserContext } from '@/hooks/useUserContext'
import type { CommentFormProps } from '@/types/types'

export const CreateCommentDialog = ({ commentDispatch }: CommentFormProps) => {
  const { threadId } = useParams()
  const { userState, userDispatch } = useUserContext()
  const { user } = userState
  const [inputError, setInputError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const commentResponderRef = useRef<HTMLInputElement>(null)
  const commentContentRef = useRef<HTMLTextAreaElement>(null)

  // コメントの投稿
  const handleSubmit = useCallback<FormEventHandler>(
    async (event) => {
      event.preventDefault()

      // 入力フォームにコメントがなければエラー文を設定
      setInputError(null)
      if (!commentContentRef.current?.value) {
        setInputError('コメントを入力してください。')
      }
      if (inputError) return

      try {
        // 新しいコメントを作成し、db.json に新しいコメントを追加する
        const fetchedNewCommentData = await axios.post(
          `/api/threads/${threadId}/comments`,
          {
            commenter: commentResponderRef.current?.value,
            commentContent: commentContentRef.current?.value,
          },
        )
        const newCommentData = fetchedNewCommentData.data
        // state の commentsState に新しいコメントを追加する
        await commentDispatch({
          type: 'add_comment',
          newComment: newCommentData,
        })
        const commentId = newCommentData.id

        // ログインしている状態でコメント投稿した場合に、user にコメント履歴をつける処理
        // TODO: ここに処理を追加する
      } catch (error) {
        await commentDispatch({
          type: 'set_error',
          error: `コメント投稿時にエラーが起きました。${error}`,
        })
      }
      formRef.current?.reset()
    },
    [commentDispatch, threadId, inputError],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 size-4" />
          コメントする
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>コメントの投稿</DialogTitle>
            <DialogDescription>
              スレッドへのコメントを入力してください。
            </DialogDescription>
            {inputError && (
              <p className="text-sm font-bold text-red-500">{inputError}</p>
            )}
          </DialogHeader>
          <div className="space-y-4 py-8">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                placeholder="名前を入力してください"
                ref={commentResponderRef}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">内容</Label>
              <Textarea
                id="comment"
                placeholder="内容を入力してください"
                className="h-32"
                ref={commentContentRef}
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

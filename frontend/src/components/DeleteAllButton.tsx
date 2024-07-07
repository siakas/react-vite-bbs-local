import axios from 'axios'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { ThreadFormProps } from '@/types/types'

export const DeleteAllButton = ({ threadsDispatch }: ThreadFormProps) => {
  // すべてのデータを削除
  const handleReset = async () => {
    try {
      await axios.delete('/api/reset')
      toast('全データを削除しました', {
        style: {
          background: '#ef4444',
          color: '#fff',
          fontSize: '1rem',
        },
      })
    } catch (error) {
      threadsDispatch({
        type: 'set_error',
        error: `全データ削除の処理でエラーが発生しました。${error}`,
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="mr-2 size-4" />
          全データの削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>全データの削除</AlertDialogTitle>
          <AlertDialogDescription>
            削除したデータは復元できません。本当に削除しますか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>削除する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

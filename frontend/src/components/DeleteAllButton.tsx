import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export const DeleteAllButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        toast('全データを削除しました', {
          style: {
            background: '#ef4444',
            color: '#fff',
            fontSize: '1rem',
          },
        })
      }
    >
      <Trash2Icon className="mr-2 size-4" />
      Delete All
    </Button>
  )
}

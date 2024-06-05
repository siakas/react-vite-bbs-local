import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export const DeleteAllButton = () => {
  const { toast } = useToast()

  return (
    <Button
      variant="destructive"
      onClick={() => {
        toast({
          description: '全データを削除しました',
          variant: 'destructive',
        })
      }}
    >
      <Trash2Icon className="mr-2 size-4" />
      Delete All
    </Button>
  )
}

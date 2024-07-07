import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { formatDateTime } from '@/lib/utils'
import type { Thread } from '@/types/types'

type Props = Pick<Thread, 'id' | 'title' | 'topic' | 'createdAt'> & {
  commentCounts: number
}

export const Board = ({
  id,
  title,
  topic,
  createdAt,
  commentCounts,
}: Props) => {
  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="flex items-center space-x-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500">
              John Doe - {formatDateTime(createdAt)}
            </span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{topic}</p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <p className="text-sm text-gray-500">{commentCounts} コメント</p>
        <Button size="sm" asChild>
          <a href={`/threads/${id}`}>スレッドを見る</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

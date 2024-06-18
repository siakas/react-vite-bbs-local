import {
  MessageCircleIcon,
  ThumbsUpIcon,
  ShareIcon,
  EyeIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  root?: boolean
}

export const ThreadComment = ({ root = false }: Props) => {
  return (
    <Card className={cn(root && 'bg-blue-50', !root && 'ml-20')}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Jared Palmer</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              2 hours ago
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Here&apos;s a productivity tip that has helped me a lot - try the
          Pomodoro technique! Set a timer for 25 minutes, focus intensely on a
          task, then take a 5 minute break. Repeat this cycle a few times and
          you&apos;ll be amazed at how much you can get done.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Button variant="ghost" size="icon">
            <MessageCircleIcon className="size-4" />
            <span className="sr-only">Comment</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ThumbsUpIcon className="size-4" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShareIcon className="size-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <EyeIcon className="size-4" />
          <span>12</span>
        </div>
      </CardFooter>
    </Card>
  )
}

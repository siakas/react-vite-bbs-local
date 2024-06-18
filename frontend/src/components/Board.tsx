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

export const Board = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>New Product Launch</CardTitle>
        <CardDescription>
          <span className="flex items-center space-x-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500">John Doe - 2023/05/01</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          We are excited to announce the launch of our latest product. It
          features innovative technology and a sleek design.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-gray-500">12 comments</p>
        <Button size="sm" asChild>
          <a href="/threads/:threadId">View Comments</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

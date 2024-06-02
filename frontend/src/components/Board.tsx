import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

export const Board = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>New Product Launch</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-500">John Doe - 2023/05/01</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          We are excited to announce the launch of our latest product. It
          features innovative technology and a sleek design.
        </p>
      </CardContent>
    </Card>
  )
}

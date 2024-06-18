import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Signin = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="relative -top-20 w-full max-w-md">
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
  )
}

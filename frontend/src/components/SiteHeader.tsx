import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const SiteHeader = () => {
  return (
    <header className="flex justify-between bg-gray-900 p-4 text-white">
      <h1 className="text-2xl font-bold">
        <a href="/">Bulletin Board</a>
      </h1>
      <Avatar className="size-8">
        <a href="/signin">
          <AvatarImage src="https://github.com/shadcn.png" />
        </a>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  )
}

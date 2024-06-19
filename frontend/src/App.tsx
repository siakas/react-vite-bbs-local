import { Route, Routes } from 'react-router-dom'
import { SiteHeader } from '@/components/SiteHeader'
import { Toaster } from '@/components/ui/sonner'
import { UserProvider } from '@/context/userContext'
import { Home } from '@/pages/Home'
import { Signin } from '@/pages/Signin'
import { Thread } from '@/pages/Thread'

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/threads/:threadId" element={<Thread />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
      <Toaster position="bottom-center" />
    </UserProvider>
  )
}

export default App

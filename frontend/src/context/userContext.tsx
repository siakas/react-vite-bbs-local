import { createContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { userInitialState, userReducer } from '@/reducers/reducers'
import type { User, UserContextType, UserProviderProps } from '@/types/types'

// ユーザー情報のコンテキスト
export const UserContext = createContext<UserContextType>(null)

// ユーザー情報のプロバイダー
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  const [token, setToken] = useState<string | undefined>(Cookies.get('token'))

  // ユーザー情報取得の処理
  useEffect(() => {
    const fetchedUser = async () => {
      try {
        if (!token) {
          userDispatch({ type: 'set_user', user: userInitialState.user })
          return
        }
        const fetchedUsersData = await axios.get<User[]>(
          '/api/users?token=${token}',
        )
        const { status, data: usersData } = fetchedUsersData
        const userData = usersData[0]
        if (status === 200) {
          userDispatch({ type: 'set_user', user: userData })
        }
      } catch (error) {
        console.error('ログイン時にエラーが発生しました。', error)
      }
    }
    fetchedUser()
  }, [token])

  return (
    <UserContext.Provider value={{ userState, userDispatch, setToken }}>
      {children}
    </UserContext.Provider>
  )
}

import type {
  CommentsState,
  ThreadAction,
  ThreadsState,
  UserAction,
  UserState,
} from '@/types/types'

// state の初期化
const initialize = <T extends UserState | CommentsState | ThreadsState>(
  initialState: T,
): T => {
  return {
    ...initialState,
    isLoading: false,
  }
}

// UserState の初期値
export const userInitialState: UserState = {
  user: null,
  isLoading: true,
  error: null,
}

// UserState の reducer
export const userReducer = (
  userState: UserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case 'add_comment':
      if (userState.user === null) return userState
      return {
        user: {
          ...userState.user,
          comments: [...userState.user.comments, action.newComment],
        },
        isLoading: false,
        error: null,
      }
      break
    case 'set_user':
      return {
        user: action.user,
        isLoading: false,
        error: null,
      }
      break
    case 'set_error':
      return {
        ...userState,
        isLoading: false,
        error: action.error,
      }
      break
    case 'reset':
      return initialize(userInitialState)
      break
    default:
      return userState
  }
}

// ThreadsState の初期値
export const threadsInitialState: ThreadsState = {
  threads: [],
  isLoading: true,
  currentThread: null,
  error: null,
}

// ThreadsState の reducer
export const threadReducer = (
  threadsState: ThreadsState,
  action: ThreadAction,
): ThreadsState => {
  switch (action.type) {
    case 'add_thread':
      return {
        ...threadsState,
        threads: [...threadsState.threads, action.newThread],
        isLoading: false,
        error: null,
      }
      break
    case 'set_threads':
      return {
        ...threadsState,
        threads: action.threads,
        isLoading: false,
        error: null,
      }
      break
    case 'set_thread':
      return {
        ...threadsState,
        currentThread: action.currentThread,
        isLoading: false,
        error: null,
      }
      break
    case 'set_error':
      return {
        ...threadsState,
        isLoading: false,
        error: action.error,
      }
      break
    case 'reset':
      return initialize(threadsInitialState)
      break
  }
}

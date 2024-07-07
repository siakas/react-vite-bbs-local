import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 相対日時プラグインの有効化
dayjs.extend(relativeTime)

// 日付をフォーマットする関数
export const formatDateTime = (isoString: string) => {
  return dayjs(isoString).format('YYYY/MM/DD HH:mm:ss')
}

// 日付を相対日時にフォーマットする関数
export const formatRelativeDateTime = (isoString: string) => {
  return dayjs(isoString).fromNow()
}

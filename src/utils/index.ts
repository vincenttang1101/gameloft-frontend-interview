import { useNavigate } from 'react-router-dom'
import { LOCALSTORAGE } from '@constants'

export function getInitialValue(key: string, initialData: any[] | number) {
  const localData = localStorage.getItem(key)
  if (localData) return JSON.parse(localData)
  localStorage.setItem(key, JSON.stringify(initialData))
  return initialData
}

export function clearLocalData() {
  localStorage.removeItem(LOCALSTORAGE.KEY.QUESTIONS)
  localStorage.removeItem(LOCALSTORAGE.KEY.STEP)
  localStorage.removeItem(LOCALSTORAGE.KEY.PART)
  localStorage.removeItem(LOCALSTORAGE.KEY.COUNT)
  localStorage.removeItem(LOCALSTORAGE.KEY.ACTIVED_INDEX)
}

export function clearAll() {
  localStorage.clear()
}

export function normalizePath(path: string) {
  return path.replace(/(^\/}|\/$)/g, '')
}

export function useRedirectToRoot() {
  const navigate = useNavigate()

  return () => navigate('/')
}

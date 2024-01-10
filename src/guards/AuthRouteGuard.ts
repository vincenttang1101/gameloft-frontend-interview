import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LOCALSTORAGE } from '@constants'
import { IChildrenProps } from '@typing/index'
import { normalizePath, useRedirectToRoot } from '@utils'

export const AuthRouteGuard = ({ children }: IChildrenProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const redirectToRoot = useRedirectToRoot()

  console.log(normalizePath(pathname))
  useEffect(() => {
    const authRoute = localStorage.getItem(LOCALSTORAGE.KEY.AUTH_ROUTE)

    const publicRoutes = ['/', '/change-my-mind']

    const protectedRoutes = {
      [LOCALSTORAGE.VALUE.SURVEY]: ['/survey'],
      [LOCALSTORAGE.VALUE.COMPLETE]: ['/survey', '/complete'],
      [LOCALSTORAGE.VALUE.THANK_YOU]: ['/thank-you']
    }

    /* Special Routes */
    if (authRoute === LOCALSTORAGE.VALUE.THANK_YOU) {
      if (pathname === '/change-my-mind') return navigate(pathname)
      return navigate(authRoute)
    }

    /* Public Routes */
    if (publicRoutes.includes(pathname)) {
      if (localStorage.getItem('_grecaptcha') && authRoute && pathname === '/') return navigate(authRoute)
      return navigate(normalizePath(pathname))
    }

    /* Protected Routes */
    if (authRoute && protectedRoutes[authRoute].includes(normalizePath(pathname))) {
      console.log('asd')
      return navigate(normalizePath(pathname))
    }

    /* Old Routes */
    if (authRoute) {
      return navigate(authRoute)
    }

    /* Invalid Routes */
    return redirectToRoot()
  }, [pathname])

  return children
}

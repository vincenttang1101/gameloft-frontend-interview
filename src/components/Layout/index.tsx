import { Header } from '@components/Layout/Header'
import { Footer } from '@components/Layout/Footer'
import { IChildrenProps } from '@typing/index'

export const Layout = ({ children }: IChildrenProps) => {
  return (
    <div className='body'>
      <Header />
      <main style={{ padding: '25px 0 80px' }}>{children}</main>
      <Footer />
    </div>
  )
}

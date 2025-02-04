import Container from './container'
// import UserMenu from "./user-menu"
import LogoutBtn from './logoutBtn'
import { auth } from '@/auth'
import LoginBtn from './loginBtn'

const Header = async () => {

  const session = await auth()
  console.log(session)

  return (
    <Container className="py-4">
      <header className="flex justify-between items-center sm:px-4">
        {/* <UserMenu /> */}
        {session ? <LogoutBtn /> : <LoginBtn />}
      </header>
    </Container>
  )
}

export default Header
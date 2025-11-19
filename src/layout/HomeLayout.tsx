import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"


const HomeLayout:React.FC = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default HomeLayout
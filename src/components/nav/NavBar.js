import { ClientNav } from "./ClientNav"
import { TrainerNav } from "./TrainerNav"
import "./NavBar.css"

export const NavBar = () => {
  <></>
  const localMogoUser = localStorage.getItem("mogo_user")
  const mogoUserObject = JSON.parse(localMogoUser)

  if (mogoUserObject.trainer) {
    return <TrainerNav />
  } else {
    return <ClientNav />
  }
}
import { TrainerViews } from "./TrainerViews"
import { ClientViews } from "./ClientViews"




export const ApplicationViews = () => {

	const localMogoUser = localStorage.getItem("mogo_user")
	const mogoUserObject = JSON.parse(localMogoUser)

	if (mogoUserObject.trainer) {
		return <TrainerViews />

	}
	else {
		return <ClientViews />
	}	
}

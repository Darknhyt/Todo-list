import { Admin } from "./administrator.js"
import { tdInterface} from "./interface.js"

const admin = new Admin()
const it = tdInterface(admin)
if(localStorage.getItem("projectList")){

    admin.loadProyects(localStorage.getItem("projectList"))
}
it.create()
localStorage
const save = () => localStorage.setItem("projectList", admin.getProyectsInfo())
document.getElementById("save").addEventListener("click",save)


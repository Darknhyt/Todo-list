import { Admin } from "./administrator.js";
const admin = new Admin()
const save = ()=>localStorage.setItem("projectList",admin.getProyectsInfo())
    
admin.loadProyects(localStorage.getItem("projectList"))



    


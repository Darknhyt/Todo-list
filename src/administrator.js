import { Proyect } from './proyect.js'
export class Admin {
    constructor() {
        this.projects = []
        this.idCounter = 1
    }
    newProyect(title, description, date) {
        const newProyect = new Proyect(this.idCounter, title, description, date)
        this.projects.push(newProyect)
        this.idCounter++
        return newProyect
    }
    getProyect(id) {
        return this.projects.find(e => e.getId() == id)
    }
    getAllProjects() {
        return this.projects
    }
    getTask(proyectId, taskId) {
        return this.getProyect(proyectId).getTask(taskId)
    }
    addTask(proyectId, title, desc, priority, finishied) {
        return this.getProyect(proyectId).addTask(title, desc, priority, finishied)
    }
    changeTaskStatus(proyectId, taskId) {
        return this.getTask(proyectId, taskId).toggleTaskStatus()
    }
    getTaskStatus(proyectId, taskId) {
        return this.getTask(proyectId, taskId).getStatus()
    }
    changeTaskPrority(proyectId, taskId, newValue) {
        return this.getTask(proyectId, taskId).priority = newValue
    }
    getTaskPriority(proyectId, taskId) {
        return this.getTask(proyectId, taskId).priority
    }
    removeProyect(id) {
        const index = this.projects.findIndex(e => e.getId() == id)
        this.projects.splice(index, 1)
    }
    removeTask(proyectId, taskId) {
        this.getProyect(proyectId).removeTask(taskId)
    }
    getProyectsInfo() { //Convert all proyects an one String
        let res = ""
        this.projects.forEach(p => {
            res += `⁝${p.title}§${p.description}§${p.getDate()}`
            p.getAllTasks().forEach(t => {
                res += `¦${t.title}§${t.description}§${t.priority}§${t.getStatus()}`
            });
        })
        return res.slice(1)
    }
    loadProyects(proyects) { //Load the proyects from String
        const list = proyects.split(/⁝/)
        list.forEach(p => {
            const pItem = p.split(/§|¦/)
            this.newProyect(pItem[0], this.getBoolean(pItem[1]), pItem[2])
            for (let i = 3; i < pItem.length; i += 4) {
                this.addTask(this.idCounter - 1, pItem[i], this.getBoolean(pItem[i + 1]), pItem[i + 2], pItem[i + 3])
            }
        })
    }
    getBoolean(val) {
        return val != "false" ? val : false
    }

}
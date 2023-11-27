import { Task } from "./Task.js"
export class Proyect {
    constructor(id, title, description, date) {
        this.id = id
        this._title = title
        this._description = description || "default"
        this.date = date!=undefined? date: new Date().toLocaleString()
        this.tasks = []
        this.idTask = 1
    }
    getId() {
        return this.id
    }
    get title(){
        return this._title
    }
    set title(newTitle){
        if(typeof newTitle === 'string'){
            this._title = newTitle
        } else {
            console.error('Invalid title')
        }
    }
    get description(){
        return this._description
    }
    set description(newDesc){
        if(typeof newDesc === 'string'){
            this._description = newDesc
        } else {
            console.error('Invalid description')
        }
    }
    getDate(){
        return this.date
    }
    addTask(title, desc, priority, finishied) {
        this.tasks.push(new Task(this.idTask, title, desc, priority, finishied))
        this.idTask++
    }
    getTask(id) {
        return this.tasks.find(e => e.getTaskId() == id)
    }
    getAllTasks(){
        return this.tasks
    }
    removeTask(id){
        const index = this.tasks.findIndex(e=>e.getTaskId() == id)
        this.tasks.splice(index,1)
    }
}
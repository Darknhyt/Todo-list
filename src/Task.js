export class Task {
    constructor(id, title, desc, priority, isFinishied){
        this.id = id
        this._title = title
        this._description = desc
        this._priority = priority
        this.isFinishied = isFinishied==='true'? true:false
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
    get priority(){
        return this._priority
    }
    set priority(newValue){
        if(-1 < newValue && newValue < 6){
            this._priority = newValue
        } else {
            console.error('The priority range is out of limits, must be a value between 0 to 5')
        }
    }
    getTaskId(){
        return this.id
    }
    getStatus(){
        return this.isFinishied
    }
    toggleTaskStatus(){
        this.isFinishied = !this.isFinishied ? true:false 
    }
}
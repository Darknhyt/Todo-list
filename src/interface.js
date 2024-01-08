export function tdInterface(admin) {
    const $ = a => document.getElementById(a)
    const $t = a => document.getElementsByTagName(a)[0]
    const $q = a => document.querySelector(a)
    let formId = 1
    function create() {
        admin.projects.forEach(p => createCard(p))
    }
    function createCard(project) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.id = `p-${project.getId()}`
        card.dataset.id = project.getId();
        const cardTitle = document.createElement("a")
        const addTask = document.createElement("button")

        addTask.classList.add("add-task")
        addTask.dataset.parent = project.getId()
        addTask.textContent = "New Task"

        cardTitle.innerHTML += `<h3>${project.title}</h3>`
        card.innerHTML += `<span>${project.date}</span>`
        if (project.description) card.innerHTML += `<p>${project.description}</p>`
        
        card.prepend(cardTitle)
        const task = document.createElement("div")
        task.id = `task-${project.getId()}`
        task.classList.add("task", "hidden")
        project.tasks.forEach(t => { createTask(t,task) });
           card.appendChild(task)
        
        
        cardTitle.addEventListener("click", (e) => {
            e.preventDefault()
            if (task.classList.length == 1) {
                task.classList.add("hidden")
            } else if (project.tasks.length > 0){
                task.classList.remove("hidden")
            }
        })
        
        card.appendChild(addTask)
        addTask.addEventListener("click", () => {
            formId = project.getId()
            $("t-title").textContent = `New Task for: ${project.title}`
            $("project-dialog").close()
            $("task-dialog").show()
        })
        

        $t("main").appendChild(card)
    }

    function createTask(t,task) {
        const check = createElement(task,"input","","type","checkbox")
        if(t.getStatus()){check.checked=true}
        check.addEventListener("change",()=>{t.toggleTaskStatus()})
        createElement(task,"hr")
        createElement(task,"h4",t.title)
        if (t.description) {createElement(task,"p",t.description)}
    }
    $("add-p").addEventListener("click", () => {
        const project = admin.newProyect($("p-title").value, $("p-desc").value)
        createCard(project)
        scrollTo({
            top: $(`p-${project.getId()}`).offsetTop,
            behavior: "smooth",
          })
        $("project-dialog").close()
    })

    $("add-t").addEventListener("click", () => {
        const newTask = admin.addTask(formId,$("task-title").value, $("task-desc").value, Number.parseInt($("t-priority").value), false)
        createTask(newTask,$("task-"+formId))
        $("task-dialog").close()
    })
    $("new").addEventListener("click", ()=>{
        $("project-dialog").show();
        $("task-dialog").close()
    })
    function createElement(parent,type,content,atribute,value){
        const ele = document.createElement(type)
        if (atribute){ele.setAttribute(atribute,value)}
        ele.textContent = content
        parent.appendChild(ele)
        return(ele)
    }
    return { create }
}
//ele("save").addEventListener("click",save)


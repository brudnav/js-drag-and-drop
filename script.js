const dropzones = document.querySelectorAll(".col");
const input = document.querySelector("input");
const button = document.querySelector("button");
const form = document.querySelector("form");



dropzones.forEach((dropzone) => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();

        dropzone.style.backgroundColor = '#e0e0e0';
    });
})

dropzones.forEach((dropzone) => {
    dropzone.addEventListener('dragleave', () => {
        dropzone.style.backgroundColor = '';
    });
})

dropzones.forEach((dropzone) => {
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const color = e.target.getAttribute("data-type")
        console.log(color)
        let taskData = JSON.parse(e.dataTransfer.getData("text/plain"))
        let task = document.querySelector(`[data-id="${taskData.id}"]`)
        console.log("task", task);
        dropzone.style.backgroundColor = '';
        task.style.backgroundColor = color;
        dropzone.appendChild(task); // přesuneme prvek
        const data = e.dataTransfer.getData("text/plain")
        console.log('Dropped!', data);
    });
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit")
})

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        e.preventDefault();
        form.requestSubmit();
    }
})


input.addEventListener("change", (e) => {
    console.log(e.target.value)
})

button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("odesláno", input.value)
    const task = document.createElement("div");
    const title = document.createElement("h3")
    task.classList.add("task");
    task.setAttribute("draggable", true)
    const id = Math.floor(Math.random() * 1000);
    const data = JSON.stringify({
        id,
        title: input.value
    })
    task.setAttribute("data-info", data)
    task.setAttribute("data-id", id)
    title.textContent = JSON.parse(task.getAttribute("data-info")).title;
    task.appendChild(title);
    dropzones[0].appendChild(task);

    task.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', data); // můžeš předat cokoli
        console.log('Start dragging');
    });
})










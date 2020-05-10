let host = "http://localhost:3000/notes";
fetch(host).then(function(promise) { return promise.json(); }).then(assembleList);

let newNoteDiv = document.createElement("div");
newNoteDiv.classList.add("new_note");
let titleField = document.createElement("input");
titleField.classList.add("note_title");
let bodyField = document.createElement("input");
bodyField.classList.add("note_body");
let postbutt = document.createElement("button");
postbutt.textContent = "post";
postbutt.addEventListener("click", PostBehavior);
newNoteDiv.appendChild(titleField);
newNoteDiv.appendChild(bodyField);
newNoteDiv.appendChild(postbutt);
document.querySelector(".content").appendChild(newNoteDiv);

function PostBehavior(event) {
    event.preventDefault();
    let title = titleField.value;
    let body = bodyField.value;
    if(title == "" || body == "")
        return;
    postNote({ "title": title, "body": body });
}

function assembleList(notes) {
    for(n of notes)
        generateElement(n);
}

function generateElement(note) {
    let e = document.createElement("div");
    e.classList.add("note-container");
    e.setAttribute("id", `note_${note.id}`);

    let header = document.createElement("h2");
    header.textContent = note.title;
    e.appendChild(header);

    let text = document.createElement("p");
    text.textContent = note.body;
    e.appendChild(text);

    let footer = document.createElement("footer");
    footer.appendChild(document.createTextNode(note.id));
    let delbutt = document.createElement("button");
    delbutt.textContent = "delete";
    delbutt.addEventListener("click", function() { delNote(note); });
    let editbutt = document.createElement("button");
    editbutt.textContent = "edit";
    editbutt.addEventListener("click", function() { editMode(note); });
    footer.appendChild(delbutt);
    footer.appendChild(editbutt);
    e.appendChild(footer);

    document.querySelector(".content").appendChild(e);
}

function delNote(note) {
    fetch(host + `/${note.id}`, { method: "DELETE" });
}

function postNote(e) {
    fetch(host, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": titleField.value, "body": bodyField.value })
    });
}

function patchNote(note) {
    fetch(host + `/${note.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    });
}

function editMode(note) {
    let div = document.querySelector(`#note_${note.id}`);
    for(let child of div.childNodes)
        div.removeChild(child);

    let titleField = document.createElement("input");
    titleField.value = note.title;
    let bodyField = document.createElement("input");
    bodyField.value = note.body;
    let postbutt = document.createElement("button");
    postbutt.textContent = "update";
    postbutt.addEventListener("click", function() { patchNote({ "id": note.id, "title": titleField.value, "body": bodyField.value }); });
    let exitbutt = document.createElement("button");
    exitbutt.textContent = "cancel";
    exitbutt.addEventListener("click", function() { exitEditMode(note); });
    div.appendChild(titleField);
    div.appendChild(bodyField);
    div.appendChild(postbutt);
    div.appendChild(exitbutt);

}

function exitEditMode(note) {
    window.location.reload();
}

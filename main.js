
fetch("http://localhost:3000/notes").then(function(promise) { return promise.json(); }).then(assembleList);

function assembleList(notes) {
    for(n in notes)
        generateElement(n);
    //make code to add the new note field~
}

function generateElement(note) {

}

function delNote(note) {

}

function postNote(note) {

}

import Stack from "./stack.js"




function moveCursorToEnd(id) {
    const input = document.getElementById(id);
    const length = input.value.length;
    // Focus on the input
    input.focus();
    // Set the cursor to the end
    input.setSelectionRange(length, length);
}


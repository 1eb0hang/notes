import {getElement} from "./md.js"
import {currentPage} from "./editor.js"

function execute(doc, call, str_cmd){
    return new Promise((resolve)=>{
	const command = str_cmd.split(" ")
	
	// if(command[0] in get_commands()){
	//     get_commands()[command[0]](doc,call,command)
	// }else{
	//     print(doc,call, new Array(command[0], `Command not found: "${command[0]}"`))
	// }
	
	// console.log(`Executed: ${command}`);
	resolve();
    });
}

function update() {    
    const terminal = document.getElementById('terminal');

    // Create a new line container
    const line = document.createElement('div');
    line.className = 'line';

    // Create the prompt element
    const prompt = document.createElement('span');
    prompt.id = 'prompt';
    prompt.textContent = '>>';

    // Create the text area
    const textArea = document.createElement('textarea');
    //console.log(textArea);
    textArea.className = 'text-area';
    textArea.rows = 1;
    textArea.style.margin=1;

    textArea.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Replace text area with a paragraph
            //const output = document.createElement('p');
            const output = getElement(textArea.value)
	    
	    currentPage.addLine(textArea.value);
	    output.style.margin = 1;
            line.replaceChild(output, textArea);
	    line.removeChild(prompt)
	    
            // Call execute and create a new line after completion
            await execute(document, update, "");
            update();
        }else if(e.key == "Backspace" && textArea.value.length == 0){
	    e.preventDefault();

            // Replace text area with a paragraph
            //const output = document.createElement('p');
            const output = getElement(textArea.value, e.key);
	    
	    output.style.margin = 1;
            line.replaceChild(output, textArea);
	    line.removeChild(prompt)
	    
            // Call execute and create a new line after completion
            await execute(document, update, "");
            update();
	}
	
    });

    // Append prompt and text area to the line
    line.appendChild(prompt);
    line.appendChild(textArea);
    terminal.appendChild(line);

    // Focus the new text area
    textArea.focus();
}

// Initialize the terminal with the first line
update();

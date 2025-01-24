import {getElement} from "./md.js"
import {currentPage} from "./editor.js"

const page = document.getElementById('page');

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

function update(newLine = true) {    
    // Create a new line container
    let line = null;
    if(newLine){
	line = document.createElement('div');
	line.className = 'line';
    }else{
	line = document.getElementById(`${currentPage.getLines().length}`);
    }

    // Create the prompt element
    const prompt = document.createElement('span');
    prompt.id = 'prompt';
    prompt.textContent = '>>';

    // Create the text area
    const textArea = document.createElement('textarea');
    // console.log(textArea);
    textArea.className = 'text-area';
    textArea.rows = 1;
    textArea.style.margin=1;

    if(!newLine){
	textArea.value = currentPage.getLines()[currentPage.getLines().length-1];
	currentPage.removeLine(currentPage.getLines().length-1);
    }

    textArea.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
	    e.preventDefault();
	    line.replaceChild(addNewLine(textArea, line), textArea);
	    line.removeChild(prompt)
            // Call execute and create a new line after completion
            await execute(document, update, "");
            update();
            
	}else if(e.key == "Backspace" && textArea.value.length == 0){
	    e.preventDefault();

	    line.removeChild(textArea);
	    line.removeChild(prompt);
	    // textArea = null;
            update(false);
	}
	
    });

    // Append prompt and text area to the line
    if(newLine){
	line.appendChild(prompt);
	line.appendChild(textArea);
	page.appendChild(line);
    }else{
	line.replaceChild(prompt, line.childNodes[0]);
	line.appendChild(textArea);
    }

    // Focus the new text area
    textArea.focus();
}

function addNewLine(textArea, line){

    // Replace text area with a paragraph
    //const output = document.createElement('p');
    const output = getElement(textArea.value)
    
    let lines = currentPage.getLines()
    let idx = 0;
    if(lines.length>0){
	idx = lines.length-1;
    }
    lines.push(textArea.value)

    currentPage.setLines(lines);
    line.id = currentPage.getLines().length;
    
    output.style.margin = 1;
    return output;
}


// Initialize the opage with the first line
update();

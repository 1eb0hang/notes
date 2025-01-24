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
    const line = document.createElement('div');
    line.className = 'line';

    // Create the prompt element
    const prompt = document.createElement('span');
    prompt.id = 'prompt';
    prompt.textContent = '>>';

    // Create the text area
    const textArea = document.createElement('textarea');
    console.log(textArea);
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
	    line.id = currentPage.getLines().length;

	    output.style.margin = 1;
            line.replaceChild(output, textArea);
	    line.removeChild(prompt)
	    
            // Call execute and create a new line after completion
            await execute(document, update, "");
            update();
            
	}else if(e.key == "Backspace" && textArea.value.length == 0){
	    e.preventDefault();

	    line.removeChild(textArea);
	    line.removeChild(prompt);
	    // textArea = null;
            //update(false);
	    edit();
	}
	
    });

    // function printRand(input){
    // 	console.log("Yayayayayaya ayay3994-e");
    // 	//page.removeChild(input);
    // }

    // Append prompt and text area to the line
    line.appendChild(prompt);
    line.appendChild(textArea);
    page.appendChild(line);

    // Focus the new text area
    textArea.focus();
}

function edit(){
    const line = document.getElementById(`${currentPage.getLines().length}`);

    console.log(line.childNodes[0]);
    // Create the prompt element
    const prompt = document.createElement('span');
    prompt.id = 'prompt';
    prompt.textContent = '>>';

    // Create the text area
    const textArea = document.createElement('textarea');
    console.log(textArea);
    textArea.className = 'text-area';
    textArea.rows = 1;
    textArea.style.margin=1;
    textArea.value = currentPage.getLines()[currentPage.getLines().length-1];

    textArea.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Replace text area with a paragraph
            //const output = document.createElement('p');
            const output = getElement(textArea.value)
	    
	    currentPage.addLine(textArea.value);
	    line.id = currentPage.getLines().length;

	    output.style.margin = 1;
            line.replaceChild(output, textArea);
	    line.removeChild(prompt)
	    
            // Call execute and create a new line after completion
            await execute(document, update, "");
            update();
            
	}else if(e.key == "Backspace" && textArea.value.length == 0){
	    e.preventDefault();

	    line.removeChild(textArea);
	    line.removeChild(prompt);
	    // textArea = null;
            //update(false);
	    update();
	}
	
    });

    line.replaceChild(prompt, line.childNodes[0]);
    line.appendChild(textArea);
    //page.appendChild(line);
    textArea.focus();

}

// Initialize the opage with the first line
update();

import {getElement} from "./md.js"
import {currentPage, savePage, loadPage} from "./editor.js"

const page = document.getElementById('page');

function execute(command) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100); // Simulate execution delay
    });
}

function addNewLine(textArea, line){
    
    let lines = currentPage.getLines()
    let idx = 0;
    if(lines.length>0){
	idx = lines.length-1;
    }
    lines.push(textArea.value)

    currentPage.setLines(lines);
    line.id = currentPage.getLines().length;
    
    // Replace text area with a paragraph
    const output = getElement(textArea.value);
    output.style.margin = 1;
    return output;
}

function title(textArea, line){
    currentPage.setTitle(textArea.value);
    const output = getElement(`# ${textArea.value}`);
    output.style.margin = 1;
    return output;
}

export function update(newLine = true, isTitle=false) {    
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
    prompt.textContent = isTitle?"title:":'>>';

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
	    const child = isTitle?title(textArea,line):addNewLine(textArea, line);
	    line.replaceChild(child, textArea);
	    line.removeChild(prompt)
            // Call execute and create a new line after completion
            await execute("");
            update();
            
	}else if(e.key == "Backspace" && textArea.value.length == 0){
	    if(currentPage.getLines().length > 0){
		e.preventDefault();
		
		line.removeChild(textArea);
		line.removeChild(prompt);
		// textArea = null;
	    }
	    update(false);
	}else if(e.key == "ArrowUp"){
	    //do something
	    console.log("up");
	}else if(e.key == "ArrowDown"){
	    //do something else
	    console.log("down")
	}
	
    });


    // Append prompt and text area to the line
    if(newLine){
	line.appendChild(prompt);
	line.appendChild(textArea);
	page.appendChild(line);
    }else{
	if(currentPage.getLines().length > 0 || 
	   (currentPage.getLines().length == 0 && textArea.value != "undefined")){
	    line.replaceChild(prompt, line.childNodes[0]);
	    line.appendChild(textArea);
	}
    }

    // Focus the new text area
    textArea.focus();
}

const button = document.getElementById("but1");
button.addEventListener("click", ()=>{
    // console.log(button);
    savePage();
    loadPage(button.value, page);
    
});

const button2 = document.getElementById("but2");
button2.addEventListener("click", ()=>{
    // console.log(button);
    savePage();
    loadPage(button2.value, page)
    
});

// Initialize the opage with the first line
update(true, true);

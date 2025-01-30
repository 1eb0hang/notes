import {getElement} from "./md.js"
import {currentPage, savePage, getPage} from "./editor.js"

const page = document.getElementById('page');

function execute(command) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100); // Simulate execution delay
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
    const output = getElement(textArea.value)
    output.style.margin = 1;
    return output;
}

const button = document.getElementById("but1");
button.addEventListener("click", ()=>{
    // console.log(button);
    get();
    
});

const button2 = document.getElementById("but2");
button2.addEventListener("click", ()=>{
    // console.log(button);
    savePage();
    
});

// Initialize the opage with the first line
update();


//get request -> fetch(url)
function get(){
    let res_data = null;
    fetch("http://127.0.0.1:8080/get")
	.then(res=>{
	    if(!res.ok){
		console.log("Response not ok");
		return;
	    }

	    return res.json();  
	})
	.then(data=>{
	    res_data = data;
	    console.log(data.content);
	    
	})
	.catch(error=>{
	    console.log(error);
	});
}

// post request


function post(postData){
    // const postData={
    // 	id:4,
    // 	title:"Example Title 2",
    // 	content:"# This is a header\nthis is the next line\n## subheader\nnext line after sub"
    // }

    fetch("post", {
	method: "POST",
	header:{
	    "Content-Type":"apllication/json"
	},
	body:JSON.stringify(postData)
    })
	.then(res=>{
	    if(!res.ok){
		console.log("Response not ok");
		return;
	    }

	    return res.json();  
	})
	.then(data=>{
	    console.log("POST successful");
	})
}

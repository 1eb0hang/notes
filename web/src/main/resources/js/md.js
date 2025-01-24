
export const getElement = (text, e.key = "Enter")=>{
    let output = null;
    switch(e.key) {
    case "Enter":
	output = getNewParagraph(text);
	break;
    case "Backspace":
	output = editLine();
	break;
    default:
	console.log(`Error: Invalid line delimiter: ${e.key}`);
    }
}

function getNewParagraph(text){
    let arr_str = new Array(text.length).fill(" ");
    
    for(let i = 0; i<text.length; i+=1){
	if(!emptyString(text[i])){
	    arr_str[i] = text[i];
	}
    }

    let output = document.createElement('p');
    if(emptyString(text)){
	output.style.height = "26px"; // need to make this some kind of variable for customizablitiy
    }
    console.log(output);
    output.textContent = arr_str.join("");
    return output;
}

function editLine(lineNum, cursorPos = -1){
    
}

function emptyString(text){
    if (text.length == 0){
	return true;
    }

    for(let i = 0; i<text.length; i+=1){
	if(text.charCodeAt(i) != 32){
	    return false;
	}
    }
    return true;
}

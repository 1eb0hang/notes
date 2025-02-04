
export function getElement(text, key = "Enter"){
    let output = null;
    switch(key) {
    case "Enter":
	output = convert(text);
	break;
    case "Backspace":
	//output = editLine();
	break;
    default:
	//console.log(`Error: Invalid line delimiter: ${e.key}`);
    }
    return output
}

function convert(text){
    let output = null;
    switch(text[0]){
    case "#":
	output = getHeading(text)
	break;
    
    default:
	output = getParagraph(text)
	break;
    }
    return output;
}

function getParagraph(text){
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

    //console.log(`Output: ${output["textContent"]}`);
    output.textContent = arr_str.join("");
    return output;
}

function getHeading(text){ //TODO: add param for heading level
    let arr_str = new Array(text.length).fill(" ");
    let hLevel = 0;

    for(let i = 0; i<text.length; i+=1){
	if(text[i] == "#"){
	    hLevel= hLevel>=6? 6:hLevel+1;
	    arr_str[i] = "";
	}
	else{
	    arr_str[i] = text[i];
	}
	// TODO: add incremental key check
    }

    let output = document.createElement(`h${hLevel}`);
    // if(emptyString(text)){
    // 	output.style.height = "26px"; // need to make this some kind of variable for customizablitiy
    // }

    //console.log(output["textContent"]);
    output.textContent = arr_str.join("");
    return output;
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

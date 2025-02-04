
let titles = {}

function isValidTitle(title){
    if (title in titles){
	return false;
    }
    return true;
}

export default class Page{
    #properties;
    constructor(properties={}){
	this.#properties = this.#setDefaultPage();
	if(properties == {}) {return;}
	// Object.entries(properties).forEach(([k,v]) => {
	    
	// });
	let keys = Object.keys(properties);
	for(var i = 0; i < keys.length;i++){
	    this.#properties[keys[i]] = properties[keys[i]];
	}
    }
    

    #setDefaultPage(){
	return {
	    "lines":[], 
	    "title":(()=>{
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		
		return mm + '-' + dd + '-' + yyyy;})()
	};
    }

    getProperties(){
	return this.#properties;
    }

    moveCursorToEnd(id) {
	const input = document.getElementById(id);
	const length = input.value.length;
	// Focus on the input
	input.focus();
	// Set the cursor to the end
	input.setSelectionRange(length, length);
    }

    setTitle(title){
	this.#properties["title"] = title;
    }
    
    getTitle(){
	return this.#properties["title"];
    }
    
    addLine(text, index = this.#properties["lines"].length){
	this.#properties["lines"].splice(index, 0, text);
	console.log(this.#properties["lines"]);
    }

    removeLine(index= this.#properties["lines"].length){
	this.#properties["lines"].splice(index, 1);
	console.log(this.#properties["lines"]);
    }

    getLines(){
	return this.#properties["lines"];
    }

    setLines(lines){
	this.#properties["lines"] = lines;
	console.log(this.#properties["lines"]);
    }

    getPageContent(){
	return this.#properties["lines"].join("\n");
    }

}

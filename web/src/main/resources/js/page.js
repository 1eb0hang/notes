
default export class Page{
    constructor(pageDetails){
	#pageDetails = #setDefaultPageDetails();
	
	Object.entries(pageDetails).forEach(([k,v]) => {
	    var keys = Object.keys(pageDetails);
	    for(var i = 0; i < keys.length;i++){
		#pageDetails[keys[i]] = pageDetails[key[i]];
		console.log(#pageDetails[keys[i]])
	    }
	});
    }

    
    #setDefaultPageDetails(){
	return {
	    "page":null, 
	    "title":(()=>{
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		
		return mm + '-' + dd + '-' + yyyy;})()
	};
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
	this.#title = title;
    }
    
    addLine(text){
	this.#page.push(text);
    }
}

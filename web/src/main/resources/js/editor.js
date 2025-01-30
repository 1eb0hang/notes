import Stack from "./stack.js"
import Page from "./page.js"
import {getElement} from "./md.js"

export let currentPage = new Page({"title":"Intro"})
export let pageStack = [];
//console.log(currentPage);

// function moveCursorToEnd(id) {
//     const input = document.getElementById(id);
//     const length = input.value.length;
//     // Focus on the input
//     input.focus();
//     // Set the cursor to the end
//     input.setSelectionRange(length, length);
// }



export function savePage(){
    post("http://127.0.0.1:8080/post", {
	"title":currentPage.getTitle(),
	"content":currentPage.getPageContent()
    });
    console.log("post done");
}

export function getPage(pageTitle){
    // TODO: Add local stack to check before going to db
    console.log(`http://127.0.0.1:8080/page/${pageTitle}`)
    let data = get(`http://127.0.0.1:8080/page/${pageTitle}`)
    .then((data)=>{return data})
    .catch((data)=>{return null});
}

export function loadPage(pageTitle, page_obj){
    let data = get(`http://127.0.0.1:8080/page/${pageTitle}`)
	.then((data)=>{
	    let newPage = [`# ${data["title"]}`].concat(data["content"].split("\n"));
	    for(let i = 0; i<newPage.length; i+=1){
		newPage[i]=getElement(newPage[i]);
	    }
	    page_obj.replaceChildren(...newPage);
	    console.log(page_obj); 
	}).catch((data)=>{return null});
}

function get(url){
    let res_data = null;
    //"http://127.0.0.1:8080/get"
    return new Promise((resolve, reject)=>{
	fetch(url)
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
		return resolve(res_data);
		
	    })
	    .catch(error=>{
		console.log(error);
		reject(null);
	    });
    })
}

function post(url, postData){
    // "http://127.0.0.1:8080/post"

    fetch(url, {
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

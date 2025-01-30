import Stack from "./stack.js"
import Page from "./page.js"

export let currentPage = new Page({"title":"Intro"})
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
    return get(`http://127.0.0.1:8080/page/${pageTitle}`);
}

export function loadPage(pageTitle){
    let data = getPage(pageTitle);
    console.log(data.content)
}

function get(url){
    let res_data = null;
    //"http://127.0.0.1:8080/get"
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
	    
	})
	.catch(error=>{
	    console.log(error);
	});
    return res_data;
}

function post(url, postData){
    // const postData={
    // 	id:4,
    // 	title:"Example Title 2",
    // 	content:"# This is a header\nthis is the next line\n## subheader\nnext line after sub"
    // }

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

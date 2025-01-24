
export default class Stack{
    constructor(){
	this.items = [];
    }

    push(element){
	this.items.push(element);
    }

    pop(){
	if (this.items.length == 0){
            return 'Underflow';
	}
	return this.items.pop();
    }

    peek(){
	// return the top most element from the stack
	// but does'nt delete it.
	return this.items[this.items.length - 1];
    }

    isEmpty()
    {
	// return true if stack is empty
	return this.items.length == 0;
    }

    printStack()
    {
	let str = "";
	for (let i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
	return str;
    }
}

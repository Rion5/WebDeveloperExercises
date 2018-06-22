var todos = ["Win Lottery"];

var input = prompt("What would you like to do?");
while(input !=="quit"){
    if(input === "new"){
        createNewTodo();
    }
    else if(input === "view"){
        viewTodos();
    }
    else if(input ==="delete"){
        deleteTodo();
    }
    else{
        alert("Please enter use one of the commands\nnew, view, quit");
        console.log("Please enter use one of the commands\nnew, view, delete, quit");
    }
    input = prompt("What would you like to do?");
}
alert("Application Closed");
console.log("Application Closed");
//Push new todo to end of array
function createNewTodo(){
    var newInput = prompt("Enter a new task todo");
    todos.push(newInput);
    console.log(todos);
}
//View all todos
function viewTodos(){
    console.log("*****");
    todos.forEach(function(todo, index){
        console.log(index+": "+todo);
    });
    console.log("*****");
}
//Delete todo at given index
function deleteTodo(){
    var index = prompt("Enter index of todo to delete");
        //Delete that todo via splice()
        todos.splice(index,1);
        console.log("Deleted Todo");
}


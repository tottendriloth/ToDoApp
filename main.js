// Html Css copied, JS written along with lecturer
window.onload = function () { 
    let form = document.getElementById("form");
    let input = document.getElementById("input");
    let btn = document.getElementById("btn");
    let list = document.getElementById("list");
    let buttonClear = document.getElementById("btnClr");
    let id = 1;

    let liItem = "";
    let todoList = [];

    btn.addEventListener("click", addTodoItem);
    list.addEventListener("click", boxChecked);
    buttonClear.addEventListener("click", clearList);

    
    if (localStorage.length < 0) {
    buttonClear.style.display = "none"; 
        console.log("button");
        }
    
   
        if(localStorage.length <= 0) {
            buttonClear.style.display = "none"; 	

        }

	function addTodoItem() {
		if(input.value === "") {
			alert("You must enter some value!");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("here!")
				list.style.borderTop = "2px solid white";
				buttonClear.style.display = "inline";
			}
			let text = input.value;	
			let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;				
			list.insertAdjacentHTML('beforeend', item);	
			liItem = {item: text, checked: false};
			todoList.push(liItem);		
			id++;
			addToLocalStorage();
			form.reset();
		}
    }    
    
        function boxChecked(event) {
            const element = event.target;
            if (element.type === "checkbox") {
                element.parentNode.style.textDecoration = "line-through";
                todoList = JSON.parse(localStorage.getItem("todoList"));
                todoList[element.id.split('-')[1] - 1].checked = element.checked.toString();
                localStorage.setItem("todoList", JSON.stringify(todoList));
            }
        }

        function addToLocalStorage() {
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("todoList", JSON.stringify(todoList));
            } else {
                alert("browser doesn't support local storage!");
            }
        }
    
        function displayList() {
            list.style.borderTop = "2px solid white";
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.forEach(function (element) {
                console.log(element.item)
                let text = element.item;
                let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
                list.insertAdjacentHTML("beforeend", item);
                
                //if there is a checked box, then style
                if (element.checked) {
                    let li = document.getElementById("li-" + id);
                    li.style.textDecoration = "line-through";
                    li.childNodes[1].checked = element.checked;
                }
                id++;
            });
        }
    

        
        function clearList() {
            todoList = [];
            localStorage.clear();
            list.innerHTML = "";
            buttonClear.style.display = "none";
            list.style.borderTop = "";
        }
    }
    
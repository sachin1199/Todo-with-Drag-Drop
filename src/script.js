const add = document.querySelector("#add");

// the tasks array
let taskList = [];

//

let editingTaskId = null;
// creating the task
const addTask = () => {
  const task = document.querySelector("input");

    if (editingTaskId !== null) {
    taskList = taskList.map((todo) =>
      todo.id === editingTaskId ? { ...todo, text: task.value } : todo
    );
        editingTaskId = null;
        add.innerText=`Add`
    localStorageSave();
    } else {

    const todo = {
      id: Date.now(),
      text: task.value,
      completed: false,
    };
    taskList.push(todo);
    localStorageSave();
  }
  task.value = ` `;
};


// searching the task
const searchButton = document.querySelector('#search');
searchButton.addEventListener('click', () => {
    search();
})



// deleting task

const deleteTask = (id) => {
  taskList = taskList.filter((task) => task.id !== id);
  localStorageSave();
  rendor();
};

// getting the task

add.addEventListener("click", () => {
  addTask();
  rendor();
});

const rendor = () => {
  // to show the remainig tasks
  const totalTaskShow = document.querySelector("#totalTasks");
  let totalTask = taskList.length;
  totalTaskShow.textContent = `ToTal Task remaining :${totalTask}`;
  const container = document.querySelector("#task");

  container.innerHTML = ` `;

  // -----
  // for each
  taskList.forEach((todo,index) => {
      const li = document.createElement("li");
      li.setAttribute('draggable', true);
      li.dataset.index = index;

      li.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', index);
          li.style.opacity = "0.5";

          
      });

      li.addEventListener('dragover', (e) => {
          
          e.preventDefault()
          
      });
      li.addEventListener('drop', (e) => {
          e.preventDefault();
          const from = e.dataTransfer.getData('text/plain');
          const to = li.dataset.index;
          if (from != to) {
              const temp = taskList[from];
              taskList[from] = taskList[to];
              taskList[to] = temp;
              localStorageSave();
              rendor();
              
          }


          
          
      })
      




      const span = document.createElement("span");
      span.textContent = todo.text;
      Object.assign(span.style, {
        backgroundColor: "#ffffff", // white card
        color: "#333333", // dark text for readability
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "16px",
        fontWeight: "500",
        display: "block",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        backgroundClip: "padding-box",
        marginTop: "16px",
      });

      span.onmouseenter = () => {
        span.style.transform = "translateY(-2px)";
        span.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
      };

      span.onmouseleave = () => {
        span.style.transform = "translateY(0)";
        span.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";
      };
    // 

    const update = document.createElement("button");
      update.innerText = `Update`;
      Object.assign(update.style, {
        backgroundColor: "#f0f0f0", // light gray button
        color: "#333333", // dark text
        border: "1px solid #cccccc", // subtle border
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
        transition: "all 0.2s ease-in-out",
        outline: "none",
      });

      update.onmouseenter = () => {
        update.style.backgroundColor = "#e0e0e0";
        update.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        update.style.transform = "translateY(-1px)";
      };

      update.onmouseleave = () => {
        update.style.backgroundColor = "#f0f0f0";
        update.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.06)";
        update.style.transform = "translateY(0)";
      };


      
    update.addEventListener("click", () => {
        const task = document.querySelector("input");
        add.innerText = `Update`;
      task.value = todo.text;
      editingTaskId = todo.id;
    });
      
      
      update.addEventListener('dblclick', () => {
          add.innerText = `Add`;
          const input = document.querySelector("input");
          input.value = ` `;


      })

    //

    const deletee = document.createElement("button");
    deletee.innerText = `Delete`;
    Object.assign(deletee.style, {
      backgroundColor: "#ff4d4d", 
      color: "#ffffff", 
      border: "none",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      transition: "all 0.2s ease-in-out",
      outline: "none",
    });

    deletee.onmouseenter = () => {
      deletee.style.backgroundColor = "#e60000"; // deeper red
      deletee.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
      deletee.style.transform = "translateY(-1px)";
    };

    deletee.onmouseleave = () => {
      deletee.style.backgroundColor = "#ff4d4d";
      deletee.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.08)";
      deletee.style.transform = "translateY(0)";
    };
    deletee.addEventListener("click", () => {
      deleteTask(todo.id);
    });

      //
      // completed task
      const completed = document.createElement('input');
      completed.setAttribute('type', 'checkbox');
      Object.assign(completed.style, {
        width: "18px",
        height: "18px",
        accentColor: "#4CAF50", // green color when checked (modern browsers only)
        cursor: "pointer",
        marginRight: "12px",
        transform: "translateY(2px)", // align better with text
      });
      completed.addEventListener('click', (e) => {
          todo.completed = e.target.checked;
          if (e.target.checked) {
              span.style.textDecoration = 'line-through';
              update.style.textDecoration = 'line-through';
              deletee.style.textDecoration = "line-through";
              totalTaskShow.textContent = `ToTal Task remaining :${--totalTask}`;
              localStorageSave()
              
              
          }
          else {
            span.style.textDecoration = "none";
            update.style.textDecoration = "none";
              deletee.style.textDecoration = "none";
              totalTaskShow.textContent = `ToTal Task remaining :${++totalTask}`;
              localStorageSave();
              
          }

          
      })


    //   


      //
      li.style.listStyle = "none"; 
      Object.assign(li.style, {
        listStyle: "none",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #ddd",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
        padding: "0", // we give padding inside the card (Main)
        margin: "0 auto",
        maxWidth: "700px",
        transition: "box-shadow 0.3s ease",
      });
      
      
      li.onmouseenter = () =>
        (li.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)");
      li.onmouseleave = () =>
        (li.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)");

    

      //   
      const rightSide = document.createElement('div');
      const leftSide = document.createElement("div");
      const Main = document.createElement("div");
      leftSide.appendChild(completed);
      leftSide.appendChild(span)


      Object.assign(leftSide.style, {
        display: "flex",
        justify: "center",
        alignItems: "center",
        gap: "12px",
        padding: "10px 16px",

        flex: "1", // allows text to grow
      });

      Object.assign(rightSide.style, {
        display: "flex",
        justify: "center",
        alignItems: "center",
        padding: "10px 16px",

        gap: "12px",
      });
      

      Object.assign(Main.style, {
          display: 'flex',
          
        
      });
      

      rightSide.appendChild(update);
      rightSide.appendChild(deletee);
Main.appendChild(leftSide)
Main.appendChild(rightSide)

      li.appendChild(Main)




      Object.assign(container.style, {
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      });
      container.appendChild(li);
      
  });
  // end of for each
};
// rendor ends here

// saving to local storage
const localStorageSave = () => {
  localStorage.setItem("Todo", JSON.stringify(taskList));
};

// retreiing from the Local storage
const loadFromStorage = () => {
    const data = JSON.parse(localStorage.getItem("Todo"));
   taskList=data || []
};

// creating the search functinality
const search = () => {
    let searchCard = document.querySelector("#searchCard");

    searchCard.innerHTML = ` `;


    const input = document.querySelector('input');
    let valuE = input.value.toLowerCase();
    let search = taskList.filter((task) => (task.text.toLowerCase().includes(valuE)))
    search.map((obj) => {


        div = document.createElement('div');
        Object.assign(div.style, {
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "250px",
            color: "#fff",
            fontFamily: "Segoe UI, sans-serif",
            transition: "transform 0.3s",
            margin: "10px auto",
            textAlign: "center",
            cursor: "pointer",
        });
        div.innerText = obj.text;
        searchCard.appendChild(div)
    }
        
    )


    


    
}


// let currentState = 'light';


// const mode = document.querySelector('.mode');
// mode.addEventListener('click', () => {
//     if (currentState == 'light') {
//         document.body.style.backgroundColor = 'black'
//         currentState='dark'
        
//     }
//     else {
//         document.body.style.backgroundColor = 'white';
//         currentState = 'light';
//     }


    
// })



const inputGroup = document.querySelector("#inputGroup");
Object.assign(inputGroup.style, {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
});




loadFromStorage();
rendor();

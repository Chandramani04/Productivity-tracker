function openFeatures() {
    let allElems = document.querySelectorAll('.elem');
    let fullElem = document.querySelectorAll('.FullElements');
    let fullElemBackBtn = document.querySelectorAll('.backBtn');

    allElems.forEach(function (ele) {
        ele.addEventListener('click', function () {
            const target = fullElem[ele.id];
            if (target.classList.contains('motivation-full-page') || target.classList.contains('pomodoro-full-page')) {
                target.style.display = 'flex';
            } else {
                target.style.display = 'block';
            }
        })
    });

    fullElemBackBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            fullElem[btn.id].style.display = 'none';
        });
    });
}
openFeatures();


function todoList() {
    let currentTaskList = []; // array of objects {task, description, isImportant}

    // Load tasks from local storage on page load
    if (localStorage.getItem('tasks')) { // Check if there are tasks in local storage
        currentTaskList = JSON.parse(localStorage.getItem('tasks'));
    }

    function renderTasks() {
        let allTask = document.querySelector('section.todo-full-page .todo-container .allTask');

        allTask.innerHTML = '';
        let data = '';

        currentTaskList.forEach(function (taskObj) {
            data += `
    <div class="task">
        <h3>${taskObj.task}
            <span class="${taskObj.isImportant}">Imp</span>
        </h3>
        <p>${taskObj.description}</p>
        <button class="deleteTaskBtn">
            Mark as Completed
        </button>
    </div>
    `;
        });

        allTask.innerHTML = data;

    }
    renderTasks();

    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form input');
    let taskDescription = document.querySelector('.addTask form textarea');
    let taskBtn = document.querySelector('.addTask form button');
    let impCheckBox = document.querySelector('.mark-imp input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let taskObj = {
            task: taskInput.value,
            description: taskDescription.value,
            isImportant: impCheckBox.checked
        };

        currentTaskList.push(taskObj);
        renderTasks();

        // Update local storage
        localStorage.setItem('tasks', JSON.stringify(currentTaskList));

        // Clear the form
        taskInput.value = '';
        taskDescription.value = '';
        impCheckBox.checked = false;
    });

    // Delete task functionality using Event Delegation
    // in event delegation, we add the event listener to a parent element and check if the target element matches the selector we want

    document.querySelector('section.todo-full-page .todo-container .allTask').addEventListener('click', function (e) {
        // e is the object on which the click event is fired
        if (e.target.classList.contains('deleteTaskBtn')) { // Check if the clicked element is a delete button
            let taskDiv = e.target.parentElement;
            let taskTitle = taskDiv.querySelector('h3').innerText.replace('Imp', '').trim();
            let taskDescription = taskDiv.querySelector('p').innerHTML;

            // Remove from currentTaskList and make sure to remove the task with the same title and description , don't just remove all tasks with the same title or description
            currentTaskList = currentTaskList.filter(function (taskObj) {
                return !(taskObj.task === taskTitle && taskObj.description === taskDescription);
            });


            // Update local storage
            localStorage.setItem('tasks', JSON.stringify(currentTaskList));

            // Re-render tasks
            renderTasks();
        }
    });
}
todoList();


function dailyPlanner() {
    let timeSlotsArr = [];
    for (let i = 6; i <= 23; i++) {
        let timeSlot = `${i}:00 - ${i + 1}:00`;
        timeSlotsArr.push(timeSlot);
    }

    let storedEvents = JSON.parse(localStorage.getItem('events')) || {};


    let dayPlannerContainer = document.querySelector('.day-planner');
    let data = '';

    timeSlotsArr.forEach(function (timeSlot, index) {
        data += `
        <div class="time-slots">
            <p>${timeSlot}</p>
            <input id="time-slot-${index}" type="text" placeholder="..." value="${storedEvents[timeSlot] || ''}">
            <button class="clear-btn" id="clear-btn-${index}">Clear</button>
        </div>
        `;

    });

    dayPlannerContainer.innerHTML = data;

    // Add event listeners to each input field to save the event in local storage when the user types something
    timeSlotsArr.forEach(function (timeSlot, index) {
        let inputField = document.getElementById(`time-slot-${index}`);
        inputField.addEventListener('input', function () {
            storedEvents[timeSlot] = inputField.value;
            localStorage.setItem('events', JSON.stringify(storedEvents));
        });
    });

    // Add event listeners to clear buttons to clear the event from local storage and the input field
    timeSlotsArr.forEach(function (timeSlot, index) {
        let clearBtn = document.getElementById(`clear-btn-${index}`);
        clearBtn.addEventListener('click', function () {
            delete storedEvents[timeSlot];
            localStorage.setItem('events', JSON.stringify(storedEvents));
            document.getElementById(`time-slot-${index}`).value = '';
        });
    });


}
dailyPlanner();


async function motivationalQuote() {
    let response = await fetch('https://motivational-spark-api.vercel.app/api/quotes/random');
    let data = await response.json();
    let quote = data.quote;
    let author = data.author;

    // use dom manipulation to display the quote and author in the quote container
    let quoteContainer = document.querySelector('section.motivation-full-page .quote-container .motivation-wrapper .quote');
    quoteContainer.innerHTML = `
           <div class="quote-text">
                "${quote}"
            </div>
            <div class="quote-author">
               - ${author}
            </div>
    
    `;

}
motivationalQuote();


function pomodoroTimer() {

    let totalSeconds = 25 * 60; // 25 minutes in seconds
    let timer = document.querySelector('.pomodoro-full-page .pomodoro-timer .timer-display');
    let startBtn = document.querySelector('.pomodoro-full-page .pomodoro-timer .timer-controls .startBtn');
    let pauseBtn = document.querySelector('.pomodoro-full-page .pomodoro-timer .timer-controls .pauseBtn');
    let resetBtn = document.querySelector('.pomodoro-full-page .pomodoro-timer .timer-controls .resetBtn');

    // capture work session 
    let session = document.querySelector('.pomodoro-full-page h4');

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        // Add leading zero if seconds are less than 10
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        // using padStart method to add leading zero
        // seconds = String(seconds).padStart(2, '0');
        // minutes = String(minutes).padStart(2, '0');

        timer.innerText = `${minutes}:${seconds}`;
    }
    updateTimer();

    let interval;

    // if 25 minutes are up , next 5 minutes will be break time and then again 25 minutes of work and then 5 minutes of break and so on until the user stops the timer or resets it

    let isWorkSession = true; // flag to check if it's work time or break session

    startBtn.addEventListener('click', function () {
        if (!interval) { // if there is no existing interval, start a new one
            interval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimer();
                } else {
                    clearInterval(interval);
                    interval = null;
                    if (isWorkSession) {
                        totalSeconds = 5 * 60; // Switch to break time
                        session.innerText = "Take a break!!";
                        session.style.backgroundColor = 'red';
                        session.style.color = 'white';

                    } else {
                        totalSeconds = 25 * 60; // Switch to work time
                        session.innerText = "Work Session";
                        session.style.backgroundColor = '#097436';
                        session.style.color = 'var(--ternary-color1)';
                    }
                    isWorkSession = !isWorkSession; // Toggle session
                    updateTimer();
                }
            }, 1000);
        }
    });

    pauseBtn.addEventListener('click', function () {
        clearInterval(interval);
        interval = null;
    });

    resetBtn.addEventListener('click', function () {
        clearInterval(interval);
        interval = null;
        totalSeconds = 25 * 60; // Reset to 25 minutes
        updateTimer();
    });
}
pomodoroTimer();

// weather app 
const apiKey = '5dd79aa9892a460392b204702260802'; // weatherapi.com API key
let city = 'Varanasi';

async function fetchWeather() {

    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    let data = await response.json();
    console.log(data);

    let weatherContainer = document.querySelector('#main .allElements header');
    /*
       <div class="header1">
            <h1>Varanasi India</h1>
            <h4>Monday , 1:00 PM</h4>
            <h2>20 °C</h2>
        </div>
        <div class="header2">
            <h3>Precipitation: 10%</h3>
            <h3>Humidity: 60%</h3>
            <h3>Feels Like: 22 °C</h3>
            <h3>Wind Speed: 15 km/h</h3>
            <h4>Light Rain</h4>
        </div>

    */
    
    weatherContainer.innerHTML = `
        <div class="header1">
            <h1>${data.location.name} ${data.location.country}</h1>
            <h4>${new Date(data.location.localtime).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</h4>
            <h2>${data.current.temp_c} °C</h2>
        </div>
        <div class="header2">
            <h3>Precipitation: ${data.current.precip_in}%</h3>
            <h3>Humidity: ${data.current.humidity}%</h3>
            <h3>Feels Like: ${data.current.feelslike_c} °C</h3>
            <h3>Wind Speed: ${data.current.wind_kph} km/h</h3>
            <h4>${data.current.condition.text}</h4>
        </div>

    `;
}
fetchWeather();


// implement a daily goals feature 

function dailyGoal() {
    const goalInput = document.getElementById('dailyGoalInput');
    const addGoalBtn = document.getElementById('addGoalBtn');
    
    // Check if elements exist before proceeding
    if (!goalInput || !addGoalBtn) return;

    const goalContainer = document.querySelector('.goal-container');
    const displayGoalContainer = document.querySelector('.display-goal');
    const addGoalContainer = document.querySelector('.add-goal');

    // Load goal from local storage
    let savedGoal = localStorage.getItem('dailyGoal');
    if (savedGoal) {
        savedGoal = JSON.parse(savedGoal);
    }

    function renderGoal() {
        if (savedGoal) {
            displayGoalContainer.innerHTML = `
                <div class="goal-item ${savedGoal.completed ? 'completed' : ''}">
                    <h3>${savedGoal.text}</h3>
                    <div class="actions">
                        <button class="checkBtn">${savedGoal.completed ? 'Undo' : 'Done'}</button>
                        <button class="deleteBtn">Delete</button>
                    </div>
                </div>
            `;
            
            // Add event listeners for the dynamic elements
            const checkBtn = displayGoalContainer.querySelector('.checkBtn');
            const deleteBtn = displayGoalContainer.querySelector('.deleteBtn');
            
            if(checkBtn) checkBtn.addEventListener('click', toggleGoal);
            if(deleteBtn) deleteBtn.addEventListener('click', deleteGoal);
            
            // Hide input if goal exists
            addGoalContainer.style.display = 'none';
        } else {
            displayGoalContainer.innerHTML = '';
            addGoalContainer.style.display = 'flex';
            goalInput.value = '';
        }
    }

    function addGoal() {
        const goalText = goalInput.value.trim();
        if (goalText) {
            savedGoal = {
                text: goalText,
                completed: false
            };
            localStorage.setItem('dailyGoal', JSON.stringify(savedGoal));
            renderGoal();
        }
    }

    function toggleGoal() {
        if (savedGoal) {
            savedGoal.completed = !savedGoal.completed;
            localStorage.setItem('dailyGoal', JSON.stringify(savedGoal));
            renderGoal();
        }
    }

    function deleteGoal() {
        savedGoal = null;
        localStorage.removeItem('dailyGoal');
        renderGoal();
    }

    addGoalBtn.addEventListener('click', addGoal);
    
    // Allow pressing Enter to add goal
    goalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addGoal();
        }
    });

    renderGoal();
}
dailyGoal();







// Tabs
let tabs = document.querySelectorAll(".tabs");
for (let index = 0; index < tabs.length; index++) {
    let tab = tabs[index];
    let tabsItems = tab.querySelectorAll(".tabs-item");
    let tabsBlocks = tab.querySelectorAll(".tabs-block");
    for (let index = 0; index < tabsItems.length; index++) {
        let tabsItem = tabsItems[index];
        tabsItem.addEventListener("click", function (e) {
            for (let index = 0; index < tabsItems.length; index++) {
                let tabsItem = tabsItems[index];
                tabsItem.classList.remove('active');
                tabsBlocks[index].classList.remove('active');
                tabsBlocks[index + 3].classList.remove('active');
            }
            tabsItem.classList.add('active');
            tabsBlocks[index].classList.add('active');
            tabsBlocks[index + 3].classList.add('active');
            e.preventDefault();
        });
    }
}

//-----------------------------------------------------------------------------------------

// Create main obj
const mainTasksObj = {};
const mainNotesObj = {};
const mainLinksObj = {};

// Global const and variables
const newTask = document.querySelector('.make-task');
const tasksAside = document.querySelector('.main-tasks__list');
const card = document.querySelector('.card');
const makeTaskForm = document.querySelector('.make-task__inner');
//Global buttons
const taskBtn = document.querySelector('.main-tasks__button');
const cardButton = document.querySelector('.card__button');
const closeCardButton = document.querySelector('.card__close');
const closeMakeTaskButton = document.querySelector('.make-task__close');



// Show make-task aray
taskBtn.addEventListener('click', function () {
    // hide card
    if (card.classList.contains('active')) {
        card.classList.remove('active');
    }

    // show or hide make task area
    newTask.classList.toggle('active');

    closeEditorCard();
});
// Close make-task aray
closeMakeTaskButton.addEventListener('click', function () {
    newTask.classList.remove('active');
});


// Add of new task
makeTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // local const
    const tasks = document.querySelector('.tabs-item--task');
    const notes = document.querySelector('.tabs-item--note');
    const links = document.querySelector('.tabs-item--link');

    // Checc what type of task has been added
    if (links.classList.contains('active')) {
        createLinksButton();
        createLinksCard();
        setSublistHeight();
    }

    if (notes.classList.contains('active')) {
        createNotesButton();
        createNotesCard();
        setSublistHeight();
    }

    if (tasks.classList.contains('active')) {
        createTasksButton();
        createTasksCard();
        setSublistHeight();
    }
});

// Helper fuctions to tasks, notes, links

// Tasks

// Delete tasks
card.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('tasks__item')) {
        const taskListTitle = document.querySelector('.card__nameinput--tasks').value;
        const tasksArr = mainTasksObj[taskListTitle]['tasksList'];
        const newTasksArr = [];

        // Set delete animation
        target.classList.add('tasks__item--checked');
        target.classList.add('tasks__item--animate');
        setTimeout(function () {
            target.remove();
        }, 1000);

        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i].textContent === target.textContent) {
                delete tasksArr[i];
            }
        }

        tasksArr.forEach(el => {
            if (el) {
                newTasksArr.push(el);
            }
        });

        mainTasksObj[taskListTitle]['tasksList'] = newTasksArr;
    }
});


// Links
const linksBtn = document.querySelector('.links__btn');

// Create links
linksBtn.addEventListener('click', function () {
    addNewLink();
});

function addNewLink() {
    // Local consts
    const linksInputName = document.querySelector('.links__input--name');
    const linksInput = document.querySelector('.links__input--link');
    const linksList = document.querySelector('.links__list');

    // Create links list
    if (linksInput.value != '' && linksInputName.value != '') {
        linksList.innerHTML += `<a class="links__item" href="${linksInput.value}" target="_blank">${linksInputName.value}</a>`;

        linksInput.value = '';
        linksInputName.value = '';
    }
}

// functions after submit ------------------------------------------------------------------

// Tasks
function createTasksButton() {
    // Local variables and const
    const inputTitle = document.querySelector('.make-task__nameinput--tasks');
    const textArea = document.querySelector('.tasks__textarea');
    const tasksSublist = document.querySelector('.main-tasks__sublist--tasks');


    if (inputTitle.value !== '' && textArea.value !== '') {
        let tasksNameInputValue = inputTitle.value;

        // Create properties in main tasks obj
        mainTasksObj[tasksNameInputValue] = {};
        mainTasksObj[tasksNameInputValue]['nameList'] = tasksNameInputValue;
        inputTitle.value = '';

        // Add task button in aside task list
        tasksSublist.innerHTML += `<li class="main-tasks__subitem main-tasks__subitem--tasks" role="button">
                                        <span>${mainTasksObj[tasksNameInputValue]['nameList']}</span>
                                        <button class="main-tasks__remove"></button>
                                    </li>`;

        // Textarea
        // Get tasks arry from textarea
        const tasksArr = textArea.value.split('\n');

        // Creat tasks array in main obj
        mainTasksObj[tasksNameInputValue]['tasksList'] = [];

        for (let i = 0; i < tasksArr.length; i++) {

            // Push task item in mainTaskObj
            const taskItem = document.createElement('button');
            taskItem.classList.add('tasks__item');
            taskItem.textContent = tasksArr[i];
            mainTasksObj[tasksNameInputValue]['tasksList'].push(taskItem);
        }

        // Set empty inputs value
        inputTitle.value = '';
        textArea.value = '';

        // Hide make task aria
        newTask.classList.remove('active');
    } else {
        checkInputFilling(inputTitle);
    }
}

function createTasksCard() {
    const tasksListAside = document.querySelector('.main-tasks__sublist--tasks');

    tasksListAside.addEventListener('click', (e) => {
        const target = e.target;

        // Find tasks subitem
        if (target.classList.contains('main-tasks__subitem--tasks')) {
            // Local consts and variables
            const cardInput = document.querySelector('.card__nameinput--tasks');
            const targetValue = target.querySelector('span').textContent;

            // Change active tab
            const tabsBlockTasks = document.querySelectorAll('.card .tasks');
            const tabsTask = document.querySelector('.card .tabs-item--task');

            changeActiveTabs(tabsTask, tabsBlockTasks);

            // Set title
            cardInput.value = mainTasksObj[targetValue]['nameList'];

            // Remove old tasks
            const tasks = document.querySelectorAll('.tasks__item');

            tasks.forEach(item => {
                if (item) item.remove();
            });

            // Set tasks array
            const tasksArr = mainTasksObj[targetValue]['tasksList'];
            const tasksList = document.querySelector('.tasks__list');

            tasksArr.forEach(el => {
                tasksList.prepend(el);
            });

            // Close new task
            if (newTask.classList.contains('active')) {
                newTask.classList.remove('active');
            }

            setActiveButton(target);

            card.classList.add('active');

            closeEditorCard();
        }

    });
    //deleteTask();
}

// Notes
function createNotesButton() {
    // Local variables and const
    const inputTitle = document.querySelector('.make-task__nameinput--notes');
    const notesSublist = document.querySelector('.main-tasks__sublist--notes');
    const noteTextarea = document.querySelector('.note__textarea');

    if (inputTitle.value !== '' && inputTitle.value !== '') {
        const notesListTitleValue = inputTitle.value;

        // Create properties in main tasks obj
        mainNotesObj[notesListTitleValue] = {};
        mainNotesObj[notesListTitleValue]['nameList'] = notesListTitleValue;
        inputTitle.value = '';

        // Add task button in aside task list
        notesSublist.innerHTML += `<li class="main-tasks__subitem main-tasks__subitem--note" role="button">
                                        <span>${mainNotesObj[notesListTitleValue]['nameList']}</span>
                                        <button class="main-tasks__remove"></button>
                                    </li>`

        // Get value from tectarea and write in mainNotesObj
        const noteTextareaValue = noteTextarea.value;
        mainNotesObj[notesListTitleValue]['value'] = noteTextareaValue;
        noteTextarea.value = '';

        // Hide make task aria
        newTask.classList.remove('active');
    } else {
        checkInputFilling(inputTitle);
    }
}

function createNotesCard() {
    const tasksListAside = document.querySelector('.main-tasks__sublist--notes');

    tasksListAside.addEventListener('click', (e) => {
        const target = e.target;

        // Find tasks subitem
        if (target.classList.contains('main-tasks__subitem--note')) {
            // Local consts and variables
            const cardInput = document.querySelector('.card__nameinput--notes');
            const targetValue = target.querySelector('span').textContent;
            const notesText = document.querySelector('.note__text');

            // Change active tab
            const tabsBlockTasks = document.querySelectorAll('.card .notes');
            const tabsTask = document.querySelector('.card .tabs-item--note');

            changeActiveTabs(tabsTask, tabsBlockTasks);

            // Set title
            cardInput.value = mainNotesObj[targetValue]['nameList'];

            // Remove old tasks
            const notesTextPhar = document.querySelector('.note__text *');

            if (notesTextPhar) {
                notesTextPhar.remove();
            }

            // Set text in card
            let notesTextValue = document.createElement('p');
            notesText.prepend(notesTextValue);
            notesTextValue.textContent = mainNotesObj[targetValue]['value'];

            // Close new task
            if (newTask.classList.contains('active')) {
                newTask.classList.remove('active');
            }

            setActiveButton(target);

            card.classList.add('active');

            closeEditorCard();
        }

    });
}

//links
function createLinksButton() {
    const inputTitle = document.querySelector('.make-task__nameinput--links');
    const linksSublist = document.querySelector('.main-tasks__sublist--links');
    const linksList = document.querySelectorAll('.links__item');

    if (inputTitle.value !== '') {
        if (linksList.length != 0) {
            const inputTitleValue = inputTitle.value;

            // Create properties in main tasks obj
            mainLinksObj[inputTitleValue] = {};
            mainLinksObj[inputTitleValue]['nameList'] = inputTitleValue;
            inputTitle.value = '';

            linksSublist.innerHTML += ` <li class="main-tasks__subitem main-tasks__subitem--link" role="button">
                                            <span>${mainLinksObj[inputTitleValue]['nameList']}</span>
                                            <button class="main-tasks__remove"></button>
                                        </li>`

            // Creat links array in main obj
            mainLinksObj[inputTitleValue]['linksList'] = [];

            // Push linksArr to mainLinksObj
            const linksArr = newTask.querySelectorAll('.links__item');

            linksArr.forEach(item => {
                mainLinksObj[inputTitleValue]['linksList'].push(item);

                item.remove();
            });

            // Hide make task aria
            newTask.classList.remove('active');
        }
    } else {
        checkInputFilling(inputTitle);
    }
}

function createLinksCard() {
    const linksListAside = document.querySelector('.main-tasks__sublist--links');

    linksListAside.addEventListener('click', (e) => {
        const target = e.target;

        // Find links subitem
        if (target.classList.contains('main-tasks__subitem--link')) {
            // Local consts and variables
            const cardInput = document.querySelector('.card__nameinput--links');
            const targetValue = target.querySelector('span').textContent;

            // Change active tab
            const tabsBlockTasks = document.querySelectorAll('.card .links');
            const tabsTask = document.querySelector('.card .tabs-item--link');

            changeActiveTabs(tabsTask, tabsBlockTasks);

            // Set title
            cardInput.value = mainLinksObj[targetValue]['nameList'];

            // Remove old links
            const links = document.querySelectorAll('.links__item');

            links.forEach(item => {
                if (item) item.remove();
            });

            // Set links array
            const linksArr = mainLinksObj[targetValue]['linksList'];
            const linksList = document.querySelector('.links__list--card');

            linksList.innerHTML = '';

            linksArr.forEach(el => {
                linksList.prepend(el);
            });

            // Close new link
            if (newTask.classList.contains('active')) {
                newTask.classList.remove('active');
            }

            setActiveButton(target);

            card.classList.add('active');

            closeEditorCard();
        }

    });
}

// Tasks edit
const editTasksButton = card.querySelector('.card-edit--tasks');

editTasksButton.addEventListener('click', () => {
    editTasksCard(changeTasksListData);

});

// Notes edit
const editNotesButton = document.querySelector('.card-edit--notes');

editNotesButton.addEventListener('click', function () {
    editNotesCard(changeNotesListData);
});

// Links edit
const editLinkButton = document.querySelector('.card-edit--links');

editLinkButton.addEventListener('click', function () {
    editLinksCard(changeLinksListData);
});

// edit function-------------------------------------------------------------------------------

function editTasksCard(callback) {
    const title = document.querySelector('.card__nameinput--tasks');
    const editTasksButton = card.querySelector('.card-edit--tasks');
    const taskCard = card.querySelector('.tabs__content--input .tasks');

    taskCard.classList.add('edit');
    title.removeAttribute('readonly');
    editTasksButton.classList.add('hidden');
    title.focus();

    card.classList.add('card--edit');
    cardButton.classList.add('active');

    callback();
}

function changeTasksListData() {
    const tasksCard = document.querySelector('.tasks--list');
    const title = document.querySelector('.card__nameinput--tasks');
    const titleOldValue = title.value;
    const tasksItem = document.querySelectorAll('.tasks__item');

    tasksItem.forEach(task => {
        const inputEditTask = document.createElement('input');
        inputEditTask.classList.add('tasks__change-item');
        inputEditTask.setAttribute('placeholder', 'Измените задачу');
        inputEditTask.setAttribute('aria-label', 'Измените задачу');
        task.before(inputEditTask);

        // disable to remove tasks
        task.style.pointerEvents = 'none';
    });

    changeActiveCard('tasks');

    // hide the remove tooltip
    tasksCard.classList.add('tasks--changing');

    if (tasksCard.classList.contains('active')) {
        cardButton.addEventListener('click', function () {
            const titleNewValue = title.value;
            const taskButton = document.querySelector('.main-tasks__subitem--tasks.active > span');
            const inputsEdit = document.querySelectorAll('.tasks__change-item');

            // change taks item
            inputsEdit.forEach(input => {
                const currentTask = input.nextElementSibling;
                if (input.value !== '') {
                    currentTask.innerText = input.value;
                }
                input.remove();

                // enable to remove tasks
                currentTask.style.pointerEvents = 'auto';
            });


            // change the task title in main obj
            if (mainTasksObj[titleOldValue] !== mainTasksObj[titleNewValue]) {
                Object.defineProperty(mainTasksObj, titleNewValue,
                    Object.getOwnPropertyDescriptor(mainTasksObj, titleOldValue));
                delete mainTasksObj[titleOldValue];
            }

            mainTasksObj[titleNewValue]['nameList'] = titleNewValue;
            taskButton.textContent = mainTasksObj[titleNewValue]['nameList'];

            // add new tasks array in main obj
            const newTaskItems = document.querySelectorAll('.tasks__item');

            mainTasksObj[titleNewValue]['tasksList'] = newTaskItems;

            closeEditorCard();
        }, {
            once: true
        });
    }

}

function editNotesCard(callback) {
    const card = document.querySelector('.card');
    const title = document.querySelector('.card__nameinput--notes');
    const note = document.querySelector('.note__text');
    const noteCard = card.querySelector('.tabs__content--input .notes');
    const noteParagraph = document.querySelector('.note__text p');

    noteCard.classList.add('edit');
    title.removeAttribute('readonly');
    title.focus();
    editNotesButton.classList.add('hidden');

    const noteText = noteParagraph.textContent;

    note.innerHTML = `<textarea class="note__textarea note__textarea--edit">${noteText}</textarea>`;

    card.classList.add('card--edit');
    cardButton.classList.add('active');

    callback();
}

function changeNotesListData() {
    const notesCard = document.querySelector('.notes');
    const title = document.querySelector('.card__nameinput--notes');
    const titleOldValue = title.value;

    // if (!notesCard.classList.contains('active')) notesCard.classList.add('active');
    changeActiveCard('notes');

    if (notesCard.classList.contains('active')) {
        cardButton.addEventListener('click', function () {
            const noteTextarea = document.querySelector('.note__textarea--edit');
            const noteButton = document.querySelector('.main-tasks__subitem--note.active > span');
            const note = document.querySelector('.note__text');
            const titleNewValue = title.value;

            if (mainNotesObj[titleOldValue] !== mainNotesObj[titleNewValue]) {
                Object.defineProperty(mainNotesObj, titleNewValue,
                    Object.getOwnPropertyDescriptor(mainNotesObj, titleOldValue));
                delete mainNotesObj[titleOldValue];
            }

            mainNotesObj[titleNewValue]['nameList'] = titleNewValue;
            mainNotesObj[titleNewValue]['value'] = noteTextarea.value;

            noteButton.textContent = mainNotesObj[titleNewValue]['nameList'];

            note.innerHTML = `<p>${noteTextarea.value}</p>`;

            closeEditorCard();
        }, {
            once: true
        });
    }
}

function editLinksCard(callback) {
    const card = document.querySelector('.card');
    const title = document.querySelector('.card__nameinput--links');
    const links = document.querySelectorAll('.links__item');
    const linkCard = card.querySelector('.tabs__content--input .links');

    card.classList.add('card--edit');

    linkCard.classList.add('edit');
    title.removeAttribute('readonly');
    editLinkButton.classList.add('hidden');

    let createInputName = function (linkName) {
        const inputName = document.createElement('input');

        inputName.classList.add('links__input');
        inputName.classList.add('links__input--name-change');
        inputName.setAttribute('placeholder', 'Введите имя ссылки');
        inputName.value = linkName;

        return inputName;
    };

    let createInputHref = function (linkHref) {
        const inputHref = document.createElement('input');

        inputHref.classList.add('links__input');
        inputHref.classList.add('links__input--href-change');
        inputHref.setAttribute('placeholder', 'Введите ссылку');
        inputHref.value = linkHref;

        return inputHref;
    };



    links.forEach(el => {
        elText = el.textContent;
        elHref = el.getAttribute('href');
        el.before(createInputName(elText));
        el.before(createInputHref(elHref));
    });

    title.focus();

    card.classList.add('card--edit');
    cardButton.classList.add('active');

    callback();
}

function changeLinksListData() {
    const linksCard = document.querySelector('.links');
    const title = document.querySelector('.card__nameinput--links');
    const linksNameValue = document.querySelectorAll('.links__input--name-change');
    const linksHrefValue = document.querySelectorAll('.links__input--href-change');
    let titleValue = title.value;

    // if (!linksCard.classList.contains('active')) linksCard.classList.add('active');
    changeActiveCard('links');

    if (linksCard.classList.contains('active')) {
        cardButton.addEventListener('click', function () {
            const linkButton = document.querySelector('.main-tasks__subitem--link.active > span');
            let changedTitleValue = title.value;
            titleValue = titleValue;

            if (mainLinksObj[titleValue] !== mainLinksObj[changedTitleValue]) {
                Object.defineProperty(mainLinksObj, changedTitleValue,
                    Object.getOwnPropertyDescriptor(mainLinksObj, titleValue));
                delete mainLinksObj[titleValue];
            }

            mainLinksObj[changedTitleValue]['nameList'] = changedTitleValue;
            let nameList = mainLinksObj[changedTitleValue]['nameList'];
            linkButton.innerHTML = nameList;

            // change links
            linksNameValue.forEach(el => {
                if (el.value !== '') {
                    let link = el.nextElementSibling.nextElementSibling;
                    let changedLinksNameValue = el.value;
                    link.textContent = changedLinksNameValue;
                }
                el.remove();
            });

            linksHrefValue.forEach(el => {
                if (el.value !== '') {
                    let link = el.nextSibling;
                    let changedLinksHrefValue = el.value;
                    link.setAttribute('href', changedLinksHrefValue);
                }
                el.remove();
            });

            // add new link array to main array
            const newLinksArr = document.querySelectorAll('.links__item');

            mainLinksObj[changedTitleValue]['linksItem'] = newLinksArr;

            closeEditorCard();
        }, {
            once: true
        });
    }
}


// Other

function changeActiveTabs(activeTab, activeBlock) {
    const tabsItem = document.querySelectorAll('.card .tabs-item');
    const tabsBlock = document.querySelectorAll('.card .tabs-block');

    tabsItem.forEach(el => {
        el.classList.remove('active');
    });

    tabsBlock.forEach(el => {
        el.classList.remove('active');
    });

    activeTab.classList.add('active');

    activeBlock.forEach(el => {
        el.classList.add('active');
    });
}

function checkInputFilling(inputTitle) {
    // Show message if inputs are empty
    const inputTitleWrapper = document.querySelector('.tabs__content--input');

    inputTitleWrapper.classList.add('required');

    // Canceling message
    inputTitle.addEventListener('focus', function () {
        inputTitleWrapper.classList.remove('required');
    });
}

function setActiveButton(target) {
    const buttons = document.querySelectorAll('.main-tasks__subitem');

    buttons.forEach(button => {
        button.classList.remove('active');
    });
    target.classList.add('active');

    card.classList.add('active');
}

function changeActiveCard(card) {
    const cards = document.querySelectorAll('.tabs-block--top');

    cards.forEach(el => {
        if (el.classList.contains(card)) {
            if (!el.classList.contains('active')) el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

closeCardButton.addEventListener('click', function () {
    const card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        const activeLinkButton = document.querySelector('.main-tasks__subitem.active');
        card.classList.remove('active');
        activeLinkButton.classList.remove('active');
    }

    closeEditorCard();
});

function closeEditorCard() {
    const inTask = card.querySelector('.tabs__content--input .tasks.edit');
    const inNote = card.querySelector('.tabs__content--input .notes.edit');
    const inLink = card.querySelector('.tabs__content--input .links.active');
    if (card.classList.contains('card--edit')) {
        if (inTask) {
            const tasksCard = document.querySelector('.tasks--list');
            const title = document.querySelector('.card__nameinput--tasks');
            const inputsEdit = document.querySelectorAll('.tasks__change-item');

            // change taks item
            inputsEdit.forEach(input => {
                const currentTask = input.nextElementSibling;

                input.remove();

                // enable to remove tasks
                currentTask.style.pointerEvents = 'auto';
            });

            // return to start condition
            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editTasksButton.classList.remove('hidden');

            // show the remove tooltip
            tasksCard.classList.remove('tasks--changing');
            inTask.classList.remove('edit');
            card.classList.remove('card--edit');
        } else if (inNote) {
            const title = document.querySelector('.card__nameinput--notes');


            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editNotesButton.classList.remove('hidden');

            inNote.classList.remove('edit');
            card.classList.remove('card--edit');
        } else if (inLink) {
            const editLinkButton = document.querySelector('.card-edit--links');
            const title = document.querySelector('.card__nameinput--links');
            const linksNameValue = document.querySelectorAll('.links__input--name-change');
            const linksHrefValue = document.querySelectorAll('.links__input--href-change');

            // change links
            linksNameValue.forEach(el => {
                el.remove();
            });

            linksHrefValue.forEach(el => {
                el.remove();
            });

            // add new link array to main array

            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editLinkButton.classList.remove('hidden');

            inLink.classList.remove('edit');
            card.classList.remove('card--edit');
        }
    }
}

// Remove subitem
tasksAside.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('button.main-tasks__remove')) {
        const targetParent = target.closest('.main-tasks__subitem');
        const targetSubList = target.closest('.main-tasks__sublist');
        const targetParentText = targetParent.textContent;

        if (targetSubList.classList.contains('main-tasks__sublist--tasks')) {
            delete mainTasksObj[targetParentText];
        } else if (targetSubList.classList.contains('main-tasks__sublist--notes')) {
            delete mainNotesObj[targetParentText];
        } else if (targetSubList.classList.contains('main-tasks__sublist--links')) {
            delete mainLinksObj[targetParentText];
        }

        // Set sublist height
        const targetParentList = targetSubList.offsetHeight - 34;
        target.closest('.main-tasks__sublist-wrapper').style.height = `${targetParentList}px`;
        targetParent.remove();
        card.classList.remove('active');
    }
});



// Set task sublist height
document.addEventListener('DOMContentLoaded', function () {
    const subList = document.querySelectorAll('.main-tasks__sublist');
    // add height for sublists exept hidden sublists
    subList.forEach(el => {
        let subListHeight = el.clientHeight;
        // checking hidden class on button
        if (!el.closest('.main-tasks__sublist-wrapper').previousElementSibling.classList.contains('hidden')) {
            el.closest('.main-tasks__sublist-wrapper').style.height = `${subListHeight}px`;
        }
    });
});

tasksAside.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('main-tasks__item-button')) {
        target.classList.toggle('hidden');

        // find sublist
        let activeListWrapper = target.nextElementSibling;
        let activeList = activeListWrapper.firstElementChild;
        let activeListHeight = 0;

        if (target.classList.contains('hidden')) {
            // set height to 0
            activeListWrapper.style.cssText = `height: 0px; opacity: 0; visibility: hidden;`;
        } else {
            // set current height
            activeListHeight = activeList.clientHeight;

            activeListWrapper.style.cssText = `height: ${activeListHeight}px; opacity: 1; visibility: visible;`;
        }


    }
});

function setSublistHeight() {
    const sublist = document.querySelectorAll('.main-tasks__sublist');

    sublist.forEach(el => {
        const subListWrapper = el.closest('.main-tasks__sublist-wrapper');
        const subListHeight = el.clientHeight;

        subListWrapper.style.cssText = `height: ${subListHeight}px; opacity: 1; visibility: visible;`;
    });

}

// resize window
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Clock

function clock() {
    var date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    document.querySelector('.header__time').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);
clock();

// Calendar
let calendar = flatpickr(".header__icon--calendar", {
    disableMobile: "true"
});

// Close calendar on click to btn
const calendarBtn = document.querySelector('.header__icon--calendar');

calendarBtn.addEventListener('click', function () {
    if (calendarBtn.classList.contains('active') && (calendarBtn.classList.contains('close'))) {
        calendarBtn.classList.remove('close');
        calendarBtn.classList.remove('active');
        calendar.close();
    } else if (calendarBtn.classList.contains('active')) {
        calendarBtn.classList.add('close');
    }
});

// Calculator
const calculatorBtn = document.querySelector('.header__link--calculator');
const calculatorMain = document.querySelector('.main-calculator');
const toggleCalculator = function () {
    calculatorMain.classList.toggle('active');
}

calculatorBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleCalculator();
});

document.addEventListener('click', function (e) {
    const target = e.target;
    const its_calculator = target == calculatorMain || calculatorMain.contains(target);
    const its_calculatorBtn = target == calculatorBtn;
    const calculator_is_active = calculatorMain.classList.contains('active');

    if (!its_calculator && !its_calculatorBtn && calculator_is_active) {
        toggleCalculator();
    }
});

let rad = true;
let deg = false;
let button = document.getElementsByTagName("button");
let key = document.getElementById("key");
let dis = document.getElementById("display");
let values = [];
let equals = false;
let ANS = 0;

function calculator() {
    eventHandler();
}

function eventHandler() {
    window.addEventListener('keypress', keyDisplay);
    key.addEventListener('click', display);
}

function keyDisplay() {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
        printOnTheScrean(String.fromCharCode(event.keyCode), dis);
    }
}

function display(data) {
    let target = event.target;
    if (target.className == 'digit' || target.className == 'operator' || target.className == 'function') {
        printOnTheScrean(target, dis);
        checkEquals(target, dis);
    }

}

function checkEquals(data, dis) {
    if (data.textContent == "=") {
        equals = true;
        values = dis.textContent.split(" ");
        operationByPriority(values);
    }
}

function printOnTheScrean(data, dis) {
    if (data.textContent == "Rad") {
        rad = true;
        deg = false;
    } else if (data.textContent == "Deg") {
        deg = true;
        rad = false;
    } else if (data.textContent == "Ans") {
        if (equals) {
            dis.textContent = ANS;
        } else {
            insertOrAdd(ANS, data.className);
        }

    } else if (data.textContent == "AC") {
        if (dis.textContent[dis.textContent.length - 1] == " ")
            dis.textContent = dis.textContent.substring(0, dis.textContent.length - 3);
        else if (equals)
            dis.textContent = "0";
        else {
            dis.textContent = dis.textContent.substring(0, dis.textContent.length - 1);
        }
    } else if (data.className == "function") {
        equals = false;
        insertOrAdd(data.textContent + '( ', data.className);
    } else if (data.className == "operator") {
        equals = false;
        if (data.textContent == "x!") {
            dis.textContent += "!";
        } else if (data.textContent == "e") {
            insertOrAdd(Math.E, data.className);
        } else if (data.textContent == "π") {
            insertOrAdd(Math.PI, data.className);
        } else if (data.textContent == "(") {
            insertOrAdd(data.textContent + ' ', data.className);
        } else if (data.textContent == ")") {
            dis.textContent += ' ' + data.textContent;
        } else {
            dis.textContent += ' ' + data.textContent + ' ';
        }
    } else if (data >= 0 && data <= 9) {
        insertOrAdd(data, 'digit');
    } else {
        insertOrAdd(data.textContent, data.className);
    }
    return dis;
}

function operationByPriority(values) {
    let op = ['!', '%', '÷', '×', '-', '+'];
    let functions = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√('];
    let i = 0;
    let f = 0;
    let index = 0;
    equals = true;
    while (i < op.length) {
        for (let c = 0; c < values.length; c++) {
            if (/\d+!/.test(values[c])) {
                values[c] = factorial(parseFloat(values[c]));
                index++;
            }
        }
        // check functions
        while (f < functions.length) {
            if (values.indexOf(functions[f]) > -1) {
                let t = values.indexOf(functions[f]);
                values[t] = fOpearation(functions[f], values[t + 1]);
                values[t + 1] = null;
                values[t + 2] = null;
                values = values.filter(function (v) {
                    return v != null;
                });
            } else {
                f++;
            }
        }
        // check Brackets
        if (values.indexOf("(") > -1) {
            let bracket = [];
            index = values.indexOf("(");
            let lastIndex = values.indexOf(")");
            let x = index + 1;
            for (let i = 0, a = x; a < lastIndex; a++, i++) {
                bracket[i] = values[a];
                values[index] = null;
                index++;
            }
            values[lastIndex] = null;
            values[index] = operationByPriority(bracket);
            values = values.filter(function (v) {
                return v != null;
            });
        } else if (values.indexOf(op[i]) > -1) {
            index = values.indexOf(op[i]);
            values[index - 1] = operation(parseFloat(values[index - 1]), parseFloat(values[index + 1]), values[index]);
            values[index] = null;
            values[index + 1] = null;
            values = values.filter(function (v) {
                return v != null;
            });
        } else if (values.indexOf(op[i]) == -1)
            i++;
    }
    dis.textContent = values[0];
    ANS = values[0];
    return values;
}

function fOpearation(fName, n) {
    let result;
    switch (fName) {
        case 'cos(':
            result = (rad) ? Math.cos(n) : Math.cos(n * Math.PI / 180);
            break;
        case 'sin(':
            result = (rad) ? Math.sin(n) : Math.sin(n * Math.PI / 180);
            break;
        case 'tan(':
            result = (rad) ? Math.tan(n) : tan(n * Math.PI / 180);
            break;
        case 'log(':
            result = Math.log10(n);
            break;
        case 'ln(':
            result = Math.log(n);
            break;
        case '√(':
            result = Math.sqrt(n);

    }
    return result;
}

function operation(n1, n2, op) {
    let result;
    switch (op) {
        case "+":
            result = addition(n1, n2);
            break;
        case "-":
            result = subtruction(n1, n2);
            break;
        case "÷":
            result = division(n1, n2);
            break;
        case "×":
            result = multiplication(n1, n2);
            break;
        case "%":
            result = percentage(n1, n2);
    }
    return result;

}
calculator();

function insertOrAdd(info, className) {
    if (className == 'digit') {
        if (dis.textContent == '0' || equals) {
            dis.textContent = info;
            equals = false;
        } else {
            dis.textContent += info;
        }
    } else if (className != "digit") {
        if (dis.textContent == '0')
            dis.textContent = info;
        else if (/\d/.test(dis.textContent[dis.textContent.length - 1]) || dis.textContent[dis.textContent.length - 1] == '(' || dis.textContent[dis.textContent.length - 1] == ')') {
            dis.textContent += ' × ' + info;
        } else {
            dis.textContent += info;
        }
    }
}

function addition(n1, n2) {
    return n1 + n2;
}

function multiplication(n1, n2) {
    return n1 * n2;
}

function subtruction(n1, n2) {
    return n1 - n2;
}

function division(n1, n2) {
    return n1 / n2;
}

function percentage(n1, n2) {
    return n1 * (n2 / 100);
}

function factorial(num) {
    if (num == 0)
        return 1;
    else if (num > 0)
        return num * factorial(num - 1);
}
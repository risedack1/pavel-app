let tabs = document.querySelectorAll(".tabs");
for (let index = 0; index < tabs.length; index++) {
    let tab = tabs[index];
    let tabs_items = tab.querySelectorAll(".tabs-item");
    let tabs_blocks = tab.querySelectorAll(".tabs-block");
    for (let index = 0; index < tabs_items.length; index++) {
        let tabs_item = tabs_items[index];
        tabs_item.addEventListener("click", function (e) {
            for (let index = 0; index < tabs_items.length; index++) {
                let tabs_item = tabs_items[index];
                tabs_item.classList.remove('active');
                tabs_blocks[index].classList.remove('active');
                tabs_blocks[index + 3].classList.remove('active');
            }
            tabs_item.classList.add('active');
            tabs_blocks[index].classList.add('active');
            tabs_blocks[index + 3].classList.add('active');
            e.preventDefault();
        });
    }
}
//-------------------------------------------------------------------------------------------------------
const tasks = document.querySelector('.main-tasks__list');

document.addEventListener('DOMContentLoaded', function () {
    const subList = document.querySelectorAll('.main-tasks__sublist');
    // add height for sublists exept hidden sublists
    subList.forEach(el => {
        let subListHeight = el.clientHeight;
        // checking hidden class on button
        if (!el.closest('.main-tasks__sublist-wrapper').previousSibling.previousSibling.classList.contains('hidden')) {
            el.closest('.main-tasks__sublist-wrapper').style.height = `${subListHeight}px`;
        }
    });
});

tasks.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('main-tasks__item-button')) {
        target.classList.toggle('hidden');

        let activeListWrapper = target.nextSibling.nextSibling;

        let activeList = activeListWrapper.firstChild.nextSibling;

        let activeListHeight = 0;

        if (target.classList.contains('hidden')) {

            activeListWrapper.style.cssText = `height: 0px; opacity: 0; visibility: hidden;`;
        } else {
            activeListHeight = activeList.clientHeight;

            activeListWrapper.style.cssText = `height: ${activeListHeight}px; opacity: 1; visibility: visible;`;
        }


    }
});

// Add new task button

const taskBtn = document.querySelector('.main-tasks__button');
const newTask = document.querySelector('.make-task');
const closeTask = document.querySelector('.make-task__close');

taskBtn.addEventListener('click', function () {

    const card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        card.classList.remove('active');
    }
    if (document.querySelector('.main-tasks__subitem--link.active')) {
        const activeLinkButton = document.querySelector('.main-tasks__subitem--link.active');
        activeLinkButton.classList.remove('active');
    }
    newTask.classList.toggle('active');
    closeEditorLinks();
});

closeTask.addEventListener('click', function () {
    newTask.classList.remove('active');
});

// Clock

function clock() {
    var date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    document.querySelector('.header__time').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);
clock();

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

//----------------------------------------------------------------------------


const linksBtn = document.querySelector('.links__btn');
const taskButton = document.querySelector('.make-task__button');
const makeTaskCard = document.querySelector('.make-task__inner');
const closeCardButton = document.querySelector('.card__close');
let linksItem;
let notesItem;
let removeButtons = document.querySelectorAll('.main-tasks__remove');
let mainLinksObj = {};

makeTaskCard.addEventListener('submit', function (e) {
    e.preventDefault();
    const tasks = document.querySelector('.tabs-item--task');
    const notes = document.querySelector('.tabs-item--note');
    const links = document.querySelector('.tabs-item--link');
    const tabsTitle = document.querySelectorAll('.tabs-block--top input');

    tabsTitle.forEach(el => {
        if (el.value !== '') {
            newTask.classList.remove('active');
        }
    });

    if (links.classList.contains('active')) {
        createCardButton();
        saveLinks(removeInfo);
        createCard();
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

linksBtn.addEventListener('click', function () {
    addNewLink();
});

closeCardButton.addEventListener('click', function () {
    const card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        const activeLinkButton = document.querySelector('.main-tasks__subitem.active');
        card.classList.remove('active');
        activeLinkButton.classList.remove('active');
    }
    closeEditorLinks();
});

function closeEditorLinks() {
    const card = document.querySelector('.card');

    if (card.classList.contains('card--edit')) {
        const inputTitle = document.querySelector('.card__nameinput--links');
        const linksInput = document.querySelectorAll('.card--edit .links__input');
        const editButton = document.querySelector('.card-edit--links');
        const cardButton = document.querySelector('.card__button');

        inputTitle.setAttribute('readonly', 'true');

        linksInput.forEach(el => {
            el.remove();
        });

        editButton.classList.remove('hidden');
        cardButton.classList.remove('active');
    }
}


function createCard() {
    linksItem = document.querySelectorAll('.main-tasks__subitem--link');

    linksItem.forEach(el => {
        el.addEventListener('click', function (e) {
            const cardInput = document.querySelector('.card__nameinput--links');
            const linksList = document.querySelector('.links__list--card');
            const makeTask = document.querySelector('.make-task');
            let cardLinks = document.querySelectorAll('.links__list--card .links__item');
            let target = e.target;
            let targetValue = target.textContent;
            cardInput.value = mainLinksObj[targetValue]['nameList'];
            let targetLinks = mainLinksObj[targetValue]['linksItem'];

            // Change active tab
            const tabsBlockNotes = document.querySelectorAll('.card .links');
            const tabsNote = document.querySelector('.card .tabs-item--link');

            changeActiveTabs(tabsNote, tabsBlockNotes);

            if (cardLinks) {
                cardLinks.forEach(el => {
                    el.remove();
                });
            }
            targetLinks.forEach(el => {
                linksList.append(el);
            });
            if (makeTask.classList.contains('active')) {
                makeTask.classList.remove('active');
            }
            for (let i = 0; i < linksItem.length; i++) {
                linksItem[i].classList.remove('active');
            }

            // Set active button
            const card = document.querySelector('.card');
            const buttons = document.querySelectorAll('.main-tasks__subitem');

            buttons.forEach(el => {
                el.classList.remove('active');
            });
            target.classList.add('active');
            card.classList.add('active');

            closeEditorLinks();
        });
    });
}

function saveLinks(callback) {
    const objLinks = makeMainLinksObj();
    let {
        nameList,
        links
    } = objLinks;

    mainLinksObj[nameList] = {};
    mainLinksObj[nameList]['nameList'] = nameList;
    mainLinksObj[nameList]['linksItem'] = links;

    callback();

    return
}

function removeInfo() {
    const links = document.querySelectorAll('.links__list a');
    const inputValue = document.querySelector('.make-task__nameinput--links');
    inputValue.value = '';
    links.forEach(el => {
        el.remove();
    });
}

function makeMainLinksObj() {
    const newLinks = document.querySelectorAll('.make-task .links__item');
    const objLinks = {
        nameList: '',
        links: [],
    }

    objLinks.nameList = addNameLinksToObj();
    objLinks.links = newLinks;

    return objLinks;
};

function addNameLinksToObj() {
    const inputLinkslist = document.querySelector('.make-task__nameinput--links');

    if (inputLinkslist.value != '') {
        const linksListName = inputLinkslist.value;
        return linksListName;
    }

}

function addNewLink() {
    const linksInput = document.querySelector('.links__input--link');
    const linksInputName = document.querySelector('.links__input--name');
    const linksList = document.querySelector('.links__list');
    let link;


    if (linksInput.value != '' && linksInputName.value != '') {
        linksList.innerHTML += `<a class="links__item" href="${linksInput.value}" target="_blank">${linksInputName.value}</a>`;
        linksInput.value = '';
        linksInputName.value = '';
    }
}

function createCardButton() {
    const links = document.querySelectorAll('.links__item');
    const linksSublist = document.querySelector('.main-tasks__sublist--links');
    const inputTitle = document.querySelector('.make-task__nameinput--links');
    const inputTitleWrapper = document.querySelector('.links.active');
    const mainObj = makeMainLinksObj();
    const mainObjName = mainObj.nameList;
    let savedLinkItem;
    let savedLinkSpan;
    let savedLink;
    let removeBtn;

    if (inputTitle.value !== '') {
        if (links.length != 0) {
            savedLinkItem = document.createElement('li');
            savedLinkItem.classList.add('main-tasks__subitem');
            savedLinkItem.classList.add('main-tasks__subitem--link');
            savedLinkSpan = document.createElement('span');
            linksSublist.prepend(savedLinkItem);
            savedLinkItem.prepend(savedLinkSpan);
            savedLinkItem.setAttribute('role', 'button');

            savedLinkSpan.textContent = mainObjName;

            removeBtn = document.createElement('button');
            removeBtn.classList.add('main-tasks__remove');
            savedLinkItem.append(removeBtn);
        }
    } else {
        inputTitleWrapper.classList.add('required');

        inputTitle.addEventListener('focus', function () {
            inputTitleWrapper.classList.remove('required');
        });
    }
}



removeLink();

function removeLink() {
    const sublists = document.querySelectorAll('.main-tasks__sublist');
    let targetParentList;

    sublists.forEach(el => {
        el.addEventListener('click', (e) => {
            const target = e.target;

            if (target && target.matches('button.main-tasks__remove')) {
                const card = document.querySelector('.card');
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
                targetParentList = targetSubList.offsetHeight - 34;
                target.closest('.main-tasks__sublist-wrapper').style.height = `${targetParentList}px`;
                targetParent.remove();
                card.classList.remove('active');
            }
        });
    });
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

// notes
let mainNotesObj = {};

function createNotesButton() {
    const notesListTitle = document.querySelector('.notes .make-task__nameinput');
    const notesSublist = document.querySelector('.main-tasks__sublist--notes');
    const noteTextarea = document.querySelector('.note__textarea');
    const inputTitle = document.querySelector('.make-task__nameinput--notes');
    const inputTitleWrapper = document.querySelector('.notes.active');
    let savedNoteItem;
    let savedNoteSpan;
    let removeBtn;

    if (notesListTitle.value !== '' && noteTextarea.value !== '') {
        const notesListTitleValue = notesListTitle.value;
        mainNotesObj[notesListTitleValue] = {};
        mainNotesObj[notesListTitleValue]['nameList'] = notesListTitleValue;
        notesListTitle.value = '';

        savedNoteItem = document.createElement('li');
        savedNoteItem.classList.add('main-tasks__subitem');
        savedNoteItem.classList.add('main-tasks__subitem--note');
        savedNoteSpan = document.createElement('span');
        notesSublist.prepend(savedNoteItem);
        savedNoteItem.prepend(savedNoteSpan);
        savedNoteItem.setAttribute('role', 'button');

        savedNoteSpan.textContent = mainNotesObj[notesListTitleValue]['nameList'];

        removeBtn = document.createElement('button');
        removeBtn.classList.add('main-tasks__remove');
        savedNoteItem.append(removeBtn);

        //textarea
        const noteTextareaValue = noteTextarea.value;
        mainNotesObj[notesListTitleValue]['value'] = noteTextareaValue;
        noteTextarea.value = '';
    } else {
        inputTitleWrapper.classList.add('required');

        inputTitle.addEventListener('focus', function () {
            inputTitleWrapper.classList.remove('required');
        });
    }
}

function createNotesCard() {
    notesItem = document.querySelectorAll('.main-tasks__subitem--note');

    notesItem.forEach(el => {
        el.addEventListener('click', function (e) {
            const cardInput = document.querySelector('.card__nameinput--notes');
            const notesText = document.querySelector('.note__text');
            const notesTextPhar = document.querySelector('.note__text *');
            const makeTask = document.querySelector('.make-task');
            let target = e.target;
            let targetValue = target.textContent;

            // Change active tab
            const tabsBlockNotes = document.querySelectorAll('.card .notes');
            const tabsNote = document.querySelector('.card .tabs-item--note');

            changeActiveTabs(tabsNote, tabsBlockNotes);

            cardInput.value = mainNotesObj[targetValue]['nameList'];

            if (notesTextPhar) {
                notesTextPhar.remove();
            }


            let notesTextValue = document.createElement('p');
            notesText.prepend(notesTextValue);
            notesTextValue.textContent = mainNotesObj[targetValue]['value'];

            if (makeTask.classList.contains('active')) {
                makeTask.classList.remove('active');
            }

            // Set active button
            const card = document.querySelector('.card');
            const buttons = document.querySelectorAll('.main-tasks__subitem');

            buttons.forEach(el => {
                el.classList.remove('active');
            });
            target.classList.add('active');
            card.classList.add('active');

            closeEditorLinks();
        });
    });
}

// Tasks
const mainTasksObj = {};

function createTasksButton() {
    let tasksNameInput = document.querySelector('.make-task__nameinput--tasks');
    const textArea = document.querySelector('.tasks__textarea');
    const inputTitle = document.querySelector('.make-task__nameinput--tasks');
    const inputTitleWrapper = document.querySelector('.tasks.active');
    const tasksSublist = document.querySelector('.main-tasks__sublist--tasks');
    let savedTaskItem;
    let savedTaskSpan;
    let removeBtn;


    if (tasksNameInput.value !== '' && textArea.value !== '') {
        let tasksNameInputValue = tasksNameInput.value;
        mainTasksObj[tasksNameInputValue] = {};
        mainTasksObj[tasksNameInputValue]['nameList'] = tasksNameInputValue;
        tasksNameInput.value = '';

        savedTaskItem = document.createElement('li');
        savedTaskItem.classList.add('main-tasks__subitem');
        savedTaskItem.classList.add('main-tasks__subitem--tasks');
        savedTaskSpan = document.createElement('span');
        tasksSublist.prepend(savedTaskItem);
        savedTaskItem.prepend(savedTaskSpan);
        savedTaskItem.setAttribute('role', 'button');

        savedTaskSpan.textContent = mainTasksObj[tasksNameInputValue]['nameList'];

        // textarea
        const tasksArr = textArea.value.split('\n');
        mainTasksObj[tasksNameInputValue]['tasksList'] = [];

        for (let i = 0; i < tasksArr.length; i++) {
            const taskItem = document.createElement('button');
            taskItem.classList.add('tasks__item');
            taskItem.textContent = tasksArr[i];
            mainTasksObj[tasksNameInputValue]['tasksList'].push(taskItem);
        }



        removeBtn = document.createElement('button');
        removeBtn.classList.add('main-tasks__remove');
        savedTaskItem.append(removeBtn);

        textArea.value = '';
    } else {
        inputTitleWrapper.classList.add('required');

        inputTitle.addEventListener('focus', function () {
            inputTitleWrapper.classList.remove('required');
        });
    }
}

function createTasksCard() {
    tasksItem = document.querySelectorAll('.main-tasks__subitem--tasks');

    tasksItem.forEach(el => {
        el.addEventListener('click', function (e) {
            const cardInput = document.querySelector('.card__nameinput--tasks');
            const tasksList = document.querySelector('.tasks__list');
            const makeTask = document.querySelector('.make-task');
            let target = e.currentTarget;
            let targetValue = target.textContent;

            // Change active tab
            const tabsBlockTasks = document.querySelectorAll('.card .tasks');
            const tabsTask = document.querySelector('.card .tabs-item--task');

            changeActiveTabs(tabsTask, tabsBlockTasks);

            cardInput.value = mainTasksObj[targetValue]['nameList'];

            const tasks = document.querySelectorAll('.tasks__item');

            tasks.forEach(el => {
                if (el) el.remove();
            });

            const tasksArr = mainTasksObj[targetValue]['tasksList'];

            tasksArr.forEach(el => {
                tasksList.prepend(el);
            });


            if (makeTask.classList.contains('active')) {
                makeTask.classList.remove('active');
            }

            // Set active button
            const card = document.querySelector('.card');
            const buttons = document.querySelectorAll('.main-tasks__subitem');

            buttons.forEach(el => {
                el.classList.remove('active');
            });
            target.classList.add('active');
            card.classList.add('active');

            closeEditorLinks();

            deleteTask();
        });
    });
}

const deleteTask = function () {
    const tasks = document.querySelectorAll('.tasks__item');

    tasks.forEach((el, index) => {
        el.addEventListener('click', function () {
            const taskListTitle = document.querySelector('.card__nameinput--tasks').value;
            el.classList.add('tasks__item--checked');
            el.classList.add('tasks__item--animate');
            setTimeout(function () {
                el.remove();
            }, 1000);
            mainTasksObj[taskListTitle]['tasksList'].reverse();
            delete mainTasksObj[taskListTitle]['tasksList'][index];
            mainTasksObj[taskListTitle]['tasksList'].reverse();
        });
    });
};


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

//edit cards
const cardButton = document.querySelector('.card__button');

//edit links
const editLinkButton = document.querySelector('.card-edit--links');

editLinkButton.addEventListener('click', function () {
    editLinksCard(changeLinksListData);
});

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

            //change nameList
            // mainLinksObj[changedTitleValue] = mainLinksObj[titleValue];
            // delete mainLinksObj[titleValue];

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
                    let link = el.nextSibling.nextSibling;
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

            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editLinkButton.classList.remove('hidden');

            mainLinksObj[changedTitleValue]['linksItem'] = newLinksArr;
        }, {
            once: true
        });
    }
}


function editLinksCard(callback) {
    const card = document.querySelector('.card');
    const title = document.querySelector('.card__nameinput--links');
    const links = document.querySelectorAll('.links__item');

    card.classList.add('card--edit');

    title.removeAttribute('readonly');
    editLinkButton.classList.add('hidden');

    let createInputName = function (linkName) {
        const inputName = document.createElement('input');

        inputName.classList.add('links__input');
        inputName.classList.add('links__input--name-change');
        inputName.setAttribute('placeholder', 'Введите имя ссылки');
        inputName.value = linkName;

        return inputName;
    }

    let createInputHref = function (linkHref) {
        const inputHref = document.createElement('input');

        inputHref.classList.add('links__input');
        inputHref.classList.add('links__input--href-change');
        inputHref.setAttribute('placeholder', 'Введите ссылку');
        inputHref.value = linkHref;

        return inputHref;
    }



    links.forEach(el => {
        elText = el.textContent;
        elHref = el.getAttribute('href');
        el.before(createInputName(elText));
        el.before(createInputHref(elHref));
    });

    title.focus();

    cardButton.classList.add('active');

    callback();
}

//edit notes
const editNotesButton = document.querySelector('.card-edit--notes');

editNotesButton.addEventListener('click', function () {
    editNotesCard(changeNotesListData);
});

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

            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editNotesButton.classList.remove('hidden');
        }, {
            once: true
        });
    }
}

function editNotesCard(callback) {
    const card = document.querySelector('.card');
    const title = document.querySelector('.card__nameinput--notes');
    const note = document.querySelector('.note__text');
    const noteParagraph = document.querySelector('.note__text p');

    card.classList.add('card--edit');

    title.removeAttribute('readonly');
    title.focus();
    editNotesButton.classList.add('hidden');

    const noteText = noteParagraph.textContent;

    note.innerHTML = `<textarea class="note__textarea note__textarea--edit">${noteText}</textarea>`;

    cardButton.classList.add('active');

    callback();
}

//edit tasks
const editTasksButton = document.querySelector('.card-edit--tasks');

editTasksButton.addEventListener('click', function () {
    editTasksCard(changeTasksListData);
});

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

    // hide thr remove tooltip
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

            // return to start condition
            title.setAttribute('readonly', 'true');
            cardButton.classList.remove('active');
            editTasksButton.classList.remove('hidden');

            // show thr remove tooltip
            tasksCard.classList.remove('tasks--changing');
        }, {
            once: true
        });
    }

}

function editTasksCard(callback) {
    const title = document.querySelector('.card__nameinput--tasks');

    title.removeAttribute('readonly');
    editTasksButton.classList.add('hidden');
    title.focus();

    cardButton.classList.add('active');

    callback();
}

// resize window

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

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
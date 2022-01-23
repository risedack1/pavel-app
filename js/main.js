document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget;
            const control = self.querySelector('.accordion__control');
            const content = self.querySelector('.accordion__content');

            self.classList.toggle('open');

            // если открыт аккордеон
            if (self.classList.contains('open')) {
                control.setAttribute('aria-expanded', true);
                content.setAttribute('aria-hidden', false);
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
            }
        });
    });
});

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

// popup-------------------------------------------------------------------------

window.addEventListener("load", function () {
    if (document.querySelector('main')) {
        setTimeout(function () {
            document.querySelector('main').classList.add('_loaded');
        }, 0);
    }
});

let unlock = true;

// //BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('main').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('main').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

let popup_link = document.querySelectorAll('.popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
        if (unlock) {
            let item = el.getAttribute('href').replace('#', '');
            let video = el.getAttribute('data-video');
            popup_open(item, video);
        }
        e.preventDefault();
    })
}
for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__body')) {
            popup_close(e.target.closest('.popup'));
        }
    });
}

function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup--' + item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup--video');
            popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body._active')) {
            body_lock_add(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', '#' + item);
    }
}

function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('_active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
            body_lock_remove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}
document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        popup_close();
    }
});
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

// document.addEventListener('click', function (e) {
//     if (e.target.className != 'header__icon' && calendarBtn.classList.contains('close')) {
//         console.log('test');
//         calendarBtn.classList.remove('close');
//     }
// });

// add link and create the card

const linksBtn = document.querySelector('.links__btn');
const taskButton = document.querySelector('.make-task__button');
const closeCardButton = document.querySelector('.card__close');
let linksItem;
let notesItem;
let removeButtons = document.querySelectorAll('.main-tasks__remove');
let mainLinksObj = {};

taskButton.addEventListener('click', function () {
    const tasks = document.querySelector('.tabs-item--task');
    const notes = document.querySelector('.tabs-item--note');
    const links = document.querySelector('.tabs-item--link');
    const tabsTitle = document.querySelectorAll('.tabs-block--top input');

    tabsTitle.forEach(el => {
        if (el.value !== '') {
            newTask.classList.remove('active');
            console.log(el.value);
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

function setSublistHeight() {
    const sublist = document.querySelectorAll('.main-tasks__sublist');

    sublist.forEach(el => {
        const subListWrapper = el.closest('.main-tasks__sublist-wrapper');
        const subListHeight = el.clientHeight;

        subListWrapper.style.height = `${subListHeight}px`;
    });

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
            console.log(buttons);

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
        link = document.createElement('a');
        link.classList.add('links__item');
        linksList.prepend(link);
        link.setAttribute('href', linksInput.value);
        link.setAttribute('target', '_blank');
        link.innerHTML = linksInputName.value;
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

            removeButtons = document.querySelectorAll('.main-tasks__remove');

            removeLink();
        }
    } else {
        inputTitleWrapper.classList.add('required');

        inputTitle.addEventListener('focus', function () {
            inputTitleWrapper.classList.remove('required');
        });
    }
}

//????????????????????????????
function addLinksToCard() {
    let cardLinksList = document.querySelector('.link-card .links__list');
    let mainLinksList = document.querySelector('.main-tasks__sublist--links');
    let cardLinksListCh = document.querySelectorAll('.link-card .links__list *');
    cardLinksListCh.forEach(el => {
        el.remove();
    });
    cardLinksList.appendChild(mainLinksList.cloneNode(true));
}


let targetParentList;

removeLink();

function removeLink() {
    removeButtons.forEach(el => {
        el.addEventListener('click', function (e) {
            const card = document.querySelector('.card');
            target = e.target;
            targetParent = target.closest('.main-tasks__subitem');
            const targetParentText = targetParent.textContent;
            delete mainLinksObj[targetParentText];
            targetParentList = target.closest('.main-tasks__sublist').offsetHeight - 35;
            target.closest('.main-tasks__sublist-wrapper').style.height = `${targetParentList}px`;
            targetParent.remove();
        });
    });
}

//edit links

const editLinkButton = document.querySelector('.card-edit--links');
const cardButton = document.querySelector('.card__button');

editLinkButton.addEventListener('click', function () {
    editLinksCard(changeLinksListData);
});

function changeLinksListData() {
    const title = document.querySelector('.card__nameinput--links');
    const linksNameValue = document.querySelectorAll('.links__input--name-change');
    const linksHrefValue = document.querySelectorAll('.links__input--href-change');
    let titleValue = title.value;

    cardButton.addEventListener('click', function () {
        const linkButton = document.querySelector('.main-tasks__subitem--link.active > span');
        let changedTitleValue = title.value;
        titleValue = titleValue;

        //change nameList
        // mainLinksObj[changedTitleValue] = mainLinksObj[titleValue];
        // delete mainLinksObj[titleValue];

        console.log(changedTitleValue);

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
        console.log(newLinksArr);

        mainLinksObj[changedTitleValue]['linksItem'] = newLinksArr;
        title.setAttribute('readonly', 'true');
        cardButton.classList.remove('active');
        editLinkButton.classList.remove('hidden');
    });
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

        removeButtons = document.querySelectorAll('.main-tasks__remove');

        removeLink();
    } else {
        inputTitleWrapper.classList.add('required');
        console.log(inputTitleWrapper);

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
        console.log(mainTasksObj);



        removeBtn = document.createElement('button');
        removeBtn.classList.add('main-tasks__remove');
        savedTaskItem.append(removeBtn);

        removeButtons = document.querySelectorAll('.main-tasks__remove');

        textArea.value = '';

        removeLink();
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
            let target = e.target;
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

            const checkTask = function () {
                // const tasks = document.querySelectorAll('.tasks__item');

                tasksArr.forEach(el => {
                    el.addEventListener('click', function () {
                        el.classList.toggle('tasks__item--checked');
                    });
                });
            }

            checkTask();
        });
    });
}


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


// resize window

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


$(function () {

});
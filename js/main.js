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
let removeButtons = document.querySelectorAll('.main-tasks__remove');
let mainLinksObj = {};


linksBtn.addEventListener('click', function () {
    addNewLink();
});

taskButton.addEventListener('click', function () {
    createCardButton();
    saveLinks(removeInfo);
    createCard();
    setSublistLinksHeight();
});

closeCardButton.addEventListener('click', function () {
    const card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        const activeLinkButton = document.querySelector('.main-tasks__subitem--link.active');
        card.classList.remove('active');
        activeLinkButton.classList.remove('active');
    }
});

function setSublistLinksHeight() {
    const sublist = document.querySelector('.main-tasks__sublist--links');
    const subListWrapper = sublist.closest('.main-tasks__sublist-wrapper');
    const subListHeight = sublist.clientHeight;

    subListWrapper.style.height = `${subListHeight}px`;

    console.log(subListHeight);
}

function createCard() {
    linksItem = document.querySelectorAll('.main-tasks__subitem--link');

    linksItem.forEach(el => {
        el.addEventListener('click', function (e) {
            const cardInput = document.querySelector('.card__nameinput--links');
            const linksList = document.querySelector('.links__list--card');
            const card = document.querySelector('.card');
            const makeTask = document.querySelector('.make-task');
            let cardLinks = document.querySelectorAll('.links__list--card .links__item');
            let target = e.target;
            let targetValue = target.textContent;
            cardInput.value = mainLinksObj[targetValue]['nameList'];
            let targetLinks = mainLinksObj[targetValue]['linksItem'];
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
            target.classList.add('active');
            card.classList.add('active');
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
        link.innerHTML = linksInputName.value;
        linksInput.value = '';
        linksInputName.value = '';
    }
}

function createCardButton() {
    const links = document.querySelectorAll('.links__item');
    const linksSublist = document.querySelector('.main-tasks__sublist--links');
    const mainObj = makeMainLinksObj();
    const mainObjName = mainObj.nameList;
    let savedLinkItem;
    let savedLinkSpan;
    let savedLink;
    let removeBtn;

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
            target = e.target;
            targetParent = target.closest('.main-tasks__subitem');
            const targetParentText = targetParent.textContent;
            delete mainLinksObj[targetParentText];
            targetParentList = target.closest('.main-tasks__sublist').offsetHeight - 35;
            target.closest('.main-tasks__sublist-wrapper').style.height = `${targetParentList}px`;
            console.log(mainLinksObj);
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
    const titleValue = title.value;

    cardButton.addEventListener('click', function () {
        const linkButton = document.querySelector('.main-tasks__subitem--link.active > span');
        let changedTitleValue = title.value;

        //change nameList
        mainLinksObj[changedTitleValue] = mainLinksObj[titleValue];
        delete mainLinksObj[titleValue];

        // if (mainLinksObj[titleValue] !== mainLinksObj[changedTitleValue]) {
        //     Object.defineProperty(mainLinksObj, changedTitleValue,
        //         Object.getOwnPropertyDescriptor(mainLinksObj, titleValue));
        //     delete mainLinksObj[titleValue];
        // }
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
    const title = document.querySelector('.card__nameinput--links');
    const links = document.querySelectorAll('.links__item');

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

// resize window

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


$(function () {

});
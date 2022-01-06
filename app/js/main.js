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
            }
            tabs_item.classList.add('active');
            tabs_blocks[index].classList.add('active');
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

taskBtn.addEventListener('click', function () {
    console.log('test');
    newTask.classList.toggle('active');
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

flatpickr(".header__icon--calendar");

$(function () {

});
import contactsComponent from "./components/contactsComponent.js";
import singleProfileComponent from "./components/singleProfileComponent.js";
import messagePageComponent from "./components/messagePageComponent.js";
import homePageComponent from "./components/homePageComponent.js";
import addContactComponent from "./components/addContactComponent.js";
import {activateContact} from "./utils.js";


const contactsList = document.getElementById('contact-list'),
    rightSide = document.getElementById('right-side'),
    search = document.getElementById('search-contact'),
    addContact = document.getElementById('addContact');



// fetch and render contacts list
async function getAndRenderContacts(searchContact) {
    const response = await fetch(`http://localhost:3000/users${searchContact ? `?q=${searchContact}` : ''}`);
    const data = await response.json();
    contactsList.innerHTML = contactsComponent.render(data.reverse())
}

// fetch and show single profile by id
async function getAndRenderContactByID(id) {
    const response = await fetch(`http://localhost:3000/users?id=${id}`)
    const data = await response.json();
    rightSide.innerHTML = singleProfileComponent.render(data[0]);
    listenerToContactPage()

}


// fetch and render messege page
async function getAndRenderMessegePage(id) {
    const response = await fetch(`http://localhost:3000/users?id=${id}`)
    const data = await response.json();
    rightSide.innerHTML = messagePageComponent.renderPage(data[0]);
    getAndShowMessages(id);
    sendingMessage(id)
}


// fetches and render messeges by userID
async function getAndShowMessages(id) {
    const response = await fetch(`http://localhost:3000/messages?userid=${id}`)
    const data = await response.json();
    messagePageComponent.renderMessages(data);
}


// fetch to send messig in submit of form
function sendingMessage(id) {
    const form = document.querySelector('.message-form');
    if(form) {
        const messageInput = document.querySelector('.message-input');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const time = new Date().toLocaleTimeString()
            if(messageInput.value.trim()) {
                const message = {
                    userid: id,
                    text: messageInput.value,
                    time: time
                }
                fetch('http://localhost:3000/messages', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(message)
                }).then(() => {
                    getAndShowMessages(id);
                })
                messageInput.value = '';
            }
        })
    }
}


// add contacts 

function createContact() {
    const form = document.querySelector('.addContact');
    const button = form.querySelector('button');
    form.name.addEventListener('input', () => {
        if(form.name.value.length >= 1) {
            button.classList.remove('disable');
            button.dataset.state = 'able';
        } else {
            button.classList.add('disable');
            button.dataset.state = 'disable';
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(button.dataset.state === 'able') {
            const newUser = {
                username: form.name.value,
                addres: form.addres.value || 'unknown',
                birthday: form.birthday.value || 'unknown',
                phone: form.phone.value || 'unknown',
                work: form.work.value || 'unknown'
            }
            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            }).then((res) => {
                getAndRenderContacts();
                return res.json()
            }).then((data) => {
                getAndRenderMessegePage(data.id)
            })
        }
    })
}

addContact.addEventListener('click', () => {
    rightSide.innerHTML = addContactComponent.render();
    createContact()
})


// search contacts
search.addEventListener('input', () => {
    getAndRenderContacts(search.value);
})


function listenerToContactPage() {
    const removeBtn = document.querySelector('.delete-btn');
    removeBtn.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/users/${e.target.dataset.id}`, {
            method: "DELETE",
        }).then(() => {
            rightSide.innerHTML = homePageComponent.render();
            getAndRenderContacts();
        })
    })
}


// react on click at contacts list
function reactOnClickContacts(e) {
    const activeContact = e.path.find(i => i.tagName == "LI");
    activateContact(activeContact)
    const userID = e.path.find(i => i.dataset.action === 'chat').id
    if(e.target.dataset.action === 'showProfile') {
        getAndRenderContactByID(userID);
    } else {
        getAndRenderMessegePage(userID);
        
    }
}

contactsList.addEventListener('click', reactOnClickContacts)



document.addEventListener('DOMContentLoaded', () => {
    getAndRenderContacts();
    rightSide.innerHTML = homePageComponent.render();
})

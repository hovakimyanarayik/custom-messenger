const contactsComponent = {
    render(contacts) {
        /**
         * 
         * @param {Array.<{id: Number, username: String, lastvisit: String}>} contacts 
         * @returns 
         */
        return contacts.reduce((acc, curr) => acc += `
            <li id="${curr.id}" data-action="chat">
                <div class="contact-image">
                    <img src="./images/Без названия.png" alt="img">
                </div>
                <div class="contact-small-info">
                    <p class="contact-name">${curr.username}</p>
                    <span class="clickable-text" data-action="showProfile">See profile</span>
                </div>
                <div class="last-visit-div">
                    <span>Last: </span>
                    <span class="last-visit"> ${curr.lastvisit}</span>
                </div>
            </li>
        ` , '')
    }
}

export default contactsComponent;
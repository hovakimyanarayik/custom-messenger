import {formattedDate} from '../utils.js'

const singleProfileComponent = {
    render(user) {
        /**
         * 
         * @param {Array.<{id: Number, username: String, phone: String, about: String, work: String, birthday: string, addres: String, moreabout: String}>} user 
         * @returns 
         */
        const birthday = user.birthday != 'unknown' ? formattedDate(user.birthday) : 'unknown'

        return `
            <div class="user-info">
                <div class="user-image">
                    <img src="./images/Без названия.png" alt="photo">
                </div>
                <div class="name-contain">
                    <h3>${user.username}</h3>
                    <p>${user.about ? user.about : ''}</p>
                </div>
                <div class="user-all-info">
                    <p class="user-about">Lives in <span>${user.addres}</span></p>
                    <p class="user-about">Works at <span>${user.work}</span></p>
                    <p class="user-about">Phone: <span>${user.phone}</span></p>
                    <p class="user-about">Birthday: <span>${birthday}</span></p>
                    <p class="user-about"><span>${user.moreabout ? user.moreabout : ''}</span></p>
                </div>
                <div class="delete-div"><span class="delete-btn" data-id="${user.id}">Delete contact</span></div>
            </div>
        `
    }
}

export default singleProfileComponent;
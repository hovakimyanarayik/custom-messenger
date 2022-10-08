const messagePageComponent = {
    renderPage(user) {
        return `
            <div class="message-contain">
                <div class="top-side">
                    <div class="contact-image"><img src="./images/Без названия.png" alt="img"></div>
                    <div class="message-name">
                        <p class="contact-name">${user.username}</p>
                    </div>
                    <div class="message-tools">
                        <i class="fas fa-video"></i>
                        <i class="fas fa-phone"></i>
                    </div>
                </div>
                <div class="center-side">
                    
                </div>
                <div class="bottom-side">
                    <div class="message-tools">
                        <i class="fa fa-heart"></i>
                        <i class="fa fa-file"></i>
                    </div>
                    <form class="message-form">
                        <input type="text" class="message-input" placeholder="Type message">
                        <button type="submit"><i class="fa fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        `
    },
    renderMessages(messages) {
        const contain = document.querySelector('.center-side');
        if(contain) {

            contain.innerHTML = messages.map(mes => `
                <div class="single-message">
                    <div class="message-div">
                        <p class="message">${mes.text}</p>
                        <span>${mes.time}</span>
                    </div>
                </div>
            `).join('')
        }
    }
}

export default messagePageComponent;
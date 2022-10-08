const addContactComponent = {
    render() {
        return `
            <div class="add-contact-div">
                <form class="addContact">
                    <input class="message-input new-contact-input" name="name" type="text" placeholder="Contact Name">
                    <input class="message-input new-contact-input" name="phone" type="tel" placeholder="Phone">
                    <input class="message-input new-contact-input" name="addres" type="text" placeholder="Addres">
                    <input class="message-input new-contact-input" name="work" type="text" placeholder="Workplace">
                    <input class="message-input new-contact-input" name="birthday" type="date" placeholder="Birthday">
                    <button class="message-input new-contact-input disable" type="submit" data-state="disable">Add</button>
                </form>
            </div>
        `
    }
}

export default addContactComponent;
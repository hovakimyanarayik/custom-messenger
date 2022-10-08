
export const formattedDate = (date) => new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}).format(new Date(date));


export function activateContact(el) {
    document.querySelectorAll('.active').forEach(item => {
        item.classList.remove('active')
    })
    el.classList.add('active')
}
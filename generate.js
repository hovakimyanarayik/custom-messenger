
// Serves as contacts generator to db.json

function addUsers() {
    const casual = require('casual');
    const {times} = require('lodash');
    const fs = require('fs');
    const path = require('path');


    const users = {
        users: times(30, (n) => {
            return {
                id: n,
                username: casual.full_name,
                phone: casual.phone,
                about: casual.sentence,
                work: casual.company_name,
                birthday: casual.date(),
                lastvisit: casual.time(),
                addres: casual.address1,
                moreabout: casual.text
            }
            
        })
    }

    const filePath = path.join(__dirname, 'db.json');
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
        if(err) throw err;
        console.log('saved');
    })
}


addUsers()



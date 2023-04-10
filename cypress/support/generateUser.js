const faker = require('faker');

function generateUser() {
    const random = Math.random().toString().slice(2, 6)
    const username = faker.name.firstName().toLowerCase() + random;
    const password = 'Qwer1234';

    return {username, password}
}

module.exports = {generateUser}
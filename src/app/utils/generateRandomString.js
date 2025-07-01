function generateRandomString(){
    return Math.random().toString(36).substring(2,2+15);
}
module.exports = {generateRandomString}
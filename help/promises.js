let p = new Promise((resolve, reject) => {
    let a = 1+1
    if(a==2){
        resolve('Success')
    } else { 
        reject('Failed')
    }
})

//p.then -- Will only run for a resolve
p.then((message) => { // then if it is resolve
    console.log('This is in the then ' + message)
}).catch((message) => { // catch if it is reject
    console.log('This is in the catch ' + message)
})

//-------------------------------------------------\\
const userLeft = false;
const userMultitasking = true;

function watchTutorialPromise() {
    return new Promise((resolve, reject) => {
        if(userLeft) {
            reject({
                name: 'User left',
                message: ':('
            })
        } else if (userMultitasking){
            reject({
                name: 'User watching memes',
                message: ':|'
            })
        } else {
            resolve('Promise resolved')
        }
    })
}

watchTutorialPromise().then((message) => {
    console.log('Success: ' + message)
}).catch((error) => {
    console.log(error.name + ' ' + error.message)
})
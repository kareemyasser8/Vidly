const debug = require('debug')('app:startup')

const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve(1);
        reject(new Error("error message"));
    },2000)
})

p.then((input)=>{
   debug(`The input value of the user :  ${input}`);
}).catch((err)=>{
    debug(`The error: ${err.message}`)
})

// console.log("Hello world");
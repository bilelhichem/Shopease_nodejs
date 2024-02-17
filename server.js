const app = require('./app');
const connection = require('./Configuration/database');
const port = 3000 ; 

app.listen(port,()=>{
    console.log('listening on http://localhost:3000 ');
})
const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.get('/', async (request, response) => { //request - users incoming data | response - your outgoing data
    
    response.send(await readFile('index.html', 'utf8')); //sends response to client        
    })

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))

//middleware & static files

app.use(express.static('public'));


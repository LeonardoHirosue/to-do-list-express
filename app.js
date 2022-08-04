const express = require('express');
const path = require('path');

const checkListsRouter = require('./src/routes/checklists');
const rootRouter = require('./src/routes/index');
require('./config/database')

const app = express();
app.use(express.json());
//habilitando arquivos estáticos no app
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListsRouter);

app.listen(3000, () =>{
    console.log('Servidor foi iniciado...')
});
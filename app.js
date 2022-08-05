const express = require('express');
const path = require('path');

const checkListsRouter = require('./src/routes/checklists');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');

require('./config/database')

const app = express();
//middleware para pegar requisições JSON
app.use(express.json());
//middleware para requisições via Formulário
app.use(express.urlencoded({ extended: true }));
//habilitando arquivos estáticos no app
app.use(express.static(path.join(__dirname, 'public')));
//middleware para utilização de todos os métodos no formulário
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListsRouter);

app.listen(3000, () => {
    console.log('Servidor foi iniciado...')
});
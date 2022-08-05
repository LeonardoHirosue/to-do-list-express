const express = require('express');
const Checklist = require('../models/checklist');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', {checklists: checklists})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas'});
    }
});

router.post('/', async (req, res) => {
    //O 'name' estará encapsulado dentro de uma variável chamada'checklist'
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})
    try {
        await checklist.save();
        res.redirect('checklists');
    } catch (error) {
        res.status(422).render('checklists/new', {checklist: {...checklist, error}})
    }
});

//inserir a rota '/new' acima do '/:id' para que o código não confundir o 'new' com um 'id'
router.get('/new', async (req, res) => {
    
    try {
        //Como o checklist ainda não irá existir, será necessário criar um checklist vazio (isso só é possível devido ao Mongoose)
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'});
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de tarefas'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        //populate seria uma ferramenta do Mongoose simular ao aggregate do MongoDB
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas de tarefas'});
    }
});

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.updateOne({name});
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
    }
});

router.delete('/:id', async (req, res) => {
    let {name} = req.body;
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklists');
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao deletar lista de tarefas'});
    }
});

module.exports = router;

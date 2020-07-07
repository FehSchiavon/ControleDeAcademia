const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req, res) {
    return res.render('instructors/create')
})
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

// HTTP VERBS
// GET: Receber RESOURCE
// POST: Criar um novo RESOURCE com dados enviados
// PUT: Atualizar RESOURCE
// DELETE: Deletar RESOURCE 

routes.get('/members', function(req, res) {
    return res.send('members')
})

// MEMBER

routes.get('/members', members.index)

routes.get('/members/create', function(req, res) {
    return res.render('members/create')
})

routes.get('/members/:id', members.show)

routes.get('/members/:id/edit', members.edit)

routes.post('/members', members.post)

routes.put('/members', members.put)

routes.delete('/members', members.delete)

module.exports = routes
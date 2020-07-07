const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// Index
exports.index = function(req, res) {
    return res.render('members/index', { members: data.members })
}
// Show
exports.show = function(req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return  id == member.id
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render('members/show', { member })
}
// Create
exports.create = function(req, res) {
    return res.render('members/create')
}
// Post
exports.post = function(req, res) {
    // req.query
    // req.body

    const keys = Object.keys(req.body)

    for (key of keys) {
        // req.body.avartar_url é igual req.body[key]
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }
    
    let { avatar_url, birth, name, services, gender } = req.body
    
    birth = Date.parse(birth) // Corrigido!
    const created_at = Date.now()
    const id = Number(data.members.length + 1)


    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!') 

        return res.redirect('/members')
    })

    // return res.send(req.body)
}
// Edit
exports.edit = function(req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return  id == member.id
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', { member })
}
// Put
exports.put = function(req, res) {
    // req.params
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/members/${id}`)
    })
}
// Delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/members')
    })
}
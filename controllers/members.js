const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

// Index
exports.index = function(req, res) {
    return res.render('members/index', { members: data.members })
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
    
    birth = Date.parse(req.body.birth) // Corrigido!
    const id = 1
    const lastMember = data.members[data.members.length -1]
    
    if (lastMember) {
       id = lastMember + 1 
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!') 

        return res.redirect('/members')
    })

    // return res.send(req.body)
}
// Show
exports.show = function(req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return  id == member.id
    })

    const converterBlood = data.members.find(function(member) {
        if ('A1' == member.blood) {
            member.blood = 'A+'
        } else if ('A0' == member.blood) {
            member.blood = 'A-'
        } else if ('B1' == member.blood) {
            member.blood = 'B+'
        } else if ('B2' == member.blood) {
            member.blood = 'B-'
        } else if ('AB1' == member.blood) {
            member.blood = 'AB+'
        } else if ('O1' == member.blood) {
            member.blood = 'O+'
        } else if ('O0' == member.blood) {
            member.blood = 'O-'
        } 
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }
    console.log(member)

    return res.render('members/show', { member })
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
        birth: date(foundMember.birth).iso
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
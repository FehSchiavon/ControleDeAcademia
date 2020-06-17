const fs = require('fs')
const data = require('./data.json')

// Show
exports.show = function(req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return  id == instructor.id
    })

    if(!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        age:"",
        services: foundInstructor.services.split(","),
        created_at: ""
    }

    return res.render('instructors/show', { instructor })
}

// Create
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
    
    let { avartar_url, birth, name, services, gender } = req.body
    
    birth = Date.parse(birth) // Dando Erro!
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avartar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!') 

        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

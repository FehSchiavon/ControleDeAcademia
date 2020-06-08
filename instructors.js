const fs = require('fs')
const data = require('./data.json')

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

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    let { avartar_url, birth, name, services, gender } = req.body

    data.instructors.push({
        avartar_url,
        birth,
        created_at,
        id,
        name,
        gender,
        services,
        name
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!') 

        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

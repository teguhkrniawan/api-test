const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

const app = express()
const port = 3000

app.use(bodyParser.json())

// get buku
app.get('/api/getbuku', (req, res) => {
    const sql = `SELECT * FROM tbl_buku WHERE is_active = '1'`
    db.query(sql, (err, result) => {
        res.send(response(200, result, "Success", res))
    })
})

// create buku
app.post('/api/createbuku', (req, res) => {
    const { title, desc } = req.body
    const sql = `INSERT INTO tbl_buku (title, description) VALUES ('${title}', '${desc}')`
    db.query(sql, (err, result) => {
        if (err) console.log('error', err)
        const { insertId } = result
        const data = {
            id: insertId
        }
        res.send(response(200, data, 'success', res))
    })
})

// update
app.post('/api/updatebuku', (req, res) => {
    const { id, title, desc } = req.body
    const sql = `UPDATE tbl_buku SET title = '${title}', description = '${desc}' WHERE id = '${id}'`
    db.query(sql, (err, result) => {
        if (err) console.log('error', err)
        const { affectedRows} = result
        const data = {
            affectedRows: affectedRows
        }
        res.send(response(200, data, 'success', res))
    })
})

// delete
app.post('/api/hapusbuku', (req, res) => {
    const { id } = req.body
    const sql = `UPDATE tbl_buku SET is_active = '0' WHERE id = '${id}'`
    db.query(sql, (err, result) => {
        if (err) console.log('error', err)
        const { affectedRows} = result
        const data = {
            affectedRows: affectedRows
        }
        res.send(response(200, data, 'success', res))
    })
})


app.listen(port, () => {
    console.log(`Server Api Running in port ${port}`)
})
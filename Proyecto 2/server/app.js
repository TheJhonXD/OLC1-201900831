const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const corsOptions = { origin: true, optionsSuccessStatus: 200 };
const port = 8080;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

app.get('/', (req, res) => {
    res.json({mensaje:"hola mundo"})
});

app.get('/texto', (req, res) => {
    res.json({ mensaje: "hola mundo!!! c:" });
});

// app.post('/code', (req, res) => {
//     let codigo = req.body.code;
//     res.json({ mensaje: "codigo recibido" });
// });

const ruta = require('./src/index');

app.use('/', ruta);
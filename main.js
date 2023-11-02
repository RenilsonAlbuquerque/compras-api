const express = require('express')

const app = express()
app.use(express.json()) 


const admin = require('firebase-admin');

const serviceAccount = require('./src/keys/contabilidademercado-dbfcf3416945.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const port = 3000
var router = express.Router();



var nfce_controller = require('./src/control/NfceControl');

app.post('/nfce/detalhes', nfce_controller.nfce_detail);
app.post('/nfce/salvar',nfce_controller.save)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
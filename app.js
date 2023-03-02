import express from "express";
import cors from 'cors'
import { getEmbedCode, value } from './index.js'

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get('/upload', async(req, res) => {

    const { file } = req.query;
    try {
        await getEmbedCode(file)
        console.log(`Received code: ${value}`)
        res.send(value)
    } catch (e) {
        console.error(e)
        res.send(e)
    }

});
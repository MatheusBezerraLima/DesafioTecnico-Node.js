const express = require('express');
const routes = express.Router();
const multer = require('multer')
const { getReportEndPoints, getListTopCountries, getListTeams, getListSuperUsers, getAnalityLoggins } = require('../controller/controller');
const listSuperUserService = require('../services/service');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/`);
    },
    filename: (req, file, cb) => {
        const extensaoArquivo = file.originalname.split('.')[1];
        cb(null, `entryData.${extensaoArquivo}`);
    }
})

const upload = multer({ storage });

routes.get('/users', upload.single("arquivo"), (req, res) => {
    const file = req.file
    console.log(file);
    res.status(200).json(file);
});

// Filtro: score >= 900 e active = true
routes.get('/superusers', async(req, res) => {
    await listSuperUserService(req, res);
});

module.exports = routes;
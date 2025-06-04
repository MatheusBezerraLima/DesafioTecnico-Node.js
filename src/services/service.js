const path = require('path');
const fs = require('fs');
const { readFileSync } = require('node:fs') 
const { log } = require('console');


const listSuperUserService = async(req, res) => {
    const dest = "uploads/entryData.json"   
    const data = fs.readFileSync(dest, "utf-8", (err) => {
        console.error(err);
    });
    
    const dataJson = JSON.stringify(data);
    // Ler e filtrar aqui...

    res.status(200).json(dataJson)
}

module.exports = listSuperUserService;
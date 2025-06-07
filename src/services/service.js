const path = require('path');
const fs = require('fs');
const { readFileSync } = require('node:fs') 
const { log } = require('console');
const { error } = require('node:console');


const listSuperUserService = async(res) => {
    const dest = "uploads/entryData.json"   
    const data = fs.readFileSync(dest, "utf-8", (err) => {
        console.error(err);
    });
    
    const dataJson = JSON.parse(data);
    const superUsers = [];
    const inicio = performance.now(); 

    // Lê todos os usuários e filtra os que tem o Score >=900 e estão ativos (active: true) 
    for(i=0; i < dataJson.length; i++){       
        if( dataJson[i].score >= 900  && dataJson[i].active === true){
            superUsers.push(dataJson[i]);
        }
    }

    const tempoProcessamento = performance.now() - inicio;
    const superUsersJson = JSON.stringify(superUsers);
    const superUsersFile = fs.writeFile("uploads/superusers.json", superUsersJson, "utf-8", (err) => {
        if(err)  throw err;
    }) 

    res.status(200).json({ "Tempo de Execução": tempoProcessamento, "Superusers:" : superUsers });
}

const listTopCountries = async(res) => {
    const data = fs.readFileSync("uploads/superusers.json", "utf-8") 
    const dataJson = JSON.parse(data);
    const countriesGrups = {};
    const countries = [];  
    
    // Função que agrupa os usuários por pais em um novo Json.
    for(i=0; i < dataJson.length; i++){
        const user = dataJson[i];
        
        if(!countriesGrups[user.country]){  
            countriesGrups[user.country] = {};
            countriesGrups[user.country]["quantity"] = 1;
            countriesGrups[user.country]["users"] = [];

            countriesGrups[user.country]["users"].push(user);
            countries.push(user.country);
        }else{
            countriesGrups[user.country]["quantity"] += 1;
            countriesGrups[user.country]["users"].push(user);
        }
    }

    var firstLoop = true;
    var aux

    // Função que ordena os grupos de paises por quantidade de usuários em ordem decrescente.
    for(i=0; i <= countries.length; i++){
        
       
            for(a= i+1; a <= 9; a++){       
                if(countriesGrups[countries[a]].quantity > countriesGrups[countries[i]].quantity){
                   
                    firstEntry = countriesGrups[countries[a]];
                    secondEntry = countriesGrups[countries[i]];
                    
                    delete  countriesGrups[countries[a]];
                    delete  countriesGrups[countries[i]];

                    countriesGrups[countries[i]] = firstEntry;
                    countriesGrups[countries[a]] = secondEntry;

                }
            }
    }
    res.json(countriesGrups)
   
}

module.exports = {
    listSuperUserService,
    listTopCountries
};

const app = require('./config/express')();
const routes = require('./routes/routes');


app.use('/', routes)

app.listen(3333, (err) => {
    if(err){
        console.error(err);
    }
    console.log("Rodando na porta 3333");
})
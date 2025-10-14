const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Estado = require('./models/estado');
const municipios = [];
const Municipios = require('./models/municipio');


const dbUser = 'murilobdf14';
const dbPassword = 'now123';
const dbConnectionUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.0dltyx4.mongodb.net/NOW?retryWrites=true&w=majority`;

async function conectarAoBanco() {
  try {
    await mongoose.connect(dbConnectionUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectou ao banco!');
  } catch (err) {
    console.error('Erro na conexão ao banco de dados:', err);
    throw err; // Rejeita a promessa em caso de erro
  }
}

async function desconectarDoBanco() {
  await mongoose.disconnect();
  console.log('Desconectou do banco!');
}

async function inserirMunicipiosNoMongoDB(municipios) {
  try {
    await conectarAoBanco();

    for (const municipioData of municipios) {
      const municipios = new Municipios(municipioData);
      await municipios.save();
    }

    console.log(`${municipios.length} municípios inseridos com sucesso.`);
  } finally {
    await desconectarDoBanco();
  }
}

// Chama a função para inserir os municípios quando o processo terminar
fs.createReadStream('municipios.csv')
  .pipe(csv())
  .on('data', (row) => {
    municipios.push(row);
  })
  .on('end', async () => {
    await inserirMunicipiosNoMongoDB(municipios);
  }); 

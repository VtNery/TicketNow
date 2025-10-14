const mongoose = require('mongoose');
const Estado = require('../app/models/estado'); // Substitua pelo caminho real do seu arquivo Estado.js

const dbUser = 'murilobdf14';
const dbPassword = 'now123';

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.0dltyx4.mongodb.net/NOW?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectou ao banco!');
    inserirEstados();
  })
  .catch((err) => console.log(err));

const estados = [
  { id: 1, nome: 'Acre', sigla: 'AC' },
  { id: 2, nome: 'Alagoas', sigla: 'AL' },
  { id: 3, nome: 'Amazonas', sigla: 'AM' },
  { id: 4, nome: 'Amapá', sigla: 'AP' },
  { id: 5, nome: 'Bahia', sigla: 'BA' },
  { id: 6, nome: 'Ceará', sigla: 'CE' },
  { id: 7, nome: 'Distrito Federal', sigla: 'DF' },
  { id: 8, nome: 'Espírito Santo', sigla: 'ES' },
  { id: 9, nome: 'Goiás', sigla: 'GO' },
  { id: 10, nome: 'Maranhão', sigla: 'MA' },
  { id: 11, nome: 'Minas Gerais', sigla: 'MG' },
  { id: 12, nome: 'Mato Grosso do Sul', sigla: 'MS' },
  { id: 13, nome: 'Mato Grosso', sigla: 'MT' },
  { id: 14, nome: 'Pará', sigla: 'PA' },
  { id: 15, nome: 'Paraíba', sigla: 'PB' },
  { id: 16, nome: 'Pernambuco', sigla: 'PE' },
  { id: 17, nome: 'Piauí', sigla: 'PI' },
  { id: 18, nome: 'Paraná', sigla: 'PR' },
  { id: 19, nome: 'Rio de Janeiro', sigla: 'RJ' },
  { id: 20, nome: 'Rio Grande do Norte', sigla: 'RN' },
  { id: 21, nome: 'Rondônia', sigla: 'RO' },
  { id: 22, nome: 'Roraima', sigla: 'RR' },
  { id: 23, nome: 'Rio Grande do Sul', sigla: 'RS' },
  { id: 24, nome: 'Santa Catarina', sigla: 'SC' },
  { id: 25, nome: 'Sergipe', sigla: 'SE' },
  { id: 26, nome: 'São Paulo', sigla: 'SP' },
  { id: 27, nome: 'Tocantins', sigla: 'TO' }
];

async function inserirEstados() {
  try {
    for (const estadoData of estados) {
      const estado = new Estado(estadoData);
      await estado.save();
    }

    console.log(`${estados.length} estados inseridos com sucesso.`);
  } finally {
    mongoose.disconnect();
  }
}

const app = require('./app');
const { config } = require('./config')

const host = '0.0.0.0';
const port = config.port;
app.listen(port, host, () => {
  console.log('Funcionando')
})

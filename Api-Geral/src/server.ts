import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io';
import useragent from 'express-useragent';
import sequelize from './db';  // Importar configuração do Sequelize
import passport from './config/passport';  // Importar configuração do Passport

dotenv.config();

const app = express();
app.use(useragent.express());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(router);
app.use(passport.initialize());  // Inicializar Passport

io.on('connection', (socket) => {
  socket.on('Retorno', (data) => {
    socket.broadcast.emit('status', data);
  });
});

const ErrorHandle: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    res.json({ error: 'Error, tente novamente mais tarde!', err: error });
  }
};

app.use(ErrorHandle);

app.get('/teste', (req, res) =>
  res.json({ message: 'Welcome to this new API!' })
);

httpServer.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();  // Autenticar e conectar ao banco de dados
    console.log('Database connected');
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

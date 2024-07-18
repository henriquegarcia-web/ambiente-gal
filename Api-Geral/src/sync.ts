// src/sync.ts
import sequelize from './db';
// import Usuario from './models/Usuario';

const sync = async () => {
  try {
    await sequelize.sync({ force: true });  // Use { force: true } para recriar as tabelas
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  } finally {
    await sequelize.close();
  }
};

sync();

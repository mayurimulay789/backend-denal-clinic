import mongoose from 'mongoose';

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: 'dental' }) // Use MONGO_URL
    .then(() => {
      console.log('MongoDB Connected!');
    })
    .catch((err) => {
      console.log(err);
    });
};

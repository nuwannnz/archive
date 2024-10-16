import mongoose from 'mongoose';

let client: typeof mongoose;

const connectToDb = async () => {
  try {
    if (!client) {
      console.log('==> creating db client');
      const auth = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`;

      client = await mongoose.connect(
        `mongodb+srv://${auth}@dcommerce-dev.byv8x.mongodb.net/dcommerce_dev?retryWrites=true&w=majority`,
      );
    }
  } catch (error) {
    console.log('Failed to connect to the database', error);
  }
};

export default connectToDb;

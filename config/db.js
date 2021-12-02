import mongoose from 'mongoose'

const connectDB = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // .then((con) => console.log('Mongo DB connected.')) //測試資料庫連接
}

export default connectDB

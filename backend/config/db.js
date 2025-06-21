import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://kairoslazarte:YsAC4JLfLaph2lRj@cluster0-shard-00-00.52tdf.mongodb.net:27017,cluster0-shard-00-01.52tdf.mongodb.net:27017,cluster0-shard-00-02.52tdf.mongodb.net:27017/MRAL-LMS-2025?ssl=true&replicaSet=atlas-m5vxc8-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)

  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
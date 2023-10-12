import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected successfully!')
    })
    connection.on('error', (err) => {
      console.log('Shit happens! '+ err)
      process.exit();
    })
  } catch (error) {
    console.log(error)
    console.log("Shit happens")
  }
}

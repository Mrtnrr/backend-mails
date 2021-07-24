import {connect} from 'mongoose'

export async function connectDB(){
    const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/utvt`
    await connect(MONGO_URI, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    console.log(`Backend ready`)
}

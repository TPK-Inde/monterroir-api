require('dotenv').config();
const mongoose = require('mongoose');

export const connectToMongo = async (): Promise<void> => {
    try{
        mongoose.connect(`mongodb+srv://${process.env.DB_MUSER}:${process.env.DB_MPASS}@${process.env.DB_MURL}/${process.env.DB_MNAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('MongoDB is OK'))
            .catch(() => console.log('MongoDB failed'));
    }
    catch(error){
        console.error(error)
    }
}

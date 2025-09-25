const mongoose=require('mongoose');

const mongoAtlasUri=process.env.atlasUrl;
const connectmongoDB = async () => {
  try {
    const conn = await mongoose.connect(mongoAtlasUri, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports=connectmongoDB

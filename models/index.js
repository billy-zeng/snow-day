const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(err));

module.exports = {
  User: require('./User'),
  Resort: require('./Resort')
};
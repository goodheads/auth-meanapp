module.exports = {

  db: process.env.MONGODB || process.env.MONGOHQ_URL,

  prerenderToken: process.env.PRERENDERTOKEN,

  sessionSecret: process.env.SESSION_SECRET,

};

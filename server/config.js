const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
    port: process.env.PORT || 8001,
    secret: 'social charge secret sentence',
};

export default config;

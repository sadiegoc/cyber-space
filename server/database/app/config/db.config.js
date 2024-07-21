module.exports = {
    HOST: "localhost",
    USER: "cyberspace",
    PASSWORD: "inez.jackie.matt",
    DB: "cyberspace",
    dialect: "mysql",
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
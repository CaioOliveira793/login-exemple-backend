module.exports = {
	dialect: 'postgres',
	host: process.env.PG_HOST,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	define: {
		timestamps: true,
		underscored: true
	}
}

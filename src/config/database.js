module.exports = {
	dialect: 'postgres',
	host: process.env.PG_HOST || 'localhost',
	username: process.env.PG_USER || 'node_user',
	password: process.env.PG_PASSWORD || 'node_password',
	database: process.env.PG_DATABASE || 'login_exemple',
	define: {
		timestamps: true,
		underscored: true
	}
}

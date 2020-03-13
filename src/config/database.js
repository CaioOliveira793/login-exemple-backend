require('./variables.env');

module.exports = {
	development: {
		dialect: 'postgres',
		host: process.env.PG_HOST || 'localhost',
		port: process.env.PG_PORT || 5432,
		username: process.env.PG_USER || 'node_user',
		password: process.env.PG_PASSWORD || 'node_password',
		database: process.env.PG_DATABASE || 'login_exemple',
		define: {
			timestamps: true,
			underscored: true
		}
	},
	production: {
		dialect: 'postgres',
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		define: {
			timestamps: true,
			underscored: true
		},
		logging: false
	}
}

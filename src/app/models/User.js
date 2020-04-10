const bcryptjs = require('bcryptjs');

const ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 30],
					msg: 'First name must be between 3 and 30 characters'
				},
				isAlpha: {
					msg: 'First name must have only letters'
				}
			}
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 30],
					msg: 'Last name must be between 3 and 30 characters'
				},
				isAlpha: {
					msg: 'Last name must have only letters'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: 'Email field must be a valid e-mail'
				}
			}
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				is: {
					args: [/^([a-z\d]-?[a-z\d]*)+[^\W_]$/i],
					msg: 'Username must have only alphanumeric characters or single hyphens'
				},
				len: {
					args: [5, 25],
					msg: 'Username must have at least 5 characters'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8, 20],
					msg: 'Password must have at least 8 characters'
				}
			}
		}
	}, {
		hooks: {
			afterValidate: async (user) => {
				if (user.password)
					user.password = await bcryptjs.hash(user.password, ROUNDS);
			}
		},
		sequelize,
		tableName: 'users',
		underscored: true
	});

	User.prototype.comparePassword = function(password) {
		return bcryptjs.compare(password, this.password);
	}

	return User;
};

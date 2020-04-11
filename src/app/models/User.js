const bcryptjs = require('bcryptjs');

const ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
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

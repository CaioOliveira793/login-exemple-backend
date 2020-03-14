const bcryptjs = require('bcryptjs');
const validator = require('validator');

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
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'users',
		underscored: true
	});

	User.prototype.encryptPassword = async function(password) {
		return await bcryptjs.hash(password, ROUNDS);
	}

	User.prototype.comparePassword = async function(password) {
		return await bcryptjs.compare(password, this.password);
	}

	return User;
};

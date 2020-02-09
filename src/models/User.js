const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init({
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING
		}, {
			sequelize,
			tableName: 'users',
			underscored: true
		});
	}
}

module.exports = User;

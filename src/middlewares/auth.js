const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization)
		return res.status(401).json({ error: 'No token provided' });

	const [ scheme, token ] = authorization.split(' ');

	if (!/^Bearer$/i.test(scheme))
		return res.status(401).json({ error: 'Token malformatted' });

	jwt.verify(token, jwtConfig.secret, (err, decoded) => {
		if (err)
			return res.status(401).json({ error: 'Token invalid' });

		req.id = decoded.id;
		return next();
	});
}

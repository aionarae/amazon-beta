const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'your_secret_key';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),

    authMiddleware: function ({ req }) {
        let token = req.headers.authorization || '';

        if (token) {
            token = token.split(' ').pop().trim();
            try {
                const { data } = jwt.verify(token, secret, { maxAge: expiration });
                req.user = data;
            } catch {
                console.log('Invalid token');
            }
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};

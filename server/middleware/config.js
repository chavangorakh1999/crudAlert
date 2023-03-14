const ResponseCodes = require('./response-code');
const jwt = require('jsonwebtoken');
var response_code = new ResponseCodes();
var auth_status = response_code.unauthorized().status;


module.exports={
    validateToken: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
          const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
          const options = {
            expiresIn: process.env.EXPIRES_IN,
            issuer: process.env.ISSUER
          };
          try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.SECRET_KEY, options);
    
            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
          } catch (err) {
            response_code.error = {
              message: 'Authentication Token Invalid.'
            }
            res.status(auth_status).send(response_code.unauthorized())
    
            // Throw an error just in case anything goes wrong with verification
            // throw new Error(err);
          }
        } else {
          response_code.error = {
            message: 'Authentication error. Token required.'
          }
          res.status(auth_status).send(response_code.unauthorized())
    
        }
      }
}

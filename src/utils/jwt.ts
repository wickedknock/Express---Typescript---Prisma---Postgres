import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
	secret: process.env.SECRET,
	audience: process.env.AUDIENCE,
	issuerBaseURL: process.env.ISSUERBASE_URL,
	tokenSigningAlg: process.env.TOKENSIGNING_ALG
});

export default jwtCheck;

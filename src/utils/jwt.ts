import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
	secret: '5HrEe3cigtdNUerigeebnoUKq0AuRbd9',
	audience: 'http://localhost:4000/account/list',
	issuerBaseURL: 'https://dev-g7md7buklw4prdgu.us.auth0.com/',
	tokenSigningAlg: 'HS256'
});

export default jwtCheck;

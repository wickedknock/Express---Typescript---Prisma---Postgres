import 'dotenv/config';
import { app } from './app';
import client from './db/db';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
	try {
		await client.$queryRaw`SELECT 1`;
		app.listen(PORT);
		console.log(`Server listening on port ${PORT}`);
	} catch (error) {
		console.error('Error starting server:', error);
		process.exit(1);
	}
};

const handleShutdown = async () => {
	console.log('Shutting down gracefully...');
	await client.$disconnect();
	process.exit(0);
};

const handleUncaughtException = err => {
	console.error('Uncaught Exception:', err.stack);
};

startServer();

process.once('SIGUSR2', handleShutdown);
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

process.on('uncaughtException', handleUncaughtException);

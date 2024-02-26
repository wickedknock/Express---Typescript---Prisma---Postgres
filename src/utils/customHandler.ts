import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
	status: number;

	constructor(message: string, status?: number) {
		super(message);
		this.status = status || 500;
	}
}

const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errStatus = err.status || 500;
	res.status(errStatus).send({
		success: false,
		status: errStatus,
		message: err.message.replace(/\n/g, '') || 'Something went wrong',
		stack:
			process.env.NODE_ENV === 'development'
				? err.stack.replace(/\n/g, '')
				: {}
	});
};

const successHandler = (res: Response, data: any, status?: number) => {
	res.status(status).json({
		success: true,
		status: status || 200,
		data
	});
};

export { CustomError, errorHandler, successHandler };

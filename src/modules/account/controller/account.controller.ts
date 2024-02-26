import { Request, Response, NextFunction } from 'express';

import accountSchema from '../schema/account.schema';
import accountService from '../service/account.service';
import { UpdateAccountDto } from '../dto/update_account.dto';
import { successHandler } from '../../../utils/customHandler';

export = {
	async createAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body;
			await accountSchema.createUserSchema.validateAsync(data);
			const result = await accountService.createAccount(data);
			successHandler(res, result, 201);
		} catch (err) {
			next(err);
		}
	},

	async readAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const accountId = req.params.accountId;
			await accountSchema.ValidAccountId.validateAsync(accountId);
			const result = await accountService.readAccount(accountId);
			successHandler(res, result, 200);
		} catch (err) {
			next(err);
		}
	},
	async updateAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const accountId = req.params.accountId;
			await accountSchema.ValidAccountId.validateAsync(accountId);
			const data: UpdateAccountDto = req.body;
			const result = await accountService.updateAccount(accountId, data);
			successHandler(res, result, 200);
		} catch (err) {
			next(err);
		}
	},

	async deleteAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const accountId = req.params.accountId;
			await accountSchema.ValidAccountId.validateAsync(accountId);
			const result = await accountService.deleteAccount(accountId);
			successHandler(res, result, 200);
		} catch (err) {
			next(err);
		}
	},

	async getAllAccounts(req: Request, res: Response, next: NextFunction) {
		try {
			const limit: number = parseInt(req.query.limit as string, 10) || 10;
			const result = await accountService.getAllAccounts(limit);
			successHandler(res, result, 200);
		} catch (err) {
			next(err);
		}
	},

	async userLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body
			await accountSchema.LoginUserSchema.validateAsync(data);
			const result = await accountService.userLogin(data);
			successHandler(res, result, 201);
		} catch (err) {
			next(err);
		}
	}
};

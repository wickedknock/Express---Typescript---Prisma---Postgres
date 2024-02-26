import client from '../../../../db/db';
import { CreateAccountDto } from '../dto/create_account.dto';
import { UpdateAccountDto } from '../dto/update_account.dto';
import { CustomError } from '../../../utils/customHandler';
import { Prisma, Account } from'../../../../node_modules/.prisma/client';

export = {
	async findById(Id: string) {
		return await client.account
			.findUniqueOrThrow({
				where: {
					id: Id
				},
				select: {
					id: true,
					first_name: true,
					last_name: true,
					email: true,
					phone: true,
					birthday: true,
					created_at: true,
					last_modified: true,
					password: false
				}
			})
			.catch(e => {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					throw new CustomError('ID Not Found', 404);
				}
			});
	},

	async deleteById(Id: string) {
		return await client.account
			.delete({
				where: {
					id: Id
				}
			})
			.catch(e => {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					throw new CustomError('ID Not Found', 404);
				}
			});
	},

	async createAccount(account: CreateAccountDto) {
		const result = await client.account.findUnique({
			where: {
				email: account.email
			},
			select: {
				id: true,
				first_name: true,
				last_name: true,
				email: true,
				phone: true,
				birthday: true,
				password: false
			}
		});

		if (result !== null) {
			throw new CustomError('Email Already Registered', 500);
		}
		return await client.account.create({
			data: {
				...account
			}
		});
	},
	async updateAccount(Id: string, accountData: UpdateAccountDto) {
		await this.findById(Id);
		return await client.account.update({
			where: {
				id: Id
			},
			data: {
				...accountData
			}
		});
	},

	async findAllByLimit(limit: number) {
		return await client.account.findMany({
			take: limit,
			select: {
				id: true,
				first_name: true,
				last_name: true,
				email: true,
				phone: true,
				birthday: true,
				password: false
			}
		});
	},

	async findByEmail(email: string): Promise<Account> {
		return (await client.account
			.findUniqueOrThrow({
				where: {
					email: email
				}
			})
			.catch(e => {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					throw new CustomError('Email Not Found', 404);
				}
			})) as Account;
	}
};

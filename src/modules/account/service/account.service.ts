import { CreateAccountDto } from '../dto/create_account.dto';
import { parseISO } from 'date-fns';
import { UpdateAccountDto } from '../dto/update_account.dto';
import accountRepo from '../repo/account.repo';
import bcrypt from 'bcryptjs';
import { LoginAccountDto } from '../dto/login_account.dto';
import { CustomError } from '../../../utils/customHandler';
import axios from 'axios';

export = {
	parseBday(date: string) {
		return parseISO(date);
	},

	async createAccount(account: CreateAccountDto) {
		account.birthday = this.parseBday(account.birthday);
		account.password = await bcrypt.hash(account.password, 10);
		return await accountRepo.createAccount(account);
	},

	async readAccount(Id: string) {
		return await accountRepo.findById(Id);
	},
	async updateAccount(Id: string, accountData: UpdateAccountDto) {
		if (accountData.birthday) {
			accountData.birthday = this.parseBday(accountData.birthday);
		}
		return await accountRepo.updateAccount(Id, accountData);
	},

	async deleteAccount(Id: string) {
		return await accountRepo.deleteById(Id);
	},

	async getAllAccounts(limit: number) {
		return await accountRepo.findAllByLimit(limit);
	},

	async userLogin(data: LoginAccountDto) {
		const { email, password } = data;
		const account = await accountRepo.findByEmail(email);
		const passwordMatch = await bcrypt.compare(password, account.password);
		if (passwordMatch) {
			const tokenData = await this.getToken()
			const data = {
				...account,
				...tokenData
			};
			return data;
		} else {
			throw new CustomError('Password is incorrect', 401);
		}
	},

	async getToken() {
		const auth0Url = process.env.AUTH0_URL;
		const clientId = process.env.CLIENT_ID;
		const clientSecret = process.env.CLIENT_SECRET;
		const audience = process.env.AUDIENCE;
		const grantType = process.env.GRANT_TYPE;

		try {
			const response = await axios.post(
				auth0Url,
				{
					client_id: clientId,
					client_secret: clientSecret,
					audience: audience,
					grant_type: grantType
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			return response.data;
		} catch (error) {
			throw new Error(error.message);
		}
	}
};

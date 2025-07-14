import type { User } from "@/interfaces/user-interface"
import ApiUtil from "@/utils/api-util"

class UserService {
	async getUserDetailed(): Promise<User> {
		const response = await ApiUtil.client.get<User>("/user")

		return response.data
	}
}

export default new UserService()

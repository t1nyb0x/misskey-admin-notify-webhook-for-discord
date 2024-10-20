export async function getUserName(server: string, userId: string): Promise<string> {
	// set body
	const requestBodySchema = {
		userId: userId,
	};

	const init = {
		body: JSON.stringify(requestBodySchema),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	};

	const response = await fetch(server + '/api/users/show', init);
	const userData = await response.text();
	const userName = JSON.parse(userData).username;

	return userName;
}

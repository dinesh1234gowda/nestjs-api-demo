export function connectionUrl(config){
	const username = config.username ? encodeURIComponent(config.username) : null;
	const password = config.password ? encodeURIComponent(config.password) : null;
	const host = config.servers.map((hs) => `${hs.host}:${hs.port}`).join(',');
	if (!username && !password) {
		return `mongodb://${host}/${config.dbName}`;
	}
	return `mongodb://${username}:${password}@${host}/${config.dbName}`;
}
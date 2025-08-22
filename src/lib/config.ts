export const config = {
	verbose: import.meta.env.DEV,
	websocket: import.meta.env.DEV 
		? 'ws://localhost:8080/ws/python' 
		: 'wss://pybuilderapi-production.up.railway.app/ws/python',
	graphql: import.meta.env.DEV 
		? 'http://localhost:8080/graphql' 
		: 'https://pybuilderapi-production.up.railway.app/graphql'
};

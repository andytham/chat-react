let url = {
	// PROFILES_API: "http://localhost:8081/user-profiles",
	// CHAT_HISTORY_API: "http://localhost:8082/history",
	// FRONT_END: "http://localhost:3000"

	PROFILES_API: "http://ec2-18-218-63-92.us-east-2.compute.amazonaws.com:8080/user-profiles-api/user-profiles",
	CHAT_HISTORY_API: "http://ec2-18-218-63-92.us-east-2.compute.amazonaws.com:8080/chat-history/history",
	FRONT_END: "http://ec2-18-219-41-84.us-east-2.compute.amazonaws.com:3000"
}

module.exports = url;

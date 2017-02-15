module.exports = function(app) {
	require("./services/server/user.service.server.js")(app);
	require("./services/server/website.service.server.js")(app);
	require("./services/server/page.service.server.js")(app);
	require("./services/server/widget.service.server.js")(app);
}
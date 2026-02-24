const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");
console.log('[server] noteRoutes type:', typeof noteRoutes);
console.log('[server] aiRoutes type:', typeof aiRoutes);
try { console.log('[server] aiRoutes keys:', Object.keys(aiRoutes)); } catch (e) {}
try { console.log('[server] aiRoutes.stack length:', aiRoutes.stack && aiRoutes.stack.length); } catch (e) {}
try {
	if (aiRoutes && aiRoutes.stack) {
		aiRoutes.stack.forEach((layer, idx) => {
			console.log('[server] aiRoutes.stack', idx, 'route?', !!layer.route, layer.route ? layer.route.path : 'no-route', layer.route ? Object.keys(layer.route.methods).join(',') : layer.name || 'handler');
		});
	}
} catch (e) {}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req,res,next)=>{console.log('[server] incoming', req.method, req.path); next();});

app.use("/notes", noteRoutes);
app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Debug: list mounted routes
try {
	console.log('[server] app._router.stack length:', app._router && app._router.stack ? app._router.stack.length : 0);
	if (app._router && app._router.stack) {
		app._router.stack.forEach((m, i) => {
			console.log(i, m.name || '<anon>', m.route ? Object.keys(m.route.methods).join(',') + ' ' + m.route.path : m.regexp && m.regexp.source ? m.regexp.source : 'no-route');
		});
	}
} catch (err) { console.error(err); }
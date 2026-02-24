const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const router = express.Router();
console.log("[aiRoutes] module loaded");

router.post("/summarize", async (req,res)=>{

try{

const { text } = req.body;

const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
contents:[
{
parts:[
{
text:`Summarize this content in 5 simple lines:\n${text}`
}
]
}
]
}
);

const summary =
response.data.candidates[0].content.parts[0].text;

res.json({summary});

}catch(err){
res.status(500).json({error:"AI failed"});
}

});

router.post('/ping', (req, res) => {
	res.json({ pong: true });
});

// export moved to end after all routes

// Fetch external information about a query from public sources (Wikipedia, W3Schools, MDN)
router.post("/external-info", async (req, res) => {
	try {
		console.log('[aiRoutes] /external-info received body:', req.body && (req.body.query || '[no query]'));
		const { query, source } = req.body;

		if (!query || typeof query !== "string") {
			return res.status(400).json({ error: "query (string) is required in body" });
		}

		const results = {};

		// 1) Wikipedia (reliable public API)
		try {
			const searchResp = await axios.get("https://en.wikipedia.org/w/api.php", {
				params: {
					action: "query",
					list: "search",
					srsearch: query,
					format: "json",
					srlimit: 1,
				},
			});

			const hits = searchResp.data?.query?.search;
			if (hits && hits.length > 0) {
				const pageid = hits[0].pageid;
				const extractResp = await axios.get("https://en.wikipedia.org/w/api.php", {
					params: {
						action: "query",
						prop: "extracts",
						exintro: true,
						explaintext: true,
						pageids: pageid,
						format: "json",
					},
				});
				const page = extractResp.data?.query?.pages?.[pageid];
				if (page && page.extract) results.wikipedia = page.extract;
			}
		} catch (err) {
			// swallow — we'll try other sources
		}

		// 2) W3Schools (HTML scrape fallback)
		if (!source || source === "w3schools" || source === "any") {
			try {
				const url = `https://www.w3schools.com/search/search_results.asp?q=${encodeURIComponent(query)}`;
				const r = await axios.get(url, { timeout: 8000 });
				const $ = cheerio.load(r.data);
				// Try meta description first, then first paragraph
				const meta = $('meta[name="description"]').attr("content");
				const p = $("p").first().text().trim();
				if (meta) results.w3schools = meta;
				else if (p) results.w3schools = p;
			} catch (err) {}
		}

		// 3) MDN (HTML scrape fallback)
		if (!source || source === "mdn" || source === "any") {
			try {
				const url = `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(query)}`;
				const r = await axios.get(url, { timeout: 8000 });
				const $ = cheerio.load(r.data);
				const meta = $('meta[name="description"]').attr("content");
				const p = $("p").first().text().trim();
				if (meta) results.mdn = meta;
				else if (p) results.mdn = p;
			} catch (err) {}
		}

		if (Object.keys(results).length === 0) {
			return res.status(404).json({ error: "No external info found for query" });
		}

		return res.json({ query, results });
	} catch (err) {
		return res.status(500).json({ error: err.message || "failed" });
	}
});
console.log("[aiRoutes] /external-info handler registered");
module.exports = router;
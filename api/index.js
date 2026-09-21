/**
 * Vercel Serverless Function (api/index.js)
 */
export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(200).send("Vercel E-Hentai Relay is Online! Usage: ?url=https://e-hentai.org/...");
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": req.headers.cookie || "nw=1; sl=dm_2;",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      }
    });

    const html = await upstreamRes.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(upstreamRes.status).send(html);
  } catch (err) {
    return res.status(500).send("Relay error: " + err.message);
  }
}

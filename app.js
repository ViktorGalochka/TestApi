const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => console.log("Launched..."));

const https = require('https');

let q = "https://habr.com/"


https.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=${q}`, (resp) => {
let data = '';

resp.on('data', (chunk) => {
    data += chunk;
});

resp.on('end', () => {
    console.log(JSON.parse(data));
});
app.get("/", (req, resp) => {
    resp.send(`
    <style>
    table {
        width: 60%;
        margin: 0 auto;
        border-collapse: collapse; 
    }
    th, td , tr{
        padding: 10px;
        border: 1px solid #ccc;
        border-right: none;
    }
    th {
        background: #c6e2ff;
    }
    .right {
        text-align:right;
    }
    </style>
    <input type="search">
    <table>
    <tr>
    <th>Opportunity</th>
    <th>Estimated Savings</th>
    </tr>
    <tr>
    <td>Eliminate render-blocking resources</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["render-blocking-resources"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Serve images in next-gen formats</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["uses-webp-images"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Use video formats for animated content</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["efficient-animated-content"].details.overallSavingsMs / 1000).toFixed(2)}s</td> 
    </tr>
    <tr>
    <td>Properly size images</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["uses-responsive-images"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Remove unused CSS</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["unused-css-rules"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Efficiently encode images</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["uses-optimized-images"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Minify Javascript</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["unminified-javascript"].details.overallSavingsMs / 1000).toFixed(2)}s</>
    </tr>
    <tr>
    <td>Minify CSS</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["unminified-css"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    <tr>
    <td>Reduce server response(TTFB)</td>
    <td class="right">${(JSON.parse(data).lighthouseResult.audits["time-to-first-byte"].details.overallSavingsMs / 1000).toFixed(2)}s</td>
    </tr>
    </table>
    `);
})

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

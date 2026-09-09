/* ============================================================
 * GitHub Actions: 漫画章节自动更新脚本
 * 读取 data.js 中的 L4，抓取每部漫画的最新章节，更新 chapters
 * 用法: node update-manga.js
 * ============================================================ */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const CryptoJS = require('crypto-js');

// 模拟浏览器环境，加载网站原始 imgsrc.js
global.window = global;
global.document = { createElement: () => ({ style: {} }) };
global.location = { href: '' };
global.CryptoJS = CryptoJS;

const imgsrcCode = fs.readFileSync(path.join(__dirname, 'imgsrc.js'), 'utf8');
eval(imgsrcCode);

const DATA_FILE = path.join(__dirname, '..', '..', 'data.js');

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) { reject(new Error('Too many redirects')); return; }
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      timeout: 30000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location, redirects + 1).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject).on('timeout', function() { this.destroy(new Error('Timeout')); });
  });
}

function parseChapters(html, baseUrl) {
  // 提取章节列表区域
  const listMatch = html.match(/<div id="chapterlistload">([\s\S]*?)<\/div>\s*<div/m);
  const listHtml = listMatch ? listMatch[1] : html;

  // 匹配所有 chapterurl 链接
  const regex = /<a\s+href="([^"]+)"[^>]*class="chapterurl"[^>]*>([\s\S]*?)<\/a>/g;
  const chapters = [];
  let match;

  while ((match = regex.exec(listHtml)) !== null) {
    const rawHref = match[1].trim();
    const rawText = match[2].trim();
    try {
      const title = imgsrc(rawText, '7', 34232);
      const hrefPart = rawHref.replace('/chapter/', '');
      const chapterId = imgsrc(hrefPart, '7', 34232);
      const url = new URL('/chapter/' + chapterId, baseUrl).href;
      if (title && chapterId) chapters.push({ title, url });
    } catch (e) { /* 解密失败跳过 */ }
  }

  chapters.reverse(); // 倒序：最新在前
  return chapters;
}

function chaptersToJs(chapters) {
  return chapters.map(c =>
    '    { title: ' + JSON.stringify(c.title) + ', url: ' + JSON.stringify(c.url) + ' }'
  ).join(',\n');
}

function generateL4Code(L4) {
  return 'var L4 = [\n' + L4.map(function(m) {
    const chaptersJs = (m.chapters && m.chapters.length)
      ? 'chapters: [\n' + chaptersToJs(m.chapters) + '\n    ]'
      : 'chapters: []';
    return '  {\n' +
      '    name: ' + JSON.stringify(m.name) + ',\n' +
      '    cover: ' + JSON.stringify(m.cover || '') + ',\n' +
      '    source: ' + JSON.stringify(m.source) + ',\n' +
      '    desc: ' + JSON.stringify(m.desc || '') + ',\n' +
      '    ' + chaptersJs + '\n' +
      '  }';
  }).join(',\n') + '\n];';
}

async function main() {
  let data = fs.readFileSync(DATA_FILE, 'utf8');

  // 用 global 注入方式 eval，确保能拿到 L4
  const evalCode = data.replace(/var L4\s*=\s*\[/, 'global.L4 = [');
  eval(evalCode);
  const L4 = global.L4;

  if (!L4 || !L4.length) {
    console.log('L4 为空，无需更新');
    process.exit(0);
  }

  let changed = false;
  for (let i = 0; i < L4.length; i++) {
    const manga = L4[i];
    if (!manga.source) { console.log('跳过（无 source）:', manga.name); continue; }
    try {
      console.log('抓取:', manga.name, '-', manga.source);
      const html = await fetchUrl(manga.source);
      const newChapters = parseChapters(html, manga.source);
      const oldCount = manga.chapters ? manga.chapters.length : 0;
      const latestChanged = newChapters.length > 0 && manga.chapters && manga.chapters[0] && manga.chapters[0].title !== newChapters[0].title;

      if (newChapters.length !== oldCount || latestChanged) {
        manga.chapters = newChapters;
        changed = true;
        console.log('  ✓ 已更新（' + oldCount + ' → ' + newChapters.length + ' 话，最新: ' + (newChapters[0] ? newChapters[0].title : '无') + '）');
      } else {
        console.log('  = 无变化（' + oldCount + ' 话）');
      }
    } catch (e) {
      console.error('  ✗ 抓取失败:', e.message);
    }
  }

  if (!changed) {
    console.log('所有漫画均无变化，不提交。');
    process.exit(0);
  }

  // 替换 data.js 中的 var L4 = [...] 整块
  const l4Start = data.indexOf('var L4 = [');
  if (l4Start === -1) {
    console.error('未找到 var L4');
    process.exit(1);
  }
  // 找到匹配的 ];
  let depth = 0;
  let l4End = -1;
  for (let i = l4Start; i < data.length; i++) {
    if (data[i] === '[') depth++;
    if (data[i] === ']') {
      depth--;
      if (depth === 0) { l4End = i; break; }
    }
  }
  if (l4End === -1) {
    console.error('未找到 L4 数组结束位置');
    process.exit(1);
  }

  const newL4Code = generateL4Code(L4);
  data = data.substring(0, l4Start) + newL4Code + data.substring(l4End + 2); // +2 跳过 "];
  fs.writeFileSync(DATA_FILE, data, 'utf8');
  console.log('data.js 已更新。');
}

main().catch(e => {
  console.error('出错:', e);
  process.exit(1);
});

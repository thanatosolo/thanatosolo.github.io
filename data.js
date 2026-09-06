/* ============================================================
 * THANATOSOLO 导航台 · 数据文件
 * 加卡片：在对应数组里加一行 { ... } 即可，记得结尾加英文逗号 。
 * 删卡片：直接删那一行 。
 * 改链接/名字：直接改对应引号里的内容 。
 * ============================================================ */

/* ---------- 板块编号和标题（标签页上 01/02/03 显示的字，都在这改） ---------- */
var TABS = [
  { num: "", title: "Entrance" },
  { num: "", title: "Serve" },
  { num: "", title: "Domain" }
];

/* ---------- 01 公网域名入口 ---------- */
var L1 = [
  { name: "CF-DPDNS.ORG",    url: "https://thanatosolo.dpdns.org" },
  { name: "VC-DDNS.GE",      url: "https://thanatos.ddns.ge" },
  { name: "VC-L.CD",         url: "https://thanatos.l.cd" },
  { name: "EO-L.CD",         url: "https://thanatosolo.l.cd" },
  { name: "GB-V6.ROCKS",     url: "https://thanatosolo.v6.rocks" },
  { name: "VPS-DESEC",       url: "https://thanatos.dedyn.io" },
  { name: "VPS-DYNU",        url: "https://thanatos.ddnsfree.com" },
  { name: "QWEN-CF-Tunnel",  url: "https://thanatoss.dpdns.org" },
  { name: "QWEN-S-FRP",      url: "https://thanatosolo.ddns.ge" },
  { name: "InfinityFree",    url: "https://thanatosolo.xo.je" },
  { name: "changeip",        url: "https://thanatos.myddns.com" }
];

/* ---------- 02 内网服务 ---------- */
var L2 = [
  { icon: "🖥️", name: "Istoreos",    url: "http://luci.thanatosolo.duckdns.org:8888" },
  { icon: "📦", name: "Openlist",    url: "http://op.thanatosolo.duckdns.org:8888" },
  { icon: "📁", name: "Filebrowser", url: "http://fb.thanatosolo.duckdns.org:8888" },
  { icon: "📥", name: "ariaNG",      url: "http://ar.thanatosolo.duckdns.org:8888" },
  { icon: "💻", name: "TTYD",        url: "http://ssh.thanatosolo.duckdns.org:8888" },
  { icon: "🌱", name: "QBittorrent", url: "http://qb.thanatosolo.duckdns.org:8888" },
  { icon: "🎬", name: "Jellyfin",    url: "http://je.thanatosolo.duckdns.org:8888" },
  { icon: "🤖", name: "AI",          url: "http://ai.thanatosolo.duckdns.org:8888" }
];

/* ---------- 03 DNS 面板 / 注册商 ----------
 * site     ：面板名称
 * url      ：面板地址
 * account  ：账号备注（没有就留 ""）
 * domains  ：该面板下的域名，可多个 ["域名1","域名2"]
 * expire   ：到期时间（格式 2027-05-25），不知道就写 null
 */
var L3 = [
  { site: "domain.digitalplat.org", url: "https://dash.domain.digitalplat.org/dashboard", account: "hm",      domains: ["thanatosolo.dpdns.org"],          expire: "2027-05-25" },
  { site: "katabump.com",           url: "https://dashboard.katabump.com/auth/login",     account: "hm",      domains: ["thanatosolo.kdns.fr"],            expire: null },
  { site: "nic.chenzhizuo.com",     url: "https://nic.chenzhizuo.com/user",               account: "163",     domains: ["thanatosolo.beyond.wang"],        expire: null },
  { site: "desec.io",               url: "https://desec.io/domains",                      account: "hm / 163",domains: ["thanatos.dedyn.io", "thanatosolo.dedyn.io"], expire: null },
  { site: "dnshe.com",              url: "https://my.dnshe.com/clientarea.php",           account: "hm",      domains: ["thanatosolo.cn.mt"],              expire: "2027-07-25" },
  { site: "localhost.cc",           url: "https://localhost.cc/dashboard",                account: "hm",      domains: ["thanatosolo.localhost.cc"],       expire: "2027-07-26" },
  { site: "domain.stackryze.com",   url: "https://domain.stackryze.com/dashboard",        account: "hm",      domains: ["thanatos.nx.kg", "thanatos.indevs.in"], expire: "2027-08-02" },
  { site: "duckdns.org",            url: "https://www.duckdns.org/domains",               account: "gm",      domains: ["thanatosolo.duckdns.org"],        expire: null },
  { site: "dynv6.com",              url: "https://dynv6.com/",                            account: "hm",      domains: ["thanatosolo.v6.navy", "thanatosolo.v6.rocks"], expire: null },
  { site: "cloudns.net",            url: "https://www.cloudns.net/main/",                 account: "hm",      domains: ["thanatosolo.cloud-ip.cc"],        expire: null },
  { site: "pwdns.org",              url: "https://pwdns.org/",                            account: "163",     domains: [],                                 expire: null },
  { site: "DnsNeko",                url: "https://www.dnsneko.com//",                     account: "",        domains: ["thanatos.zh.kg"],                 expire: "2027-08-02" },
  { site: "Dynu",                   url: "https://www.dynu.com/",                         account: "",        domains: ["thanatos.ddnsfree.com"],          expire: null },
  { site: "infinityfree",           url: "https://dash.infinityfree.com//",               account: "hm",      domains: ["thanatosolo.xo.je"],              expire: null },
  { site: "changeip",               url: "https://changeip.com",                          account: "hm",      domains: ["thanatosolo.myddns.com", "thanatos.myddns.com"], expire: null }
];

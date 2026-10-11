/* Car rental site engine by Redone. Layouts: split, night, poster. */
(function () {
  const S = window.SITE, T = S.theme, L = S.layout, root = document.documentElement;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) root.classList.add("motion");
  document.body.className = "L-" + L;
  document.head.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${T.fonts}&display=swap"><link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>">`);
  const css = `
:root{--bg:${T.bg};--bg2:${T.bg2};--ink:${T.ink};--muted:${T.muted};--line:${T.line};--acc:${T.acc};--acc2:${T.acc2};--on:${T.on};--card:${T.card};--fd:${T.fd};--fb:${T.fb};--r:${T.radius}}
*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:84px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.65 var(--fb);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit}h1,h2,h3{font-family:var(--fd);font-weight:${T.fw || 700};margin:0;line-height:1;letter-spacing:${T.track || "-.02em"};text-transform:${T.upper ? "uppercase" : "none"};min-width:0}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
.wrap{max-width:1220px;margin:0 auto;padding:0 22px}
.motion .rv{opacity:0;transform:translateY(32px)}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding:.08em 0 .06em;margin:-.08em 0 -.06em}.w>span{display:inline-block}
.tag{display:inline-flex;align-items:center;gap:8px;font:600 12px/1 var(--fb);letter-spacing:.16em;text-transform:uppercase;color:var(--acc);padding:9px 14px;border:1px solid color-mix(in srgb,var(--acc) 45%,transparent);border-radius:999px}
.tag i{width:7px;height:7px;border-radius:50%;background:var(--acc);animation:pulse 1.6s infinite}@keyframes pulse{50%{opacity:.25}}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:16px 26px;border-radius:var(--r);font:700 15px/1 var(--fb);text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s,background .2s,box-shadow .2s;white-space:nowrap}
.btn:hover{transform:translateY(-2px)}
.btn-a{background:var(--acc);color:var(--on);box-shadow:0 10px 30px -10px color-mix(in srgb,var(--acc) 70%,transparent)}.btn-o{border-color:var(--line);color:var(--ink)}
header{position:fixed;inset:0 0 auto;z-index:50;transition:background .3s,border-color .3s;border-bottom:1px solid transparent}
header.solid{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-color:var(--line)}
.bar{height:74px;display:flex;align-items:center;justify-content:space-between;gap:14px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;font:800 20px/1 var(--fd);letter-spacing:-.01em;text-transform:${T.upper ? "uppercase" : "none"}}
.logo b{display:grid;place-items:center;width:38px;height:38px;border-radius:calc(var(--r) / 2 + 4px);background:var(--acc);color:var(--on)}
nav{display:flex;gap:28px;font-size:14px;font-weight:500}nav a{text-decoration:none;color:var(--muted)}nav a:hover{color:var(--acc)}
@media (max-width:920px){nav{display:none}.bar .btn{padding:12px 15px;font-size:13px}.logo{font-size:17px}}
.hero{position:relative;overflow:hidden;padding:120px 0 60px;min-height:100svh;display:flex;flex-direction:column;justify-content:center}
.hero h1{font-size:clamp(46px,7.4vw,112px)}.hero h1 em{font-style:normal;color:var(--acc)}
.lead{color:var(--muted);font-size:clamp(16px,1.35vw,19px);max-width:34em;margin:22px 0 0}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.chips span{font-size:13px;padding:8px 12px;border-radius:999px;background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink)}
.trust{display:flex;align-items:center;gap:10px;margin-top:22px;font-size:14px;color:var(--muted)}.trust b{color:var(--ink)}.stars{color:#F5B301;letter-spacing:2px}
.road{position:absolute;left:0;right:0;bottom:0;height:120px;pointer-events:none}
.road .lane{position:absolute;left:0;right:0;bottom:44px;height:4px;background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--ink) 30%,transparent) 0 46px,transparent 46px 92px);animation:lane 1.1s linear infinite}
@keyframes lane{to{background-position:-92px 0}}
.carsvg .wh{transform-box:fill-box;transform-origin:center;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.carsvg .bob{animation:bob .5s ease-in-out infinite alternate}@keyframes bob{to{transform:translateY(1.5px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
/* booking card */
.book{background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:calc(var(--r) + 6px);padding:26px;box-shadow:0 30px 80px -30px rgba(0,0,0,.35);position:relative;z-index:3}
.book h3{font-size:24px;letter-spacing:-.01em;text-transform:none;margin-bottom:4px}.book .sub{margin:0 0 16px;color:var(--muted);font-size:14px}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:12px}.fg .full{grid-column:1/-1}
label{display:grid;gap:6px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
input,select,textarea{font:500 15px var(--fb);color:var(--ink);background:color-mix(in srgb,var(--ink) 5%,transparent);border:1px solid var(--line);border-radius:calc(var(--r) / 2 + 4px);padding:12px 13px;width:100%;min-width:0;text-transform:none;letter-spacing:0}
select option{color:#111}input:focus,select:focus,textarea:focus{outline:none;border-color:var(--acc)}
.err{margin:6px 0 0;color:#e5484d;font-size:14px;min-height:1.1em}.book .btn{width:100%;margin-top:6px}
.note{font-size:12.5px;color:var(--muted);margin:10px 0 0;text-align:center}
@media (max-width:520px){.fg{grid-template-columns:1fr}.book{padding:20px}}
/* sections */
section{padding:110px 0}.sh{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:46px;flex-wrap:wrap}
.sh h2{font-size:clamp(36px,5vw,68px);max-width:14ch}.sh p{color:var(--muted);max-width:30em;margin:0}
.fleet{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.car{background:var(--card);border:1px solid var(--line);border-radius:calc(var(--r) + 6px);padding:22px;display:flex;flex-direction:column;transition:transform .35s,border-color .35s}
.car:hover{transform:translateY(-6px);border-color:var(--acc)}
.car .pic{aspect-ratio:16/8;border-radius:var(--r);background:radial-gradient(120% 90% at 50% 100%,color-mix(in srgb,var(--acc) 22%,transparent),transparent 70%),color-mix(in srgb,var(--ink) 4%,transparent);display:grid;place-items:center;overflow:hidden;margin-bottom:18px}
.car .pic svg{width:82%;transition:transform .5s}.car:hover .pic svg{transform:translateX(6%)}
.car h3{font-size:24px;text-transform:none;letter-spacing:-.01em}.car .ex{color:var(--muted);font-size:14px;margin:6px 0 14px}
.specs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}.specs span{font-size:12.5px;padding:6px 10px;border-radius:999px;border:1px solid var(--line)}
.car .row{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:10px}.car .row small{color:var(--muted);font-size:13px}
.car .btn{padding:12px 18px;font-size:14px}
@media (max-width:980px){.fleet{grid-template-columns:1fr 1fr}}@media (max-width:620px){.fleet{grid-template-columns:1fr}}
.fleetnote{margin:22px 0 0;color:var(--muted);font-size:14px}
.band{background:var(--bg2);color:${T.bandInk || "var(--ink)"}}
.perks{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid var(--line)}
.pk{padding:30px 24px 0 0}.pk svg{width:40px;height:40px;color:var(--acc)}.pk h3{font-size:21px;margin:16px 0 8px;text-transform:none;letter-spacing:-.01em}.pk p{margin:0;color:var(--muted);font-size:15px}
@media (max-width:900px){.perks{grid-template-columns:1fr 1fr;gap:10px 20px}}@media (max-width:540px){.perks{grid-template-columns:1fr}}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:70px;counter-reset:s}
.st{padding:26px;border-radius:calc(var(--r) + 6px);border:1px solid var(--line);position:relative}
.st::before{counter-increment:s;content:"0" counter(s);font:800 54px/1 var(--fd);color:var(--acc);opacity:.9;display:block;margin-bottom:12px}
.st h3{font-size:21px;text-transform:none;letter-spacing:-.01em;margin-bottom:6px}.st p{margin:0;color:var(--muted);font-size:15px}
@media (max-width:820px){.steps{grid-template-columns:1fr}}
.stats{display:flex;gap:50px;flex-wrap:wrap;margin-top:60px}.stats b{display:block;font:800 clamp(44px,5vw,70px)/1 var(--fd);color:var(--acc)}.stats span{color:var(--muted);font-size:13px;letter-spacing:.1em;text-transform:uppercase}
.revs{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.rev{margin:0;padding:28px;border-radius:calc(var(--r) + 6px);background:var(--card);border:1px solid var(--line);display:flex;flex-direction:column;gap:14px}
.rev p{margin:0;font-size:17px;line-height:1.55}.rev small{color:var(--muted);font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;margin-top:auto}
@media (max-width:960px){.revs{grid-template-columns:1fr}}
.faq{max-width:860px}.qa{border-bottom:1px solid var(--line)}
.qa button{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 0;cursor:pointer;font:700 clamp(18px,2vw,22px)/1.3 var(--fb)}
.qa .pm{flex:none;width:34px;height:34px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:transform .3s,background .3s}
.qa.open .pm{transform:rotate(45deg);background:var(--acc);color:var(--on);border-color:var(--acc)}
.ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s}.qa.open .ans{grid-template-rows:1fr}.ans>div{overflow:hidden}.ans p{margin:0 0 22px;color:var(--muted)}
.contact .wrap{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start}.contact .wrap>*{min-width:0}
.contact h2{font-size:clamp(38px,5vw,66px)}
.info{display:grid;gap:18px;margin-top:28px}.info>div{display:flex;gap:14px;min-width:0}.info>div>*{min-width:0}.info svg{flex:none;color:var(--acc);margin-top:3px}.info b{display:block}.info span,.info a.s{color:var(--muted)}
.hours{display:grid;grid-template-columns:auto 1fr;gap:2px 16px;color:var(--muted);font-size:15px}
@media (max-width:900px){.contact .wrap{grid-template-columns:1fr}}
footer{padding:34px 0 46px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
.wa{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:60;width:58px;height:58px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 10px 30px rgba(37,211,102,.45)}
.ticker{overflow:hidden;background:var(--acc);color:var(--on);padding:14px 0}.ticker .tr{display:flex;width:max-content;animation:mq 30s linear infinite}
.ticker span{display:flex;align-items:center;gap:28px;padding-right:28px;white-space:nowrap;font:700 18px/1 var(--fd);text-transform:uppercase;letter-spacing:.04em}.ticker span::after{content:"✦";font-size:12px}
@keyframes mq{to{transform:translateX(-50%)}}
/* SPLIT */
.L-split .hero .wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:50px;align-items:center;width:100%;position:relative;z-index:2}
.L-split .hero .drive{position:absolute;left:0;bottom:30px;width:min(360px,60vw);z-index:1;opacity:.95}
.L-split .hero{padding-bottom:160px}@media (max-width:960px){.L-split .hero .wrap{grid-template-columns:1fr}}
/* NIGHT */
.L-night .hero{text-align:center;align-items:center;padding-bottom:0}
.L-night .hero::before{content:"";position:absolute;left:50%;bottom:0;width:240vw;height:58%;transform:translateX(-50%) perspective(420px) rotateX(62deg);transform-origin:bottom;background:linear-gradient(90deg,transparent 33.2%,color-mix(in srgb,var(--acc) 85%,transparent) 33.2% 33.6%,transparent 33.6% 66.4%,color-mix(in srgb,var(--acc) 85%,transparent) 66.4% 66.8%,transparent 66.8%) 0 0/100% 90px,repeating-linear-gradient(0deg,color-mix(in srgb,var(--ink) 8%,transparent) 0 2px,transparent 2px 90px),linear-gradient(transparent,color-mix(in srgb,var(--acc) 12%,transparent));animation:roadrun 1.2s linear infinite;opacity:.7}
@keyframes roadrun{to{background-position:0 90px,0 90px,0 0}}
.L-night .hero::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 30%,color-mix(in srgb,var(--acc) 18%,transparent),transparent 70%);pointer-events:none}
.L-night .hero .wrap{position:relative;z-index:2;width:100%}
.L-night .hero .lead{margin-left:auto;margin-right:auto}.L-night .chips,.L-night .trust{justify-content:center}
.L-night .hero .drive{width:min(420px,78vw);margin:34px auto 0;position:relative;z-index:2}
.L-night .bookwrap{position:relative;z-index:4;margin-top:-10px;padding-bottom:30px}
.L-night .book{max-width:1100px;margin:0 auto}.L-night .book .fg{grid-template-columns:repeat(4,1fr)}.L-night .book .fg .full{grid-column:span 2}
@media (max-width:900px){.L-night .book .fg{grid-template-columns:1fr 1fr}.L-night .book .fg .full{grid-column:1/-1}}
@media (max-width:520px){.L-night .book .fg{grid-template-columns:1fr}}
/* POSTER */
.L-poster header:not(.solid){color:var(--on)}.L-poster header:not(.solid) nav a{color:color-mix(in srgb,var(--on) 78%,transparent)}.L-poster header:not(.solid) .logo b{background:var(--on);color:var(--acc)}
.L-poster .hero{background:var(--acc);color:var(--on);padding-bottom:170px}
.L-poster .hero .lead,.L-poster .hero .trust{color:color-mix(in srgb,var(--on) 78%,transparent)}.L-poster .hero .trust b{color:var(--on)}
.L-poster .hero h1 em{color:var(--acc2)}.L-poster .tag{color:var(--on);border-color:color-mix(in srgb,var(--on) 40%,transparent)}.L-poster .tag i{background:var(--on)}
.L-poster .chips span{background:color-mix(in srgb,var(--on) 14%,transparent);color:var(--on)}
.L-poster .giant{position:absolute;right:-2vw;bottom:40px;font:900 clamp(90px,19vw,300px)/.8 var(--fd);text-transform:uppercase;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:2px color-mix(in srgb,var(--on) 22%,transparent);white-space:nowrap;pointer-events:none;z-index:0}
.L-poster .hero .wrap{position:relative;z-index:2;width:100%}
.L-poster .hero .drive{position:absolute;right:5vw;bottom:34px;width:min(460px,64vw);z-index:1}
.L-poster .hero .road .lane{background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--on) 45%,transparent) 0 46px,transparent 46px 92px)}
.L-poster .hero .btn-a,.L-poster header:not(.solid) .btn-a{background:var(--on);color:var(--acc)}.L-poster .hero .btn-o{color:var(--on);border-color:color-mix(in srgb,var(--on) 40%,transparent)}
.L-poster .bookwrap{margin-top:-110px;position:relative;z-index:4}.L-poster .book{max-width:760px}

@media (max-width:760px){.L-poster .hero .drive{position:relative;right:auto;bottom:auto;margin:30px 0 0 auto;width:80vw}.L-poster .hero{padding-bottom:140px}}
`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  /* ---------- car drawings ---------- */
  const body = {
    city: "M30 112 C30 96 40 86 58 82 L104 56 C112 51 122 48 134 48 H212 C230 48 244 56 256 70 L276 86 C296 88 312 96 314 112 V122 H30Z",
    sedan: "M22 114 C22 98 34 90 52 88 L104 60 C114 54 124 51 138 51 H214 C230 51 244 58 256 70 L276 88 C304 90 326 98 330 114 V124 H22Z",
    suv: "M24 112 C24 94 30 82 48 80 L92 46 C100 40 110 38 122 38 H236 C252 38 262 44 270 56 L290 80 C310 82 324 94 326 112 V124 H24Z",
    van: "M22 116 V58 C22 44 32 34 48 34 H246 C262 34 272 42 280 54 L304 84 C318 88 330 98 330 114 V124 H22Z"
  };
  const glass = {
    city: "M112 62 L134 54 H170 V80 H96Z M178 54 H210 C224 54 236 62 246 76 L248 80 H178Z",
    sedan: "M112 66 L138 57 H174 V84 H100Z M182 57 H212 C226 57 238 64 248 78 L250 84 H182Z",
    suv: "M100 52 L124 44 H176 V78 H82Z M184 44 H234 C246 44 254 50 262 62 L272 78 H184Z",
    van: "M40 46 H118 V78 H40Z M126 46 H200 V78 H126Z M208 46 H244 C254 46 262 52 270 62 L282 78 H208Z"
  };
  const carSvg = (type, color, cls = "") => {
    const wx = type === "van" ? [84, 266] : type === "city" ? [86, 254] : [88, 266];
    const wheel = x => `<g class="wh"><circle cx="${x}" cy="124" r="24" fill="#16181d"/><circle cx="${x}" cy="124" r="11" fill="#c9ccd3"/><path d="M${x} 113 V135 M${x - 11} 124 H${x + 11}" stroke="#7d828c" stroke-width="3"/></g>`;
    return `<svg class="carsvg ${cls}" viewBox="0 0 350 160" aria-hidden="true"><ellipse cx="175" cy="150" rx="150" ry="7" fill="#000" opacity=".18"/><g class="bob"><path d="${body[type]}" fill="${color}"/><path d="${glass[type]}" fill="#0f1720" opacity=".78"/><path d="${body[type]}" fill="url(#shine)" opacity=".35"/><rect x="${type === "van" ? 312 : 302}" y="98" width="18" height="8" rx="3" fill="#ffe7a3"/><rect x="24" y="100" width="12" height="7" rx="2" fill="#e5484d"/></g>${wheel(wx[0])}${wheel(wx[1])}<defs><linearGradient id="shine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>`;
  };
  const icons = {
    plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 16l20-8-6 12-3-5-5 3 1-5z"/></svg>`,
    key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/></svg>`,
    clean: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/></svg>`
  };
  const pin = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
  const clk = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
  const tel = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`;
  const waI = `<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"/></svg>`;
  const maps = `https://www.google.com/maps/place/?q=place_id:${S.placeId}`;
  const wa = t => `https://wa.me/${S.wa}${t ? "?text=" + encodeURIComponent(t) : ""}`;
  const iso = d => d.toISOString().slice(0, 10);
  const d1 = new Date(Date.now() + 864e5 * 7), d2 = new Date(Date.now() + 864e5 * 14);
  const places = [S.shortAgency || "À l'agence", ...S.airports, "Livraison à mon adresse / hôtel"];
  const opt = a => a.map(x => `<option>${esc(x)}</option>`).join("");
  const book = `<form class="book rv" id="f" novalidate><h3>${esc(S.formTitle)}</h3><p class="sub">${esc(S.formSub)}</p>
<div class="fg">
<label class="full">Lieu de prise en charge<select id="pl">${opt(places)}</select></label>
<label class="full">Lieu de retour<select id="rl"><option>Même lieu</option>${opt(places)}</select></label>
<label>Départ<input id="d1" type="date" value="${iso(d1)}" min="${iso(new Date())}"></label>
<label>Retour<input id="d2" type="date" value="${iso(d2)}" min="${iso(new Date())}"></label>
<label>Catégorie<select id="cat">${opt(S.fleet.map(c => c.n))}</select></label>
<label>Nom<input id="fn" autocomplete="name" placeholder="Votre nom"></label>
<label>Téléphone / WhatsApp<input id="fp" type="tel" autocomplete="tel" placeholder="+212 6… / +33 6…"></label>
<label>N° de vol (optionnel)<input id="fv" placeholder="ex. AT 801"></label>
</div><p class="err" id="err" role="alert"></p><button class="btn btn-a" type="submit">Réserver sur WhatsApp →</button>
<p class="note">Réponse rapide · Confirmation des prix et de la disponibilité par WhatsApp</p></form>`;
  const heroText = `<span class="tag hero-in"><i></i>${esc(S.kicker)}</span><h1 class="split" style="margin-top:22px">${S.h1}</h1><p class="lead hero-in">${esc(S.lead)}</p>
<div class="chips hero-in">${S.chips.map(c => `<span>${esc(c)}</span>`).join("")}</div>
${L !== "split" ? `<div class="hero-in" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px;${L === "night" ? "justify-content:center" : ""}"><a class="btn btn-a" href="#reserver">Réserver maintenant</a><a class="btn btn-o" href="#flotte">Voir les voitures</a></div>` : ""}
${S.rating ? `<div class="trust hero-in"><span class="stars">★★★★★</span><b>${String(S.rating).replace(".", ",")}/5</b><span>· ${S.reviewCount} avis Google</span></div>` : ""}`;
  const heroCar = `<div class="drive">${carSvg(S.heroCar || "suv", T.carColor || T.acc)}</div>`;
  const hero = L === "split" ? `<section class="hero" id="reserver"><div class="wrap"><div>${heroText}</div>${book}</div>${heroCar}<div class="road"><div class="lane"></div></div></section>`
    : L === "night" ? `<section class="hero"><div class="wrap">${heroText}${heroCar}</div></section><div class="bookwrap" id="reserver"><div class="wrap">${book}</div></div>`
    : `<section class="hero"><div class="giant" aria-hidden="true">${esc(S.city)}</div><div class="wrap">${heroText}</div>${heroCar}<div class="road"><div class="lane"></div></div></section><div class="bookwrap" id="reserver"><div class="wrap">${book}</div></div>`;
  const carColors = T.fleetColors || [T.acc, T.acc2, "#c9ccd3", "#1f2937", "#b91c1c", "#2563eb"];
  document.body.innerHTML = `
<header id="hdr"><div class="wrap bar"><a class="logo" href="#top"><b>${esc(S.mono)}</b>${esc(S.short)}</a>
<nav aria-label="Navigation"><a href="#flotte">Nos voitures</a><a href="#services">Services</a><a href="#avis">Avis</a><a href="#contact">Contact</a></nav>
<a class="btn btn-a" href="#reserver">Réserver</a></div></header>
<main id="top">${hero}
<div class="ticker" aria-hidden="true"><div class="tr">${[...S.ticker, ...S.ticker].map(t => `<span>${esc(t)}</span>`).join("")}</div></div>
<section id="flotte"><div class="wrap"><div class="sh"><h2 class="split">${esc(S.fleetTitle)}</h2><p class="rv">${esc(S.fleetSub)}</p></div>
<div class="fleet">${S.fleet.map((c, i) => `<article class="car rv"><div class="pic">${carSvg(c.t, carColors[i % carColors.length])}</div><h3>${esc(c.n)}</h3><p class="ex">${esc(c.ex)}</p><div class="specs">${c.s.map(x => `<span>${esc(x)}</span>`).join("")}</div><div class="row"><small>Tarif sur demande</small><a class="btn btn-a pick" href="#reserver" data-cat="${esc(c.n)}">Réserver</a></div></article>`).join("")}</div>
<p class="fleetnote rv">Modèles donnés à titre indicatif, selon disponibilité. Envoyez vos dates : on vous confirme la voiture et le prix sur WhatsApp.</p></div></section>
<section class="band" id="services"><div class="wrap"><div class="sh"><h2 class="split">${esc(S.perksTitle)}</h2><p class="rv">${esc(S.perksSub)}</p></div>
<div class="perks">${S.perks.map(p => `<div class="pk rv">${icons[p.i]}<h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div>`).join("")}</div>
<div class="steps">${S.steps.map(s => `<div class="st rv"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join("")}</div>
${S.rating ? `<div class="stats rv"><div><b>${String(S.rating).replace(".", ",")}</b><span>Note Google</span></div><div><b>${S.reviewCount}+</b><span>Avis clients</span></div><div><b>${esc(S.statBig)}</b><span>${esc(S.statLabel)}</span></div></div>` : ""}
</div></section>
<section id="avis"><div class="wrap"><div class="sh"><h2 class="split">${esc(S.revTitle)}</h2><p class="rv">Extraits d'avis Google${S.translated ? ", traduits en français" : ""}.</p></div>
<div class="revs">${S.reviews.map(r => `<figure class="rev rv"><span class="stars">★★★★★</span><p>“${esc(r)}”</p><small>Avis Google</small></figure>`).join("")}</div>
<p style="margin-top:28px" class="rv"><a class="btn btn-o" href="${maps}" target="_blank" rel="noopener">Voir tous les avis sur Google</a></p></div></section>
<section style="padding-top:0"><div class="wrap"><div class="sh"><h2 class="split">Questions fréquentes</h2></div>
<div class="faq">${S.faq.map(f => `<div class="qa rv"><button type="button" aria-expanded="false"><span>${esc(f.q)}</span><span class="pm" aria-hidden="true">+</span></button><div class="ans"><div><p>${esc(f.a)}</p></div></div></div>`).join("")}</div></div></section>
<section class="contact band" id="contact"><div class="wrap"><div><h2 class="split">${esc(S.contactTitle)}</h2><p class="rv" style="opacity:.78;font-size:18px;margin:18px 0 0">${esc(S.contactSub)}</p>
<div class="info rv"><div>${pin}<p style="margin:0"><b>${esc(S.address)}</b><a class="s" href="${maps}" target="_blank" rel="noopener">Itinéraire Google Maps</a></p></div>
${S.hours.length ? `<div>${clk}<div><b>Horaires</b><div class="hours">${S.hours.map(h => `<span>${esc(h[0])}</span><span>${esc(h[1])}</span>`).join("")}</div></div></div>` : ""}
<div>${tel}<p style="margin:0"><b><a href="tel:+${S.wa}">${esc(S.phone)}</a></b><span>Appel ou WhatsApp</span></p></div></div></div>
<div class="rv"><a class="btn btn-a" style="width:100%;padding:22px" href="${wa("Bonjour " + S.short + ", je souhaite louer une voiture.")}" target="_blank" rel="noopener">${waI} Écrire sur WhatsApp</a>
<p style="margin:16px 0 0;opacity:.7;font-size:14px;text-align:center">Ou utilisez le formulaire de réservation en haut de page.</p></div></div></section>
</main>
<footer><div class="wrap"><span>© ${esc(S.name)} · ${esc(S.city)}</span><span>Site réalisé par Redone</span></div></footer>
<a class="wa" href="${wa()}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${waI}</a>`;
  const $ = id => document.getElementById(id);
  const hdr = $("hdr"); addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 30), { passive: true });
  document.querySelectorAll(".qa").forEach(q => { const b = q.querySelector("button"); b.addEventListener("click", () => { const o = !q.classList.contains("open"); q.classList.toggle("open", o); b.setAttribute("aria-expanded", o); }); });
  document.querySelectorAll(".pick").forEach(a => a.addEventListener("click", () => { $("cat").value = a.dataset.cat; }));
  $("d1").addEventListener("change", () => { if ($("d2").value < $("d1").value) $("d2").value = $("d1").value; $("d2").min = $("d1").value; });
  $("f").addEventListener("submit", e => {
    e.preventDefault(); const n = $("fn").value.trim(), p = $("fp").value.trim();
    if (!n || p.replace(/\D/g, "").length < 9) { $("err").textContent = "Ajoutez votre nom et un numéro valide pour recevoir la confirmation."; return; }
    $("err").textContent = ""; const v = $("fv").value.trim();
    const days = Math.max(1, Math.round((new Date($("d2").value) - new Date($("d1").value)) / 864e5));
    window.open(wa(`Bonjour ${S.short}, je souhaite réserver une voiture.\nCatégorie : ${$("cat").value}\nDépart : ${$("d1").value} — ${$("pl").value}\nRetour : ${$("d2").value} — ${$("rl").value}\nDurée : ${days} jour(s)\nNom : ${n}\nTéléphone : ${p}${v ? "\nVol : " + v : ""}`), "_blank", "noopener");
  });
  const fit = () => document.querySelectorAll("h1,h2").forEach(h => { h.style.fontSize = ""; for (let i = 0; i < 14 && h.scrollWidth > h.clientWidth + 1; i++) h.style.fontSize = (parseFloat(getComputedStyle(h).fontSize) * .93) + "px"; });
  fit(); document.fonts && document.fonts.ready.then(fit); let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(fit, 150); });
  const unhide = () => { root.classList.remove("motion"); };
  if (reduce) return unhide();
  const load = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  const safety = setTimeout(unhide, 4000);
  load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js").then(() => load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js")).then(run).catch(unhide);
  function split(el) { const walk = n => [...n.childNodes].map(c => c.nodeType === 3 ? c.textContent.split(/(\s+)/).map(t => t.trim() ? `<span class="w"><span>${t}</span></span>` : t).join("") : `<${c.tagName.toLowerCase()}>${walk(c)}</${c.tagName.toLowerCase()}>`).join(""); el.innerHTML = walk(el); return el.querySelectorAll(".w>span"); }
  function run() {
    clearTimeout(safety); gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(split(document.querySelector(".hero h1")), { yPercent: 115, duration: 1.2, stagger: .06 })
      .from(".hero-in", { opacity: 0, y: 24, duration: 1, stagger: .1 }, "-=.9")
      .from(".hero .drive, .bookwrap .drive", { x: L === "poster" ? "60vw" : "-70vw", duration: 1.8, ease: "power3.out" }, .15);
    const fb = document.querySelector(".hero .book"); if (fb) { fb.classList.remove("rv"); tl.from(fb, { opacity: 0, y: 40, duration: 1.1 }, .35); }
    const bb = document.querySelector(".bookwrap .book"); if (bb) { bb.classList.remove("rv"); tl.from(bb, { opacity: 0, y: 50, duration: 1.1 }, .6); }
    gsap.to(".giant", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    document.querySelectorAll("section:not(.hero) .split").forEach(h => gsap.from(split(h), { yPercent: 115, duration: 1, ease: "expo.out", stagger: .05, scrollTrigger: { trigger: h, start: "top 88%" } }));
    ScrollTrigger.batch(".rv", { start: "top 92%", onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: .08 }) });
    fit(); addEventListener("load", () => { fit(); ScrollTrigger.refresh(); });
  }
})();

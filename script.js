/**
 * WPT Texas Hold'em Tournament Simulator (Vanilla JS)
 * High-performance, low-battery, absolute phone portrait design.
 */

// I18n Translations
const TRANSLATIONS = {
  ja: {
    start: "トーナメント開始",
    settings: "各種設定",
    historyButton: "ハンド履歴",
    back: "戻る",
    selectPlayersCount: "初期プレイヤー人数を選択してください",
    difficulty: "AI難易度",
    language: "言語 (Language)",
    beginner: "ビギナー (初心者)",
    normal: "ノーマル (普通)",
    hard: "ハード (上級)",
    pro: "プロ (手強い)",
    handHistory: "ハンド履歴 (最大500件分)",
    noHistory: "履歴がありません。プレイを開始してください。",
    expectedWin: "想定プリフロップ勝率",
    actualResult: "結果",
    diffFromAvg: "期待値との差",
    viewWinRates: "人数別勝率表を表示",
    win: "勝利 (Win)",
    lose: "敗北 (Lose)",
    handCount: "ハンド",
    pot: "ポット",
    blind: "ブラインド",
    raise: "レイズ",
    check: "チェック",
    call: "コール",
    fold: "フォールド",
    allin: "オールイン",
    thinking: "思考中...",
    showdownTitle: "ショーダウン！",
    eliminated: "脱落",
    heroEliminated: "あなたは脱落しました",
    tournamentEnd: "トーナメント終了",
    congrats: "優勝：Player！",
    newGame: "ニューゲーム",
    rematch: "同じ人数で再戦",
    mainMenu: "メインメニュー",
    champion: "チャンピオン",
    rank: "順位",
    confirmNewGame: "新しくゲームを始めますか？履歴は保持されます。",
    blindUp: "ブラインド上昇！",
    ecoMode: "超省電力 (バッテリー節約)",
    ecoDesc: "アニメーションと陰影効果を無効化し、バッテリー消費量と負荷を極限まで低減します"
  },
  en: {
    start: "Start Game",
    settings: "Settings",
    historyButton: "History",
    back: "Back",
    selectPlayersCount: "Select Initial Player Count",
    difficulty: "AI Difficulty",
    language: "Language",
    beginner: "Beginner",
    normal: "Normal",
    hard: "Hard",
    pro: "Pro",
    handHistory: "Hand History (Last 500 hands)",
    noHistory: "No history found. Start playing to log results.",
    expectedWin: "Expected Preflop Win",
    actualResult: "Result",
    diffFromAvg: "Difference",
    viewWinRates: "View Win Rates by Number of Players",
    win: "Win",
    lose: "Lose",
    handCount: "Hand",
    pot: "POT",
    blind: "Blind",
    raise: "Raise",
    check: "Check",
    call: "Call",
    fold: "Fold",
    allin: "All-in",
    thinking: "Thinking...",
    showdownTitle: "Showdown!",
    eliminated: "Eliminated",
    heroEliminated: "You have been eliminated.",
    tournamentEnd: "Tournament End",
    congrats: "Champion: Player!",
    newGame: "New Game",
    rematch: "Rematch",
    mainMenu: "Main Menu",
    champion: "Champion",
    rank: "Rank",
    confirmNewGame: "Start a new game? History will be kept.",
    blindUp: "Blinds Raised!",
    ecoMode: "Ultra Eco (Battery Saver)",
    ecoDesc: "Disables all animations & shading effects to achieve ultra-low power consumption"
  }
};

// Raw Preflop win-rates for 2-max, 3-max, 4-max, 5-max, 6-max
const PF_RAW = "AA:85,73,64,56,50;KK:82,69,59,51,45;QQ:80,65,54,46,40;JJ:77,61,50,41,36;TT:75,57,45,37,32;99:72,53,41,33,28;88:69,49,37,29,24;77:66,45,33,25,20;66:63,41,29,21,17;55:60,38,26,18,14;44:57,35,23,15,12;33:54,32,20,13,10;22:50,29,17,11,8;AKs:67,50,40,34,30;AQs:66,48,38,32,28;AJs:65,47,37,30,26;ATs:64,45,35,28,24;A9s:62,42,32,25,21;A8s:61,41,30,23,19;A7s:60,40,29,22,18;A6s:59,39,28,21,17;A5s:60,40,29,23,18;A4s:59,39,28,22,17;A3s:58,38,27,21,16;A2s:57,37,26,20,15;AKo:65,47,37,31,26;AQo:64,45,35,29,24;AJo:63,43,33,27,22;ATo:61,41,31,25,20;A9o:59,38,28,21,17;A8o:58,36,26,19,15;A7o:57,35,25,18,14;A6o:56,34,23,17,13;A5o:56,34,24,18,14;A4o:55,33,23,17,13;A3o:54,32,22,16,12;A2o:53,31,21,15,11;KQs:63,45,35,29,25;KJs:62,43,33,27,23;KTs:61,42,32,26,21;K9s:59,39,29,23,19;K8s:57,37,27,20,16;K7s:56,36,25,19,15;K6s:55,35,24,18,14;K5s:55,35,24,18,14;K4s:54,33,23,16,13;K3s:53,32,22,15,12;K2s:52,31,21,14,11;KQo:60,41,31,25,21;KJo:59,39,29,23,19;KTo:57,38,28,22,17;K9o:55,35,25,19,15;K8o:53,32,22,16,12;K7o:52,31,21,15,11;K6o:51,30,20,14,10;K5o:50,29,19,13,9;K4o:49,28,18,12,8;K3o:48,27,17,11,8;K2o:47,26,16,10,7;QJs:60,41,31,25,21;QTs:59,40,30,24,19;Q9s:57,37,27,21,17;Q8s:55,34,24,18,14;Q7s:53,32,22,16,12;Q6s:52,31,21,15,11;Q5s:51,30,20,14,10;Q4s:50,29,19,13,9;Q3s:49,28,18,12,9;Q2s:48,27,17,11,8;QJo:57,37,27,21,17;QTo:55,35,25,19,15;Q9o:53,32,22,16,12;Q8o:51,29,19,13,10;Q7o:49,27,17,11,8;Q6o:48,26,16,10,7;Q5o:47,25,15,9,6;Q4o:46,24,14,8,6;Q3o:45,23,13,8,5;Q2o:44,22,12,7,5;JTs:57,38,28,22,18;J9s:55,35,25,19,15;J8s:53,33,23,17,13;J7s:51,30,20,14,10;J6s:49,28,18,12,9;J5s:48,27,17,11,8;J4s:47,26,16,10,7;J3s:46,25,15,9,6;J2s:45,24,14,8,6;JTo:53,34,24,18,14;J9o:51,31,21,15,11;J8o:49,29,19,13,9;J7o:47,26,16,10,7;J6o:45,24,14,8,5;J5o:44,23,13,7,5;J4o:43,22,12,6,4;J3o:42,21,11,6,4;J2o:41,20,10,5,3;T9s:54,35,25,19,15;T8s:52,32,22,16,12;T7s:50,29,19,13,9;T6s:48,27,17,11,8;T5s:46,25,15,9,6;T4s:45,24,14,8,5;T3s:44,23,13,7,5;T2s:43,22,12,6,4;T9o:50,31,21,15,11;T8o:48,28,18,12,9;T7o:46,25,15,9,6;T6o:44,23,13,7,5;T5o:42,21,11,5,4;T4o:41,20,10,5,3;T3o:40,19,9,4,3;T2o:39,18,8,4,3;98s:51,32,22,16,12;97s:49,29,19,13,9;96s:47,26,16,10,7;95s:45,24,14,8,5;94s:43,22,12,6,4;93s:42,21,11,5,3;92s:41,20,10,5,3;98o:47,28,18,12,9;97o:45,25,15,9,6;96o:43,22,12,6,4;95o:41,20,10,5,3;94o:39,18,8,4,2;93o:38,17,7,3,2;92o:37,16,6,3,2;87s:48,29,19,13,10;86s:46,26,16,10,7;85s:44,24,14,8,5;84s:42,21,11,5,3;83s:40,19,9,4,3;82s:39,18,8,4,2;87o:44,25,15,9,6;86o:42,22,12,6,4;85o:40,19,9,5,3;84o:38,17,7,3,2;83o:36,15,5,2,1;82o:35,14,4,2,1;76s:45,26,16,11,8;75s:43,23,13,8,5;74s:41,21,11,5,3;73s:39,18,8,4,2;72s:37,16,6,3,2;76o:41,22,12,7,5;75o:39,19,9,4,3;74o:37,16,6,3,2;73o:35,14,4,2,1;72o:32,12,3,1,1;65s:42,23,13,8,5;64s:40,20,10,5,3;63s:38,18,8,4,2;62s:36,16,6,3,1;65o:38,19,9,5,3;64o:36,16,6,3,2;63o:34,14,4,2,1;62o:31,11,2,1,1;54s:40,21,11,6,4;53s:38,18,8,4,2;52s:36,16,6,3,1;54o:36,17,7,4,2;53o:33,14,4,2,1;52o:31,11,2,1,1;43s:37,17,8,4,2;42s:35,15,5,3,1;43o:33,13,4,2,1;42o:30,11,2,1,1;32s:34,14,5,3,1;32o:29,10,1,1,1";

const PF_PROBS = {};
PF_RAW.split(";").forEach(item => {
  const [hand, vals] = item.split(":");
  PF_PROBS[hand] = vals.split(",").map(Number);
});

// Card suit-to-char mapping & WPT standard 4-color layout symbols
// Spade: black (represented as white or gray), Club: green, Diamond: blue, Heart: red
const SUIT_SYMBOL = { S: "♠", H: "♥", D: "♦", C: "♣" };
const SUIT_CLASS = { S: "suit-spade", H: "suit-heart", D: "suit-diamond", C: "suit-club" };

/**
 * Retrieve country flag image natively, using standard unicode flag emoji directly to avoid external requests
 */
function getFlagHtml(flag, forClass = "w-4.5 h-3") {
  return `<span class="inline-block align-middle select-none text-[11px] leading-none shrink-0" style="margin-right: 2px;">${flag || "👤"}</span>`;
}

// CPU Natural Names pool
const CPU_NAME_POOL = [
  { name: "Darren Elias", flag: "🇺🇸" },
  { name: "Gus Hansen", flag: "🇩🇰" },
  { name: "Carlos Mortensen", flag: "🇪🇸" },
  { name: "Anthony Zinno", flag: "🇺🇸" },
  { name: "Brian Altman", flag: "🇺🇸" },
  { name: "David Rheem", flag: "🇺🇸" },
  { name: "Daniel Negreanu", flag: "🇨🇦" },
  { name: "Erick Lindgren", flag: "🇺🇸" },
  { name: "Howard Lederer", flag: "🇺🇸" },
  { name: "Michael Mizrachi", flag: "🇺🇸" },
  { name: "J. C. Tran", flag: "🇺🇸" },
  { name: "Jonathan Little", flag: "🇺🇸" },
  { name: "Matt Waxman", flag: "🇨🇦" },
  { name: "David Williams", flag: "🇺🇸" }
];

// Local state
let state = {
  currentScreen: "title", // title, settings, history, playerCountSelect, difficultySelect, game
  lang: localStorage.getItem("wpt_lang") === "en" ? "en" : "ja",
  difficulty: localStorage.getItem("wpt_diff") || "normal", // beginner, casual, intermediate, advanced, hard, expert
  ecoMode: localStorage.getItem("wpt_eco_mode") === "true",
  playerCount: 6,
  showShareOverlay: false,
  showWinRatesOverlay: false,
  showProbabilities: true,
  winRatesSearch: "",
  winRatesTypeFilter: "all", // all, pockets, suited, offsuit
  winRatesPlayersCount: "all", // all, 2, 3, 4, 5, 6
  
  // Active Tournament
  tour: {
    handCount: 0,
    sbSize: 50,
    bbSize: 100,
    players: [], // id=0 is Hero
    isHeroActive: true,
    pot: 0,
    community: [],
    stage: "PREFLOP", // PREFLOP, FLOP, TURN, RIVER, SHOWDOWN, RESULT
    dealerIdx: 0,
    sbIdx: 1,
    bbIdx: 2,
    currentRoundMaxBet: 100,
    currentTurnPlayerId: 0,
    lastRaiserId: -1,
    eliminatedLog: [], // Track order: [{ id, name, rank }]
    finished: false
  }
};

/**
 * Main initializer
 */
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
});

function t(key) {
  return TRANSLATIONS[state.lang][key] || key;
}

/**
 * Screen Route Handler & App Renderer
 */
function renderApp() {
  const mount = document.getElementById("app");
  if (!mount) return;

  let html = "";

  switch (state.currentScreen) {
    case "title":
      html = createTitleScreenHtml();
      break;
    case "settings":
      html = createSettingsScreenHtml();
      break;
    case "history":
      html = createHistoryScreenHtml();
      break;
    case "playerCountSelect":
      html = createPlayerCountScreenHtml();
      break;
    case "difficultySelect":
      html = createDifficultySelectScreenHtml();
      break;
    case "game":
      html = createGameScreenHtml();
      break;
  }

  mount.innerHTML = html;
  if (state.ecoMode) {
    document.body.classList.add("eco-mode");
    mount.classList.add("eco-mode");
  } else {
    document.body.classList.remove("eco-mode");
    mount.classList.remove("eco-mode");
  }
  bindEvents();
}

/**
 * TITLE SCREEN
 */
function createTitleScreenHtml() {
  const currentUrl = window.location.href;
  const qrCodeUrl = `./src/assets/images/app_qr_code_1780764264715.png`;

  let shareOverlayHtml = "";
  if (state.showShareOverlay) {
    shareOverlayHtml = `
      <div class="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-6 z-50 animate-fade-in">
        <div class="bg-[#0f0f0f] border border-amber-500/30 rounded-2xl p-6 w-full max-w-xs text-center shadow-[0_0_30px_rgba(245,158,11,0.15)] relative">
          <!-- Close Button -->
          <button id="btn-close-share" class="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors p-1" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div class="text-xs tracking-wider text-amber-500 font-extrabold uppercase mb-1">SCAN TO PLAY</div>
          <div class="text-[10px] text-neutral-400 mb-4 font-mono">Share this tournament with friends</div>
          
          <!-- QR Code Container -->
          <div class="bg-white p-3 rounded-xl inline-block shadow-lg mb-4">
            <img src="${qrCodeUrl}" alt="App QR Code" class="w-40 h-40 aspect-square object-contain mx-auto" referrerPolicy="no-referrer" />
          </div>
          
          <!-- Copy Link Section -->
          <div class="flex items-center gap-1.5 bg-neutral-950/80 border border-neutral-800 rounded-lg p-1.5 pl-2.5 mb-1 text-left">
            <input type="text" readonly value="${currentUrl}" id="share-url-input" class="bg-transparent text-[10px] font-mono text-neutral-300 flex-1 outline-none pointer-events-auto select-all" />
            <button id="btn-copy-url" class="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9px] font-extrabold px-2.5 py-1 rounded transition-colors select-none">
              COPY
            </button>
          </div>
          <span id="copy-status" class="text-[9px] text-emerald-400 font-bold opacity-0 transition-opacity">Copied successfully!</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="flex-1 flex flex-col justify-between p-6 relative fade-in">
      <!-- Share Button -->
      <button id="btn-share" class="absolute top-4 right-4 bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-150 shadow-lg text-amber-500 hover:text-amber-400 z-10 animate-fade-in" title="Share App">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      </button>

      <div class="flex-1 flex flex-col justify-center items-center text-center">
        <!-- WPT TV Show Inspired Elegant Logo Stack -->
        <div class="relative mb-2">
          <div class="text-[10px] tracking-[0.3em] font-semibold text-amber-500 font-display">WORLD POKER CHAMPIONS</div>
          <div class="absolute -top-1 -bottom-1 -left-4 -right-4 border-y border-amber-500/20"></div>
        </div>
        <h1 class="text-4xl font-extrabold tracking-tighter text-neutral-100 font-display mt-2">
          WPT <span class="text-amber-500">HOLD'EM</span>
        </h1>
        <div class="text-xs text-neutral-500 tracking-widest font-mono mt-1">TOURNAMENT SPEED-SIM</div>
      </div>

      <div class="flex flex-col gap-3.5 mb-12">
        <button id="btn-start" class="btn-wpt-gold py-4 px-6 rounded-lg text-sm tracking-wider font-semibold active:scale-98 transition-transform">
          ${t("start")}
        </button>
        <button id="btn-settings" class="btn-wpt-dark py-3 px-6 rounded-lg text-sm tracking-wide font-medium active:scale-98 transition-transform">
          ${t("settings")}
        </button>
        <button id="btn-history" class="btn-wpt-dark py-3 px-6 rounded-lg text-sm tracking-wide font-medium active:scale-98 transition-transform">
          ${t("historyButton")}
        </button>
      </div>

      <div class="text-center text-[10px] text-neutral-600 font-mono flex flex-col items-center justify-center gap-1">
        <div>PORTABLE FLOP WORKOUT ENGINE</div>
        ${state.ecoMode ? `<div class="text-emerald-500 font-bold bg-emerald-950/40 px-2 py-0.5 mt-0.5 rounded border border-emerald-900/30 text-[9px] tracking-wider select-none">🌱 ${t("ecoMode")} ON</div>` : ""}
      </div>

      <!-- share overlay dialog -->
      ${shareOverlayHtml}
    </div>
  `;
}

/**
 * SETTINGS SCREEN
 */
function createSettingsScreenHtml() {
  return `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in">
      <div>
        <div class="flex items-center justify-between mb-8 pb-3 border-b border-neutral-900">
          <h2 class="text-lg font-bold font-display text-neutral-200">${t("settings")}</h2>
          <button id="btn-settings-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white">
            ${t("back")}
          </button>
        </div>

        <!-- Language Settings -->
        <div class="mb-6">
          <label class="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2.5 font-mono">
            ${t("language")}
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button id="lang-ja" class="py-2.5 px-4 text-xs font-medium rounded-lg border ${state.lang === "ja" ? "border-amber-500 text-amber-500 bg-amber-500/5" : "border-neutral-800 text-neutral-400"}" onclick="changeLanguage('ja')">
              日本語
            </button>
            <button id="lang-en" class="py-2.5 px-4 text-xs font-medium rounded-lg border ${state.lang === "en" ? "border-amber-500 text-amber-500 bg-amber-500/5" : "border-neutral-800 text-neutral-400"}" onclick="changeLanguage('en')">
              English
            </button>
          </div>
        </div>

        <!-- Eco Mode Option -->
        <div class="mt-6">
          <label class="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2.5 font-mono flex items-center gap-1.5">
            <span>🌱 ${t("ecoMode")}</span>
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button class="py-2.5 px-4 text-xs font-semibold rounded-lg border text-left flex justify-between items-center ${state.ecoMode ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-neutral-800 text-neutral-400"}" onclick="toggleEcoMode(true)">
              <span>ON (省電力)</span>
              ${state.ecoMode ? `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>` : ""}
            </button>
            <button class="py-2.5 px-4 text-xs font-semibold rounded-lg border text-left flex justify-between items-center ${!state.ecoMode ? "border-neutral-700 text-neutral-200 bg-neutral-900" : "border-neutral-800 text-neutral-400"}" onclick="toggleEcoMode(false)">
              <span>OFF (通常)</span>
              ${!state.ecoMode ? `<span class="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>` : ""}
            </button>
          </div>
          <div class="text-[10px] text-neutral-500 mt-2.5 leading-relaxed font-sans">
            ${t("ecoDesc")}
          </div>
        </div>
      </div>

      <div class="text-[10px] text-neutral-600 font-mono text-center uppercase tracking-widest font-bold">
        WPT Poker Tournament
      </div>
    </div>
  `;
}

/**
 * HISTORY SCREEN
 */
function createHistoryScreenHtml() {
  const history = getHistory();
  return `
    <div class="flex-1 flex flex-col p-6 fade-in overflow-hidden h-full">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-neutral-900 flex-shrink-0">
        <h2 class="text-lg font-bold font-display text-neutral-200">${t("handHistory")}</h2>
        <div class="flex items-center gap-2">
          ${history.length > 0 ? `
            <button id="btn-copy-history" class="text-[10px] bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold py-1.5 px-3 rounded shadow transition-colors flex items-center gap-1 cursor-pointer">
              COPY RESULTS
            </button>
          ` : ""}
          <button id="btn-history-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white">
            ${t("back")}
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto pr-0.5 space-y-2">
        ${history.length === 0 ? `
          <div class="text-neutral-500 text-xs text-center py-12">${t("noHistory")}</div>
        ` : history.map((h, i) => {
          const isWin = h.result === "Win";
          return `
            <div class="p-3 bg-neutral-900/60 rounded-lg border border-neutral-900/80 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-display font-semibold text-neutral-200 text-sm tracking-wider">${h.hand}</span>
                  <span class="font-mono text-[9px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">${h.playersCount}-max</span>
                </div>
                <div class="text-[10px] text-neutral-500 mt-1 font-mono">
                  ${t("expectedWin")}: <span class="text-neutral-300 font-semibold">${h.expectedRate}%</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-semibold px-2 py-0.5 rounded ${isWin ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40" : "bg-neutral-950/60 text-neutral-500 border border-neutral-900"}">
                  ${isWin ? t("win") : t("lose")}
                </span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/**
 * Renders a card as a standard playing card
 */
function renderStandardPlayingCard(card, extraClasses = "") {
  if (!card) return "";
  const cls = SUIT_CLASS[card.suit];
  const sym = SUIT_SYMBOL[card.suit];
  return `
    <div class="wpt-card relative bg-white border border-neutral-300 rounded shadow-md text-black flex flex-col justify-between p-1 select-none ${extraClasses}">
      <!-- Top-left tiny rank and suit -->
      <div class="flex flex-col items-center leading-none self-start">
        <span class="text-[9px] font-extrabold uppercase leading-none grow-0">${card.rankLabel}</span>
        <span class="${cls} text-[8px] leading-none -mt-0.5 grow-0">${sym}</span>
      </div>
      
      <!-- Center big suit symbol -->
      <div class="${cls} text-lg leading-none self-center -mt-1 scale-110 grow">${sym}</div>
      
      <!-- Bottom-right tiny rank and suit (inverted) -->
      <div class="flex flex-col items-center leading-none self-end transform rotate-180 grow-0">
        <span class="text-[9px] font-extrabold uppercase leading-none">${card.rankLabel}</span>
        <span class="${cls} text-[8px] leading-none -mt-0.5">${sym}</span>
      </div>
    </div>
  `;
}

/**
 * Renders a miniature seat-hole card in standard design
 */
function renderMiniPlayingCard(card) {
  if (!card) return "";
  const cls = SUIT_CLASS[card.suit];
  const sym = SUIT_SYMBOL[card.suit];
  return `
    <div class="w-[20px] h-[28px] bg-white rounded border border-neutral-300 text-black flex flex-col justify-between p-0.5 font-bold shadow-sm select-none relative">
      <div class="text-[7.5px] font-extrabold leading-none self-start">${card.rankLabel}</div>
      <div class="${cls} text-[10px] leading-none self-center -mt-0.5">${sym}</div>
      <div class="text-[7.5px] font-extrabold leading-none self-end transform rotate-180">${card.rankLabel}</div>
    </div>
  `;
}

/**
 * Render the intermediate select difficulty screen
 */
function createDifficultySelectScreenHtml() {
  const difficulties = [
    { key: "beginner", num: 1, name: t("beginner"), desc: state.lang === "ja" ? "ルースパッシブ、ミス多め" : "Loose-passive, makes frequent mistakes" },
    { key: "casual", num: 2, name: state.lang === "ja" ? "カジュアル (一般)" : "Level 2 — Casual", desc: state.lang === "ja" ? "家庭的なゲームスタイル、ドロー追い" : "Recreational, chases draws, soft sizing" },
    { key: "intermediate", num: 3, name: state.lang === "ja" ? "インターミディエイト" : "Level 3 — Intermediate", desc: state.lang === "ja" ? "基本を理解、オッズ考慮" : "Understands basics, values pot odds" },
    { key: "advanced", num: 4, name: state.lang === "ja" ? "アドバンスド" : "Level 4 — Advanced", desc: state.lang === "ja" ? "観察力のある、戦略的なアグレッシブ" : "Observant, controlled aggression" },
    { key: "hard", num: 5, name: t("hard"), desc: state.lang === "ja" ? "規律正しく、高度なフォールド判断" : "Disciplined, strong value and fold logic" },
    { key: "expert", num: 6, name: state.lang === "ja" ? "世界級エキスパート" : "World-Class Expert", desc: state.lang === "ja" ? "プロレベル、長期EV最大化" : "Professional, EV-focused mixed frequencies" }
  ];

  return `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in relative overflow-y-auto h-full">
      <div>
        <div class="flex items-center justify-between mb-6 pb-3 border-b border-neutral-900">
          <h2 class="text-[11px] font-bold font-display text-neutral-200 uppercase tracking-widest">${state.lang === "ja" ? "AI難易度の選択" : "Select AI Difficulty"}</h2>
          <button id="btn-diff-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white" onclick="changeScreen('playerCountSelect')">
            ${t("back")}
          </button>
        </div>

        <p class="text-xs text-neutral-400 mb-5 font-medium leading-relaxed">
          ${state.lang === "ja" ? "対戦相手のAIの強さを選んでゲームを開始します" : "Choose the skill level of your AI opponents to start the tournament."}
        </p>

        <div class="flex flex-col gap-2.5 mb-6">
          ${difficulties.map(diff => {
            const active = state.difficulty === diff.key || (state.difficulty === "normal" && diff.key === "casual") || (state.difficulty === "pro" && diff.key === "expert");
            return `
              <button class="py-3 px-4 bg-[#0a0a0a] border ${active ? "border-amber-500 bg-amber-500/5 text-amber-500" : "border-neutral-900 text-neutral-300"} rounded-lg font-display hover:border-amber-500/50 transition-all text-left flex items-center justify-between cursor-pointer" onclick="confirmDifficultyAndStart('${diff.key}')">
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-bold flex items-center gap-1.5">
                    <span class="text-[9px] text-amber-500 font-mono font-black border border-amber-500/30 px-1 py-0.5 rounded leading-none">LV.${diff.num}</span>
                    <span class="text-xs tracking-wider">${diff.name}</span>
                  </div>
                  <div class="text-[9px] text-neutral-500 truncate mt-1.5">${diff.desc}</div>
                </div>
                <div class="w-5 h-5 rounded-full border border-neutral-850 flex items-center justify-center shrink-0 ${active ? "bg-amber-500 border-amber-500 text-neutral-950" : ""}">
                  ${active ? `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="text-[10px] text-neutral-600 font-mono text-center tracking-widest mt-4">
        WPT STANDARD BRACKET RUNNER
      </div>
    </div>
  `;
}

window.changeScreen = function(screen) {
  state.currentScreen = screen;
  renderApp();
};

window.confirmDifficultyAndStart = function(diff) {
  state.difficulty = diff;
  localStorage.setItem("wpt_diff", diff);
  startTournamentWith(state.playerCount);
};

window.selectPlayerCount = function(count) {
  state.playerCount = count;
  state.currentScreen = "difficultySelect";
  renderApp();
};

window.toggleProbabilities = function() {
  state.showProbabilities = !state.showProbabilities;
  renderApp();
};

/**
 * Detects draws post-flop
 */
function detectPostflopDraws(cards) {
  const suits = { S: 0, H: 0, D: 0, C: 0 };
  cards.forEach(c => suits[c.suit]++);
  const hasFlushDraw = Object.values(suits).some(v => v === 4);
  
  const uniqueRanks = [...new Set(cards.map(c => c.rank))].sort((a,b) => a - b);
  let hasStraightDraw = false;
  if (uniqueRanks.length >= 4) {
    for (let i = 0; i <= uniqueRanks.length - 4; i++) {
      if (uniqueRanks[i+3] - uniqueRanks[i] === 3 || uniqueRanks[i+3] - uniqueRanks[i] === 4) {
        hasStraightDraw = true;
        break;
      }
    }
  }
  return { hasFlushDraw, hasStraightDraw };
}

/**
 * Returns player position status
 */
function getPlayerPositionStatus(p) {
  const tour = state.tour;
  if (tour.dealerIdx === p.id) return "late";
  if (tour.sbIdx === p.id || tour.bbIdx === p.id) return "early";
  return "middle";
}

/**
 * Estimate opponent strength based on current round actions
 */
function estimateOpponentStrength(opp) {
  let est = 40;
  if (!opp.actedThisRound) return est;
  
  if (opp.actionText && opp.actionText.includes(t("raise"))) {
    est = 75;
  } else if (opp.actionText === t("allin")) {
    est = 90;
  } else if (opp.actionText === t("call")) {
    est = 55;
  } else if (opp.actionText === t("check")) {
    est = 35;
  }
  return est;
}

/**
 * WIN RATES TABLE OVERLAY
 */
function getPreflopWinRate(handKey, P) {
  const probs = PF_PROBS[handKey];
  if (!probs) return 0;
  if (P <= 6) {
    return (probs[P - 2] !== undefined) ? probs[P - 2] : 0;
  }
  const val6 = (probs[4] !== undefined) ? probs[4] : 15;
  if (P === 7) {
    return Math.max(1, Math.round(val6 * 0.90));
  } else if (P === 8) {
    return Math.max(1, Math.round(val6 * 0.82));
  } else if (P === 9) {
    return Math.max(1, Math.round(val6 * 0.75));
  }
  return 0;
}

function renderSingleMatrixGrid(P) {
  const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  
  // Dynamic top 40 calculations for this table (P)
  const allCombinations = [];
  for (let r = 0; r < RANKS.length; r++) {
    for (let c = 0; c < RANKS.length; c++) {
      let key = "";
      if (r === c) {
        key = RANKS[r] + RANKS[r];
      } else if (r < c) {
        key = RANKS[r] + RANKS[c] + "s";
      } else {
        key = RANKS[c] + RANKS[r] + "o";
      }
      const val = getPreflopWinRate(key, P);
      allCombinations.push({ key, val });
    }
  }
  allCombinations.sort((a, b) => b.val - a.val);
  const top40Set = new Set(allCombinations.slice(0, 40).map(item => item.key));

  // Header row: blank top-left corner, then A to 2 labels
  let colHeadersHtml = `
    <tr class="bg-neutral-900 border-b border-neutral-800 text-[8px] font-bold select-none text-center">
      <th class="p-0 border border-neutral-850 bg-neutral-950 font-display font-black text-amber-500 w-[17.5px] h-[17.5px] flex-shrink-0 text-center leading-none text-[8px]">
        ${P}P
      </th>
      ${RANKS.map(col => `
        <th class="p-0 border border-neutral-850 text-amber-500 w-[17.5px] h-[17.5px] font-extrabold text-center leading-none text-[8px]">
          ${col}
        </th>
      `).join("")}
    </tr>
  `;

  let rowsHtml = "";
  for (let r = 0; r < RANKS.length; r++) {
    const rowRank = RANKS[r];
    
    // Start row with vertical label (A down to 2)
    let cellsHtml = `
      <td class="p-0 bg-neutral-950 border border-neutral-850 text-amber-500 font-extrabold text-[8px] text-center w-[17.5px] h-[17.5px] select-none leading-none">
        ${rowRank}
      </td>
    `;

    for (let c = 0; c < RANKS.length; c++) {
      const colRank = RANKS[c];
      let handKey = "";
      let isSuited = false;

      if (r === c) {
        handKey = rowRank + rowRank;
      } else if (r < c) {
        // Upper-right side: Suited
        handKey = rowRank + colRank + "s";
        isSuited = true;
      } else {
        // Lower-left side: Offsuit
        handKey = colRank + rowRank + "o";
      }

      const val = getPreflopWinRate(handKey, P);
      const isTop40 = top40Set.has(handKey);

      // Color backgrounds based on value and hands type
      let cellBg = "";
      let borderStyle = "border-neutral-900";
      let textClass = "";

      if (isTop40) {
        textClass = "text-emerald-400 font-extrabold animate-pulse-slow";
      } else {
        textClass = "text-neutral-300";
      }

      if (isSuited) {
        cellBg = "bg-neutral-900/30";
        borderStyle = "border-neutral-850/40";
      } else {
        cellBg = "bg-neutral-900/15";
        borderStyle = "border-neutral-850/20";
      }

      cellsHtml += `
        <td class="p-0 text-center border ${borderStyle} ${cellBg} w-[17.5px] h-[17.5px]" title="${handKey}: ${val}%">
          <div class="leading-none flex flex-col justify-center items-center h-full">
            <span class="text-[4px] opacity-35 font-mono block tracking-tighter select-none leading-none mb-[1px]">${handKey}</span>
            <span class="text-[6.5px] font-mono leading-none ${textClass}">${val}%</span>
          </div>
        </td>
      `;
    }

    rowsHtml += `
      <tr class="border-b border-neutral-900 leading-none">
        ${cellsHtml}
      </tr>
    `;
  }

  const tableTitle = state.lang === "ja" 
    ? `${P}人プレイ時の勝率表` 
    : `${P}-Player Preflop Win Rate Matrix`;

  return `
    <div class="mb-6 p-3 bg-[#0a0a0a] border border-neutral-900 rounded-xl shadow-xl flex-shrink-0">
      <div class="flex items-center justify-between mb-3.5 select-none">
        <h3 class="text-xs font-black tracking-wider text-neutral-200 uppercase font-display flex items-center gap-1.5 align-middle">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 block animate-pulse"></span>
          ${tableTitle}
        </h3>
        <span class="text-[8px] font-mono font-bold bg-neutral-950 text-neutral-500 uppercase px-2 py-0.5 rounded border border-neutral-850">
          ${P === 2 ? "Heads-Up" : `${P}-Max`}
        </span>
      </div>

      <!-- Compact Matrix Table -->
      <div class="w-full rounded-lg border border-neutral-900 bg-[#040404] flex justify-center py-1.5 overflow-x-auto">
        <table class="text-[8px] border-collapse" style="max-width: 100%; width: 245px;">
          <thead>
            ${colHeadersHtml}
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * WIN RATES TABLE OVERLAY
 */
function createWinRatesOverlayHtml() {
  if (!state.showWinRatesOverlay) return "";

  const availableFilters = [
    { id: "all", ja: "全テーブル", en: "All Tables" },
    { id: 2, ja: "2人 (2P)", en: "2 Players" },
    { id: 3, ja: "3人 (3P)", en: "3 Players" },
    { id: 4, ja: "4人 (4P)", en: "4 Players" },
    { id: 5, ja: "5人 (5P)", en: "5 Players" },
    { id: 6, ja: "6人 (6P)", en: "6 Players" },
    { id: 7, ja: "7人 (7P)", en: "7 Players" },
    { id: 8, ja: "8人 (8P)", en: "8 Players" },
    { id: 9, ja: "9人 (9P)", en: "9 Players" }
  ];

  // Compile active grids
  let gridsHtml = "";
  if (state.winRatesPlayersCount === "all") {
    gridsHtml = [2, 3, 4, 5, 6, 7, 8, 9].map(count => renderSingleMatrixGrid(count)).join("");
  } else {
    gridsHtml = renderSingleMatrixGrid(Number(state.winRatesPlayersCount));
  }

  return `
    <div id="win-rates-overlay" class="absolute inset-0 bg-neutral-950 flex flex-col p-6 z-50 animate-fade-in text-neutral-200">
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-neutral-900 flex-shrink-0">
        <div>
          <h2 class="text-sm font-black tracking-wider text-amber-500 uppercase font-display">${state.lang === "ja" ? "人数別プリフロップ勝率一覧" : "Preflop Win Rates by Player Count"}</h2>
          <p class="text-[9px] text-neutral-500 font-mono mt-0.5">${state.lang === "ja" ? "2人〜9人のスターティングハンド勝率マトリクス" : "Preflop win probabilities grids for 2 to 9 players"}</p>
        </div>
        <button id="btn-close-win-rates" class="text-xs text-neutral-400 font-medium bg-neutral-900 hover:bg-neutral-850 py-1.5 px-3 rounded-md hover:text-white transition-colors">
          ${t("back")}
        </button>
      </div>

      <!-- TABS SELECTOR -->
      <div class="flex-shrink-0 mb-4 bg-neutral-900/50 p-1.5 rounded-lg border border-neutral-900">
        <div class="flex flex-wrap gap-1 justify-center max-h-[85px] overflow-y-auto w-full">
          ${availableFilters.map(tab => {
            const label = state.lang === "ja" ? tab.ja : tab.en;
            const active = state.winRatesPlayersCount === tab.id || (state.winRatesPlayersCount === "all" && tab.id === "all");
            return `
              <button 
                class="text-[7.5px] py-1 px-1.5 rounded font-black font-sans transition-colors tracking-tight ${active ? "bg-amber-500 text-neutral-950 font-bold" : "text-neutral-400 hover:text-neutral-200 bg-neutral-950/50"}"
                onclick="window.handleWinRatesPlayerTab('${tab.id}')"
              >
                ${label}
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <!-- LEGEND / INFORMATION BAR -->
      <div class="flex-shrink-0 mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-900 text-[9px] select-none font-mono text-center">
        <div class="flex items-center gap-1.5">
          <span class="w-3.5 h-3.5 rounded bg-neutral-900/30 border border-neutral-850/40 inline-block shrink-0"></span>
          <span class="text-neutral-300 font-semibold">${state.lang === "ja" ? "右上: スーテッド" : "Upper-Right: Suited"}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3.5 h-3.5 rounded bg-neutral-900/15 border border-neutral-850/20 inline-block shrink-0"></span>
          <span class="text-neutral-300 font-semibold">${state.lang === "ja" ? "左下: オフスーツ" : "Lower-Left: Offsuit"}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-emerald-400 font-black text-xs shrink-0">●</span>
          <span class="text-emerald-400 font-bold">${state.lang === "ja" ? "緑字: 各テーブルの上位40ハンド" : "Green: Top 40 Win Rates"}</span>
        </div>
      </div>

      <!-- PREFLOP WIN RATE GRIDS CONTAINER -->
      <div class="flex-1 overflow-y-auto pr-1 min-h-0">
        ${gridsHtml}
      </div>

      <div class="text-[9px] text-neutral-600 font-mono text-center mt-3 select-none flex-shrink-0">
        ${state.lang === "ja" ? "※表示される勝率は、全員が最後までフォールドせずにショーダウンした場合の期待勝率です" : "*Scores indicate percentage likelihood of winning at showdown"}
      </div>
    </div>
  `;
}

/**
 * PLAYER COUNT SELECT SCREEN
 */
function createPlayerCountScreenHtml() {
  const winRatesOverlayHtml = createWinRatesOverlayHtml();
  return `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in relative">
      <div>
        <div class="flex items-center justify-between mb-6 pb-3 border-b border-neutral-900">
          <h2 class="text-lg font-bold font-display text-neutral-200">${t("start")}</h2>
          <button id="btn-count-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white">
            ${t("back")}
          </button>
        </div>

        <p class="text-xs text-neutral-400 mb-4 font-medium">${t("selectPlayersCount")}</p>

        <div class="grid grid-cols-1 gap-1.5 mb-6 max-h-[290px] overflow-y-auto pr-1">
          ${[2, 3, 4, 5, 6, 7, 8, 9].map(count => {
            const desc = count === 2 
              ? "Heads-Up" 
              : count === 6 
                ? "6-Max Tournament" 
                : count === 9 
                  ? "9-Max Full Ring Tournament" 
                  : `${count}-Max Tournament`;
            return `
              <button class="py-2 px-3 bg-neutral-900 border border-neutral-800 rounded-lg font-display font-semibold hover:border-amber-500/50 hover:text-amber-500 text-neutral-200 transition-colors flex items-center justify-between" onclick="selectPlayerCount(${count})">
                <span class="text-sm font-extrabold">${count}-Max</span>
                <span class="text-[9px] text-neutral-500 font-mono">${desc}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- VIEW WIN RATES BY NUMBER OF PLAYERS BUTTON -->
        <button id="btn-view-win-rates" class="w-full py-3 px-4 bg-neutral-900 border border-neutral-850 hover:border-amber-500/30 text-amber-500 hover:text-amber-400 font-bold rounded-lg text-xs tracking-wider transition-colors uppercase font-mono flex items-center justify-center gap-2">
          <svg class="lucide lucide-bar-chart-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          ${t("viewWinRates")}
        </button>
      </div>

      <div class="text-[10px] text-neutral-600 font-mono text-center">
        WPT STANDARD BRACKET SPEEDRUN
      </div>

      <!-- overlay dialog -->
      ${winRatesOverlayHtml}
    </div>
  `;
}

/**
 * GAME PLAY SCREEN html scaffold
 */
function createGameScreenHtml() {
  const tour = state.tour;
  const activePlayers = tour.players.filter(p => p.isActive);
  
  // Calculate pot size
  let displayPot = tour.pot;
  // include current bets on the table that are not yet swept to main pot
  tour.players.forEach(p => { displayPot += p.totalBet; });

  return `
    <div class="flex-1 flex flex-col justify-between h-full relative text-neutral-200">
      <!-- HEADERBAR -->
      <div class="bg-[#111] px-4 py-2.5 border-b border-[#222] flex justify-between items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0 z-10 select-none">
        <div class="flex items-center gap-2">
          <span>WPT WORLD TOUR</span>
          <span class="text-neutral-500 font-mono font-medium">H-${tour.handCount}</span>
          ${state.ecoMode ? `<span class="text-emerald-500 text-[8px] bg-emerald-950/40 px-1 rounded-sm border border-emerald-900/40 font-black leading-none py-0.5">ECO</span>` : ""}
        </div>
        <div class="flex items-center gap-3">
          <div class="text-amber-500">LEVEL ${Math.floor(tour.handCount / 5) + 1}: ${tour.sbSize} / ${tour.bbSize}</div>
          <button id="btn-quit" class="text-[9px] text-neutral-500 hover:text-neutral-300 font-mono border border-neutral-800 bg-[#0a0a0a] px-1.5 py-0.5 rounded tracking-normal normal-case">
            QUIT
          </button>
        </div>
      </div>

      <!-- TABLE AREA CONTAINER -->
      <div class="flex-1 relative flex flex-col justify-center my-3 max-h-[355px] min-h-[280px] select-none px-2">
        <div id="wpt-table-felt" class="wpt-poker-table-outer w-full h-[265px] flex flex-col justify-center items-center relative">
          <!-- Decorative interior oval line -->
          <div class="absolute inset-[24px] border border-neutral-900/10 rounded-[90px] pointer-events-none"></div>

          <!-- POT / CHIPS AREA -->
          ${(() => {
            if (tour.handWinners && tour.handWinners.length > 0 && tour.stage === "RESULT") {
              const winnerNames = tour.handWinners.map(w => `<span class="inline-flex items-center gap-1">${getFlagHtml(w.flag, "w-4 h-2.5")} <span>${w.isHero ? "Player" : w.name}</span></span>`).join(" & ");
              const wonAmt = tour.handWinners.reduce((sum, w) => sum + w.wonAmount, 0);
              const handName = tour.handWinners[0].handName;
              return `
                <div id="table-winner-display" class="absolute inset-x-8 top-[15%] flex flex-col items-center justify-center text-center z-12 bg-black/90 border border-amber-500/50 p-2 px-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-fade-in pointer-events-auto">
                  <div class="text-[8px] tracking-widest text-amber-500 font-extrabold uppercase flex items-center gap-1 justify-center">
                    <span>🏆</span>
                    <span>${state.lang === "ja" ? "勝者" : "WINNER"}</span>
                  </div>
                  <div class="text-xs font-black text-white mt-0.5 truncate max-w-full inline-flex flex-wrap items-center justify-center gap-1.5">${winnerNames}</div>
                  <div class="text-sm font-bold text-emerald-400 mt-0.5 font-mono">+$${wonAmt}</div>
                  <div class="text-[9px] text-amber-300 font-medium bg-neutral-900/60 px-1.5 py-0.5 rounded border border-amber-950 mt-1">${handName}</div>
                </div>
              `;
            } else {
              return `
                <div id="table-pot-wrapper" class="absolute top-[28%] text-center z-10">
                  <div class="text-[9px] tracking-widest text-neutral-500 font-bold uppercase">${t("pot")}</div>
                  <div id="pot-amount" class="text-xl font-bold font-mono text-white tracking-tight">$${displayPot}</div>
                </div>
              `;
            }
          })()}

          <!-- COMMUNITY CARDS BAR -->
          <div id="community-area" class="absolute top-[38%] flex items-center justify-center z-10 w-full px-8">
            ${createCommunityCardsHtml()}
          </div>

          <!-- 6 SEATS PLACEMENT INSIDE FELT -->
          <div id="poker-seats-wrapper" class="absolute inset-0 pointer-events-none w-full h-full">
            ${createSeatsHtml()}
          </div>
        </div>
      </div>

      <!-- ACTIONS CONTROL / PLAYER DECK AREA -->
      <div id="player-action-board" class="p-2 flex flex-col gap-1.5 flex-shrink-0 bg-neutral-950 z-25">
        ${createActionsControlHtml()}
        <!-- Bottom branding -->
        <div class="text-center mt-1 select-none">
          <div class="text-[8px] text-neutral-600 font-bold tracking-wider">WPT TRAINER v1.0 • PRE-FLOP FOCUS MODE</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render community cards
 */
function createCommunityCardsHtml() {
  const comm = state.tour.community;
  
  // Flop cards (index 0, 1, 2)
  let flopHtml = "";
  for (let i = 0; i < 3; i++) {
    const card = comm[i];
    if (card) {
      flopHtml += renderStandardPlayingCard(card, "scale-100 select-none animate-deal-comm");
    } else {
      flopHtml += `<div class="w-[34px] h-[50px] border border-dashed border-neutral-800 rounded bg-[#050505]/40 select-none opacity-50 flex items-center justify-center text-[10px] text-neutral-700 font-mono font-bold">F</div>`;
    }
  }

  // Turn & River cards (index 3 and 4)
  let turnRiverHtml = "";
  for (let i = 3; i < 5; i++) {
    const card = comm[i];
    if (card) {
      turnRiverHtml += renderStandardPlayingCard(card, "scale-100 select-none animate-deal-comm");
    } else {
      const label = i === 3 ? "T" : "R";
      turnRiverHtml += `<div class="w-[34px] h-[50px] border border-dashed border-neutral-800 rounded bg-[#050505]/40 select-none opacity-50 flex items-center justify-center text-[10px] text-neutral-700 font-mono font-bold">${label}</div>`;
    }
  }

  return `
    <div class="flex flex-col items-center gap-1.5 w-full">
      <!-- Flop Row -->
      <div class="flex items-center gap-1 justify-center">
        ${flopHtml}
      </div>
      <!-- Turn & River Row -->
      <div class="flex items-center gap-1 justify-center">
        ${turnRiverHtml}
      </div>
    </div>
  `;
}

/**
 * Render player pocket cards directly on their outer felt seats
 */
function renderSeatHoleCards(p) {
  const tour = state.tour;
  if (!p.cards || p.cards.length !== 2 || p.isFolded) {
    return `<div class="h-[28px] mb-1"></div>`; // spacer to maintain structure
  }

  // Hide Hero table-side cards during play as required
  if (p.isHero && tour.stage !== "SHOWDOWN" && tour.stage !== "RESULT") {
    return `<div class="h-[28px] mb-1"></div>`;
  }

  // Show cards face up if stage is SHOWDOWN or RESULT
  const showFaceUp = tour.stage === "SHOWDOWN" || tour.stage === "RESULT";

  if (showFaceUp) {
    const c1 = p.cards[0];
    const c2 = p.cards[1];
    return `
      <div class="flex gap-0.5 mb-1 justify-center select-none animate-fade-in z-20">
        <!-- Card 1 -->
        ${renderMiniPlayingCard(c1)}
        <!-- Card 2 -->
        ${renderMiniPlayingCard(c2)}
      </div>
    `;
  } else {
    // Face down cards for standard streets
    return `
      <div class="flex gap-0.5 mb-1 justify-center select-none opacity-85 animate-fade-in z-20">
        <div class="w-[20px] h-[28px] bg-gradient-to-b from-blue-700 to-blue-900 rounded border border-blue-400/50 shadow-sm flex items-center justify-center text-[7px] font-black text-blue-100 uppercase tracking-tighter select-none">W</div>
        <div class="w-[20px] h-[28px] bg-gradient-to-b from-blue-700 to-blue-900 rounded border border-blue-400/50 shadow-sm flex items-center justify-center text-[7px] font-black text-blue-100 uppercase tracking-tighter select-none">W</div>
      </div>
    `;
  }
}

/**
 * Return real-time confirmed hand description name
 */
function getConfirmedHandName(p) {
  const tour = state.tour;
  if (!p.cards || p.cards.length !== 2) return "";
  const merged = [...p.cards, ...(tour.community || [])];
  if (merged.length < 5) return "";
  
  const combos = getCombinations(merged, 5);
  let bestScore = -1;
  let bestEval = null;
  
  combos.forEach(c => {
    const res = evaluate5CardHand(c);
    if (res.type > bestScore) {
      bestScore = res.type;
      bestEval = res;
    }
  });
  
  return bestEval ? bestEval.typeName : "";
}

/**
 * Render player positions
 */
function getSeatPositions(count) {
  if (count === 2) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Seat 0 (Hero, Bottom)
      { top: "-10px", left: "50%", transform: "translateX(-50%)" }     // Seat 1 (CPU, Top)
    ];
  }
  if (count === 3) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom
      { top: "60px", left: "4px" },                                   // Left
      { top: "60px", right: "4px" }                                   // Right
    ];
  }
  if (count === 4) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom
      { top: "45%", left: "4px", transform: "translateY(-50%)" },      // Left
      { top: "-10px", left: "50%", transform: "translateX(-50%)" },    // Top
      { top: "45%", right: "4px", transform: "translateY(-50%)" }      // Right
    ];
  }
  if (count === 5) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom
      { bottom: "50px", left: "4px" },                                 // Left Lower
      { top: "45px", left: "4px" },                                    // Left Higher
      { top: "45px", right: "4px" },                                   // Right Higher
      { bottom: "50px", right: "4px" }                                 // Right Lower
    ];
  }
  if (count === 6) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom (Hero)
      { bottom: "45px", left: "4px" },                                 // Left Lower
      { top: "45px", left: "4px" },                                    // Left Higher
      { top: "-10px", left: "50%", transform: "translateX(-50%)" },    // Top Central
      { top: "45px", right: "4px" },                                   // Right Higher
      { bottom: "45px", right: "4px" }                                 // Right Lower
    ];
  }
  if (count === 7) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom
      { bottom: "35px", left: "4px" },                                 // Left Lower
      { top: "50px", left: "4px" },                                    // Left Higher
      { top: "-10px", left: "30%", transform: "translateX(-50%)" },    // Top Left
      { top: "-10px", left: "70%", transform: "translateX(-50%)" },    // Top Right
      { top: "50px", right: "4px" },                                   // Right Higher
      { bottom: "35px", right: "4px" }                                 // Right Lower
    ];
  }
  if (count === 8) {
    return [
      { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // Bottom
      { bottom: "30px", left: "4px" },                                 // Left Lower
      { top: "45%", left: "4px", transform: "translateY(-50%)" },      // Left Middle
      { top: "40px", left: "15%" },                                    // Left Higher-ish
      { top: "-10px", left: "50%", transform: "translateX(-50%)" },    // Top Central
      { top: "40px", right: "15%" },                                   // Right Higher-ish
      { top: "45%", right: "4px", transform: "translateY(-50%)" },     // Right Middle
      { bottom: "30px", right: "4px" }                                 // Right Lower
    ];
  }
  // Default and 9 players!
  return [
    { bottom: "-10px", left: "50%", transform: "translateX(-50%)" }, // 0: Bottom
    { bottom: "25px", left: "4px" },                                 // 1: Lower Left
    { top: "45%", left: "4px", transform: "translateY(-50%)" },      // 2: Middle Left
    { top: "25px", left: "12%" },                                    // 3: Upper Left
    { top: "-10px", left: "33%", transform: "translateX(-50%)" },    // 4: Top Left-Center
    { top: "-10px", left: "67%", transform: "translateX(-50%)" },    // 5: Top Right-Center
    { top: "25px", right: "12%" },                                   // 6: Upper Right
    { top: "45%", right: "4px", transform: "translateY(-50%)" },     // 7: Middle Right
    { bottom: "25px", right: "4px" }                                 // 8: Lower Right
  ];
}

/**
 * Render player positions
 */
function createSeatsHtml() {
  const tour = state.tour;
  const positions = getSeatPositions(state.playerCount);

  let html = "";
  
  // Arrange players according to their seatIndex
  for (let p of tour.players) {
    if (!p.isActive) continue; // Deleted if eliminated from tournament completely
    
    const pos = positions[p.seatIndex];
    if (!pos) continue;

    const isCurrentTurn = p.id === tour.currentTurnPlayerId && tour.stage !== "SHOWDOWN" && tour.stage !== "RESULT";
    const actionColorClass = getActionBgColorClass(p.actionColor);
    const hasD = tour.dealerIdx === p.id;
    const hasSB = tour.sbIdx === p.id;
    const hasBB = tour.bbIdx === p.id;

    let btnBadge = "";
    if (hasD) btnBadge = `<div class="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black border border-black shadow-lg select-none z-10">D</div>`;
    else if (hasSB) btnBadge = `<div class="absolute -top-1.5 -right-1.5 bg-gray-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black shadow-lg select-none z-10">SB</div>`;
    else if (hasBB) btnBadge = `<div class="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black shadow-lg select-none z-10">BB</div>`;

    // Visual bubble pos
    const isUpper = !!pos.top;
    const bubblePosClass = isUpper ? "bottom-[-20px] left-1/2 -translate-x-1/2" : "top-[-20px] left-1/2 -translate-x-1/2";

    const isLargeTable = state.playerCount > 6;
    const badgeWidth = isLargeTable ? "w-[66px]" : "w-[72px]";
    const badgePadding = isLargeTable ? "p-1" : "p-1.5";
    const nameSize = isLargeTable ? "text-[8px]" : "text-[8.5px]";
    const stackSize = isLargeTable ? "text-[8px]" : "text-[8.5px]";
    const betSize = isLargeTable ? "text-[7.5px]" : "text-[8px]";

    html += `
      <div class="absolute flex flex-col items-center pointer-events-auto animate-fade-in" style="bottom:${pos.bottom || 'auto'}; top:${pos.top || 'auto'}; left:${pos.left || 'auto'}; right:${pos.right || 'auto'}; transform:${pos.transform || 'none'};">
        <!-- ACTION BUBBLE -->
        <div class="${actionColorClass} ${bubblePosClass} ${p.actionText ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none transition-all duration-150"}">
          ${p.actionText || ""}
        </div>

        <!-- HOLE CARDS -->
        ${renderSeatHoleCards(p)}

        <!-- PLAYER BADGE -->
        <div class="relative ${badgeWidth} bg-black/95 border ${isCurrentTurn ? "active-turn-ring border-amber-500 scale-102" : "border-[#222]"} rounded-lg ${badgePadding} flex flex-col items-center justify-center text-center shadow-lg transition-all z-10 animate-fade-in">
          <div class="flex items-center gap-1 w-full justify-center max-w-full">
            <span class="inline-flex shrink-0 select-none">${getFlagHtml(p.flag)}</span>
            <span class="${nameSize} truncate font-extrabold max-w-[44px] ${p.isHero ? "text-amber-400" : "text-neutral-200"}">${p.isHero ? "Player" : p.name}</span>
          </div>
          
          <!-- Direct interactive active confirmed hand above chip stack in real-time -->
          ${(() => {
            const handName = getConfirmedHandName(p);
            if (!handName) return "";
            return `
              <div class="text-[6.5px] font-black text-amber-500 uppercase tracking-tight leading-none mt-0.5 max-w-full truncate">
                ${handName}
              </div>
            `;
          })()}
          
          <div class="${stackSize} font-mono text-neutral-400 font-bold mt-1">$${p.stack}</div>
          
          <!-- Bet display -->
          ${p.totalBet > 0 ? `
            <div class="${betSize} font-mono text-amber-500 font-bold mt-0.5 flex items-center justify-center gap-0.5 bg-neutral-950/80 px-1 rounded-sm w-full select-none border border-neutral-800">
              <span>$${p.totalBet}</span>
            </div>
          ` : ""}

          <!-- BUTTON INDICATOR INSIDE NODE -->
          ${btnBadge}
        </div>
      </div>
    `;
  }

  return html;
}

function getActionBgColorClass(col) {
  const base = "action-bubble-wpt backdrop-blur-sm shadow-md border ";
  switch (col) {
    case "red": return base + "bg-red-950/45 text-red-400 border-red-500/35";
    case "gray": return base + "bg-neutral-900/45 text-neutral-400 border-neutral-700/35";
    case "green": return base + "bg-emerald-950/45 text-emerald-400 border-emerald-500/35";
    case "yellow": return base + "bg-amber-950/45 text-amber-400 border-amber-500/35";
    default: return "action-bubble-wpt opacity-0 scale-90 pointer-events-none";
  }
}

/**
 * Actions Control + Player Custom Hard Deck View html generator
 */
function createActionsControlHtml() {
  const tour = state.tour;
  const hero = tour.players.find(p => p.id === 0);
  
  if (!hero) return ""; // Hero is completely gone?

  // Calculate preflop odds if in preflop
  let studyBlockHtml = "";
  if (hero.isActive && hero.cards.length === 2) {
    const pfKey = getPreflopHandKey(hero.cards);
    const totalCount = tour.players.filter(p => p.isActive).length;
    // Map totalCount to array index: 2->0, 3->1, 4->2, 5->3, 6->4
    const idx = Math.max(0, Math.min(4, totalCount - 2));
    const winRate = PF_PROBS[pfKey] ? PF_PROBS[pfKey][idx] : 15; // default fallback 15%
    studyBlockHtml = `
      <div class="ml-2 flex flex-col justify-end">
        <div class="flex items-center gap-1.5">
          <div class="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">My Hand</div>
          <button onclick="toggleProbabilities()" class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded leading-none transition-colors border ${state.showProbabilities ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' : 'bg-neutral-900 border-neutral-850 text-neutral-500'} cursor-pointer select-none">
            ${state.showProbabilities ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="text-xs sm:text-sm font-bold text-neutral-200 mt-1">${pfKey} • ${totalCount}-Max</div>
        ${state.showProbabilities ? `<div class="text-sm font-black text-green-500 mt-0.5 leading-snug">Win ${winRate}%</div>` : `<div class="text-[10px] text-neutral-500 italic mt-1 font-mono leading-none">HIDDEN</div>`}
      </div>
    `;
  } else {
    studyBlockHtml = `
      <div class="ml-2 flex flex-col justify-end">
        <div class="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">My Hand</div>
        <div class="text-xs sm:text-sm font-bold text-rose-500 italic mt-0.5">ELIMINATED</div>
      </div>
    `;
  }

  // Cards layout for Hero
  let heroHoldemDeckHtml = "";
  if (hero.isActive && hero.cards.length === 2) {
    const c1 = hero.cards[0];
    const c2 = hero.cards[1];
    
    heroHoldemDeckHtml = `
      <div class="flex items-center gap-2.5">
        <!-- Card 1 -->
        ${renderStandardPlayingCard(c1, "scale-115 origin-bottom-right select-none animate-deal-l")}
        <!-- Card 2 -->
        ${renderStandardPlayingCard(c2, "scale-115 origin-bottom-left select-none animate-deal-r")}
      </div>
    `;
  } else {
    heroHoldemDeckHtml = `
      <div class="text-xs text-neutral-500 italic py-6 select-none uppercase font-semibold">ELIMINATED</div>
    `;
  }

  // Active check if it's Hero's turn to act
  const isHeroTurn = hero.isActive && tour.currentTurnPlayerId === 0 && tour.stage !== "SHOWDOWN" && tour.stage !== "RESULT";

  // Actions Button Row or Spectator Fast-forward Button
  let controlsHtml = "";
  if (tour.stage === "RESULT" || tour.stage === "SHOWDOWN") {
    controlsHtml = `
      <button id="btn-next-hand" class="w-full btn-wpt-gold py-4 px-6 rounded-lg font-bold text-xs sm:text-sm tracking-widest active:scale-98 transition-transform select-none">
        NEXT HAND DIRECT
      </button>
    `;
  } else if (!isHeroTurn) {
    // If not hero's turn (CPU thinking/spectating)
    controlsHtml = `
      <div class="flex items-center justify-center p-4 bg-neutral-900/30 border border-[#222] rounded-lg select-none">
        <span class="text-xs font-bold text-neutral-500 tracking-widest font-mono uppercase flex items-center gap-2">
          ${t("thinking")} 
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 thinking-dot"></span>
        </span>
      </div>
    `;
  } else {
    // Hero Turn: Determine betting options
    const callPrice = tour.currentRoundMaxBet - hero.totalBet;
    const canCheck = callPrice <= 0;
    const currentBetAmount = hero.totalBet;
    
    // Check call possibilities
    const isCallAllIn = callPrice >= hero.stack;
    const displayCallAmount = isCallAllIn ? hero.stack : callPrice;

    // Fixed raise amounts mapping
    const bSize = tour.bbSize;
    const raiseOptions = [
      { label: "+1 BB", amount: bSize },
      { label: "+5 BB", amount: bSize * 5 },
      { label: "POT", amount: Math.max(bSize * 2, tour.pot + Math.max(0, callPrice)) },
      { label: "ALL-IN", amount: hero.stack }
    ];

    controlsHtml = `
      <div class="flex flex-col gap-2.5">
        <!-- Bet/Raise choices row -->
        <div class="grid grid-cols-4 gap-2">
          ${raiseOptions.map(opt => {
            // Disabled if raise amount is not valid (i.e. stack is not enough, or too small, or the pot size exceeded)
            const actualTotalBet = tour.currentRoundMaxBet + opt.amount;
            const requiredExtraStack = actualTotalBet - hero.totalBet;
            const canRaise = (opt.amount === hero.stack) || ((requiredExtraStack > callPrice) && (requiredExtraStack < hero.stack));
            const isAllIn = opt.amount === hero.stack;

            return `
              <button onclick="handleHeroRaise(${opt.amount})" class="btn-wpt py-3 rounded text-[10px] font-extrabold tracking-wider select-none ${isAllIn ? "text-amber-500" : ""} ${!canRaise ? "opacity-35 pointer-events-none" : ""}">
                ${opt.label}
              </button>
            `;
          }).join("")}
        </div>

        <!-- Fast Actions Row -->
        <div class="grid grid-cols-3 gap-2">
          <button id="btn-action-fold" class="btn-action-wpt-fold py-4 rounded-lg font-bold uppercase text-xs select-none tracking-wider flex items-center justify-center">
            <span>${t("fold")}</span>
          </button>
          
          <button id="btn-action-call" class="btn-action-wpt-check py-4 rounded-lg font-bold uppercase text-xs select-none tracking-wider flex flex-col justify-center items-center">
            <span>${canCheck ? t("check") : t("call")}</span>
            ${canCheck ? "" : `<span class="text-[9px] font-mono font-medium text-neutral-300 mt-0.5">$${displayCallAmount}</span>`}
          </button>

          <button id="btn-action-allin" class="btn-action-wpt-raise py-4 rounded-lg font-bold uppercase text-xs select-none tracking-wider flex flex-col justify-center items-center">
            <span>${t("raise")}</span>
            <span class="text-[9px] font-mono font-medium text-green-400 mt-0.5">$${hero.stack}</span>
          </button>
        </div>
      </div>
    `;
  }

  // Right side stack block
  const stackBlockHtml = `
    <div class="text-right">
      <div class="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">Stack</div>
      <div class="text-lg sm:text-xl font-bold text-neutral-200 font-mono">$${hero.stack}</div>
    </div>
  `;

  let winnerBannerHtml = "";
  if (tour.handWinners && tour.handWinners.length > 0 && (tour.stage === "RESULT" || tour.stage === "SHOWDOWN")) {
    const listHtml = tour.handWinners.map(w => {
      const isHero = w.isHero;
      const highlightCls = isHero ? "text-amber-400 font-extrabold" : "text-neutral-200 font-extrabold";
      
      return `
        <div class="flex items-center gap-2 text-xs sm:text-sm py-1 bg-neutral-900/60 px-3 rounded-lg border border-[#222]">
          <span class="inline-flex shrink-0 select-none items-center">${getFlagHtml(w.flag, "w-4 h-2.5")}</span>
          <span class="${highlightCls}">${w.name}</span>
          <span class="text-neutral-400 text-[11px] sm:text-xs">
            ${state.lang === "ja" 
              ? `<span class="text-amber-500 font-bold">${w.handName}</span> で <span class="text-emerald-400 font-bold font-mono">+$${w.wonAmount}</span> 獲得！` 
              : `won <span class="text-emerald-400 font-bold font-mono">+$${w.wonAmount}</span> with <span class="text-amber-500 font-bold">${w.handName}</span>!`
            }
          </span>
        </div>
      `;
    }).join("");

    winnerBannerHtml = `
      <div id="wpt-winner-board-overlay" class="mb-1 p-3 bg-gradient-to-r from-amber-950/20 via-black to-amber-950/20 border border-amber-500/40 rounded-xl flex flex-col gap-1.5 shadow-2xl">
        <div class="flex items-center gap-1.5 text-amber-500 font-black text-[9px] tracking-wider uppercase">
          <span class="text-xs">🏆</span>
          <span>${state.lang === "ja" ? "勝負決着 / ハンド結果" : "HAND CONCLUDED / RESULT"}</span>
        </div>
        <div class="flex flex-col gap-1 mt-0.5">
          ${listHtml}
        </div>
      </div>
    `;
  }

  return `
    <div class="bg-[#0a0a0a] p-4 border border-[#222] rounded-2xl flex flex-col gap-4">
      ${winnerBannerHtml}
      <div class="flex justify-between items-end select-none">
        <div class="flex gap-2">
          ${heroHoldemDeckHtml}
          ${studyBlockHtml}
        </div>
        ${stackBlockHtml}
      </div>
      <div>
        ${controlsHtml}
      </div>
    </div>
  `;
}

/**
 * Handle events for all DOM interactions
 */
function bindEvents() {
  // Title Screen
  const btnStart = document.getElementById("btn-start");
  if (btnStart) btnStart.addEventListener("click", () => {
    state.currentScreen = "playerCountSelect";
    renderApp();
  });

  const btnSettings = document.getElementById("btn-settings");
  if (btnSettings) btnSettings.addEventListener("click", () => {
    state.currentScreen = "settings";
    renderApp();
  });

  const btnHistory = document.getElementById("btn-history");
  if (btnHistory) btnHistory.addEventListener("click", () => {
    state.currentScreen = "history";
    renderApp();
  });

  // Share system bindings
  const btnShare = document.getElementById("btn-share");
  if (btnShare) btnShare.addEventListener("click", () => {
    state.showShareOverlay = true;
    renderApp();
  });

  const btnCloseShare = document.getElementById("btn-close-share");
  if (btnCloseShare) btnCloseShare.addEventListener("click", () => {
    state.showShareOverlay = false;
    renderApp();
  });

  const btnCopyUrl = document.getElementById("btn-copy-url");
  if (btnCopyUrl) btnCopyUrl.addEventListener("click", () => {
    const input = document.getElementById("share-url-input");
    if (input) {
      input.select();
      navigator.clipboard.writeText(input.value).then(() => {
        const status = document.getElementById("copy-status");
        if (status) {
          status.classList.remove("opacity-0");
          status.classList.add("opacity-100");
          setTimeout(() => {
            status.classList.remove("opacity-100");
            status.classList.add("opacity-0");
          }, 2000);
        }
      }).catch(err => {
        console.error("Could not copy:", err);
      });
    }
  });

  // Settings screen
  const btnSettingsBack = document.getElementById("btn-settings-back");
  if (btnSettingsBack) btnSettingsBack.addEventListener("click", () => {
    state.currentScreen = "title";
    renderApp();
  });

  // History screen
  const btnHistoryBack = document.getElementById("btn-history-back");
  if (btnHistoryBack) btnHistoryBack.addEventListener("click", () => {
    state.currentScreen = "title";
    renderApp();
  });

  const btnCopyHistory = document.getElementById("btn-copy-history");
  if (btnCopyHistory) {
    btnCopyHistory.addEventListener("click", () => {
      const historyList = getHistory();
      if (historyList.length === 0) return;
      
      const text = historyList.map((h, index) => {
        return `Hand #${historyList.length - index}: ${h.hand} (${h.playersCount}-max) | Preflop Win: ${h.expectedRate}% | Result: ${h.result}`;
      }).join("\n");
      
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btnCopyHistory.textContent;
        btnCopyHistory.textContent = "COPIED!";
        btnCopyHistory.classList.remove("bg-amber-500", "text-neutral-950");
        btnCopyHistory.classList.add("bg-emerald-600", "text-white");
        setTimeout(() => {
          btnCopyHistory.textContent = originalText;
          btnCopyHistory.classList.remove("bg-emerald-600", "text-white");
          btnCopyHistory.classList.add("bg-amber-500", "text-neutral-950");
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy history:", err);
      });
    });
  }

  // Count select screen
  const btnCountBack = document.getElementById("btn-count-back");
  if (btnCountBack) btnCountBack.addEventListener("click", () => {
    state.currentScreen = "title";
    renderApp();
  });

  // Win Rates Screen Overlay Buttons
  const btnViewWinRates = document.getElementById("btn-view-win-rates");
  if (btnViewWinRates) btnViewWinRates.addEventListener("click", () => {
    state.showWinRatesOverlay = true;
    renderApp();
  });

  const btnCloseWinRates = document.getElementById("btn-close-win-rates");
  if (btnCloseWinRates) btnCloseWinRates.addEventListener("click", () => {
    state.showWinRatesOverlay = false;
    renderApp();
  });

  // In-Game Buttons
  const btnQuit = document.getElementById("btn-quit");
  if (btnQuit) btnQuit.addEventListener("click", () => {
    if (confirm(t("confirmNewGame"))) {
      state.currentScreen = "title";
      renderApp();
    }
  });

  const btnNextHand = document.getElementById("btn-next-hand");
  if (btnNextHand) btnNextHand.addEventListener("click", () => {
    nextHand();
  });

  // Action Play buttons
  const btnFold = document.getElementById("btn-action-fold");
  if (btnFold) btnFold.addEventListener("click", () => handleHeroAction("FOLD"));

  const btnCall = document.getElementById("btn-action-call");
  if (btnCall) btnCall.addEventListener("click", () => handleHeroAction("CALL"));

  const btnAllIn = document.getElementById("btn-action-allin");
  if (btnAllIn) btnAllIn.addEventListener("click", () => handleHeroAction("ALLIN"));
}

/**
 * Change configurations
 */
window.changeLanguage = function(langCode) {
  state.lang = langCode;
  localStorage.setItem("wpt_lang", langCode);
  renderApp();
};

window.changeDifficulty = function(diff) {
  state.difficulty = diff;
  localStorage.setItem("wpt_diff", diff);
  renderApp();
};

window.toggleEcoMode = function(enabled) {
  state.ecoMode = enabled;
  localStorage.setItem("wpt_eco_mode", enabled ? "true" : "false");
  renderApp();
};

window.handleWinRatesPlayerTab = function(playerCountVal) {
  state.winRatesPlayersCount = playerCountVal;
  renderApp();
};

/**
 * Get hand key for preflop data mapping
 */
function getPreflopHandKey(cards) {
  if (cards.length !== 2) return "";
  const r1 = cards[0].rank;
  const r2 = cards[1].rank;
  const l1 = cards[0].rankLabel;
  const l2 = cards[1].rankLabel;
  
  if (r1 === r2) {
    return l1 + l2;
  }
  
  const s1 = cards[0].suit;
  const s2 = cards[1].suit;
  const isSuited = s1 === s2;
  
  // Sort by rank: A, K, Q...
  if (r1 > r2) {
    return l1 + l2 + (isSuited ? "s" : "o");
  } else {
    return l2 + l1 + (isSuited ? "s" : "o");
  }
}


/**
 * ============================================================================
 * TOURNAMENT GAME LOGIC ENGINE
 * ============================================================================
 */

/**
 * Start tournament
 */
window.startTournamentWith = function(count) {
  state.playerCount = count;
  state.currentScreen = "game";
  
  // Init chips
  const initialStack = 3000;
  
  // Setup players with realistic CPU Profiles
  const selectedCPUList = [...CPU_NAME_POOL].sort(() => 0.5 - Math.random()).slice(0, count - 1);
  const players = [];
  
  // Hero always id 0
  players.push({
    id: 0,
    name: "Player",
    flag: "👤",
    stack: initialStack,
    isHero: true,
    isActive: true,
    isFolded: false,
    isAllIn: false,
    totalBet: 0,
    currentRoundBet: 0,
    cards: [],
    actionText: "",
    actionColor: "",
    seatIndex: 0 // Will assign proper seats shortly
  });

  selectedCPUList.forEach((cpu, i) => {
    players.push({
      id: i + 1,
      name: cpu.name,
      flag: cpu.flag,
      stack: initialStack,
      isHero: false,
      isActive: true,
      isFolded: false,
      isAllIn: false,
      totalBet: 0,
      currentRoundBet: 0,
      cards: [],
      actionText: "",
      actionColor: "",
      seatIndex: i + 1
    });
  });

  state.tour = {
    handCount: 0,
    sbSize: 50,
    bbSize: 100,
    players,
    isHeroActive: true,
    pot: 0,
    community: [],
    stage: "PREFLOP",
    dealerIdx: 0,
    sbIdx: 1,
    bbIdx: 2,
    currentRoundMaxBet: 100,
    currentTurnPlayerId: 0,
    lastRaiserId: -1,
    eliminatedLog: [],
    finished: false,
    handWinners: null
  };

  nextHand();
};

/**
 * Reset seats & blinds then start dealings and bets
 */
function nextHand() {
  const tour = state.tour;
  
  // 1. Check if tournament ended
  const activePlayers = tour.players.filter(p => p.isActive);
  if (activePlayers.length <= 1) {
    concludeTournament();
    return;
  }
  
  // Also check if Hero is eliminated
  const hero = tour.players.find(p => p.id === 0);
  if (!hero.isActive) {
    concludeTournament();
    return;
  }

  // 2. Increment hand count & blind schedule
  tour.handCount++;
  if (tour.handCount > 1 && tour.handCount % 5 === 1) {
    // Elevate blinds
    tour.sbSize = Math.floor(tour.sbSize * 1.5 / 25) * 25; // elegant chip increments
    if (tour.sbSize < tour.sbSize + 50) {
      tour.sbSize += 50;
    }
    tour.bbSize = tour.sbSize * 2;
    triggerBlindUpAnimation();
  }

  // 3. Pin Hero at Seat 0 (Bottom). Shuffle other seats for dynamic positions.
  const heroPlayer = tour.players.find(p => p.id === 0);
  if (heroPlayer) {
    heroPlayer.seatIndex = 0;
  }

  // Get available visual indices for CPU positions based on playerCount (1 to playerCount-1)
  let cpuSeats = Array.from({ length: state.playerCount - 1 }, (_, i) => i + 1);
  // Shuffle cpuSeats
  cpuSeats = cpuSeats.sort(() => 0.5 - Math.random());

  tour.players.forEach(p => {
    if (p.id !== 0) {
      if (p.isActive) {
        p.seatIndex = cpuSeats.pop() || 1;
      } else {
        p.seatIndex = -1;
      }
    }
  });

  // 4. Determine Position button marks (Dealer, SB, BB)
  // Dealer moves clock wise. We find active indices.
  const activeIds = tour.players.filter(p => p.isActive).map(p => p.id);
  
  // Let's set initial or increment dealer
  if (tour.handCount === 1) {
    tour.dealerIdx = activeIds[0];
  } else {
    const currentPos = activeIds.indexOf(tour.dealerIdx);
    tour.dealerIdx = activeIds[(currentPos + 1) % activeIds.length];
  }

  // Set SB and BB
  const dealerPos = activeIds.indexOf(tour.dealerIdx);
  if (activeIds.length === 2) {
    // Heads Up rule: Dealer is SB, other player is BB
    tour.sbIdx = tour.dealerIdx;
    tour.bbIdx = activeIds[(dealerPos + 1) % activeIds.length];
  } else {
    tour.sbIdx = activeIds[(dealerPos + 1) % activeIds.length];
    tour.bbIdx = activeIds[(dealerPos + 2) % activeIds.length];
  }

  // 5. Card Deck initialization
  const deck = createShuffledDeck();

  // 6. Reset each player state
  tour.players.forEach(p => {
    p.isFolded = !p.isActive;
    p.isAllIn = false;
    p.totalBet = 0;
    p.handContribution = 0;
    p.currentRoundBet = 0;
    p.actionText = "";
    p.actionColor = "";
    p.actedThisRound = false;
    if (p.isActive) {
      p.cards = [deck.pop(), deck.pop()];
    } else {
      p.cards = [];
    }
  });

  tour.community = [];
  tour.pot = 0;
  tour.stage = "PREFLOP";
  tour.deck = deck;
  tour.handWinners = null;

  // 7. Deduct force blind bets
  postBlinds();

  // 8. Start betting round (UTG acts first in preflop, i.e. person left of BB)
  let firstActorId;
  const bbPos = activeIds.indexOf(tour.bbIdx);
  firstActorId = activeIds[(bbPos + 1) % activeIds.length];
  
  tour.currentTurnPlayerId = firstActorId;
  tour.lastRaiserId = tour.bbIdx; // Big blind has option to check or raise

  renderApp();

  // Trigger CPU play loop
  setTimeout(() => {
    runTurnCycle();
  }, 50);
}

function triggerBlindUpAnimation() {
  const overlay = document.createElement("div");
  overlay.className = "absolute inset-x-0 top-12 mx-auto w-max max-w-xs z-50 bg-amber-500 text-neutral-900 text-xs font-extrabold px-4 py-2 rounded-lg shadow-xl uppercase tracking-widest text-center pointer-events-none fade-in";
  overlay.innerText = `${t("blindUp")} (NEW: ${state.tour.sbSize}/${state.tour.bbSize})`;
  document.getElementById("app").appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
  }, 2200);
}

/**
 * Handle simple blind stakes
 */
function postBlinds() {
  const tour = state.tour;
  const sbPlayer = tour.players.find(p => p.id === tour.sbIdx);
  const bbPlayer = tour.players.find(p => p.id === tour.bbIdx);

  // SB
  if (sbPlayer.stack <= tour.sbSize) {
    sbPlayer.totalBet = sbPlayer.stack;
    sbPlayer.stack = 0;
    sbPlayer.isAllIn = true;
    sbPlayer.actionText = t("allin");
    sbPlayer.actionColor = "yellow";
  } else {
    sbPlayer.stack -= tour.sbSize;
    sbPlayer.totalBet = tour.sbSize;
    sbPlayer.actionText = "SB " + tour.sbSize;
    sbPlayer.actionColor = "gray";
  }

  // BB
  if (bbPlayer.stack <= tour.bbSize) {
    bbPlayer.totalBet = bbPlayer.stack;
    bbPlayer.stack = 0;
    bbPlayer.isAllIn = true;
    bbPlayer.actionText = t("allin");
    bbPlayer.actionColor = "yellow";
  } else {
    bbPlayer.stack -= tour.bbSize;
    bbPlayer.totalBet = tour.bbSize;
    bbPlayer.actionText = "BB " + tour.bbSize;
    bbPlayer.actionColor = "gray";
  }

  tour.currentRoundMaxBet = Math.max(sbPlayer.totalBet, bbPlayer.totalBet);
}

/**
 * Run central betting sequence loops iteratively
 */
function runTurnCycle() {
  const tour = state.tour;
  const activePlayers = tour.players.filter(p => p.isActive);
  const unfolded = activePlayers.filter(p => !p.isFolded);
  
  if (unfolded.length <= 1) {
    // Everyone folded except one. Hand concluded.
    concludeRoundWithNoShowdown();
    return;
  }

  // If everyone else is all-in, or only 1 person remains capable of betting, skip directly to board running
  const fullyActiveCount = unfolded.filter(p => p.stack > 0 && !p.isAllIn).length;
  let onlyActivePlayerIsFacingBet = false;
  if (fullyActiveCount === 1) {
    const onlyActive = unfolded.find(p => p.stack > 0 && !p.isAllIn);
    if (onlyActive && tour.currentRoundMaxBet > onlyActive.totalBet) {
      onlyActivePlayerIsFacingBet = true;
    }
  }

  if (fullyActiveCount === 0 || (fullyActiveCount === 1 && !onlyActivePlayerIsFacingBet)) {
    runRemainingBoardCards();
    return;
  }

  // Check round agreement
  if (reachedAgreement()) {
    advanceToNextStreet();
    return;
  }

  // Advance to next turn
  const currentPlayer = tour.players.find(p => p.id === tour.currentTurnPlayerId);
  if (currentPlayer.isFolded || currentPlayer.isAllIn || !currentPlayer.isActive) {
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 5);
    return;
  }

  // Act
  if (currentPlayer.isHero) {
    renderApp(); // Wait for user button input
  } else {
    // CPU Turn
    renderApp();
    setTimeout(() => {
      executeCpuTurn(currentPlayer);
    }, 15); // Quick thinking mimic window
  }
}

/**
 * Check if the current bet round was fully matched or settled
 */
function reachedAgreement() {
  const tour = state.tour;
  const activeUnfolded = tour.players.filter(p => p.isActive && !p.isFolded);
  
  // Everyone must match the max bet or be all-in
  const betToMatch = tour.currentRoundMaxBet;
  
  for (let p of activeUnfolded) {
    if (p.isAllIn) continue;
    if (!p.actedThisRound) {
      return false;
    }
    if (p.totalBet !== betToMatch) {
      return false;
    }
  }

  return true;
}

function setNextPlayerTurn() {
  const tour = state.tour;
  const activeIds = tour.players.filter(p => p.isActive).map(p => p.id);
  const currentPos = activeIds.indexOf(tour.currentTurnPlayerId);
  tour.currentTurnPlayerId = activeIds[(currentPos + 1) % activeIds.length];
}

/**
 * Progress community board states
 */
function advanceToNextStreet() {
  const tour = state.tour;
  
  // Sweep bets on players to center pot
  tour.players.forEach(p => {
    tour.pot += p.totalBet;
    p.handContribution = (p.handContribution || 0) + p.totalBet;
    p.totalBet = 0; // reset committed for new round
    p.actedThisRound = false; // Reset action flag for new street
  });
  tour.currentRoundMaxBet = 0;
  tour.lastRaiserId = -1;

  // Clear action bubbles
  tour.players.forEach(p => {
    if (!p.isFolded && !p.isAllIn) {
      p.actionText = "";
      p.actionColor = "";
    }
  });

  const activeIds = tour.players.filter(p => p.isActive && !p.isFolded).map(p => p.id);
  // Post-flop actions always start with active player next left of dealer button
  const dPos = activeIds.indexOf(tour.dealerIdx);
  if (dPos !== -1) {
    tour.currentTurnPlayerId = activeIds[(dPos + 1) % activeIds.length];
  } else {
    // if dealer left, find first active
    tour.currentTurnPlayerId = activeIds[0];
  }

  if (tour.stage === "PREFLOP") {
    tour.stage = "FLOP";
    tour.community.push(tour.deck.pop(), tour.deck.pop(), tour.deck.pop());
  } else if (tour.stage === "FLOP") {
    tour.stage = "TURN";
    tour.community.push(tour.deck.pop());
  } else if (tour.stage === "TURN") {
    tour.stage = "RIVER";
    tour.community.push(tour.deck.pop());
  } else if (tour.stage === "RIVER") {
    tour.stage = "SHOWDOWN";
    concludeRoundWithShowdown();
    return;
  }

  renderApp();
  setTimeout(runTurnCycle, 100);
}

/**
 * Board fast forward if all-ins happen
 */
function runRemainingBoardCards() {
  const tour = state.tour;
  // Sweep bets
  tour.players.forEach(p => {
    tour.pot += p.totalBet;
    p.handContribution = (p.handContribution || 0) + p.totalBet;
    p.totalBet = 0;
  });
  tour.currentRoundMaxBet = 0;

  while (tour.community.length < 5) {
    tour.community.push(tour.deck.pop());
  }

  tour.stage = "SHOWDOWN";
  renderApp();
  setTimeout(concludeRoundWithShowdown, 150);
}

/**
 * Handle Hero direct actions
 */
function handleHeroAction(actionType) {
  const tour = state.tour;
  const hero = tour.players.find(p => p.id === 0);
  const callPrice = tour.currentRoundMaxBet - hero.totalBet;
  const oldRoundMaxBet = tour.currentRoundMaxBet;

  if (actionType === "FOLD") {
    hero.isFolded = true;
    hero.actionText = t("fold");
    hero.actionColor = "red";
    hero.actedThisRound = true;
    tour.lastRaiserId = 0; // counted as acted
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 15);
  } else if (actionType === "CALL") {
    if (callPrice >= hero.stack) {
      // forced all-in call
      hero.totalBet += hero.stack;
      hero.stack = 0;
      hero.isAllIn = true;
      hero.actionText = t("allin");
      hero.actionColor = "yellow";
    } else {
      hero.totalBet += callPrice;
      hero.stack -= callPrice;
      hero.actionText = callPrice <= 0 ? t("check") : t("call");
      hero.actionColor = "gray";
    }
    hero.actedThisRound = true;

    const isBetOrRaise = hero.totalBet > oldRoundMaxBet;
    if (isBetOrRaise) {
      tour.currentRoundMaxBet = hero.totalBet;
      tour.players.forEach(other => {
        if (other.id !== hero.id) {
          other.actedThisRound = false;
        }
      });
    } else {
      tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, hero.totalBet);
    }

    tour.lastRaiserId = 0;
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 15);
  } else if (actionType === "ALLIN") {
    const raiseContribution = hero.stack;
    hero.totalBet += raiseContribution;
    hero.stack = 0;
    hero.isAllIn = true;
    hero.actionText = t("allin");
    hero.actionColor = "yellow";
    hero.actedThisRound = true;
    
    const isBetOrRaise = hero.totalBet > oldRoundMaxBet;
    if (isBetOrRaise) {
      tour.currentRoundMaxBet = hero.totalBet;
      tour.players.forEach(other => {
        if (other.id !== hero.id) {
          other.actedThisRound = false;
        }
      });
    } else {
      tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, hero.totalBet);
    }
    
    tour.lastRaiserId = 0;
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 15);
  }
}

/**
 * Handle fixed custom raise values for Hero
 */
window.handleHeroRaise = function(amt) {
  const tour = state.tour;
  const hero = tour.players.find(p => p.id === 0);
  const callPrice = tour.currentRoundMaxBet - hero.totalBet;
  const oldRoundMaxBet = tour.currentRoundMaxBet;
  const requiredTotalBet = tour.currentRoundMaxBet + amt;
  const requiredCommit = requiredTotalBet - hero.totalBet;

  if (requiredCommit >= hero.stack) {
    // fallback all-in
    handleHeroAction("ALLIN");
    return;
  }

  hero.stack -= requiredCommit;
  hero.totalBet = requiredTotalBet;
  hero.actionText = `${t("raise")} $${requiredCommit}`;
  hero.actionColor = "green";
  hero.actedThisRound = true;

  const isBetOrRaise = hero.totalBet > oldRoundMaxBet;
  if (isBetOrRaise) {
    tour.currentRoundMaxBet = hero.totalBet;
    tour.players.forEach(other => {
      if (other.id !== hero.id) {
        other.actedThisRound = false;
      }
    });
  } else {
    tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, hero.totalBet);
  }

  // Hero is the new raiser
  tour.lastRaiserId = 0;
  
  setNextPlayerTurn();
  setTimeout(runTurnCycle, 15);
};

/**
 * AI CPU DECISION LOGIC
 * High-performance lightweight rule set mimicking WPT table dynamics.
 */
function executeCpuTurn(p) {
  const tour = state.tour;
  const callPrice = tour.currentRoundMaxBet - p.totalBet;
  const oldRoundMaxBet = tour.currentRoundMaxBet;
  
  // Basic hand equity profile simulation
  const cardPower = getPlayerCardStrengthScore(p);
  const difficulty = state.difficulty;
  
  // Define comprehensive multi-tier profile configurations
  const DIFF_PROFILES = {
    beginner: {
      bluffProb: 0.04,
      randomness: 0.40,
      mistakeProb: 0.30,
      drawChasingProb: 0.90,
      overvaluePairs: true,
      callAggressionThreshold: 1.5
    },
    casual: {
      bluffProb: 0.08,
      randomness: 0.25,
      mistakeProb: 0.20,
      drawChasingProb: 0.70,
      overvaluePairs: true,
      callAggressionThreshold: 1.1
    },
    intermediate: {
      bluffProb: 0.12,
      randomness: 0.15,
      mistakeProb: 0.10,
      drawChasingProb: 0.45,
      overvaluePairs: false,
      callAggressionThreshold: 0.9
    },
    advanced: {
      bluffProb: 0.18,
      randomness: 0.08,
      mistakeProb: 0.04,
      drawChasingProb: 0.30,
      overvaluePairs: false,
      callAggressionThreshold: 0.75
    },
    hard: {
      bluffProb: 0.24,
      randomness: 0.03,
      mistakeProb: 0.01,
      drawChasingProb: 0.20,
      overvaluePairs: false,
      callAggressionThreshold: 0.65
    },
    expert: {
      bluffProb: 0.32,
      randomness: 0.0,
      mistakeProb: 0.0,
      drawChasingProb: 0.15,
      overvaluePairs: false,
      callAggressionThreshold: 0.55
    }
  };

  let profile = DIFF_PROFILES[difficulty];
  if (!profile) {
    if (difficulty === "normal") profile = DIFF_PROFILES.casual;
    else if (difficulty === "pro" || difficulty === "expert") profile = DIFF_PROFILES.expert;
    else if (difficulty === "beginner") profile = DIFF_PROFILES.beginner;
    else if (difficulty === "hard") profile = DIFF_PROFILES.hard;
    else if (difficulty === "advanced") profile = DIFF_PROFILES.advanced;
    else profile = DIFF_PROFILES.intermediate;
  }

  // Active headcounts on high-level speedups
  const unfoldedCount = tour.players.filter(p1 => p1.isActive && !p1.isFolded).length;

  // Decide if this turn is a bluff
  let isBluff = false;
  if (cardPower === 0) {
    let finalBluffProb = profile.bluffProb;
    
    // Position bonus
    if (getPlayerPositionStatus(p) === "late") finalBluffProb += 0.08;
    
    // Opponent weakness: check if check-passive environment
    if (callPrice <= 0) finalBluffProb += 0.10; 
    
    // Board texture: check if board is dry
    if (tour.community.length >= 3) {
      const suitsOnBoard = { S: 0, H: 0, D: 0, C: 0 };
      tour.community.forEach(c => suitsOnBoard[c.suit]++);
      const maxSuitCount = Math.max(...Object.values(suitsOnBoard));
      if (maxSuitCount < 3) finalBluffProb += 0.05; // dry board -> more bluffs
    }
    
    isBluff = Math.random() < finalBluffProb;
  }

  // Handle randomness overlay (e.g. beginner clicks random actions)
  let decision = "CALL";
  let actedRandomly = false;
  if (Math.random() < profile.randomness) {
    actedRandomly = true;
    const randVal = Math.random();
    if (randVal < 0.5) decision = "CALL";
    else if (randVal < 0.7) decision = "RAISE";
    else decision = callPrice === 0 ? "CALL" : "FOLD";
  }

  if (!actedRandomly) {
    // Street based strategy logic
    if (tour.stage === "PREFLOP") {
      const pfKey = getPreflopHandKey(p.cards);
      const winRatesForSeating = PF_PROBS[pfKey];
      // Lookup winRate based on dynamic playersCount
      const idx = Math.max(0, Math.min(4, unfoldedCount - 2));
      const winRate = winRatesForSeating ? winRatesForSeating[idx] : 18;

      if (winRate > 62) {
        // Elite hands: AA, KK, QQ, JJ, AKs
        decision = Math.random() < 0.65 ? "RAISE" : "CALL";
      } else if (winRate > 44) {
        // Strong hands: AQ, AJ, TT, 99
        decision = Math.random() < 0.35 ? "RAISE" : "CALL";
      } else if (winRate > 28) {
        // Playable hands: mid pairs, suited connectors
        decision = "CALL";
      } else {
        // Weak hands
        decision = isBluff ? "CALL" : "FOLD";
      }

      // Check for mistake: Beginner or Casual occasionally calls large raises with garbage
      if (Math.random() < profile.mistakeProb && winRate < 28) {
        decision = "CALL"; // chasing with low hands
      }

      // POSITIONAL AWARENESS: Expand late position response
      if (getPlayerPositionStatus(p) === "late" && callPrice <= 0 && winRate > 35) {
        // Late raise
        decision = Math.random() < 0.50 ? "RAISE" : "CALL";
      }

      // Force fold weak preflop hand if high raise occurred
      if (callPrice > tour.bbSize * 1.5 && winRate < 35 && !isBluff) {
        decision = "FOLD";
      }
    } else {
      // POSTFLOP (FLOP, TURN, RIVER)
      const mergedCards = [...p.cards, ...tour.community];
      const draws = detectPostflopDraws(mergedCards);
      
      // Opponent modeling estimation
      let activeOpponents = tour.players.filter(po => po.id !== p.id && po.isActive && !po.isFolded);
      let highestOpponentStrength = 40;
      activeOpponents.forEach(ao => {
        const est = estimateOpponentStrength(ao);
        if (est > highestOpponentStrength) highestOpponentStrength = est;
      });

      if (cardPower >= 5) {
        // Elite holdings: Flush, Full House, Quads or better
        // Value bet sizing / trapping
        decision = Math.random() < 0.70 ? "RAISE" : "CALL";
      } else if (cardPower >= 3) {
        // Strong holdings: Straight, Three of a Kind
        if (highestOpponentStrength >= 75) {
          // Cautious but mostly stays
          decision = "CALL";
        } else {
          decision = Math.random() < 0.50 ? "RAISE" : "CALL";
        }
      } else if (cardPower >= 1) {
        // Moderate holdings: One Pair or Two Pair
        if (profile.overvaluePairs) {
          // Beginner or Casual overcommits
          decision = "CALL";
        } else {
          // Mathematical fold response
          if (callPrice > p.stack * profile.callAggressionThreshold) {
            decision = "FOLD";
          } else {
            // Check board wetness or raise threats
            if (highestOpponentStrength >= 75 && callPrice > tour.bbSize * 2) {
              decision = Math.random() < 0.25 ? "CALL" : "FOLD";
            } else {
              decision = "CALL";
            }
          }
        }
      } else {
        // Weak cardPower = 0 (draws or pure bluff)
        const isChasingDraw = (draws.hasFlushDraw || draws.hasStraightDraw) && (Math.random() < profile.drawChasingProb);
        
        if (isChasingDraw) {
          // Call reasonable prices for draws
          if (callPrice <= tour.bbSize * 4) {
            decision = "CALL";
          } else {
            decision = "FOLD";
          }
        } else if (isBluff) {
          // Bluffing raise
          decision = "RAISE";
        } else {
          decision = callPrice === 0 ? "CALL" : "FOLD";
        }
      }

      // Emotional mistakes triggers: loose/aggressive mistake triggers
      if (Math.random() < profile.mistakeProb) {
        if (Math.random() < 0.5) {
          decision = "CALL"; // chases blindly
        } else if (callPrice === 0) {
          decision = "RAISE"; // emotional aggressive bet
        }
      }
    }
  }

  // Cannot fold if check is possible
  if (decision === "FOLD" && callPrice <= 0) {
    decision = "CALL";
  }

  // Execute choice
  if (decision === "FOLD") {
    p.isFolded = true;
    p.actionText = t("fold");
    p.actionColor = "red";
  } else if (decision === "RAISE") {
    // Compute logical raise
    const bSize = tour.bbSize;
    let raiseAmt = bSize;
    if (Math.random() < 0.5) {
      raiseAmt = bSize * 3;
    } else {
      // Pot size raise representation
      raiseAmt = Math.max(bSize * 2, tour.pot + callPrice);
    }

    const requiredCommit = callPrice + raiseAmt;
    if (requiredCommit >= p.stack) {
      // Force all-in choice
      p.totalBet += p.stack;
      p.stack = 0;
      p.isAllIn = true;
      p.actionText = t("allin");
      p.actionColor = "yellow";
    } else {
      p.stack -= requiredCommit;
      p.totalBet += requiredCommit;
      p.actionText = `${t("raise")} $${requiredCommit}`;
      p.actionColor = "green";
    }
  } else {
    // CALL or CHECK
    if (callPrice >= p.stack) {
      p.totalBet += p.stack;
      p.stack = 0;
      p.isAllIn = true;
      p.actionText = t("allin");
      p.actionColor = "yellow";
    } else {
      p.totalBet += callPrice;
      p.stack -= callPrice;
      p.actionText = callPrice <= 0 ? t("check") : t("call");
      p.actionColor = "gray";
    }
  }

  p.actedThisRound = true;

  const isBetOrRaise = p.totalBet > oldRoundMaxBet;
  if (isBetOrRaise) {
    tour.currentRoundMaxBet = p.totalBet;
    tour.players.forEach(other => {
      if (other.id !== p.id) {
        other.actedThisRound = false;
      }
    });
  } else {
    tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, p.totalBet);
  }

  tour.lastRaiserId = p.id;

  setNextPlayerTurn();
  setTimeout(runTurnCycle, 15);
}

/**
 * Get internal evaluated rating for CPU logic (0 - 9)
 */
function getPlayerCardStrengthScore(p) {
  const tour = state.tour;
  const mergedCards = [...p.cards, ...tour.community];
  if (mergedCards.length < 5) return 0;
  
  const combos = getCombinations(mergedCards, 5);
  let bestScore = 0;
  
  combos.forEach(c => {
    const res = evaluate5CardHand(c);
    if (res.type > bestScore) {
      bestScore = res.type;
    }
  });

  return bestScore;
}


/**
 * CONCLUDE HANDS WITHOUT SHOWDOWN (Everyone folded except one)
 */
function concludeRoundWithNoShowdown() {
  const tour = state.tour;
  // Sweep bets
  tour.players.forEach(p => {
    tour.pot += p.totalBet;
    p.handContribution = (p.handContribution || 0) + p.totalBet;
    p.totalBet = 0;
  });

  const winner = tour.players.find(p => p.isActive && !p.isFolded);
  winner.stack += tour.pot;
  winner.actionText = `WIN +$${tour.pot}`;
  winner.actionColor = "green";

  // Record hand winner info
  tour.handWinners = [{
    name: winner.isHero ? "Player" : winner.name,
    flag: winner.flag,
    handName: state.lang === "ja" ? "全員フォールド" : "Everyone Folded",
    wonAmount: tour.pot,
    isHero: winner.isHero
  }];

  // If winner is Hero, save to history
  if (winner.id === 0) {
    saveHandResultToHistory(winner.cards, true);
  } else {
    const hero = tour.players.find(p => p.id === 0);
    if (!hero.isFolded) {
      // Hero played and lost
      saveHandResultToHistory(hero.cards, false);
    }
  }

  tour.stage = "RESULT";
  renderApp();
  
  // Sweep out broke players
  reapEliminatedPlayers();
}

/**
 * CONCLUDE HANDS WITH SHOWDOWN (Final evaluation)
 */
function concludeRoundWithShowdown() {
  const tour = state.tour;
  // Sweep bets
  tour.players.forEach(p => {
    tour.pot += p.totalBet;
    p.handContribution = (p.handContribution || 0) + p.totalBet;
    p.totalBet = 0;
  });

  const showDownCandidates = tour.players.filter(p => p.isActive && !p.isFolded);
  
  // Rank showdown hand value for each
  const showdownEvaluated = showDownCandidates.map(p => {
    const merged = [...p.cards, ...tour.community];
    const combos = getCombinations(merged, 5);
    
    // Sort subsets to find best 5Card rating
    const bestHandObj = combos.map(evaluate5CardHand).sort((a, b) => {
      if (b.type !== a.type) return b.type - a.type;
      for (let i = 0; i < b.tieBreakers.length; i++) {
        if (b.tieBreakers[i] !== a.tieBreakers[i]) {
          return b.tieBreakers[i] - a.tieBreakers[i];
        }
      }
      return 0;
    })[0];

    return {
      id: p.id,
      player: p,
      bestHand: bestHandObj
    };
  });

  // Sort candidates by hand strength descending
  showdownEvaluated.sort((a, b) => {
    if (b.bestHand.type !== a.bestHand.type) return b.bestHand.type - a.bestHand.type;
    for (let i = 0; i < b.bestHand.tieBreakers.length; i++) {
      if (b.bestHand.tieBreakers[i] !== a.bestHand.tieBreakers[i]) {
        return b.bestHand.tieBreakers[i] - a.bestHand.tieBreakers[i];
      }
    }
    return 0;
  });

  const showDownOrder = showdownEvaluated.map(se => se.player);

  // Distribute via Side Pot contributions safely
  const potAllocations = distributePot(tour.players, tour.players.filter(p => p.isActive).map(p => p.id), showdownEvaluated);
  
  const finalWinners = [];
  
  // Display outcomes on bubbles
  tour.players.forEach(p => {
    const share = potAllocations[p.id] || 0;
    if (share > 0) {
      p.stack += share;
      const matchedEval = showdownEvaluated.find(se => se.id === p.id);
      p.actionText = `${matchedEval.bestHand.typeName} +$${share}`;
      p.actionColor = "yellow";
      
      finalWinners.push({
        name: p.isHero ? "Player" : p.name,
        flag: p.flag,
        handName: matchedEval ? matchedEval.bestHand.typeName : "",
        wonAmount: share,
        isHero: p.isHero
      });
    } else if (!p.isFolded) {
      p.actionText = t("fold");
      p.actionColor = "red";
    }
  });

  tour.handWinners = finalWinners;

  // Log history
  const isHeroWin = (potAllocations[0] || 0) > 0;
  const hero = tour.players.find(p => p.id === 0);
  if (hero.isActive && !hero.isFolded) {
    saveHandResultToHistory(hero.cards, isHeroWin);
  }

  tour.stage = "RESULT";
  renderApp();

  reapEliminatedPlayers();
}

/**
 * Handle Side Pot mathematics safely
 */
/**
 * Determine if two hands have identical Texas Hold'em hand strength (split tie)
 */
function isSameHandStrength(handA, handB) {
  if (handA.type !== handB.type) return false;
  for (let i = 0; i < handA.tieBreakers.length; i++) {
    if (handA.tieBreakers[i] !== handB.tieBreakers[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Handle Side Pot and Split Pot mathematics safely
 */
function distributePot(players, activePlayerIds, showdownEvaluated) {
  let contributions = players.map(p => ({ id: p.id, betLength: p.handContribution || 0 }));
  let potAllocations = players.map(p => 0);

  // Group showdownEvaluated candidates into tiers of equal hand strength
  let tiers = [];
  for (let evalObj of showdownEvaluated) {
    if (tiers.length === 0) {
      tiers.push([evalObj]);
    } else {
      let lastTier = tiers[tiers.length - 1];
      if (isSameHandStrength(lastTier[0].bestHand, evalObj.bestHand)) {
        lastTier.push(evalObj);
      } else {
        tiers.push([evalObj]);
      }
    }
  }

  // Iterate over tiers of players from best hands to worst
  for (let tier of tiers) {
    let tierPlayers = tier.map(t => t.player);

    while (true) {
      // Find tier players who still have contribution/claims left to make
      let activeEligible = tierPlayers.filter(p => {
        let cnt = contributions.find(c => c.id === p.id);
        return cnt && cnt.betLength > 0;
      });
      if (activeEligible.length === 0) break;

      // Find the min pending bet length among the tied active eligible winners
      let minBet = Infinity;
      activeEligible.forEach(p => {
        let cnt = contributions.find(c => c.id === p.id);
        if (cnt.betLength < minBet) minBet = cnt.betLength;
      });

      // Accumulate the side subpot slices up to minBet from all participants
      let subPot = 0;
      for (let contrib of contributions) {
        let chunk = Math.min(contrib.betLength, minBet);
        contrib.betLength -= chunk;
        subPot += chunk;
      }

      // Distribute split subpot among these activeEligible tied winners
      let share = Math.floor(subPot / activeEligible.length);
      let extra = subPot % activeEligible.length;

      activeEligible.forEach((p, idx) => {
        potAllocations[p.id] += share;
        if (idx < extra) {
          potAllocations[p.id] += 1;
        }
      });
    }
  }

  // Sweep remaining residuals (e.g. uncalled bets)
  let remainingPot = 0;
  for (let contrib of contributions) {
    remainingPot += contrib.betLength;
    contrib.betLength = 0;
  }
  if (remainingPot > 0 && showdownEvaluated.length > 0) {
    const absoluteWinnerId = showdownEvaluated[0].id;
    potAllocations[absoluteWinnerId] += remainingPot;
  }

  return potAllocations;
}

/**
 * Remove broke players out of next dealing pools
 */
function reapEliminatedPlayers() {
  const tour = state.tour;
  
  tour.players.forEach(p => {
    if (p.isActive && p.stack <= 0) {
      p.isActive = false; // permanent elimination
      
      // Calculate rank position
      const activeCount = tour.players.filter(pl => pl.isActive).length;
      const finishedRank = activeCount + 1;
      
      tour.eliminatedLog.unshift({
        id: p.id,
        name: p.isHero ? "Player" : p.name,
        rank: finishedRank
      });
    }
  });
}

/**
 * Finish tournament view overlays
 */
function concludeTournament() {
  const tour = state.tour;
  tour.finished = true;
  
  const heroWins = tour.players.find(p => p.id === 0).isActive;
  const activeCount = tour.players.filter(p => p.isActive).length;

  const resultsList = [...tour.eliminatedLog];
  if (activeCount === 1) {
    const winnerPlayer = tour.players.find(p => p.isActive);
    resultsList.unshift({
       id: winnerPlayer.id,
       name: winnerPlayer.isHero ? "Player" : winnerPlayer.name,
       rank: 1
    });
  }

  const screenHtml = `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in h-full overflow-hidden">
      <div class="flex-1 flex flex-col justify-center items-center overflow-hidden">
        <div class="text-amber-500 font-display font-semibold text-[10px] tracking-widest uppercase mb-2">WPT SPEED SIM</div>
        <h2 class="text-3xl font-extrabold text-white tracking-tighter mb-6">${t("tournamentEnd")}</h2>
        
        <!-- Outcomes block -->
        <div class="w-full max-w-sm bg-neutral-900 border border-neutral-850 p-4 rounded-xl mb-6 overflow-y-auto max-h-[220px]">
          <div class="text-[10px] text-neutral-500 font-mono flex justify-between uppercase pb-2 border-b border-neutral-800 font-semibold mb-3">
            <span>${t("rank")}</span>
            <span>PLAYER</span>
          </div>
          <div class="space-y-2">
            ${resultsList.map(item => {
              const matchesHero = item.id === 0;
              return `
                <div class="flex justify-between items-center text-xs font-mono py-1">
                  <span class="${matchesHero ? "text-amber-400 font-extrabold" : "text-neutral-400"}">${item.rank === 1 ? "🏆 Champion" : `${item.rank}th`}</span>
                  <span class="${matchesHero ? "text-amber-400 font-extrabold" : "text-neutral-200"}">${item.name}</span>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 mb-6 flex-shrink-0">
        <button onclick="rematchTournament()" class="btn-wpt-gold py-3.5 px-6 rounded-lg text-sm tracking-wider font-semibold active:scale-98 transition-transform">
          ${t("rematch")}
        </button>
        <button onclick="startNewTournamentSelection()" class="btn-wpt-dark py-3 px-6 rounded-lg text-sm tracking-wide font-medium active:scale-98 transition-transform">
          ${t("newGame")}
        </button>
        <button onclick="goToMainMenu()" class="btn-wpt-dark py-3 px-6 rounded-lg text-sm tracking-wide font-medium active:scale-98 transition-transform">
          ${t("mainMenu")}
        </button>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = screenHtml;
}

window.rematchTournament = function() {
  startTournamentWith(state.playerCount);
};

window.startNewTournamentSelection = function() {
  state.currentScreen = "playerCountSelect";
  renderApp();
};

window.goToMainMenu = function() {
  state.currentScreen = "title";
  renderApp();
};


/**
 * ============================================================================
 * ENGINE UTILITIES & SYSTEM UTILS
 * ============================================================================
 */

function createShuffledDeck() {
  const suits = ["S", "H", "D", "C"];
  const ranks = [
    { v: 2, l: "2" }, { v: 3, l: "3" }, { v: 4, l: "4" }, { v: 5, l: "5" },
    { v: 6, l: "6" }, { v: 7, l: "7" }, { v: 8, l: "8" }, { v: 9, l: "9" },
    { v: 10, l: "T" }, { v: 11, l: "J" }, { v: 12, l: "Q" }, { v: 13, l: "K" },
    { v: 14, l: "A" }
  ];

  let deck = [];
  for (let s of suits) {
    for (let r of ranks) {
      deck.push({
        suit: s,
        rank: r.v,
        rankLabel: r.l
      });
    }
  }

  // Fisher-Yates Shuffling index
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

/**
 * Subset Combination Generator index Helper
 */
function getCombinations(array, k) {
  let result = [];
  function helper(subset, start) {
    if (subset.length === k) {
      result.push([...subset]);
      return;
    }
    for (let i = start; i < array.length; i++) {
      subset.push(array[i]);
      helper(subset, i + 1);
      subset.pop();
    }
  }
  helper([], 0);
  return result;
}

/**
 * Evaluates 5 cards to determine hand type and relative strength tiebreakers.
 */
function evaluate5CardHand(cards) {
  const sorted = [...cards].sort((a, b) => b.rank - a.rank);
  const ranks = sorted.map(c => c.rank);
  const suits = sorted.map(c => c.suit);
  
  const isFlush = suits.every(s => s === suits[0]);
  
  // Check straight
  let isStraight = false;
  const uniqueRanks = Array.from(new Set(ranks));
  let straightHigh = 0;
  if (uniqueRanks.length === 5) {
    if (ranks[0] - ranks[4] === 4) {
      isStraight = true;
      straightHigh = ranks[0];
    } else if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 && ranks[3] === 3 && ranks[4] === 2) {
      // Ace-low straight (A, 5, 4, 3, 2)
      isStraight = true;
      straightHigh = 5;
    }
  }
  
  // Count counts of each rank
  const counts = {};
  ranks.forEach(r => { counts[r] = (counts[r] || 0) + 1; });
  const countsArray = Object.keys(counts).map(r => ({ rank: parseInt(r), count: counts[r] }));
  
  // Sort countsArray by count descending, then rank descending
  countsArray.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return b.rank - a.rank;
  });
  
  let type = 0;
  let tieBreakers = [];
  
  if (isStraight && isFlush) {
    if (straightHigh === 14) {
      type = 9; // Royal Flush
    } else {
      type = 8; // Straight Flush
    }
    tieBreakers = [straightHigh];
  } else if (countsArray[0].count === 4) {
    type = 7; // Four of a Kind
    tieBreakers = [countsArray[0].rank, countsArray[1].rank];
  } else if (countsArray[0].count === 3 && countsArray[1].count === 2) {
    type = 6; // Full House
    tieBreakers = [countsArray[0].rank, countsArray[1].rank];
  } else if (isFlush) {
    type = 5; // Flush
    tieBreakers = ranks;
  } else if (isStraight) {
    type = 4; // Straight
    tieBreakers = [straightHigh];
  } else if (countsArray[0].count === 3) {
    type = 3; // Three of a Kind
    tieBreakers = [countsArray[0].rank, countsArray[1].rank, countsArray[2].rank];
  } else if (countsArray[0].count === 2 && countsArray[1].count === 2) {
    type = 2; // Two Pair
    tieBreakers = [countsArray[0].rank, countsArray[1].rank, countsArray[2].rank];
  } else if (countsArray[0].count === 2) {
    type = 1; // One Pair
    tieBreakers = [countsArray[0].rank, countsArray[1].rank, countsArray[2].rank, countsArray[3].rank];
  } else {
    type = 0; // High Card
    tieBreakers = ranks;
  }
  
  return {
    type,
    typeName: getHandTypeName(type),
    tieBreakers
  };
}

function getHandTypeName(type) {
  const ja = ["ハイカード", "ワンペア", "ツーペア", "スリーカード", "ストレート", "フラッシュ", "フルハウス", "フォーカード", "ストレートフラッシュ", "ロイヤルフラッシュ"];
  const en = ["High Card", "One Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];
  return state.lang === "ja" ? ja[type] : en[type];
}

/**
 * LOCAL STORAGE HISTORY CONTROL
 */
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("wpt_history") || "[]");
  } catch (e) {
    return [];
  }
}

function saveHandResultToHistory(cards, isWin) {
  if (cards.length !== 2) return;
  const pfKey = getPreflopHandKey(cards);
  const activeCount = state.tour.players.filter(p => p.isActive).length;
  const idx = Math.max(0, Math.min(4, activeCount - 2));
  const winRate = PF_PROBS[pfKey] ? PF_PROBS[pfKey][idx] : 15;
  
  const record = {
    hand: pfKey,
    playersCount: activeCount,
    expectedRate: winRate,
    result: isWin ? "Win" : "Lose",
    timestamp: Date.now()
  };

  const history = getHistory();
  history.unshift(record);
  
  // Cap at 500 records for storing a much larger history
  if (history.length > 500) {
    history.pop();
  }

  localStorage.setItem("wpt_history", JSON.stringify(history));
}

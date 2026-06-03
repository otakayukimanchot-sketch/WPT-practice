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
    handHistory: "ハンド履歴 (最大50件分)",
    noHistory: "履歴がありません。プレイを開始してください。",
    expectedWin: "想定プリフロップ勝率",
    actualResult: "結果",
    diffFromAvg: "期待値との差",
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
    congrats: "優勝：Hero！",
    newGame: "ニューゲーム",
    rematch: "同じ人数で再戦",
    mainMenu: "メインメニュー",
    champion: "チャンピオン",
    rank: "順位",
    confirmNewGame: "新しくゲームを始めますか？履歴は保持されます。",
    blindUp: "ブラインド上昇！"
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
    handHistory: "Hand History (Last 50 hands)",
    noHistory: "No history found. Start playing to log results.",
    expectedWin: "Expected Preflop Win",
    actualResult: "Result",
    diffFromAvg: "Difference",
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
    congrats: "Champion: Hero!",
    newGame: "New Game",
    rematch: "Rematch",
    mainMenu: "Main Menu",
    champion: "Champion",
    rank: "Rank",
    confirmNewGame: "Start a new game? History will be kept.",
    blindUp: "Blinds Raised!"
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

// CPU Natural Names pool
const CPU_NAME_POOL = [
  { name: "Yuki", flag: "🇯🇵" },
  { name: "Sora", flag: "🇯🇵" },
  { name: "Alex", flag: "🇺🇸" },
  { name: "John", flag: "🇺🇸" },
  { name: "Lucas", flag: "🇫🇷" },
  { name: "Emma", flag: "🇫🇷" },
  { name: "Han", flag: "🇰🇷" },
  { name: "Min-ji", flag: "🇰🇷" },
  { name: "Oliver", flag: "🇬🇧" },
  { name: "Sophie", flag: "🇬🇧" },
  { name: "Maximilian", flag: "🇩🇪" },
  { name: "Anna", flag: "🇩🇪" },
  { name: "Mateo", flag: "🇪🇸" },
  { name: "Wang", flag: "🇨🇳" },
  { name: "Li", flag: "🇨🇳" }
];

// Local state
let state = {
  currentScreen: "title", // title, settings, history, playerCountSelect, game
  lang: localStorage.getItem("wpt_lang") === "en" ? "en" : "ja",
  difficulty: localStorage.getItem("wpt_diff") || "normal", // beginner, normal, hard, pro
  playerCount: 6,
  
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
    case "game":
      html = createGameScreenHtml();
      break;
  }

  mount.innerHTML = html;
  bindEvents();
}

/**
 * TITLE SCREEN
 */
function createTitleScreenHtml() {
  return `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in">
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

      <div class="text-center text-[10px] text-neutral-600 font-mono">
        PORTABLE FLOP WORKOUT ENGINE
      </div>
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

        <!-- Difficulty settings -->
        <div>
          <label class="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2.5 font-mono">
            ${t("difficulty")}
          </label>
          <div class="grid grid-cols-2 gap-3">
            ${["beginner", "normal", "hard", "pro"].map(diff => {
              const active = state.difficulty === diff;
              return `
                <button class="py-2.5 px-4 text-xs font-medium rounded-lg border text-left flex justify-between items-center ${active ? "border-amber-500 text-amber-500 bg-amber-500/5" : "border-neutral-800 text-neutral-400"}" onclick="changeDifficulty('${diff}')">
                  <span>${t(diff)}</span>
                  ${active ? `<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>` : ""}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <div class="text-[10px] text-neutral-600 font-mono text-center">
        DIFFICULTY CHANGES WILL BE REFLECTED FROM NEXT TOURNAMENT
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
        <button id="btn-history-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white">
          ${t("back")}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto pr-0.5 space-y-2">
        ${history.length === 0 ? `
          <div class="text-neutral-500 text-xs text-center py-12">${t("noHistory")}</div>
        ` : history.map((h, i) => {
          const isWin = h.result === "Win";
          const delta = isWin ? 100 - h.expectedRate : -h.expectedRate;
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
                <div class="text-[9px] text-neutral-500 mt-1 font-mono">
                  ${t("diffFromAvg")}: <span class="${delta >= 0 ? "text-emerald-500" : "text-rose-500"}">${delta >= 0 ? "+" : ""}${delta}%</span>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/**
 * PLAYER COUNT SELECT SCREEN
 */
function createPlayerCountScreenHtml() {
  return `
    <div class="flex-1 flex flex-col justify-between p-6 fade-in">
      <div>
        <div class="flex items-center justify-between mb-8 pb-3 border-b border-neutral-900">
          <h2 class="text-lg font-bold font-display text-neutral-200">${t("start")}</h2>
          <button id="btn-count-back" class="text-xs text-neutral-400 font-medium bg-neutral-900 py-1.5 px-3 rounded-md hover:text-white">
            ${t("back")}
          </button>
        </div>

        <p class="text-xs text-neutral-400 mb-6 font-medium">${t("selectPlayersCount")}</p>

        <div class="grid grid-cols-2 gap-3.5">
          ${[2, 3, 4, 5, 6].map(count => {
            return `
              <button class="py-4 px-4 bg-neutral-900 border border-neutral-800 rounded-lg font-display font-semibold hover:border-amber-500/50 hover:text-amber-500 text-neutral-200 transition-colors" onclick="startTournamentWith(${count})">
                <div class="text-xl">${count}-Max</div>
                <div class="text-[10px] text-neutral-500 font-mono mt-0.5">${count === 2 ? "Heads-Up" : `6-Max Tournament`}</div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="text-[10px] text-neutral-600 font-mono text-center">
        WPT STANDARD BRACKET SPEEDRUN
      </div>
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
        </div>
        <div class="flex items-center gap-3">
          <div class="text-amber-500">LEVEL ${Math.floor(tour.handCount / 5) + 1}: ${tour.sbSize} / ${tour.bbSize}</div>
          <button id="btn-quit" class="text-[9px] text-neutral-500 hover:text-neutral-300 font-mono border border-neutral-800 bg-[#0a0a0a] px-1.5 py-0.5 rounded tracking-normal normal-case">
            QUIT
          </button>
        </div>
      </div>

      <!-- TABLE AREA CONTAINER -->
      <div class="flex-1 relative flex flex-col justify-center my-3 max-h-[300px] min-h-[250px] select-none px-2">
        <div id="wpt-table-felt" class="wpt-poker-table-outer w-full h-[225px] flex flex-col justify-center items-center relative">
          <!-- Decorative interior oval line -->
          <div class="absolute inset-[24px] border border-neutral-900/10 rounded-[90px] pointer-events-none"></div>

          <!-- POT / CHIPS AREA -->
          <div id="table-pot-wrapper" class="absolute top-[28%] text-center z-10">
            <div class="text-[9px] tracking-widest text-neutral-500 font-bold uppercase">${t("pot")}</div>
            <div id="pot-amount" class="text-xl font-bold font-mono text-white tracking-tight">$${displayPot}</div>
          </div>

          <!-- COMMUNITY CARDS BAR -->
          <div id="community-area" class="absolute top-[52%] flex items-center justify-center gap-1.5 z-10 w-full px-8">
            ${createCommunityCardsHtml()}
          </div>
        </div>

        <!-- 6 SEATS PLACEMENT -->
        <div id="poker-seats-wrapper" class="absolute inset-0 pointer-events-none">
          ${createSeatsHtml()}
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
  let html = "";
  
  for (let i = 0; i < 5; i++) {
    const card = comm[i];
    if (card) {
      const cls = SUIT_CLASS[card.suit];
      const sym = SUIT_SYMBOL[card.suit];
      html += `
        <div class="wpt-card">
          <div class="card-rank">${card.rankLabel}</div>
          <div class="card-suit ${cls}">${sym}</div>
        </div>
      `;
    } else {
      // Empty card slot
      html += `
        <div class="w-[34px] h-[50px] border border-dashed border-neutral-800 rounded bg-[#050505]/40"></div>
      `;
    }
  }
  return html;
}

/**
 * Render player positions
 */
function createSeatsHtml() {
  const tour = state.tour;
  const positions = [
    { bottom: "3%", left: "50%", transform: "translateX(-50%)" }, // Seat 0 (Bottom, Hero)
    { bottom: "27%", left: "1.5%", transform: "none" },          // Seat 1 (Left Lower)
    { top: "27%", left: "1.5%", transform: "none" },             // Seat 2 (Left Higher)
    { top: "3%", left: "50%", transform: "translateX(-50%)" },   // Seat 3 (Top Central)
    { top: "27%", right: "1.5%", transform: "none" },            // Seat 4 (Right Higher)
    { bottom: "27%", right: "1.5%", transform: "none" }          // Seat 5 (Right Lower)
  ];

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
    if (hasD) btnBadge = `<div class="absolute -left-3.5 top-3.5 bg-white text-black text-[9px] rounded-full w-5 h-5 flex items-center justify-center font-black border border-black shadow-lg select-none z-10">D</div>`;
    else if (hasSB) btnBadge = `<div class="absolute -left-3.5 top-3.5 bg-gray-600 text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center font-black shadow-lg select-none z-10">SB</div>`;
    else if (hasBB) btnBadge = `<div class="absolute -left-3.5 top-3.5 bg-gray-800 text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center font-black shadow-lg select-none z-10">BB</div>`;

    html += `
      <div class="absolute flex flex-col items-center pointer-events-auto" style="bottom:${pos.bottom || 'auto'}; top:${pos.top || 'auto'}; left:${pos.left || 'auto'}; right:${pos.right || 'auto'}; transform:${pos.transform || 'none'};">
        <!-- ACTION BUBBLE -->
        <div class="${actionColorClass} ${p.actionText ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none transition-all duration-150"}">
          ${p.actionText || ""}
        </div>

        <!-- PLAYER BADGE -->
        <div class="relative w-20 bg-black/90 border ${isCurrentTurn ? "active-turn-ring border-amber-500 scale-102" : "border-[#222]"} rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-lg transition-all z-10">
          <div class="text-xs shrink-0 select-none">${p.flag}</div>
          <div class="text-[10px] truncate max-w-full font-bold font-display ${p.isHero ? "text-amber-400" : "text-neutral-200"} mt-0.5">${p.isHero ? "Hero" : p.name}</div>
          <div class="text-[9px] font-mono text-neutral-400 font-bold mt-0.5">$${p.stack}</div>
          
          <!-- Bet display -->
          ${p.totalBet > 0 ? `
            <div class="text-[8px] font-mono text-amber-500 font-bold mt-0.5 flex items-center justify-center gap-0.5 bg-neutral-950/80 px-1 rounded-sm w-full select-none border border-neutral-800">
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
  const base = "action-bubble-wpt ";
  switch (col) {
    case "red": return base + "bg-red-600 text-white";
    case "gray": return base + "bg-gray-500 text-white";
    case "green": return base + "bg-green-600 text-white";
    case "yellow": return base + "bg-amber-500 text-neutral-950";
    default: return base + "opacity-0 scale-90 pointer-events-none";
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
        <div class="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">My Hand</div>
        <div class="text-xs sm:text-sm font-bold text-neutral-200">${pfKey} • ${totalCount}-Max</div>
        <div class="text-base sm:text-lg font-black text-green-500">Win ${winRate}%</div>
      </div>
    `;
  } else {
    studyBlockHtml = `
      <div class="ml-2 flex flex-col justify-end">
        <div class="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">My Hand</div>
        <div class="text-xs sm:text-sm font-bold text-rose-500 italic">ELIMINATED</div>
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
        <div class="wpt-card scale-110 origin-bottom select-none animate-deal-l">
          <div class="card-rank text-sm font-bold">${c1.rankLabel}</div>
          <div class="card-suit text-xl ${SUIT_CLASS[c1.suit]}">${SUIT_SYMBOL[c1.suit]}</div>
        </div>
        <!-- Card 2 -->
        <div class="wpt-card scale-110 origin-bottom select-none animate-deal-r">
          <div class="card-rank text-sm font-bold">${c2.rankLabel}</div>
          <div class="card-suit text-xl ${SUIT_CLASS[c2.suit]}">${SUIT_SYMBOL[c2.suit]}</div>
        </div>
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

  return `
    <div class="bg-[#0a0a0a] p-4 border border-[#222] rounded-2xl flex flex-col gap-4">
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

  // Count select screen
  const btnCountBack = document.getElementById("btn-count-back");
  if (btnCountBack) btnCountBack.addEventListener("click", () => {
    state.currentScreen = "title";
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
    name: "Hero",
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
    finished: false
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

  // 3. Shuffling seat indices for randomized table visual seating
  const counts = tour.players.filter(p => p.isActive).length;
  // Get available visual indexes of the seats
  let candidateSeats = [0, 1, 2, 3, 4, 5].slice(0, state.playerCount);
  candidateSeats = candidateSeats.sort(() => 0.5 - Math.random());
  
  tour.players.forEach(p => {
    if (p.isActive) {
      p.seatIndex = candidateSeats.pop();
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
    p.currentRoundBet = 0;
    p.actionText = "";
    p.actionColor = "";
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
  }, 350);
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
  if (fullyActiveCount <= 1 && reachedAgreement()) {
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
    setTimeout(runTurnCycle, 50);
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
    }, 280); // Quick thinking mimic window
  }
}

/**
 * Check if the current bet round was fully matched or settled
 */
function reachedAgreement() {
  const tour = state.tour;
  const activePlayers = tour.players.filter(p => p.isActive && !p.isFolded);
  
  // Everyone must match the max bet or be all-in
  const betToMatch = tour.currentRoundMaxBet;
  
  for (let p of activePlayers) {
    if (p.isAllIn) continue;
    if (p.totalBet !== betToMatch) {
      return false;
    }
  }

  // Also has everyone had a chance to act?
  // If lastRaiserId === -1, it means we just started and no one acted
  if (tour.lastRaiserId === -1) {
    return false;
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
    p.totalBet = 0; // reset committed for new round
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
  setTimeout(runTurnCycle, 350);
}

/**
 * Board fast forward if all-ins happen
 */
function runRemainingBoardCards() {
  const tour = state.tour;
  // Sweep bets
  tour.players.forEach(p => {
    tour.pot += p.totalBet;
    p.totalBet = 0;
  });
  tour.currentRoundMaxBet = 0;

  while (tour.community.length < 5) {
    tour.community.push(tour.deck.pop());
  }

  tour.stage = "SHOWDOWN";
  renderApp();
  setTimeout(concludeRoundWithShowdown, 600);
}

/**
 * Handle Hero direct actions
 */
function handleHeroAction(actionType) {
  const tour = state.tour;
  const hero = tour.players.find(p => p.id === 0);
  const callPrice = tour.currentRoundMaxBet - hero.totalBet;

  if (actionType === "FOLD") {
    hero.isFolded = true;
    hero.actionText = t("fold");
    hero.actionColor = "red";
    tour.lastRaiserId = 0; // counted as acted
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 150);
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
    tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, hero.totalBet);
    tour.lastRaiserId = 0;
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 150);
  } else if (actionType === "ALLIN") {
    const raiseContribution = hero.stack;
    hero.totalBet += raiseContribution;
    hero.stack = 0;
    hero.isAllIn = true;
    hero.actionText = t("allin");
    hero.actionColor = "yellow";
    
    tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, hero.totalBet);
    tour.lastRaiserId = 0;
    setNextPlayerTurn();
    setTimeout(runTurnCycle, 150);
  }
}

/**
 * Handle fixed custom raise values for Hero
 */
window.handleHeroRaise = function(amt) {
  const tour = state.tour;
  const hero = tour.players.find(p => p.id === 0);
  const callPrice = tour.currentRoundMaxBet - hero.totalBet;
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

  tour.currentRoundMaxBet = hero.totalBet;
  // Hero is the new raiser
  tour.lastRaiserId = 0;
  
  setNextPlayerTurn();
  setTimeout(runTurnCycle, 150);
};

/**
 * AI CPU DECISION LOGIC
 * High-performance lightweight rule set mimicking WPT table dynamics.
 */
function executeCpuTurn(p) {
  const tour = state.tour;
  const callPrice = tour.currentRoundMaxBet - p.totalBet;
  
  // Basic hand equity profile simulation
  const cardPower = getPlayerCardStrengthScore(p);
  const difficulty = state.difficulty;
  
  // Decide action based on cards, difficulty, and pot situation
  let decision = "CALL"; // fold, call/check, raise, allin
  
  // Custom bluff probabilities
  let bluffProb = 0.05;
  if (difficulty === "hard") bluffProb = 0.12;
  if (difficulty === "pro") bluffProb = 0.22;

  // Active headcounts on high-level speedups
  const unfoldedCount = tour.players.filter(p => p.isActive && !p.isFolded).length;
  if (unfoldedCount <= 3 && (difficulty === "hard" || difficulty === "pro")) {
    // 2-3 Handed play naturally gets much more aggressive at scale
    bluffProb += 0.15;
  }

  const isBluff = Math.random() < bluffProb;

  // Decision formulation
  if (tour.stage === "PREFLOP") {
    // Preflop relies strictly on Hand Expectation Table
    const pfKey = getPreflopHandKey(p.cards);
    const winRate = PF_PROBS[pfKey] ? PF_PROBS[pfKey][0] : 18; // default fallback
    
    if (winRate > 62) {
      decision = Math.random() < 0.4 ? "RAISE" : "CALL";
    } else if (winRate > 44) {
      decision = Math.random() < 0.2 ? "RAISE" : "CALL";
    } else if (winRate > 28) {
      decision = "CALL";
    } else {
      decision = isBluff ? "CALL" : "FOLD";
    }

    // Force fold extremely weak preflop hand if high raise happened
    if (callPrice > tour.bbSize * 2 && winRate < 35 && !isBluff) {
      decision = "FOLD";
    }
  } else {
    // Postflop relies on evaluate5CardHand cardPower ranges
    // cardPower: 0(High) to 9(Royal)
    if (cardPower >= 3) {
      // 3-Card or above is high value
      decision = Math.random() < 0.55 ? "RAISE" : "CALL";
    } else if (cardPower >= 1) {
      // One/Two Pair
      if (callPrice > p.stack * 0.4) {
        decision = Math.random() < 0.3 ? "CALL" : "FOLD";
      } else {
        decision = "CALL";
      }
    } else {
      // Low card draws
      decision = (isBluff && Math.random() < 0.4) ? "RAISE" : (callPrice === 0 ? "CALL" : "FOLD");
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
      tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, p.totalBet);
      tour.lastRaiserId = p.id;
    } else {
      p.stack -= requiredCommit;
      p.totalBet += requiredCommit;
      p.actionText = `${t("raise")} $${requiredCommit}`;
      p.actionColor = "green";
      tour.currentRoundMaxBet = p.totalBet;
      tour.lastRaiserId = p.id;
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
    tour.currentRoundMaxBet = Math.max(tour.currentRoundMaxBet, p.totalBet);
  }

  setNextPlayerTurn();
  setTimeout(runTurnCycle, 150);
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
    p.totalBet = 0;
  });

  const winner = tour.players.find(p => p.isActive && !p.isFolded);
  winner.stack += tour.pot;
  winner.actionText = `WIN +$${tour.pot}`;
  winner.actionColor = "green";

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
  const potAllocations = distributePot(tour.players, tour.players.filter(p => p.isActive).map(p => p.id), showDownOrder);
  
  // Display outcomes on bubbles
  tour.players.forEach(p => {
    const share = potAllocations[p.id] || 0;
    if (share > 0) {
      p.stack += share;
      const matchedEval = showdownEvaluated.find(se => se.id === p.id);
      p.actionText = `${matchedEval.bestHand.typeName} +$${share}`;
      p.actionColor = "yellow";
    } else if (!p.isFolded) {
      p.actionText = t("fold");
      p.actionColor = "red";
    }
  });

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
function distributePot(players, activePlayerIds, showDownPlayers) {
  let contributions = players.map(p => ({ id: p.id, betLength: p.totalBet }));
  let potAllocations = players.map(p => 0);

  for (let winner of showDownPlayers) {
    let winnerId = winner.id;
    let winnerContrib = contributions.find(c => c.id === winnerId);
    if (!winnerContrib) continue;
    let winnerBet = winnerContrib.betLength;
    if (winnerBet <= 0) continue;

    let totalGained = 0;
    for (let contrib of contributions) {
      let chunk = Math.min(contrib.betLength, winnerBet);
      contrib.betLength -= chunk;
      totalGained += chunk;
    }
    potAllocations[winnerId] += totalGained;
  }

  // Sweep remainder
  let remainingPot = 0;
  for (let contrib of contributions) {
    remainingPot += contrib.betLength;
    contrib.betLength = 0;
  }
  if (remainingPot > 0 && showDownPlayers.length > 0) {
    const absoluteWinnerId = showDownPlayers[0].id;
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
        name: p.isHero ? "Hero" : p.name,
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
      name: winnerPlayer.isHero ? "Hero" : winnerPlayer.name,
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
  
  // Cap at 50 records for lightweight low overhead operation
  if (history.length > 50) {
    history.pop();
  }

  localStorage.setItem("wpt_history", JSON.stringify(history));
}

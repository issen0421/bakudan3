// ==========================================
// 💡 モーダル・チュートリアル制御
// ==========================================
const introStory = [
    "「よし、金庫前に着いたか。\n この金庫を開けるために、今からお前たちには\n ハッキング装置を組み立ててもらう。」",
    "「どうやらこの金庫には最新のセキュリティシステムが導入されているらしく、簡単には開かないようでな…そこでお前たちの出番だ。今開けた箱の中に、システムをハッキングする装置の部品を入れた。指示書通りに組み立てれば、きっと開けられるだろう。」",
    "「特殊なルートを通ってきたから警備に見つかる心配もない。時間は十分にあるから焦らず丁寧にな。装置の作り方の手順は箱の中に入れた。」",
    "「装置を完成させるためには3つのファイルをダウンロードする必要がある。外に内容が漏れないようパスワードがかけられているから、謎を解いて導いてくれ。\n\n まずは封筒①を開けて、ライトの配線を済ませてくれ。作戦開始だ！」"
];

let introIdx = 0;
function initIntro() {
    document.getElementById('intro-text').innerText = introStory[0];
}
function nextIntro() {
    introIdx++;
    if (introIdx < introStory.length) {
        document.getElementById('intro-text').innerText = introStory[introIdx];
        if (introIdx === introStory.length - 1) {
            document.getElementById('intro-indicator').style.display = 'none';
            document.getElementById('intro-btn').style.display = 'block';
        }
    }
}
function closeIntroModal(e) {
    e.stopPropagation();
    document.getElementById('intro-modal').style.display = 'none';
}

// ==========================================
// 💡 ボスの裏切りイベント (FILE 03 クリア後)
// ==========================================
const betrayalStory = [
    "【 通信を受信中... 】\n\n「……3つのファイルのダウンロードが完了したようだな。ご苦労だった。」",
    "「悪いな、実はお前が作っていた装置はハッキング装置ではなく、金庫の扉を吹き飛ばすための『爆弾』だったんだ。金庫の中身は俺が全てもらう。」",
    "「その爆弾には移動検知センサーがついている。金庫室から一歩でも出ようとすれば、その瞬間に即ドカンだ。」",
    "「逃げ場はないぞ。せいぜいそこで爆弾と一緒に吹き飛べ……！！」\n\n【 通信切断 】"
];

let betrayalIdx = 0;
function initBetrayal() {
    betrayalIdx = 0;
    document.getElementById('betrayal-modal').style.display = 'flex';
    document.getElementById('betrayal-text').innerText = betrayalStory[0];
    document.getElementById('betrayal-btn').style.display = 'none';
    document.getElementById('betrayal-indicator').style.display = 'block';
}

function nextBetrayal() {
    betrayalIdx++;
    if (betrayalIdx < betrayalStory.length) {
        document.getElementById('betrayal-text').innerText = betrayalStory[betrayalIdx];
        if (betrayalIdx === betrayalStory.length - 1) {
            document.getElementById('betrayal-indicator').style.display = 'none';
            document.getElementById('betrayal-btn').style.display = 'block';
        }
    }
}

function closeBetrayalModal(e) {
    e.stopPropagation();
    document.getElementById('betrayal-modal').style.display = 'none';
    document.getElementById('tab-last').style.display = 'block';
    switchApp('last');
}

// AIチュートリアル
const aiSequence = [
    { text: "[System AI]: ハッキング支援ナビゲーションを起動します。\n基本的な進行手順をご説明します。", highlight: null, aiPosition: 'bottom' },
    { text: "[System AI]: まずは画面中央の『メインプロトコル』を操作してください。\n初期状態では難解なセキュリティが設定されています。", highlight: 'main-protocol-area', aiPosition: 'bottom' },
    { text: "[System AI]: 解読が困難な場合は、プロトコルへの干渉（試行錯誤）を続けてください。\n一定回数操作するとシステムから『パネル開放権』が付与されます。", highlight: 'puzzle-points-area', aiPosition: 'bottom' },
    { text: "[System AI]: その権限を使用し、画面左下の『暗号化データ』のパネルを開放・解読してください。\n正解するとロック解除の『手がかりデータ』を入手できます。", highlight: 'puzzle-panel-area', aiPosition: 'top' },
    { text: "[System AI]: 手がかりによってメインプロトコルの構造が可視化されます。\n必ずしも全ての手がかりを集める必要はありません。\n状況に応じた最適なアプローチを選択してください。\n\nナビゲーションを終了します。", highlight: 'analysis-panel-area', aiPosition: 'top' }
];

let aiIdx = 0;
let hasSeenAITutorial = false;

function initAITutorial() {
    aiIdx = 0; 
    document.getElementById('ai-modal').style.display = 'flex';
    showAIText();
}

function nextAITutorial() {
    aiIdx++;
    if (aiIdx < aiSequence.length) {
        showAIText();
    } else {
        closeAITutorial();
    }
}

function showAIText() {
    const current = aiSequence[aiIdx];
    const textEl = document.getElementById('ai-text');
    textEl.innerText = current.text;
    const modal = document.getElementById('ai-modal');
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    modal.classList.remove('ai-mode-top', 'ai-mode-bottom');
    if (current.aiPosition === 'top') modal.classList.add('ai-mode-top');
    else modal.classList.add('ai-mode-bottom');

    if (current.highlight) {
        const targetEl = document.getElementById(current.highlight);
        targetEl.classList.add('tutorial-highlight');
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }
}

function closeAITutorial() {
    document.getElementById('ai-modal').style.display = 'none';
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 💡 ドットグリッド背景と五十音表の完全同期
// ==========================================
function alignBackgroundGrid() {
    const table = document.getElementById('gojuon-table');
    if (table) {
        const rect = table.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        document.body.style.backgroundPosition = `${x + 20}px ${y + 20}px`;
    }
}
window.addEventListener('resize', alignBackgroundGrid);

// ==========================================
// STEP 1: 五十音表と図形描画ロジック
// ==========================================
const gojuonLayout = [
    ['ん','わ','ら','や','ま','は','な','た','さ','か','あ'],
    ['','','り','','み','ひ','に','ち','し','き','い'],
    ['','','る','ゆ','む','ふ','ぬ','つ','す','く','う'],
    ['','','れ','','め','へ','ね','て','せ','け','え'],
    ['','を','ろ','よ','も','ほ','の','と','そ','こ','お']
];

const blockData = {
    'A': { color: '#ec3321', chars4: ['う','い','る','す'], chars2: ['い','す'] }, 
    'B': { color: '#ff8b00', chars4: ['く','り','お','ね'], chars2: ['く','り'] }, 
    'C': { color: '#fdd900', chars4: ['し','い','た','け'], chars2: ['い','け'] }, 
    'D': { color: '#00b18e', chars4: ['か','し','つ','き'], chars2: ['つ','き'] }, 
    'E': { color: '#0081ce', chars4: ['と','く','し','ま'], chars2: ['く','ま'] }, 
    'F': { color: '#58278c', chars4: ['あ','め','り','か'], chars2: ['あ','り'] }  
};

function initGojuon() {
    const table = document.getElementById("gojuon-table");
    gojuonLayout.forEach(row => {
        row.forEach(char => {
            let div = document.createElement("div");
            if (char === "") {
                div.className = "gojuon-cell empty";
            } else {
                div.className = "gojuon-cell";
                div.id = "gojuon-" + char;
            }
            table.appendChild(div);
        });
    });
}

let currentDrawMode = 0; 
function drawGojuonShape(id, mode) {
    const svg = document.getElementById("gojuon-svg");
    if (!id || mode === 0) {
        if (currentDrawMode !== 0) {
            svg.innerHTML = "";
            currentDrawMode = 0;
        }
        return;
    }
    if (currentDrawMode === mode && svg.dataset.currentId === id) return;
    svg.innerHTML = "";
    currentDrawMode = mode;
    svg.dataset.currentId = id;
    
    if (mode === 4) {
        const data = blockData[id];
        const chars = data.chars4;
        let points = [];
        chars.forEach(char => {
            const cell = document.getElementById("gojuon-" + char);
            if (cell) {
                const x = cell.offsetLeft + cell.offsetWidth / 2;
                const y = cell.offsetTop + cell.offsetHeight / 2;
                points.push(`${x},${y}`);
            }
        });
        if (points.length > 2) {
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.join(" "));
            polygon.setAttribute("fill", data.color + "30"); 
            polygon.setAttribute("stroke", data.color);
            polygon.setAttribute("stroke-width", "3");
            polygon.setAttribute("stroke-linejoin", "round");
            polygon.style.filter = `drop-shadow(0 0 5px ${data.color})`;
            svg.appendChild(polygon);
        }
        // 💡 STEP 1のヒント数削減に合わせ、1つ目の手がかり解放で円を描画する
        if (unlockedAnalysisCount[1] >= 1) {
            data.chars4.forEach(char => {
                const cell = document.getElementById("gojuon-" + char);
                if (cell) {
                    const x = cell.offsetLeft + cell.offsetWidth / 2;
                    const y = cell.offsetTop + cell.offsetHeight / 2;
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("cx", x);
                    circle.setAttribute("cy", y);
                    circle.setAttribute("r", "6");
                    circle.setAttribute("fill", "#fff");
                    circle.setAttribute("stroke", data.color);
                    circle.setAttribute("stroke-width", "3");
                    svg.appendChild(circle);
                }
            });
        }
    }
}

let currentDragId = null;
let currentDragZone = 0; 
function allowDrop(e) { 
    e.preventDefault(); 
    if(e.target.classList.contains('slot') || e.target.classList.contains('item-slot')) {
        e.target.classList.add('drag-over'); 
    }
}
function dragLeave(e) { e.target.classList.remove('drag-over'); }
function dragItem(e) { 
    e.dataTransfer.setData("text", e.target.id); 
    currentDragId = e.target.id;
    currentDragZone = 0; 
}

document.addEventListener('dragover', (e) => {
    if (!currentDragId) return;
    const isTopSlot = e.target.closest('.s1-slots');
    const isBottomPool = e.target.closest('.s1-items');
    let newZone = 0;
    if (isBottomPool) newZone = 1;
    else if (isTopSlot) newZone = 2;
    if (currentDragZone !== newZone) {
        currentDragZone = newZone;
        if (currentDragZone === 1) {
            drawGojuonShape(currentDragId, 4); 
            sendCommand("P1111"); 
        } else if (currentDragZone === 2) {
            drawGojuonShape(null, 0); 
            const ledPatterns = { 'A': 'P0101', 'B': 'P1100', 'C': 'P0101', 'D': 'P0011', 'E': 'P0101', 'F': 'P1010' };
            if (ledPatterns[currentDragId]) sendCommand(ledPatterns[currentDragId]); 
        } else {
            drawGojuonShape(null, 0); 
            sendCommand("P0000"); 
        }
    }
});

function dragEndItem(e) {
    sendCommand('P0000');
    currentDragId = null;
    currentDragZone = 0;
    drawGojuonShape(null, 0);
}

function drop(e) {
    e.preventDefault(); e.target.classList.remove('drag-over');
    let dropTarget = e.target.classList.contains('item') ? e.target.parentElement : e.target;
    const data = e.dataTransfer.getData("text"); 
    const dragged = document.getElementById(data);
    const sourceEl = dragged.parentElement; 
    if (dropTarget.classList.contains('slot')) {
        if (dropTarget.children.length > 0) {
            let existingItem = dropTarget.children[0];
            sourceEl.appendChild(existingItem);
        }
        dropTarget.appendChild(dragged);
    } else if (dropTarget.classList.contains('item-slot') || dropTarget.id.startsWith("pool-")) {
        document.getElementById("pool-" + dragged.id).appendChild(dragged);
    }
}

function completeWire(num) {
    if(num === 1) {
        document.getElementById('line-1').style.display = 'block';
        document.getElementById('line-1').classList.add('active');
        document.getElementById('tab-step1').style.display = 'block';
        switchApp('step1');
    } else if(num === 2) {
        document.getElementById('line-3').style.display = 'block';
        document.getElementById('line-3').classList.add('active');
        document.getElementById('tab-step2').style.display = 'block';
        switchApp('step2');
    } else if(num === 3) {
        document.getElementById('line-5').style.display = 'block';
        document.getElementById('line-5').classList.add('active');
        document.getElementById('tab-step3').style.display = 'block';
        switchApp('step3');
    }
}

function switchApp(appId) {
    document.querySelectorAll('.app-container').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn, .tab-icon').forEach(el => el.classList.remove('active'));
    document.getElementById(`app-${appId}`).classList.add('active');
    document.getElementById(`tab-${appId}`).classList.add('active');
    
    if (appId === 'step1') {
        setTimeout(alignBackgroundGrid, 50); 
        if (!hasSeenAITutorial) {
            hasSeenAITutorial = true;
            setTimeout(initAITutorial, 600);
        }
    }
}

// ==========================================
// ポリオミノ盤面生成ロジック (STEP3用)
// ==========================================
const polyPiecesLayout = [
    [['',  '',  'R', ''],['U', 'V', 'W', 'X']],
    [['',  'D', 'E'],['',  'I', ''],['M', 'N', '']],
    [['', 'J', ''],['', 'O', ''],['S', 'T', ''],['', 'Y', 'Z']],
    [['A', 'B', 'C'],['F', '',  'H']],
    [['',  'G'],['K', 'L'],['P', 'Q']]
];
const blackCells = new Set(['A','D','E','F','H','I','M','N','O','R','S','T','U','W']);

function initPolyomino() {
    const container = document.getElementById("pieces-container");
    if(!container) return;
    container.innerHTML = "";
    polyPiecesLayout.forEach((piece, index) => {
        let pieceDiv = document.createElement("div");
        pieceDiv.className = `poly-piece piece-${index + 1}`;
        piece.forEach(row => {
            row.forEach(char => {
                let div = document.createElement("div");
                if (char === "") {
                    div.className = "poly-cell empty";
                } else {
                    div.id = "poly-" + char;
                    div.innerText = char; 
                    if (blackCells.has(char)) {
                        div.className = "poly-cell black";
                    } else {
                        div.className = "poly-cell white";
                        div.onclick = () => clickPolyomino(char);
                    }
                }
                pieceDiv.appendChild(div);
            });
        });
        container.appendChild(pieceDiv);
    });
}

let polyTimer;
function clickPolyomino(char) {
    let row = getRow(char);
    let val = (row === 1) ? '1' : (row === 2) ? '2' : (row === 3) ? '3' : '0';
    if (polyTimer) clearTimeout(polyTimer);
    sendCommand("S" + val + val + val + val);
    document.querySelectorAll(".poly-cell.active").forEach(el => el.classList.remove("active"));
    let cell = document.getElementById("poly-" + char);
    if (cell) cell.classList.add("active");
    polyTimer = setTimeout(() => {
        sendCommand("S0000");
        if (cell) cell.classList.remove("active");
    }, 2000);
}

// ==========================================
// シリアル通信 & ハードウェアテスト
// ==========================================
let port; let writer;
async function connectSerial() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        const encoder = new TextEncoderStream();
        encoder.readable.pipeTo(port.writable);
        writer = encoder.writable.getWriter();
        readLoop(port.readable);
        alert("デバイスとの接続を確立しました。");
    } catch (err) { alert("接続エラー: " + err); }
}

async function readLoop(readableStream) {
    const decoder = new TextDecoderStream();
    readableStream.pipeTo(decoder.writable);
    const reader = decoder.readable.getReader();
    let buffer = "";
    while (true) {
        const { value, done } = await reader.read();
        if (value) {
            buffer += value;
            let lines = buffer.split('\n');
            buffer = lines.pop(); 
            for (let line of lines) {
                if (line.includes("DEFUSED")) showEnding(true);
                if (line.includes("EXPLODED")) showEnding(false);
            }
        }
        if (done) break;
    }
}

async function sendCommand(cmd) { if (writer) await writer.write(cmd + "\n"); }

function testLight() { sendCommand("P1111"); setTimeout(() => sendCommand("P0000"), 1000); }
function testBuzzer() { sendCommand("B"); }
function testMonitor() { sendCommand("S1231"); setTimeout(() => sendCommand("S0000"), 1000); }

function testWireLight() {
    if(document.getElementById('btn-test-light').disabled) return;
    sendCommand("P1111"); 
    setTimeout(() => sendCommand("P0000"), 2500); 
    document.getElementById('btn-next-wire1').style.display = 'block';
}
function testWireBuzzer() {
    if(document.getElementById('btn-test-buzzer').disabled) return;
    sendCommand("B"); 
    document.getElementById('btn-next-wire2').style.display = 'block';
}
function testWireMonitor() {
    if(document.getElementById('btn-test-monitor').disabled) return;
    sendCommand("S2222"); 
    setTimeout(() => sendCommand("S0000"), 2500); 
    document.getElementById('btn-next-wire3').style.display = 'block';
}

function devUnlockTabs() { 
    ['line-1','line-2','line-3','line-4','line-5'].forEach(id => {
        document.getElementById(id).style.display = 'block';
        document.getElementById(id).classList.add('active');
    });
    ['tab-step1','tab-wire2','tab-step2','tab-wire3','tab-step3','tab-last'].forEach(id => {
        document.getElementById(id).style.display = 'block';
    });
}

// ==========================================
// 💡 スクラッチ小謎 ＆ 解析データ 管理システム
// ==========================================
// 💡 すべてのSTEPを3つに変更
const maxPuzzles = { 1: 3, 2: 3, 3: 3 };
const puzzleFiles = {
    1: ["A", "B", "C"],
    2: ["A", "B", "C"],
    3: ["A", "B", "C"]
};

let availableAnalysisPoints = { 1: 0, 2: 0, 3: 0 }; 
let unlockedAnalysisCount = { 1: 0, 2: 0, 3: 0 }; 
let analysisIdx = { 1: 0, 2: 0, 3: 0 }; 
let currentPuzzleIdx = { 1: 0, 2: 0, 3: 0 }; 
let openPoints = { 1: 0, 2: 0, 3: 0 }; 
let panelsState = { 1: [], 2: [], 3: [] };
let isSolved = { 1: [], 2: [], 3: [] };
let triedPatterns = { 1: new Set(), 2: new Set(), 3: new Set() };
let validTrials = { 1: 0, 2: 0, 3: 0 };

const puzzleDict = {
    1: {"てすと1":0, "てすと2":1, "てすと3":2},
    2: {"てすと1":0, "てすと2":1, "てすと3":2},
    3: {"てすと1":0, "てすと2":1, "てすと3":2}
};

const QWERTY_TOP = "QWERTYUIOP"; const QWERTY_MID = "ASDFGHJKL"; const QWERTY_BOT = "ZXCVBNM";
function getRow(char) { return QWERTY_TOP.includes(char) ? 1 : QWERTY_MID.includes(char) ? 2 : QWERTY_BOT.includes(char) ? 3 : 0; }

function initPuzzles() {
    for(let s=1; s<=3; s++) {
        for(let p=0; p<maxPuzzles[s]; p++) {
            panelsState[s].push(new Array(9).fill(false));
            isSolved[s].push(false);
        }
        renderPuzzleGrid(s);
        updateAnalysisCarousel(s);
    }
}

function addPoint(step) {
    openPoints[step]++;
    document.getElementById(`puzzlePoints-s${step}`).innerText = openPoints[step];
}

function renderPuzzleGrid(step) {
    const pIdx = currentPuzzleIdx[step];
    const grid = document.getElementById(`puzzleGrid-s${step}`);
    const overlay = document.getElementById(`solvedOverlay-s${step}`);
    const placeholder = document.getElementById(`puzzlePlaceholder-s${step}`);
    
    document.getElementById(`puzzleIndicator-s${step}`).innerText = `DATA ${puzzleFiles[step][pIdx]}`;
    placeholder.innerHTML = `FILE 0${step}<br>暗号化データ ${puzzleFiles[step][pIdx]}`;
    
    if (isSolved[step][pIdx]) {
        grid.style.display = "none";
        overlay.style.display = "flex";
    } else {
        grid.style.display = "grid";
        overlay.style.display = "none";
        grid.innerHTML = "";
        for(let i=0; i<9; i++) {
            let div = document.createElement("div");
            div.className = "grid-panel";
            if (panelsState[step][pIdx][i]) {
                div.classList.add("open");
            } else {
                div.onclick = () => openPanel(step, pIdx, i);
            }
            grid.appendChild(div);
        }
    }
    document.getElementById(`btn-prev-puzzle-s${step}`).style.visibility = (pIdx === 0) ? 'hidden' : 'visible';
    document.getElementById(`btn-next-puzzle-s${step}`).style.visibility = (pIdx === maxPuzzles[step] - 1) ? 'hidden' : 'visible';
}

function openPanel(step, pIdx, panelIdx) {
    if (openPoints[step] > 0) {
        openPoints[step]--;
        panelsState[step][pIdx][panelIdx] = true;
        document.getElementById(`puzzlePoints-s${step}`).innerText = openPoints[step];
        renderPuzzleGrid(step);
    }
}

function prevPuzzle(step) { if(currentPuzzleIdx[step] > 0) { currentPuzzleIdx[step]--; renderPuzzleGrid(step); } }
function nextPuzzle(step) { if(currentPuzzleIdx[step] < maxPuzzles[step] - 1) { currentPuzzleIdx[step]++; renderPuzzleGrid(step); } }

function submitAnswer(step) {
    const input = document.getElementById(`answerInput-s${step}`).value.trim();
    const feedback = document.getElementById(`terminalFeedback-s${step}`);
    const dict = puzzleDict[step];

    if (input in dict) {
        const pIdx = dict[input]; 
        if (!isSolved[step][pIdx]) {
            isSolved[step][pIdx] = true;
            availableAnalysisPoints[step]++;
            document.getElementById(`analysisPoints-s${step}`).innerText = availableAnalysisPoints[step];
        }
        feedback.style.color = "#0f0";
        feedback.innerText = "DATA DECODED";
        
        renderPuzzleGrid(step); 
        updateAnalysisCarousel(step); 
        document.getElementById(`answerInput-s${step}`).value = ""; 

        sendCommand("B");
        setTimeout(() => { feedback.innerText = ""; }, 2000);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "❌";
        setTimeout(() => { if (feedback.innerText === "❌") feedback.innerText = ""; }, 2000);
    }
}

function unlockAnalysis(step) {
    if (availableAnalysisPoints[step] > 0 && unlockedAnalysisCount[step] < maxPuzzles[step]) {
        availableAnalysisPoints[step]--;
        unlockedAnalysisCount[step]++;
        document.getElementById(`analysisPoints-s${step}`).innerText = availableAnalysisPoints[step];
        
        analysisIdx[step] = unlockedAnalysisCount[step] - 1; 
        updateAnalysisCarousel(step);
        
        sendCommand("P1111"); 
        setTimeout(() => sendCommand("P0000"), 500); 
        
        // 💡 STEP1のUI解放のタイミングを前倒し（1, 2, 3個目）に変更
        if (step === 1 && unlockedAnalysisCount[1] >= 2) {
            document.getElementById("s1-slots-container").classList.add("size-hint-active");
        }
        if (step === 1 && unlockedAnalysisCount[1] === 3) {
            document.getElementById("gojuon-table").classList.add("revealed");
        }
        
        // 💡 STEP2は3つ解いたら数字を表示する
        if (step === 2 && unlockedAnalysisCount[2] === 3) {
            document.getElementById("vol-0").style.display = "block";
            document.getElementById("vol-1").style.display = "block";
            document.getElementById("vol-2").style.display = "block";
        }
    }
}

function updateAnalysisCarousel(step) {
    const idx = analysisIdx[step];
    const pName = puzzleFiles[step][idx];
    const placeholder = document.getElementById(`analysisPlaceholder-s${step}`);
    
    if (idx < unlockedAnalysisCount[step]) {
        if (step === 1) {
            // 💡 FILE 1: 段階的にシステム更新テキストを表示
            if (idx === 0) {
                placeholder.innerHTML = `【システム更新】<br><span style="font-size:14px;color:#c9d1d9;">データポイントの<br>接続座標を特定</span>`;
            } else if (idx === 1) {
                placeholder.innerHTML = `【システム更新】<br><span style="font-size:14px;color:#c9d1d9;">メインスロットの<br>データサイズを可視化</span>`;
            } else if (idx === 2) {
                placeholder.innerHTML = `ALL DECODED<br><span style="font-size:14px;color:#c9d1d9;">ダッシュボードの<br>不可視レイヤーを解除</span>`;
            }
        } else if (step === 2) {
            // 💡 FILE 2: 手がかり3はテキスト表示、1と2は画像表示
            if (idx === 2) {
                placeholder.innerHTML = `【システム更新】<br><span style="font-size:14px;color:#c9d1d9;">メインプロトコルの<br>データ容量が可視化されました</span>`;
            } else {
                placeholder.innerHTML = `<img src="FILE2_hint${idx + 1}.jpg" style="width:100%; height:100%; object-fit:contain; border-radius:3px; padding:5px; box-sizing:border-box;">`;
            }
        } else if (step === 3) {
            // 💡 FILE 3: すべて画像表示
            placeholder.innerHTML = `<img src="FILE3_hint${idx + 1}.jpg" style="width:100%; height:100%; object-fit:contain; border-radius:3px; padding:5px; box-sizing:border-box;">`;
        } else {
            placeholder.innerHTML = `DECRYPTED: DATA ${pName}`;
        }
        placeholder.style.color = "#0f0";
        placeholder.style.borderColor = "#0f0";
        placeholder.style.cursor = "default";
        placeholder.onclick = null;
    } else {
        if (idx === unlockedAnalysisCount[step] && availableAnalysisPoints[step] > 0) {
            placeholder.innerHTML = `タップして解放 🔓`;
            placeholder.style.color = "#58a6ff";
            placeholder.style.borderColor = "#58a6ff";
            placeholder.style.cursor = "pointer";
            placeholder.onclick = () => unlockAnalysis(step);
        } else {
            placeholder.innerHTML = `Locked 🔐`;
            placeholder.style.color = "#555";
            placeholder.style.borderColor = "#555";
            placeholder.style.cursor = "default";
            placeholder.onclick = null;
        }
    }
    
    let dots = "";
    for(let i=0; i<maxPuzzles[step]; i++) {
        if (i === idx) dots += "🟢";
        else if (i < unlockedAnalysisCount[step]) dots += "⚪";
        else dots += "⚫";
    }
    document.getElementById(`analysisIndicator-s${step}`).innerText = dots;
    document.getElementById(`btn-prev-analysis-s${step}`).style.visibility = (idx === 0) ? 'hidden' : 'visible';
    const maxIdx = Math.min(maxPuzzles[step] - 1, unlockedAnalysisCount[step]);
    document.getElementById(`btn-next-analysis-s${step}`).style.visibility = (idx >= maxIdx) ? 'hidden' : 'visible';
}

function prevAnalysis(step) { if (analysisIdx[step] > 0) { analysisIdx[step]--; updateAnalysisCarousel(step); } }
function nextAnalysis(step) { const maxIdx = Math.min(maxPuzzles[step] - 1, unlockedAnalysisCount[step]); if (analysisIdx[step] < maxIdx) { analysisIdx[step]++; updateAnalysisCarousel(step); } }

// ==========================================
// 🚫 リアルハッカー（ソースコード閲覧）対策システム
// ==========================================
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) || 
        (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
        (e.metaKey && (e.key === 'U' || e.key === 'u'))
    ) {
        e.preventDefault();
        alert("【SECURITY ALERT】\n不正なシステム干渉を検知しました。\nアクセスログを記録しています...");
    }
});

// ==========================================
// STEP 1 メイン
// ==========================================
const s1_answer = ["F", "B", "A", "E", "C", "D"];
function checkClearStep1() {
    const slots = document.querySelectorAll('#app-step1 .s1-slot');
    let placedItems = [];
    for (let slot of slots) {
        if (slot.children.length === 0) {
            const res = document.getElementById("result-step1");
            res.innerText = "❌";
            res.style.color = "#ff7b72";
            setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
            return;
        }
        placedItems.push(slot.children[0].id);
    }
    let pattern = placedItems.join("");
    if (!triedPatterns[1].has(pattern)) {
        triedPatterns[1].add(pattern);
        validTrials[1]++;
        if (validTrials[1] % 3 === 0) addPoint(1);
    }
    let isCorrect = placedItems.every((val, i) => val === s1_answer[i]);
    const res = document.getElementById("result-step1");
    if (isCorrect) {
        res.innerText = "🎉 CLEAR!";
        res.style.color = "#2ea043";
        document.getElementById('line-2').style.display = 'block';
        document.getElementById('line-2').classList.add('active');
        document.getElementById('tab-wire2').style.display = 'block';
        sendCommand("P1111"); 
        setTimeout(() => sendCommand("P0000"), 3000); 
    } else {
        res.innerText = "❌";
        res.style.color = "#ff7b72";
        setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
    }
}

// ==========================================
// STEP 2 メイン 
// ==========================================
const S2_CAPACITIES = [10, 7, 3];
let s2_volumes = [10, 0, 0];
let s2_selectedNode = null;
let s2_isTransferring = false;

function updateNodeColors() {
    const slotDisplay = document.getElementById('s2-slot-display');
    if (s2_isTransferring) {
        slotDisplay.innerText = "⚫ ⚫"; 
        for(let i=0; i<3; i++) {
            const vol = document.getElementById(`vol-${i}`);
            if(vol) vol.innerText = s2_volumes[i];
            document.getElementById(`node-${i}`).className = "s2-node";
            if(s2_volumes[i] === S2_CAPACITIES[i] && S2_CAPACITIES[i] > 0) document.getElementById(`node-${i}`).classList.add('full');
            document.getElementById(`dot-${i}`).className = "s2-status-dot";
            document.getElementById(`dot-${i}`).innerText = "⚪";
        }
        return;
    }
    for (let i = 0; i < 3; i++) {
        const node = document.getElementById(`node-${i}`);
        const dot = document.getElementById(`dot-${i}`);
        const vol = document.getElementById(`vol-${i}`);
        if(vol) vol.innerText = s2_volumes[i];
        node.className = "s2-node"; 
        if (s2_volumes[i] === S2_CAPACITIES[i] && S2_CAPACITIES[i] > 0) node.classList.add('full');
        if (s2_selectedNode === null) {
            slotDisplay.innerText = "⚪ ⚪";
            if (s2_volumes[i] > 0) {
                dot.className = "s2-status-dot active"; dot.innerText = "⚫";
            } else {
                dot.className = "s2-status-dot"; dot.innerText = "⚪";
            }
        } else {
            slotDisplay.innerText = "⚫ ⚪";
            if (i === s2_selectedNode) {
                node.classList.add('selected');
                dot.className = "s2-status-dot active"; dot.innerText = "⚫";
            } else {
                if (S2_CAPACITIES[i] - s2_volumes[i] > 0) {
                    dot.className = "s2-status-dot active"; dot.innerText = "⚫";
                } else {
                    dot.className = "s2-status-dot"; dot.innerText = "⚪";
                }
            }
        }
    }
}

function handleNodeClick(index) {
    if (s2_isTransferring) return; 
    if (s2_selectedNode === null) {
        if (s2_volumes[index] === 0) return; 
        s2_selectedNode = index;
        updateNodeColors();
    } else {
        if (s2_selectedNode === index) { 
            s2_selectedNode = null;
            updateNodeColors();
            return;
        }
        let from = s2_selectedNode; let to = index;
        s2_selectedNode = null;

        let transferAmount = Math.min(s2_volumes[from], S2_CAPACITIES[to] - s2_volumes[to]);
        if (transferAmount > 0) {
            s2_volumes[from] -= transferAmount;
            s2_volumes[to] += transferAmount;
            
            let pattern = s2_volumes.join(",");
            if (!triedPatterns[2].has(pattern)) {
                triedPatterns[2].add(pattern);
                validTrials[2]++;
                if (validTrials[2] % 3 === 0) addPoint(2);
            }
            
            let beeps = 0; s2_isTransferring = true; updateNodeColors();
            const interval = setInterval(() => {
                sendCommand("B");
                beeps++;
                if (beeps >= transferAmount) {
                    clearInterval(interval);
                    s2_isTransferring = false;
                    updateNodeColors();
                    if (s2_volumes[0] === 5 && s2_volumes[1] === 5) {
                        document.getElementById("result-step2").innerText = "🎉 CLEAR!";
                        document.getElementById("result-step2").style.color = "#2ea043";
                        document.getElementById('line-4').style.display = 'block';
                        document.getElementById('line-4').classList.add('active');
                        document.getElementById('tab-wire3').style.display = 'block';
                    }
                }
            }, 400); 
        } else {
            updateNodeColors();
        }
    }
}
function resetStep2() {
    if (s2_isTransferring) return;
    s2_volumes = [10, 0, 0]; s2_selectedNode = null;
    updateNodeColors();
    document.getElementById("result-step2").innerText = ""; 
}

// ==========================================
// STEP 3 メイン
// ==========================================
let ledTimer;
function executeMainPuzzle() {
    const slots = document.querySelectorAll('#app-step3 .s3-slot');
    let placedWords = [];
    for (let slot of slots) {
        if (slot.children.length === 0) { 
            const res = document.getElementById("result-step3");
            res.innerText = "❌"; 
            res.style.color = "#ff7b72";
            setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
            return; 
        }
        placedWords.push(slot.children[0].id);
    }
    let pattern = placedWords.join("");
    if (!triedPatterns[3].has(pattern)) {
        triedPatterns[3].add(pattern);
        validTrials[3]++;
        if (validTrials[3] % 3 === 0) addPoint(3);
    }

    let validJoints = 0;
    for (let i = 0; i < 4; i++) {
        let w1 = placedWords[i], w2 = placedWords[i+1];
        if (getRow(w1[0]) !== getRow(w2[0]) && getRow(w1[1]) !== getRow(w2[1]) && getRow(w1[2]) !== getRow(w2[2])) validJoints++;
    }
    if (ledTimer) clearTimeout(ledTimer);
    sendCommand("L" + validJoints);
    if (validJoints === 0) sendCommand("B");
    
    ledTimer = setTimeout(() => sendCommand("L0"), 3000);
    
    const res = document.getElementById("result-step3");
    if (validJoints === 4) {
        clearTimeout(ledTimer);
        setTimeout(() => {
            res.innerText = "🎉 CLEAR!";
            res.style.color = "#0f0";
            initBetrayal();
        }, 500);
    } else {
        res.innerText = "❌";
        res.style.color = "#ff7b72";
        setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
    }
}

// ==========================================
// LAST STEP (BOMB) メイン
// ==========================================
let lastTimerInterval;
function startLastStep() {
    document.getElementById('last-start-screen').style.display = 'none';
    document.getElementById('last-active-screen').style.display = 'block';
    
    ['btn-test-light', 'btn-test-buzzer', 'btn-test-monitor'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.innerText += " (ロック中)";
        }
    });

    sendCommand("Z"); // 💣Arduino側の爆弾起動コマンド
    
    let timeRemaining = 600;
    lastTimerInterval = setInterval(() => {
        timeRemaining--;
        if(timeRemaining === 480) document.getElementById('last-hint-8').style.display = 'block';
        if(timeRemaining === 360) document.getElementById('last-hint-6').style.display = 'block';
        if(timeRemaining === 240) document.getElementById('last-hint-4').style.display = 'block';
        if (timeRemaining <= 0) clearInterval(lastTimerInterval);
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => { 
    initIntro();
    initGojuon();
    initPolyomino();
    initPuzzles(); 
    updateNodeColors(); 
    alignBackgroundGrid(); 
});

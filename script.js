// ==========================================
// 💡 スタート画面と音声アンロック
// ==========================================
let isAudioUnlocked = false;

function startMission() {
    const screen = document.getElementById('start-screen');
    if (!screen) return;
    screen.style.display = 'none';

    if (!isAudioUnlocked) {
        msgAudio.muted = true; 
        msgAudio.play().then(() => {
            msgAudio.pause();
            msgAudio.currentTime = 0;
            msgAudio.muted = false;
        }).catch(e => console.log("Audio unlock failed", e));
        isAudioUnlocked = true;
    }

    setTimeout(() => showBossAlert(true), 500);
}

// ==========================================
// 💡 行員ポータル ＆ ログイン処理
// ==========================================
let isFirstBossAlert = true;
let bankBossIdx = -1;
let bankBossStory = [];

function showBossAlert(isAuto = false) {
    document.getElementById('boss-alert').style.display = 'flex';
    document.getElementById('boss-alert-btn').style.display = 'none';
    const indicator = document.getElementById('boss-alert-indicator');
    if (indicator) {
        indicator.style.visibility = 'visible';
        indicator.innerText = '▼ タップして再生';
    }

    if (isAuto && isFirstBossAlert) {
        bankBossStory = [
            "「通信繋がったな。今回お前には、我々義賊団『Remora』の頭脳、ハッキング担当として動いてもらう。」",
            "「ターゲットは東京グローバル銀行。表向きはメガバンクだが、地下金庫には巨大シンジケートの『裏金とブラックリスト』が隠されている。」",
            "「奴らの悪事を世間に暴き、資産を根こそぎ頂くのが我々のミッションだ。まずは金庫のシステムに侵入する必要がある。」",
            "「内部の協力者からパスワードが送られてきたが、検知を逃れるため手元の『業務マニュアル』の中に暗号化して隠したらしい。」",
            "「お前の頭脳で解読し、ページ一番下にある『行員専用ポータル』からシステムに潜り込んでくれ。頼んだぞ。」"
        ];
        isFirstBossAlert = false;
    } else {
        bankBossStory = [
            "「おい、何関係ないボタン押して遊んでるんだ。」",
            "「さっさと手元の『業務マニュアル』からパスワードを解読し、ページ一番下にある『行員専用ポータル』からシステムに潜り込め。」"
        ];
    }

    bankBossIdx = -1;
    document.getElementById('boss-alert-text').innerText = "【 通信を受信しました 】";
}

function closeBossAlert() {
    if (isTyping && currentTypingElement === 'boss-alert-text') {
        finishTyping();
        return;
    }

    const indicator = document.getElementById('boss-alert-indicator');
    if(bankBossIdx === -1 && indicator) {
        indicator.innerText = "▼ タップして次へ";
    }

    bankBossIdx++;
    if (bankBossIdx < bankBossStory.length) {
        let isLast = (bankBossIdx === bankBossStory.length - 1);
        typeWriter('boss-alert-text', bankBossStory[bankBossIdx], () => {
            if (isLast) {
                if (indicator) indicator.style.visibility = 'hidden';
                document.getElementById('boss-alert-btn').style.display = 'block';
            }
        }, 'boss-alert-indicator');
    } else {
        document.getElementById('boss-alert').style.display = 'none';
    }
}

function openLogin() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-err').style.display = 'none';
}

function checkBankLogin() {
    const pass = document.getElementById('staff-pass').value;
    if (pass === "てすと") {
        document.getElementById('login-err').style.display = 'none';
        document.getElementById('login-modal').style.display = 'none';
        
        const glitch = document.getElementById('glitch-screen');
        glitch.style.display = 'flex';
        
        setTimeout(() => { glitch.style.opacity = "0"; }, 1500);
        setTimeout(() => { 
            glitch.style.display = 'none';
            glitch.style.opacity = "1";
            document.getElementById('dummy-bank-page').style.display = 'none';
            document.getElementById('dummy-portal-page').style.display = 'block';
            
            setTimeout(initBossCommunication, 500);
        }, 2000);
    } else {
        document.getElementById('login-err').style.display = 'block';
    }
}

const bossStory = [
    "「よし、行員用ページに潜入できたな。これで金庫の開閉システムへ繋がる通信経路は確保できた。」",
    "「だが、ここから先のセキュリティは普通の操作じゃ突破できない。専用のハッキングAI『CHROMAKEY』の力が必要だ。」",
    "「箱に入っている基板をPCに接続しろ。そこからAIを起動して、内部ネットワークに侵入させる。」"
];

let bossIdx = -1;
function initBossCommunication() {
    bossIdx = -1;
    document.getElementById('boss-modal').style.display = 'flex';
    document.getElementById('boss-text').innerText = "【 通信を受信しました 】";
    document.getElementById('boss-indicator').innerText = "▼ タップして再生";
    document.getElementById('boss-indicator').style.visibility = 'visible';
    document.getElementById('boss-connect-area').style.display = 'none';
}

function nextBossMsg() {
    if (isTyping) {
        finishTyping();
        return;
    }
    
    if(bossIdx === -1) {
        document.getElementById('boss-indicator').innerText = "▼ タップして次へ";
    }

    bossIdx++;
    if (bossIdx < bossStory.length) {
        let isLast = (bossIdx === bossStory.length - 1);
        typeWriter('boss-text', bossStory[bossIdx], () => {
            if (isLast) {
                document.getElementById('boss-indicator').style.visibility = 'hidden';
                document.getElementById('boss-connect-area').style.display = 'block';
            }
        }, 'boss-indicator');
    }
}

function startChromakey() {
    document.getElementById('boss-modal').style.display = 'none';
    const portalPage = document.getElementById('dummy-portal-page');
    
    portalPage.style.backgroundColor = "#000";
    portalPage.style.color = "#0f0";
    portalPage.innerHTML = "<h1 style='margin-top:20vh; font-family:monospace;'>DEVICE CONNECTED.<br>CHROMAKEY OS BOOTING...</h1>";
    
    setTimeout(() => { portalPage.style.opacity = "0"; }, 1500);
    setTimeout(() => { 
        portalPage.style.display = "none"; 
        initIntro(); 
    }, 2000);
}

// ==========================================
// 💡 メッセージ表示用のタイピングエフェクトと音声
// ==========================================
let isTyping = false;
let typeInterval;

const msgAudio = new Audio('message.mp3'); 
msgAudio.loop = true;
msgAudio.volume = 0.5;

let currentTypingContent = "";
let currentTypingElement = "";
let currentTypingIndicator = "";
let currentTypingCallback = null;

function typeWriter(elementId, text, onComplete, indicatorId) {
    if(isTyping) return;
    isTyping = true;
    
    currentTypingContent = text;
    currentTypingElement = elementId;
    currentTypingIndicator = indicatorId;
    currentTypingCallback = onComplete;
    
    const el = document.getElementById(elementId);
    const ind = document.getElementById(indicatorId);
    if(ind) ind.style.visibility = 'hidden';
    el.innerText = "";
    
    let i = 0;
    
    msgAudio.currentTime = 0;
    let playPromise = msgAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => console.log("音声再生エラー:", e));
    }

    typeInterval = setInterval(() => {
        el.innerText += text.charAt(i);
        i++;
        if (i >= text.length) {
            finishTyping(); 
        }
    }, 40);
}

function finishTyping() {
    clearInterval(typeInterval);
    const el = document.getElementById(currentTypingElement);
    const ind = document.getElementById(currentTypingIndicator);
    
    el.innerText = currentTypingContent; 
    msgAudio.pause(); 
    isTyping = false; 
    
    if(ind) ind.style.visibility = 'visible';
    if(currentTypingCallback) currentTypingCallback();
}

// ==========================================
// 💡 CHROMAKEY 初期メッセージ
// ==========================================
const introStory = [
    "【CHROMAKEY】……起動完了。私はハッキングAI『CHROMAKEY』。これよりサポートを開始します。",
    "【CHROMAKEY】行員ポータルのデータから、金庫開閉システムへのアクセスルートを抽出しました。ターゲットまでに3層のセキュリティ（LAYER 01〜03）が存在します。",
    "【CHROMAKEY】対象の防壁は、人間の思考パターンを要求する仕組みです。私の解析能力と、あなたの『ひらめき』を同期して突破しましょう。まずは封筒①を開けてください。"
];

let introIdx = -1; 
function initIntro() {
    introIdx = -1;
    document.getElementById('intro-modal').style.display = 'flex';
    document.getElementById('intro-text').innerText = "【 CHROMAKEY OS 起動 】";
    document.getElementById('intro-indicator').innerText = "▼ タップして再生";
    document.getElementById('intro-indicator').style.display = 'block';
    document.getElementById('intro-btn').style.display = 'none';

    document.querySelector('.fixed-connect-btn').style.display = 'block';
}

function nextIntro() {
    if (isTyping) {
        finishTyping();
        return;
    }
    
    if(introIdx === -1) {
        document.getElementById('intro-indicator').innerText = "▼ タップして次へ";
    }

    introIdx++;
    if (introIdx < introStory.length) {
        let isLast = (introIdx === introStory.length - 1);
        typeWriter('intro-text', introStory[introIdx], () => {
            if (isLast) {
                document.getElementById('intro-indicator').style.display = 'none';
                document.getElementById('intro-btn').style.display = 'block';
            }
        }, 'intro-indicator');
    }
}

function closeIntroModal(e) {
    e.stopPropagation();
    document.getElementById('intro-modal').style.display = 'none';
}

// ==========================================
// 💡 トラップ発動イベント (LAYER 03 クリア後)
// ==========================================
const betrayalStory = [
    "【WARNING】異常な熱源を検知。ハッキングが銀行（シンジケート）側に検知されました。",
    "【WARNING】奴ら、データが盗まれるくらいならと『完全証拠隠滅プロトコル』を作動させました。金庫室ごとすべてを爆破して焼き払う気です！",
    "【WARNING】接続した9番のコードから、起爆用の高圧電流がこちらへ逆流しています。このままでは10分後に手元の装置まで巻き込んで大爆発します！",
    "【ALERT】※警告※ 今すぐ適当にコードを抜くと、センサーが反応して即座に起爆します！"
];

let betrayalIdx = 0;
function initBetrayal() {
    betrayalIdx = 0;
    document.getElementById('betrayal-modal').style.display = 'flex';
    document.getElementById('betrayal-btn').style.display = 'none';
    document.getElementById('betrayal-indicator').style.display = 'block';
    document.getElementById('betrayal-indicator').innerText = "▼ タップして次へ";
    
    typeWriter('betrayal-text', betrayalStory[betrayalIdx], null, 'betrayal-indicator');
}

function nextBetrayal() {
    if (isTyping) {
        finishTyping();
        return;
    }

    betrayalIdx++;
    if (betrayalIdx < betrayalStory.length) {
        let isLast = (betrayalIdx === betrayalStory.length - 1);
        typeWriter('betrayal-text', betrayalStory[betrayalIdx], () => {
            if (isLast) {
                document.getElementById('betrayal-indicator').style.display = 'none';
                document.getElementById('betrayal-btn').style.display = 'block';
            }
        }, 'betrayal-indicator');
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
    { text: "【CHROMAKEY】\nハッキング支援ナビゲーションを起動します。画面内のデータの関係性をご説明します。", highlight: null, aiPosition: 'bottom' },
    { text: "【CHROMAKEY】\nあなたの最終目標は、左側の『メインプロトコル』を解除することです。まずはこれを直接操作して突破方法を考えてください。", highlight: 'main-protocol-wrapper-s1', aiPosition: 'bottom' },
    { text: "【CHROMAKEY】\nすぐに内部構造に気づいて突破できれば問題ありませんが、もし行き詰まった場合は、右側の『暗号化データ』を解読してください。", highlight: 'puzzle-panel-area', aiPosition: 'top' },
    { text: "【CHROMAKEY】\nあなたが暗号を解けば、私がそれを鍵にしてメインプロトコルを解析し、法則を見抜くための『手がかり』をプロトコル上に反映します。", highlight: null, aiPosition: 'top' },
    { text: "【CHROMAKEY】\nただし、右側の暗号化データは強固なプロテクトにより、最初は9枚のパネルで隠されています。", highlight: 'puzzle-panel-area', aiPosition: 'top' },
    { text: "【CHROMAKEY】\n私は裏でこのプロテクトの解除を進めており、約2分に1枚のペースでパネルをめくる権限をお渡しできます。少しずつパネルをめくって暗号の全貌を推測し、答えを導き出してください。", highlight: 'puzzle-points-area', aiPosition: 'bottom' }
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
        if(targetEl) {
            targetEl.classList.add('tutorial-highlight');
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0)'; 
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
}

function closeAITutorial() {
    document.getElementById('ai-modal').style.display = 'none';
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 💡 エンディング画面遷移
// ==========================================
function showEnding(isSuccess) {
    if(lastTimerInterval) clearInterval(lastTimerInterval); 

    document.querySelectorAll('.app-container').forEach(el => el.classList.remove('active'));
    
    const endingScreen = document.getElementById('ending-screen');
    const endingTitle = document.getElementById('ending-title');
    const endingMsg = document.getElementById('ending-msg');

    endingScreen.style.display = 'flex';
    endingScreen.style.flexDirection = 'column';
    endingScreen.style.justifyContent = 'center';
    endingScreen.style.alignItems = 'center';
    endingScreen.style.height = '100vh';
    endingScreen.style.position = 'fixed';
    endingScreen.style.top = '0';
    endingScreen.style.left = '0';
    endingScreen.style.width = '100%';
    endingScreen.style.backgroundColor = 'rgba(0,0,0,0.95)';
    endingScreen.style.zIndex = '9999';

    if (isSuccess) {
        endingTitle.innerText = "SYSTEM SHUTDOWN";
        endingTitle.style.color = "#2ea043";
        endingTitle.style.fontSize = "50px";
        endingTitle.style.marginBottom = "20px";
        endingMsg.innerHTML = "防衛プログラムの停止に成功しました。<br>金庫のロックを解除します。";
        endingMsg.style.color = "#c9d1d9";
        endingMsg.style.fontSize = "20px";
        endingMsg.style.lineHeight = "1.8";
        endingMsg.style.textAlign = "center";
    } else {
        endingTitle.innerText = "CRITICAL ERROR";
        endingTitle.style.color = "#ff7b72";
        endingTitle.style.fontSize = "50px";
        endingTitle.style.marginBottom = "20px";
        endingMsg.innerHTML = "防衛プログラムが実行されました。<br>通信はここで途絶えています……。";
        endingMsg.style.color = "#c9d1d9";
        endingMsg.style.fontSize = "20px";
        endingMsg.style.lineHeight = "1.8";
        endingMsg.style.textAlign = "center";
    }
}

function alignBackgroundGrid() {
    const table = document.getElementById('gojuon-table');
    const wrapper = document.getElementById('main-protocol-wrapper-s1');
    if (table && wrapper) {
        const tableRect = table.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const x = tableRect.left - wrapperRect.left;
        const y = tableRect.top - wrapperRect.top;
        wrapper.style.backgroundPosition = `${x + 20}px ${y + 20}px`;
    }
}
window.addEventListener('resize', alignBackgroundGrid);

// ==========================================
// LAYER 01: 五十音表と図形描画ロジック
// ==========================================
const gojuonLayout = [
    ['ん','わ','ら','や','ま','は','な','た','さ','か','あ'],
    ['','','り','','み','ひ','に','ち','し','き','い'],
    ['','','る','ゆ','む','ふ','ぬ','つ','す','く','う'],
    ['','','れ','','め','へ','ね','て','せ','け','え'],
    ['','を','ろ','よ','も','ほ','の','と','そ','こ','お']
];

const blockData = {
    'A': { color: '#ec3321', chars4: ['さ','い','き','ん'], chars2: ['さ','い'] }, 
    'B': { color: '#ff8b00', chars4: ['つ','め','き','り'], chars2: ['つ','き'] }, 
    'C': { color: '#fdd900', chars4: ['や','し','の','み'], chars2: ['の','み'] }, 
    'D': { color: '#00b18e', chars4: ['は','い','え','な'], chars2: ['い','え'] }, 
    'E': { color: '#0081ce', chars4: ['み','さ','い','る'], chars2: ['さ','る'] }, 
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
            polygon.setAttribute("fill", data.color + "60"); 
            svg.appendChild(polygon);
        }
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
let dragSourceIsPool = false; 

function allowDrop(e) { 
    e.preventDefault(); 
    if(e.target.classList && (e.target.classList.contains('slot') || e.target.classList.contains('item-slot'))) {
        e.target.classList.add('drag-over'); 
    }
}
function dragLeave(e) { 
    if(e.target.classList) {
        e.target.classList.remove('drag-over'); 
    }
}

function dragItem(e) { 
    e.dataTransfer.setData("text", e.target.id); 
    currentDragId = e.target.id;
    
    dragSourceIsPool = e.target.closest('#s1-item-pool') !== null;
    
    if (dragSourceIsPool) {
        drawGojuonShape(currentDragId, 4); 
        sendCommand('P1111'); 
    } else {
        drawGojuonShape(null, 0); 
        const ledPatterns = { 'A': 'P1100', 'B': 'P1010', 'C': 'P0011', 'D': 'P0110', 'E': 'P0101', 'F': 'P1010' };
        if (ledPatterns[currentDragId]) sendCommand(ledPatterns[currentDragId]); 
    }
}

document.addEventListener('dragover', (e) => {
    if (!currentDragId) return;
    
    if (dragSourceIsPool) {
        const isOverPool = e.target.closest && (e.target.closest('#s1-item-pool') !== null);
        if (isOverPool) {
            drawGojuonShape(currentDragId, 4);
        } else {
            drawGojuonShape(null, 0);
        }
    }
});

function dragEndItem(e) {
    sendCommand('P0000');
    currentDragId = null;
    drawGojuonShape(null, 0);
}

function drop(e) {
    e.preventDefault(); 
    e.target.classList.remove('drag-over');
    
    let dropTarget = e.target.classList.contains('item') ? e.target.parentElement : e.target;
    
    const data = e.dataTransfer.getData("text") || currentDragId; 
    const dragged = document.getElementById(data);
    if (!dragged) return;

    if (dropTarget.classList.contains('slot') || dropTarget.classList.contains('s1-slot') || dropTarget.classList.contains('s3-slot')) {
        if (dropTarget.children.length > 0) {
            let existingItem = dropTarget.children[0];
            document.getElementById("pool-" + existingItem.id).appendChild(existingItem);
        }
        dropTarget.appendChild(dragged);
    } 
    else {
        const pool = document.getElementById("pool-" + dragged.id);
        if (pool) pool.appendChild(dragged);
    }
    
    updateS1JudgeButton(); 
    updateS2JudgeButton();
}

function updateS1JudgeButton() {
    const slots = document.querySelectorAll('#app-step1 .s1-slot');
    let filledCount = 0;
    for (let slot of slots) {
        if (slot.children.length > 0) filledCount++;
    }
    const btn = document.getElementById("btn-judge-s1");
    if (btn) {
        if (filledCount === 6) {
            btn.disabled = false;
            btn.style.background = ""; 
            btn.style.cursor = "pointer";
            btn.style.opacity = "1";
        } else {
            btn.disabled = true;
            btn.style.background = "#444";
            btn.style.cursor = "not-allowed";
            btn.style.opacity = "0.5";
        }
    }
}

function resetStep1() {
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(id => {
        const item = document.getElementById(id);
        const pool = document.getElementById(`pool-${id}`);
        if(item && pool) pool.appendChild(item);
    });
    document.getElementById("result-step1").innerText = ""; 
    updateS1JudgeButton(); 
}

const s1_answer = ["C", "F", "E", "A", "D", "B"];
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
        
        setTimeout(() => switchApp('wire2'), 2000); 
    } else {
        res.innerText = "❌";
        res.style.color = "#ff7b72";
        setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
    }
}

// ==========================================
// 💡 LAYER 02: 曜日並べ替えパズル
// ==========================================
function executeStep2Puzzle() {
    const slots = document.querySelectorAll('#app-step2 .s3-slot');
    let placedWords = [];
    for (let slot of slots) {
        if (slot.children.length === 0) { 
            return; 
        }
        placedWords.push(slot.children[0].id);
    }

    let validJoints = 0;
    for (let i = 0; i < 4; i++) {
        let w1 = placedWords[i], w2 = placedWords[i+1];
        if (getRow(w1[0]) !== getRow(w2[0]) && getRow(w1[1]) !== getRow(w2[1]) && getRow(w1[2]) !== getRow(w2[2])) validJoints++;
    }
    
    const res = document.getElementById("result-step2");
    if (validJoints === 4) {
        res.innerText = "🎉 CLEAR!";
        res.style.color = "#0f0";
        document.getElementById('line-4').style.display = 'block';
        document.getElementById('line-4').classList.add('active');
        document.getElementById('tab-wire3').style.display = 'block';
        setTimeout(() => switchApp('wire3'), 2000);
    } else {
        res.innerText = "❌";
        res.style.color = "#ff7b72";
        setTimeout(() => { if(res.innerText === "❌") res.innerText = ""; }, 2000);
    }
}

function resetStep2Puzzle() {
    ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].forEach(id => {
        const item = document.getElementById(id);
        const pool = document.getElementById(`pool-${id}`);
        if(item && pool) pool.appendChild(item);
    });
    document.getElementById("result-step2").innerText = ""; 
    updateS2JudgeButton();
}

function updateS2JudgeButton() {
    const slots = document.querySelectorAll('#app-step2 .s3-slot');
    let filledCount = 0;
    for (let slot of slots) {
        if (slot.children.length > 0) filledCount++;
    }
    const btn = document.getElementById("btn-judge-s3");
    if (btn) {
        if (filledCount === 5) {
            btn.disabled = false;
            btn.style.background = ""; 
            btn.style.cursor = "pointer";
            btn.style.opacity = "1";
        } else {
            btn.disabled = true;
            btn.style.background = "#444";
            btn.style.cursor = "not-allowed";
            btn.style.opacity = "0.5";
        }
    }
}

// ==========================================
// 💡 LAYER 03: 水差しパズル（10, 3, 7）
// ==========================================
const S3_CAPACITIES = [10, 3, 7]; 
let s3_volumes = [10, 0, 0];
let s3_selectedNode = null;
let s3_isTransferring = false;
let s3_moves = 9; 

function updateS3NodeColors() {
    for (let i = 0; i < 3; i++) {
        const node = document.getElementById(`node-${i}`);
        const vol = document.getElementById(`vol-${i}`);
        if(vol) vol.innerText = s3_volumes[i];
        
        if (s3_isTransferring) {
            node.className = "s2-node";
            if(s3_volumes[i] === S3_CAPACITIES[i] && S3_CAPACITIES[i] > 0) node.classList.add('full');
            continue;
        }

        node.className = "s2-node"; 
        if (s3_volumes[i] === S3_CAPACITIES[i] && S3_CAPACITIES[i] > 0) node.classList.add('full');
        
        if (s3_selectedNode !== null && i === s3_selectedNode) {
            node.classList.add('selected');
        }
    }
}

function handleS3NodeClick(index) {
    if (s3_isTransferring || s3_moves <= 0) return; 
    
    if (s3_selectedNode === null) {
        if (s3_volumes[index] === 0) return; 
        s3_selectedNode = index;
        updateS3NodeColors();
    } else {
        if (s3_selectedNode === index) { 
            s3_selectedNode = null;
            updateS3NodeColors();
            return;
        }
        let from = s3_selectedNode; let to = index;
        s3_selectedNode = null;

        let transferAmount = Math.min(s3_volumes[from], S3_CAPACITIES[to] - s3_volumes[to]);
        if (transferAmount > 0) {
            s3_volumes[from] -= transferAmount;
            s3_volumes[to] += transferAmount;
            
            s3_moves--;
            let moveStr = ("0" + s3_moves).slice(-2);
            
            sendCommand("N_" + moveStr);
            
            let beeps = 0; s3_isTransferring = true; updateS3NodeColors();
            const interval = setInterval(() => {
                sendCommand("B");
                beeps++;
                if (beeps >= transferAmount) {
                    clearInterval(interval);
                    s3_isTransferring = false;
                    updateS3NodeColors();
                    
                    if (s3_moves <= 0) {
                        checkS3Clear();
                    }
                }
            }, 400); 
        } else {
            updateS3NodeColors();
        }
    }
}

function checkS3Clear() {
    if (s3_volumes[0] === 5 && s3_volumes[1] === 0 && s3_volumes[2] === 5) {
        sendCommand("N_505"); 
        document.getElementById("result-step3").innerText = "🎉 CLEAR!";
        document.getElementById("result-step3").style.color = "#2ea043";
        setTimeout(() => {
            initBetrayal();
        }, 4000); 
    } else {
        let resStr = s3_volumes[0].toString() + s3_volumes[1].toString() + s3_volumes[2].toString();
        if (resStr.length === 3) resStr = "_" + resStr;
        
        sendCommand("N" + resStr); 

        document.getElementById("result-step3").innerText = "❌ ERROR (フェイルセーフ発動失敗)";
        document.getElementById("result-step3").style.color = "#ff7b72";
        
        setTimeout(() => { 
            resetStep3Puzzle(); 
        }, 5000); 
    }
}

function resetStep3Puzzle() {
    if (s3_isTransferring) return;
    s3_volumes = [10, 0, 0]; 
    s3_selectedNode = null;
    s3_moves = 9;
    updateS3NodeColors();
    document.getElementById("result-step3").innerText = ""; 
    
    sendCommand("N_09"); 
}

// ==========================================
// 💡 アプリ遷移とタイマー処理
// ==========================================
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

let currentActiveStep = null;
function switchApp(appId) {
    document.querySelectorAll('.app-container').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn, .tab-icon').forEach(el => el.classList.remove('active'));
    document.getElementById(`app-${appId}`).classList.add('active');
    document.getElementById(`tab-${appId}`).classList.add('active');
    
    if (appId === 'step1') currentActiveStep = 1;
    else if (appId === 'step2') currentActiveStep = 2;
    else if (appId === 'step3') currentActiveStep = 3;
    else currentActiveStep = null;

    if (appId === 'step1') {
        setTimeout(alignBackgroundGrid, 50); 
        if (!hasSeenAITutorial) {
            hasSeenAITutorial = true;
            setTimeout(initAITutorial, 600);
        }
    }
    
    if (appId === 'step3') {
        setTimeout(() => sendCommand("N_09"), 500); 
    }
}

let stepTimeCounter = { 1: 0, 2: 0, 3: 0 };
setInterval(() => {
    if (currentActiveStep !== null) {
        stepTimeCounter[currentActiveStep]++;
        if (stepTimeCounter[currentActiveStep] >= 120) {
            addPoint(currentActiveStep);
            stepTimeCounter[currentActiveStep] = 0; 
        }
    }
}, 1000); 

// ==========================================
// 💡 ポリオミノ盤面生成ロジック
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
                    if (blackCells.has(char)) {
                        div.className = "poly-cell black";
                    } else {
                        div.className = "poly-cell white";
                        // 🌟 ストッパーを外し、最も安全な標準 onclick イベントに変更
                        div.onclick = () => {
                            clickPolyomino(char);
                        };
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

// 🌟 LAYER 02 のガイド（26マス: 5x4 + 6）を生成する関数
function initPolyGuide() {
    const guide = document.getElementById("poly-guide");
    if(!guide) return;
    guide.innerHTML = "";
    // CSSグリッドの6列設定に対し、0〜29のマスを作り、不要なマスを非表示にすることで 5x4+6 を実現
    for(let i=0; i<30; i++) {
        let r = Math.floor(i / 6);
        let c = i % 6;
        let cell = document.createElement("div");
        cell.className = "poly-guide-cell";
        // 4行目(r=0,1,2,3)の6列目(c=5)は不可視にする
        if(r < 4 && c === 5) {
            cell.style.visibility = "hidden";
            cell.style.border = "none";
        }
        guide.appendChild(cell);
    }
}

// 🌟 A〜Zの盤面（手がかり2の完成形表示用）を生成する関数
function initAZGrid() {
    const container = document.getElementById("poly-solved-grid");
    if(!container) return;
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(6, 30px)"; 
    
    // 🌟 黒と白の配置と、非表示（X）の配置を 5x4 + 6マス に合わせて完全定義
    const solColors = [
        'B','W','W','B','B', 'X', // 0-5
        'B','W','B','B','W', 'X', // 6-11
        'W','W','B','B','B', 'X', // 12-17
        'W','W','B','B','B', 'X', // 18-23
        'B','W','B','W','W', 'W'  // 24-29
    ];
    
    // AZの順に割り当てる文字リスト
    const azChars = [
        'A','B','C','D','E', '',
        'F','G','H','I','J', '',
        'K','L','M','N','O', '',
        'P','Q','R','S','T', '',
        'U','V','W','X','Y', 'Z'
    ];
    
    for(let i=0; i<30; i++) {
        let cell = document.createElement("div");
        cell.className = "poly-cell";
        
        if(solColors[i] === 'B') {
            cell.classList.add("black");
        } else if(solColors[i] === 'W') {
            cell.classList.add("white");
            let char = azChars[i];
            // 🌟 ストッパーを外し、最も安全な標準 onclick イベントに変更
            cell.onclick = () => {
                let row = getRow(char);
                let val = (row === 1) ? '1' : (row === 2) ? '2' : (row === 3) ? '3' : '0';
                if (polyTimer) clearTimeout(polyTimer);
                sendCommand("S" + val + val + val + val);
                document.querySelectorAll(".poly-cell.active").forEach(el => el.classList.remove("active"));
                cell.classList.add("active");
                polyTimer = setTimeout(() => {
                    sendCommand("S0000");
                    cell.classList.remove("active");
                }, 2000);
            };
        } else {
            cell.style.visibility = "hidden";
            cell.style.border = "none";
        }
        container.appendChild(cell);
    }
}


// 🌟 キーボード配列（手がかり3）を生成する関数
const kbLayout = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M']
];

function initKeyboardGrid() {
    const kArea = document.getElementById("keyboard-area");
    if(!kArea) return;
    kArea.innerHTML = "";
    
    kbLayout.forEach((rowArr, rIdx) => {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.gap = "3px";
        
        // 🌟 QWERTYキーの正確なズレ（A行は約10px、Z行は約45px右にずらす）
        if(rIdx === 1) rowDiv.style.marginLeft = "10px";
        if(rIdx === 2) rowDiv.style.marginLeft = "45px";
        
        rowArr.forEach(char => {
            let cell = document.createElement("div");
            cell.id = "kb-" + char;
            cell.className = "poly-cell";
            if (blackCells.has(char)) {
                cell.classList.add("black");
            } else {
                cell.classList.add("white");
                // 🌟 ストッパーを外し、最も安全な標準 onclick イベントに変更
                cell.onclick = () => {
                    let row = getRow(char);
                    let val = (row === 1) ? '1' : (row === 2) ? '2' : (row === 3) ? '3' : '0';
                    if (polyTimer) clearTimeout(polyTimer);
                    sendCommand("S" + val + val + val + val);
                    document.querySelectorAll(".poly-cell.active").forEach(el => el.classList.remove("active"));
                    cell.classList.add("active");
                    polyTimer = setTimeout(() => {
                        sendCommand("S0000");
                        cell.classList.remove("active");
                    }, 2000);
                };
            }
            rowDiv.appendChild(cell);
        });
        kArea.appendChild(rowDiv);
    });
}

// 🌟 ポリオミノを自由にドラッグできるようにする関数（手がかり1）
let isPolyDraggable = false;
function enablePolyDrag() {
    if(isPolyDraggable) return;
    isPolyDraggable = true;
    
    const polyArea = document.getElementById("poly-area");
    const pieces = document.querySelectorAll('.poly-piece');
    
    document.getElementById("poly-guide-area").style.display = "block";
    
    // 🌟 ピース群を綺麗に左側に並べる（重ならないように調整）
    pieces.forEach((piece, i) => {
        polyArea.appendChild(piece); 
        piece.style.position = 'absolute';
        
        // 左側の空間に縦に並べる（重ならないようにマージンを広く取る）
        let scatterX = (i % 2 === 0) ? -160 : -40; 
        let scatterY = (Math.floor(i / 2) * 65);
        
        piece.style.left = scatterX + 'px';
        piece.style.top = scatterY + 'px';
        
        piece.style.margin = "0";
        piece.style.cursor = "grab";
        piece.style.zIndex = "10";
        makeDraggable(piece);
    });
}

// 🌟 スナップ付きのドラッグ処理
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        // e.preventDefault() はクリックイベントを殺すため使用しません
        e = e || window.event;
        
        document.querySelectorAll('.poly-piece').forEach(p => p.style.zIndex = "10");
        element.style.zIndex = "100";
        element.style.cursor = "grabbing";
        
        if (e.type === 'touchstart') {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        element.style.cursor = "grab";

        const polyArea = document.getElementById("poly-area");
        const guide = document.getElementById("poly-guide");
        if(guide) {
            const areaRect = polyArea.getBoundingClientRect();
            const guideRect = guide.getBoundingClientRect();
            
            const gLeft = guideRect.left - areaRect.left;
            const gTop = guideRect.top - areaRect.top;
            
            const pLeft = element.offsetLeft;
            const pTop = element.offsetTop;
            
            const relX = pLeft - gLeft;
            const relY = pTop - gTop;
            
            const snapX = Math.round(relX / 33) * 33;
            const snapY = Math.round(relY / 33) * 33;
            
            if(snapX >= -99 && snapX <= 198 && snapY >= -99 && snapY <= 165) {
                element.style.left = (gLeft + snapX) + "px";
                element.style.top = (gTop + snapY) + "px";
            }
        }
    }
}


// ==========================================
// 💡 シリアル通信 & ハードウェアテスト
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
        
        startChromakey();

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
function testMonitor() { sendCommand("N8888"); setTimeout(() => sendCommand("N____"), 1000); }

function testWireLight() {
    if(document.getElementById('btn-test-light').disabled) return;
    sendCommand("P1111"); 
    setTimeout(() => sendCommand("P0000"), 2500); 
    document.getElementById('btn-next-wire1').style.display = 'block';
}
function testWireBuzzer() {
    if(document.getElementById('btn-test-buzzer').disabled) return;
    sendCommand("B"); 
    document.getElementById('btn-next-wire3').style.display = 'block';
}
function testWireMonitor() {
    if(document.getElementById('btn-test-monitor').disabled) return;
    sendCommand("N8888"); 
    setTimeout(() => sendCommand("N____"), 2500); 
    document.getElementById('btn-next-wire2').style.display = 'block';
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
const maxPuzzles = { 1: 3, 2: 3, 3: 3 };
const puzzleFiles = {
    1: ["A", "B", "C"],
    2: ["A", "B", "C"],
    3: ["A", "B", "C"]
};

let openPoints = { 1: 0, 2: 0, 3: 0 }; 
let panelsState = { 1: [], 2: [], 3: [] }; 
let unlockedAnalysisCount = { 1: 0, 2: 0, 3: 0 }; 
let currentPuzzleIdx = { 1: 0, 2: 0, 3: 0 }; 
let isSolved = { 1: [], 2: [], 3: [] };

const puzzleDict = {
    1: {"ひめくりかれんだー":0, "みなもとのよりとも":1, "おずのまほうつかい":2},
    2: {"ひかくさんげんそく":0, "てんねんきねんぶつ":1, "いりおもてやまねこ":2},
    3: {"そぷらのりこーだー":0, "ちきゅうおんだんか":1, "もんぶかがくしょう":2}
};

function initPuzzles() {
    for(let s=1; s<=3; s++) {
        for(let p=0; p<maxPuzzles[s]; p++) {
            panelsState[s].push(new Array(9).fill(false)); 
            isSolved[s].push(false);
        }
        renderPuzzleGrid(s);
    }
}

function addPoint(step) {
    openPoints[step]++;
    const el = document.getElementById(`puzzlePoints-s${step}`);
    if(el) el.innerText = openPoints[step];
}

function renderPuzzleGrid(step) {
    const pIdx = currentPuzzleIdx[step];
    const grid = document.getElementById(`puzzleGrid-s${step}`);
    const overlay = document.getElementById(`solvedOverlay-s${step}`);
    const placeholder = document.getElementById(`puzzlePlaceholder-s${step}`);
    
    document.getElementById(`puzzleIndicator-s${step}`).innerText = `DATA ${puzzleFiles[step][pIdx]}`;
    
    placeholder.style.backgroundImage = "none";
    placeholder.style.border = "none";
    placeholder.style.width = "100%";
    placeholder.style.height = "100%";
    placeholder.parentElement.style.backgroundColor = "transparent"; 
    placeholder.innerHTML = `<img src="FILE${step}_${puzzleFiles[step][pIdx]}.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 3px;">`;
    
    if (isSolved[step][pIdx]) {
        grid.style.display = "none";
        overlay.style.display = "flex";
    } else {
        grid.style.display = "grid";
        
        grid.parentElement.style.position = "relative"; 
        grid.style.position = "absolute";
        grid.style.top = "0";
        grid.style.left = "0";
        grid.style.width = "100%";
        grid.style.height = "100%";
        grid.style.gridTemplateColumns = "repeat(3, 1fr)";
        grid.style.gridTemplateRows = "repeat(3, 1fr)";
        grid.style.backgroundColor = "transparent";
        grid.style.pointerEvents = "auto";
        
        overlay.style.display = "none";
        grid.innerHTML = "";
        
        for(let i=0; i<9; i++) {
            let div = document.createElement("div");
            div.className = "grid-panel";
            div.style.transition = "0.3s";
            
            if (panelsState[step][pIdx][i]) {
                div.classList.add("open");
                div.style.opacity = "0";
                div.style.pointerEvents = "none";
            } else {
                div.style.opacity = "1";
                div.style.cursor = "pointer";
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
    const pIdx = currentPuzzleIdx[step];

    let isCorrect = false;
    if (input === "てすと") {
        isCorrect = true;
    } else if (input in dict && dict[input] === pIdx) {
        isCorrect = true;
    }

    if (isCorrect) {
        if (!isSolved[step][pIdx]) {
            isSolved[step][pIdx] = true;
            unlockAnalysis(step); 
        }
        feedback.style.color = "#0f0";
        feedback.innerText = "DATA DECODED";
        
        renderPuzzleGrid(step); 
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
    if (unlockedAnalysisCount[step] < maxPuzzles[step]) {
        unlockedAnalysisCount[step]++;
        
        sendCommand("P1111"); 
        setTimeout(() => sendCommand("P0000"), 500); 
        
        // 🌟 LAYER 01 のイベント進行
        if (step === 1 && unlockedAnalysisCount[1] >= 2) {
            document.getElementById("s1-slots-container").classList.add("size-hint-active");
        }
        if (step === 1 && unlockedAnalysisCount[1] === 3) {
            document.getElementById("gojuon-table").classList.add("revealed");
        }
        
        // 🌟 LAYER 02 のイベント進行
        if (step === 2) {
            if (unlockedAnalysisCount[2] === 1) {
                // 手がかり1: ピース群を左に寄せ、右にガイド表示
                enablePolyDrag();
            } else if (unlockedAnalysisCount[2] === 2) {
                // 手がかり2: 盤面の表示
                // 上段のドラッグエリアを完全に隠す
                document.getElementById("poly-area").style.display = "none";
                
                const hint2Area = document.getElementById("s2-hint2-area");
                let solvedGrid = document.createElement("div");
                solvedGrid.id = "poly-solved-grid";
                // 🌟 クラスを確実に指定し、不要なCSSを上書きしない
                solvedGrid.className = "poly-solved-grid";
                solvedGrid.style.display = "grid";
                solvedGrid.style.gridTemplateColumns = "repeat(6, 30px)";
                solvedGrid.style.gap = "3px";
                solvedGrid.style.opacity = "0";
                solvedGrid.style.transition = "opacity 1s";
                
                // 🌟 A〜Zの盤面（5x4+6マス）を生成して文字情報を排除
                initAZGrid(solvedGrid);
                
                // 🌟 下段のエリア（10,9,7のヒント表示の横）に盤面を挿入
                // id="s2-hint2-area" は display: flex; flex-direction: row; になっているため横に並びます
                hint2Area.insertBefore(solvedGrid, hint2Area.firstChild);
                hint2Area.style.display = "flex";
                setTimeout(() => { solvedGrid.style.opacity = "1"; }, 100);

            } else if (unlockedAnalysisCount[2] === 3) {
                // 手がかり3: キーボード配列の表示
                const solvedGrid = document.getElementById("poly-solved-grid");
                if (solvedGrid) solvedGrid.style.display = "none";
                document.getElementById("s2-hint2-area").style.display = "none";
                document.getElementById("keyboard-area").style.display = "flex";
                
                // 初回構築
                initKeyboardGrid();
            }
        }
        
        // 🌟 LAYER 03 のイベント進行
        if (step === 3 && unlockedAnalysisCount[3] === 3) {
            document.getElementById("vol-0").style.display = "block";
            document.getElementById("vol-1").style.display = "block";
            document.getElementById("vol-2").style.display = "block";
        }
    }
}


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

    sendCommand("Z"); 
    
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
    initGojuon();
    initPolyomino();
    initPolyGuide(); 
    initPuzzles(); 
    updateS3NodeColors(); 
    alignBackgroundGrid(); 
});

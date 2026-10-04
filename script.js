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
        // ... (continued to the rest of the fixed script.js)

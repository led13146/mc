// 获取DOM元素
const serverAddressInput = document.getElementById('serverAddress');
const serverDisplayNameInput = document.getElementById('serverDisplayName');
const checkStatusButton = document.getElementById('checkStatus');
const statusIndicator = document.getElementById('statusIndicator');
const serverNameElement = document.getElementById('serverName');
const serverStatusElement = document.getElementById('serverStatus');
const playerCountElement = document.getElementById('playerCount');
const maxPlayersElement = document.getElementById('maxPlayers');
const serverVersionElement = document.getElementById('serverVersion');
const serverPingElement = document.getElementById('serverPing');
const pingLoadingIndicator = document.getElementById('pingLoading');
const joinButton = document.getElementById('joinButton');
const autoRefreshToggle = document.getElementById('autoRefreshToggle');
const refreshIntervalSelect = document.getElementById('refreshInterval');
const lastUpdatedElement = document.getElementById('lastUpdated');
const statusContainer = document.getElementById('statusContainer');
const statusHistoryElement = document.getElementById('statusHistory');

// 全局变量
let refreshIntervalId = null;
let statusHistory = [];
const MAX_HISTORY_ITEMS = 5; // 最大历史记录数量

// 初始化
init();

function init() {
    // 绑定事件
    checkStatusButton.addEventListener('click', checkServerStatus);
    serverAddressInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkServerStatus();
    });
    serverDisplayNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkServerStatus();
    });
    autoRefreshToggle.addEventListener('change', toggleAutoRefresh);
    refreshIntervalSelect.addEventListener('change', restartAutoRefresh);

    // 初始查询
    checkServerStatus();
    startAutoRefresh();
}

// 核心：从服务器获取完整信息
function checkServerStatus() {
    const serverAddress = serverAddressInput.value.trim();
    const serverDisplayName = serverDisplayNameInput.value.trim() || '我的服务器';

    if (!serverAddress) {
        alert('请输入服务器地址');
        return;
    }

    updateJoinButton(serverAddress, serverDisplayName);
    updateLoadingState();

    // 调用API获取服务器原始数据
    fetch(`https://api.mcstatus.io/v2/status/bedrock/${serverAddress}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.online) {
                updateOnlineState(data, serverDisplayName);
            } else {
                updateOfflineState(serverDisplayName);
            }
            updateLastUpdatedTime();
            addToStatusHistory(`${serverDisplayName} 在线`, 'online');
        })
        .catch(error => {
            console.error('查询错误:', error);
            updateOfflineState(serverDisplayName);
            updateLastUpdatedTime();
            addToStatusHistory(`${serverDisplayName} 连接失败`, 'offline');
        });
}

// 从服务器数据解析版本信息（优先级处理）
function getServerVersion(data) {
    if (data.version?.name) return data.version.name;
    if (data.version?.name_clean) return data.version.name_clean;
    if (data.version?.protocol) return `协议版本: ${data.version.protocol}`;
    return '未知版本';
}

// 在线状态更新
function updateOnlineState(data, displayName) {
    statusIndicator.className = 'status-indicator online';
    statusContainer.className = 'status-container online';
    serverStatusElement.textContent = '在线';
    serverNameElement.textContent = displayName;

    serverVersionElement.textContent = getServerVersion(data);

    playerCountElement.textContent = data.players.online;
    maxPlayersElement.textContent = data.players.max;

    if (data.ping && data.ping > 0) {
        serverPingElement.textContent = Math.round(data.ping);
        pingLoadingIndicator.style.display = 'none';
        updatePingColor(Math.round(data.ping));
    } else {
        activePingTest(serverAddressInput.value.trim());
    }
}

// 离线状态处理
function updateOfflineState(displayName) {
    statusIndicator.className = 'status-indicator offline';
    statusContainer.className = 'status-container offline';
    serverStatusElement.textContent = '离线';
    serverNameElement.textContent = displayName;
    serverVersionElement.textContent = '无法获取';
    playerCountElement.textContent = '0';
    maxPlayersElement.textContent = '0';
    serverPingElement.textContent = '无法连接';
    pingLoadingIndicator.style.display = 'none';
}

// 其他辅助函数
function updateLoadingState() {
    serverStatusElement.textContent = '查询中...';
    statusIndicator.className = 'status-indicator';
    statusContainer.className = 'status-container';
    pingLoadingIndicator.style.display = 'inline';
    serverPingElement.textContent = '--';
    serverVersionElement.textContent = '获取中...';
}

function updatePingColor(ping) {
    if (ping < 100) {
        serverPingElement.style.color = '#2ecc71';
    } else if (ping < 300) {
        serverPingElement.style.color = '#f39c12';
    } else {
        serverPingElement.style.color = '#e74c3c';
    }
}

function updateJoinButton(serverAddress, displayName) {
    joinButton.href = `minecraft://?addExternalServer=${encodeURIComponent(displayName)}|${encodeURIComponent(serverAddress)}`;
}

function updateLastUpdatedTime() {
    const now = new Date();
    lastUpdatedElement.textContent = `上次更新: ${now.toLocaleTimeString()}`;
}

// 优化的状态历史记录
function addToStatusHistory(message, type) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds}`;

    // 只记录状态变化
    if (statusHistory.length === 0 ||
        statusHistory[0].type !== type ||
        statusHistory[0].message !== message) {
        statusHistory.unshift({
            time: timeStr,
            message,
            type
        });
        if (statusHistory.length > MAX_HISTORY_ITEMS) statusHistory.pop();
    }

    // 更新显示
    updateStatusHistoryDisplay();
}

function updateStatusHistoryDisplay() {
    if (statusHistory.length === 0) {
        statusHistoryElement.textContent = '无记录';
        return;
    }

    // 格式化显示（时间+状态）
    const historyHTML = statusHistory.map(item =>
        `<span class="${item.type}">${item.time}: ${item.message}</span>`
    ).join(' | ');

    statusHistoryElement.innerHTML = historyHTML;
}

function activePingTest(serverAddress) {
    const [host, port = 19132] = serverAddress.split(':');
    if (!host) return;

    const startTime = performance.now();
    const img = new Image();
    img.src = `https://${host}:${port}/favicon.ico?rand=${Math.random()}`;
    img.style.display = 'none';

    const timeout = setTimeout(() => {
        img.abort();
        serverPingElement.textContent = '超时';
        pingLoadingIndicator.style.display = 'none';
    }, 3000);

    img.onload = img.onerror = () => {
        clearTimeout(timeout);
        const ping = Math.round(performance.now() - startTime);
        serverPingElement.textContent = ping > 0 ? ping : '未知';
        pingLoadingIndicator.style.display = 'none';
        updatePingColor(ping);
    };
}

// 自动刷新控制
function startAutoRefresh() {
    if (refreshIntervalId) clearInterval(refreshIntervalId);
    if (autoRefreshToggle.checked) {
        const interval = parseInt(refreshIntervalSelect.value);
        refreshIntervalId = setInterval(checkServerStatus, interval);
    }
}

function toggleAutoRefresh() {
    startAutoRefresh();
}

function restartAutoRefresh() {
    startAutoRefresh();
}
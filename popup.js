// PinAdBlock Popup Script

document.addEventListener('DOMContentLoaded', function() {
    const blockedCountElement = document.getElementById('blockedCount');
    const enableToggle = document.getElementById('enableToggle');
    const refreshBtn = document.getElementById('refreshBtn');
    const reportBtn = document.getElementById('reportBtn');

    // 获取当前标签页的屏蔽统计
    function updateBlockedCount() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            
            // 检查是否是Pinterest页面
            if (currentTab.url && (currentTab.url.includes('pinterest.com') || currentTab.url.includes('pinterest.cn'))) {
                // 向content script发送消息获取屏蔽数量
                chrome.tabs.sendMessage(currentTab.id, { action: 'getBlockedCount' }, function(response) {
                    if (chrome.runtime.lastError) {
                        // 如果content script还没加载，显示0
                        blockedCountElement.textContent = '0';
                    } else if (response && typeof response.count === 'number') {
                        blockedCountElement.textContent = response.count.toString();
                    } else {
                        blockedCountElement.textContent = '0';
                    }
                });
            } else {
                // 不是Pinterest页面
                blockedCountElement.textContent = '-';
            }
        });
    }

    // 加载设置
    function loadSettings() {
        chrome.storage.sync.get(['enabled'], function(result) {
            enableToggle.checked = result.enabled !== false; // 默认启用
        });
    }

    // 保存设置
    function saveSettings() {
        const enabled = enableToggle.checked;
        chrome.storage.sync.set({ enabled: enabled }, function() {
            console.log('Settings saved:', { enabled });
        });
    }

    // 切换开关事件
    enableToggle.addEventListener('change', function() {
        saveSettings();
        
        // 如果禁用了插件，可以向content script发送消息
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            if (currentTab.url && (currentTab.url.includes('pinterest.com') || currentTab.url.includes('pinterest.cn'))) {
                chrome.tabs.sendMessage(currentTab.id, { 
                    action: 'toggleEnabled', 
                    enabled: enableToggle.checked 
                });
            }
        });
    });

    // 刷新页面按钮
    refreshBtn.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
            window.close(); // 关闭popup
        });
    });

    // 报告问题按钮
    reportBtn.addEventListener('click', function() {
        // 打开GitHub issues页面
        chrome.tabs.create({
            url: 'https://github.com/BLEZZ0102/pinterest-ad-blocker/issues'
        });
    });

    // 初始化
    loadSettings();
    updateBlockedCount();

    // 定期更新屏蔽数量
    setInterval(updateBlockedCount, 2000);
});

// 监听来自background script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updatePopup') {
        // 更新popup界面
        document.getElementById('blockedCount').textContent = request.count || '0';
    }
});

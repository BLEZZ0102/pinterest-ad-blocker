// Pinterest Ad Blocker Background Script

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBadge') {
        // 更新扩展图标上的徽章
        const count = request.count || 0;
        const badgeText = count > 0 ? count.toString() : '';
        
        chrome.action.setBadgeText({
            text: badgeText,
            tabId: sender.tab.id
        });
        
        chrome.action.setBadgeBackgroundColor({
            color: '#FF0000',
            tabId: sender.tab.id
        });
        
        // 更新图标标题
        chrome.action.setTitle({
            title: `Pinterest Ad Blocker - 已屏蔽 ${count} 个广告`,
            tabId: sender.tab.id
        });
    }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // 检查是否是Pinterest页面
        if (tab.url.includes('pinterest.com') || tab.url.includes('pinterest.cn')) {
            // 重置徽章
            chrome.action.setBadgeText({
                text: '',
                tabId: tabId
            });
        }
    }
});

// 扩展安装时的初始化
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Pinterest Ad Blocker 已安装');
        
        // 设置默认设置
        chrome.storage.sync.set({
            enabled: true,
            blockedCount: 0
        });
    }
});

console.log('Pinterest Ad Blocker Background Script 已加载');

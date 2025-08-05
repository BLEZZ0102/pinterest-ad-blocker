// Pinterest Ad Blocker - 简化版本
(function() {
    'use strict';

    let blockedCount = 0;
    let isEnabled = true; // 插件是否启用

    // 创建CSS样式隐藏广告
    function addBlockingStyles() {
        if (document.getElementById('pinterest-ad-blocker-style')) return;

        const style = document.createElement('style');
        style.id = 'pinterest-ad-blocker-style';
        style.textContent = `
            /* 隐藏推广Pin */
            [data-test-id="pin"][data-test-promoted="true"],
            [data-test-id*="promoted"],
            [data-test-promoted="true"],
            .pinterest-ad-hidden {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                position: absolute !important;
                left: -9999px !important;
                top: -9999px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 检查是否为广告
    function isAd(element) {
        if (!element) return false;

        // 检查data-test-promoted属性
        if (element.getAttribute('data-test-promoted') === 'true') {
            return true;
        }

        // 检查data-test-id包含promoted
        const testId = element.getAttribute('data-test-id') || '';
        if (testId.includes('promoted')) {
            return true;
        }

        // 检查文本内容 - 添加更多中文广告标识
        const text = element.textContent || '';
        if (text.includes('推广') ||
            text.includes('Promoted') ||
            text.includes('广告') ||
            text.includes('赞助的 Pin') ||
            text.includes('赞助的Pin') ||
            text.includes('Sponsored') ||
            text.includes('赞助')) {
            return true;
        }

        return false;
    }

    // 隐藏广告元素
    function hideAds() {
        // 如果插件被禁用，不执行屏蔽
        if (!isEnabled) {
            return;
        }

        const pins = document.querySelectorAll('[data-test-id="pin"]');
        let newBlocked = 0;

        pins.forEach(pin => {
            if (!pin.classList.contains('pinterest-ad-hidden') && isAd(pin)) {
                pin.classList.add('pinterest-ad-hidden');
                pin.style.setProperty('display', 'none', 'important');
                newBlocked++;
            }
        });

        if (newBlocked > 0) {
            blockedCount += newBlocked;
            console.log(`Pinterest Ad Blocker: 屏蔽了 ${newBlocked} 个广告，总计 ${blockedCount} 个`);

            // 更新插件徽章
            try {
                if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
                    chrome.runtime.sendMessage({
                        action: 'updateBadge',
                        count: blockedCount
                    });
                }
            } catch (error) {
                // 忽略Chrome API错误
            }
        }
    }

    // 显示被隐藏的广告
    function showAds() {
        const hiddenPins = document.querySelectorAll('.pinterest-ad-hidden');
        hiddenPins.forEach(pin => {
            pin.classList.remove('pinterest-ad-hidden');
            pin.style.removeProperty('display');
        });
        console.log(`Pinterest Ad Blocker: 已显示 ${hiddenPins.length} 个广告`);
    }

    // 监听DOM变化
    function startObserver() {
        const observer = new MutationObserver(() => {
            hideAds();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 初始化
    function init() {
        console.log('Pinterest Ad Blocker 启动');

        // 加载设置
        loadSettings();

        // 添加样式
        addBlockingStyles();

        // 延迟检查，等待设置加载
        setTimeout(() => {
            if (isEnabled) {
                hideAds();
            }
        }, 1500);

        // 定期检查
        setInterval(() => {
            if (isEnabled) {
                hideAds();
            }
        }, 3000);

        // 监听变化
        if (document.body) {
            startObserver();
        }
    }

    // 从存储中加载设置
    function loadSettings() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.get(['enabled'], function(result) {
                    isEnabled = result.enabled !== false; // 默认启用
                    console.log(`Pinterest Ad Blocker: 插件状态 - ${isEnabled ? '启用' : '禁用'}`);

                    if (!isEnabled) {
                        showAds(); // 如果禁用，显示所有广告
                    }
                });
            }
        } catch (error) {
            console.log('Pinterest Ad Blocker: 无法加载设置');
        }
    }

    // 监听来自popup的消息
    try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.action === 'getBlockedCount') {
                    sendResponse({ count: blockedCount });
                } else if (request.action === 'toggleEnabled') {
                    isEnabled = request.enabled;
                    console.log(`Pinterest Ad Blocker: 切换状态 - ${isEnabled ? '启用' : '禁用'}`);

                    if (isEnabled) {
                        // 启用时立即检查广告
                        setTimeout(hideAds, 100);
                    } else {
                        // 禁用时显示所有广告
                        showAds();
                        // 更新徽章为0
                        try {
                            chrome.runtime.sendMessage({
                                action: 'updateBadge',
                                count: 0
                            });
                        } catch (error) {
                            // 忽略错误
                        }
                    }

                    sendResponse({ success: true });
                }
            });
        }
    } catch (error) {
        console.log('Pinterest Ad Blocker: 无法设置消息监听器');
    }

    // 启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

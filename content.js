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

        // 检查文本内容 - 多语言广告标识
        const text = element.textContent || '';

        // 广告关键词数组 - 支持多国语言
        const adKeywords = [
            // 中文 (Chinese)
            '推广', '广告', '赞助的 Pin', '赞助的Pin', '赞助', '促销',

            // 英文 (English)
            'Promoted', 'Sponsored', 'Advertisement', 'Ad', 'Promotion',

            // 日文 (Japanese)
            'プロモーション', 'スポンサー', '広告', 'プロモ', 'スポンサード',
            'プロモート', '宣伝', '推奨',

            // 韩文 (Korean)
            '프로모션', '스폰서', '광고', '홍보', '추천', '후원',

            // 希伯来文 (Hebrew - 以色列)
            'מקודם', 'ממומן', 'פרסומת', 'מודעה', 'קידום', 'חסות',

            // 阿拉伯文 (Arabic - 摩洛哥, 突尼斯, 伊拉克)
            'مروج', 'ممول', 'إعلان', 'دعاية', 'ترويج', 'رعاية',
            'مدفوع', 'إعلاني',

            // 立陶宛文 (Lithuanian)
            'Reklamuojama', 'Remiama', 'Reklama', 'Skelbimas', 'Akcija',

            // 马来文 (Malay - 新加坡)
            'Dipromosikan', 'Ditaja', 'Iklan', 'Promosi', 'Tajaan',

            // 法文 (French - 摩洛哥, 突尼斯, 瑞士)
            'Promu', 'Sponsorisé', 'Publicité', 'Annonce', 'Promotion',
            'Commandité',

            // 德文 (German - 瑞士)
            'Beworben', 'Gesponsert', 'Werbung', 'Anzeige', 'Förderung',

            // 意大利文 (Italian - 瑞士)
            'Promosso', 'Sponsorizzato', 'Pubblicità', 'Annuncio', 'Promozione',

            // 斯瓦希里文 (Swahili - 坦桑尼亚)
            'Kukuzwa', 'Kufadhiliwa', 'Tangazo', 'Matangazo', 'Uongozaji',

            // 西班牙文 (Spanish - 厄瓜多尔)
            'Promocionado', 'Patrocinado', 'Publicidad', 'Anuncio', 'Promoción'
        ];

        // 检查是否包含任何广告关键词
        if (adKeywords.some(keyword => text.includes(keyword))) {
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
            console.log(`Pinterest Ad Blocker: Blocked ${newBlocked} ads, total ${blockedCount} ads`);

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
        console.log(`Pinterest Ad Blocker: Restored ${hiddenPins.length} ads`);
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
        console.log('Pinterest Ad Blocker started');

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
                    console.log(`Pinterest Ad Blocker: Status - ${isEnabled ? 'Enabled' : 'Disabled'}`);

                    if (!isEnabled) {
                        showAds(); // 如果禁用，显示所有广告
                    }
                });
            }
        } catch (error) {
            console.log('Pinterest Ad Blocker: Unable to load settings');
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
                    console.log(`Pinterest Ad Blocker: Toggled - ${isEnabled ? 'Enabled' : 'Disabled'}`);

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
        console.log('Pinterest Ad Blocker: Unable to set up message listener');
    }

    // 启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

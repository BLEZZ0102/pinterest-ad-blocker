# Pinterest Ad Blocker

A Chrome browser extension specifically designed to block advertisements on Pinterest.

一个专门用于屏蔽Pinterest网站广告的Chrome浏览器插件。

## 功能特点

- 🚫 自动屏蔽Pinterest推广内容和广告
- 📊 实时统计屏蔽的广告数量
- 🎛️ 可以随时启用/禁用广告屏蔽功能
- 🌍 **多语言支持** - 支持13种语言的广告识别
- 🌐 支持pinterest.com和pinterest.cn
- 💨 轻量级，不影响页面加载速度
- 🎨 美观的用户界面

## 🌍 多语言支持

本插件支持以下语言的广告识别，覆盖Pinterest主要用户国家：

| 语言 | 国家/地区 | 示例关键词 |
|------|-----------|------------|
| 🇨🇳 中文 | 中国、台湾、香港 | 推广、广告、赞助的Pin |
| 🇺🇸 英文 | 美国、英国、澳大利亚 | Promoted、Sponsored、Ad |
| 🇯🇵 日文 | 日本 | プロモーション、広告、スポンサー |
| 🇰🇷 韩文 | 韩国 | 프로모션、광고、스폰서 |
| 🇮🇱 希伯来文 | 以色列 | מקודם、ממומן、פרסומת |
| 🇲🇦 阿拉伯文 | 摩洛哥、突尼斯、伊拉克 | مروج، ممول، إعلان |
| 🇱🇹 立陶宛文 | 立陶宛 | Reklamuojama、Remiama |
| 🇸🇬 马来文 | 新加坡 | Dipromosikan、Iklan |
| 🇫🇷 法文 | 瑞士、摩洛哥 | Promu、Sponsorisé |
| 🇩🇪 德文 | 瑞士 | Beworben、Gesponsert |
| 🇮🇹 意大利文 | 瑞士 | Promosso、Sponsorizzato |
| 🇹🇿 斯瓦希里文 | 坦桑尼亚 | Kukuzwa、Tangazo |
| 🇪🇨 西班牙文 | 厄瓜多尔 | Promocionado、Patrocinado |

> 详细的多语言支持信息请查看 [MULTILINGUAL_SUPPORT.md](MULTILINGUAL_SUPPORT.md)

## 安装方法

### 方法一：开发者模式安装（推荐）

1. 打开Chrome浏览器
2. 在地址栏输入 `chrome://extensions/` 并回车
3. 打开右上角的"开发者模式"开关
4. 点击"加载已解压的扩展程序"
5. 选择本项目的文件夹
6. 插件安装完成！

### 方法二：打包安装

1. 在Chrome扩展程序页面点击"打包扩展程序"
2. 选择本项目文件夹，生成.crx文件
3. 将.crx文件拖拽到Chrome扩展程序页面进行安装

## 使用方法

1. 安装插件后，访问Pinterest网站
2. 插件会自动开始屏蔽广告内容
3. 点击浏览器工具栏中的插件图标查看统计信息
4. 可以通过弹窗界面开启/关闭广告屏蔽功能

## 屏蔽原理

插件通过以下方式识别和屏蔽广告：

- 检测包含"推广"、"广告"、"Promoted"、"Sponsored"等关键词的内容
- 识别特定的广告相关CSS类名和数据属性
- 监控DOM变化，实时屏蔽新加载的广告内容
- 使用CSS样式隐藏广告元素

## 文件结构

```
pinterest-ad-blocker/
├── manifest.json          # 插件配置文件
├── content.js             # 内容脚本（主要屏蔽逻辑）
├── background.js          # 后台脚本
├── popup.html             # 弹窗界面
├── popup.css              # 弹窗样式
├── popup.js               # 弹窗脚本
├── styles.css             # 内容样式
├── icons/                 # 图标文件夹
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # 说明文档
```

## 技术特性

- **Manifest V3**: 使用最新的Chrome扩展API
- **实时监控**: 使用MutationObserver监控DOM变化
- **性能优化**: 防抖处理，避免频繁执行
- **用户友好**: 直观的统计界面和控制选项

## 注意事项

- 本插件仅在Pinterest网站上生效
- 首次访问页面时可能需要几秒钟来完全屏蔽所有广告
- 如果发现有广告未被屏蔽，可以通过弹窗界面报告问题

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本的广告屏蔽功能
- 添加统计和控制界面

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个插件！

## 免责声明

本插件仅供学习和个人使用，请遵守相关网站的使用条款。

# Pinterest广告屏蔽插件 - 多语言支持

## 概述
本插件支持检测多种语言的广告标识，覆盖Pinterest主要用户国家的语言。

## 支持的语言和国家

### 🇨🇳 中文 (Chinese)
**关键词**: 推广, 广告, 赞助的 Pin, 赞助的Pin, 赞助, 促销
- 主要用户群体：中国大陆、台湾、香港、新加坡华人

### 🇺🇸 英文 (English)
**关键词**: Promoted, Sponsored, Advertisement, Ad, Promotion
- 主要用户群体：美国、英国、澳大利亚、加拿大、新加坡等

### 🇯🇵 日文 (Japanese)
**关键词**: プロモーション, スポンサー, 広告, プロモ, スポンサード, プロモート, 宣伝, 推奨
- 主要用户群体：日本
- 注释：
  - プロモーション (puromōshon) = Promotion
  - スポンサー (suponsā) = Sponsor
  - 広告 (kōkoku) = Advertisement
  - 宣伝 (senden) = Publicity

### 🇰🇷 韩文 (Korean)
**关键词**: 프로모션, 스폰서, 광고, 홍보, 추천, 후원
- 主要用户群体：韩国
- 注释：
  - 프로모션 (peuromosyeon) = Promotion
  - 스폰서 (seuponse) = Sponsor
  - 광고 (gwanggo) = Advertisement
  - 홍보 (hongbo) = Publicity

### 🇮🇱 希伯来文 (Hebrew)
**关键词**: מקודם, ממומן, פרסומת, מודעה, קידום, חסות
- 主要用户群体：以色列
- 注释：
  - מקודם (mekudam) = Promoted
  - ממומן (memuman) = Sponsored
  - פרסומת (pirsumet) = Advertisement
  - מודעה (moda'ah) = Ad

### 🇲🇦🇹🇳🇮🇶 阿拉伯文 (Arabic)
**关键词**: مروج, ممول, إعلان, دعاية, ترويج, رعاية, مدفوع, إعلاني
- 主要用户群体：摩洛哥、突尼斯、伊拉克
- 注释：
  - مروج (murawwaj) = Promoted
  - ممول (mumawal) = Sponsored
  - إعلان (i'lan) = Advertisement
  - دعاية (di'aya) = Publicity

### 🇱🇹 立陶宛文 (Lithuanian)
**关键词**: Reklamuojama, Remiama, Reklama, Skelbimas, Akcija
- 主要用户群体：立陶宛
- 注释：
  - Reklamuojama = Promoted
  - Remiama = Sponsored
  - Reklama = Advertisement
  - Skelbimas = Ad

### 🇸🇬 马来文 (Malay)
**关键词**: Dipromosikan, Ditaja, Iklan, Promosi, Tajaan
- 主要用户群体：新加坡、马来西亚
- 注释：
  - Dipromosikan = Promoted
  - Ditaja = Sponsored
  - Iklan = Advertisement
  - Promosi = Promotion

### 🇫🇷 法文 (French)
**关键词**: Promu, Sponsorisé, Publicité, Annonce, Promotion, Commandité
- 主要用户群体：摩洛哥、突尼斯、瑞士法语区
- 注释：
  - Promu = Promoted
  - Sponsorisé = Sponsored
  - Publicité = Advertisement
  - Commandité = Sponsored

### 🇩🇪 德文 (German)
**关键词**: Beworben, Gesponsert, Werbung, Anzeige, Förderung
- 主要用户群体：瑞士德语区
- 注释：
  - Beworben = Promoted
  - Gesponsert = Sponsored
  - Werbung = Advertisement
  - Anzeige = Ad

### 🇮🇹 意大利文 (Italian)
**关键词**: Promosso, Sponsorizzato, Pubblicità, Annuncio, Promozione
- 主要用户群体：瑞士意大利语区
- 注释：
  - Promosso = Promoted
  - Sponsorizzato = Sponsored
  - Pubblicità = Advertisement
  - Annuncio = Ad

### 🇹🇿 斯瓦希里文 (Swahili)
**关键词**: Kukuzwa, Kufadhiliwa, Tangazo, Matangazo, Uongozaji
- 主要用户群体：坦桑尼亚
- 注释：
  - Kukuzwa = Promoted
  - Kufadhiliwa = Sponsored
  - Tangazo = Advertisement
  - Matangazo = Advertisements

### 🇪🇨 西班牙文 (Spanish)
**关键词**: Promocionado, Patrocinado, Publicidad, Anuncio, Promoción
- 主要用户群体：厄瓜多尔、西班牙、拉丁美洲
- 注释：
  - Promocionado = Promoted
  - Patrocinado = Sponsored
  - Publicidad = Advertisement
  - Anuncio = Ad

## 技术实现

### 检测算法
```javascript
const adKeywords = [
    // 所有语言的广告关键词数组
];

// 检查文本是否包含广告关键词
if (adKeywords.some(keyword => text.includes(keyword))) {
    return true;
}
```

### 性能优化
- 使用数组的 `some()` 方法进行高效检索
- 关键词按使用频率排序
- 支持部分匹配和完整匹配

## 覆盖范围

### 地理覆盖
- **亚洲**: 中国、日本、韩国、新加坡
- **中东**: 以色列、伊拉克
- **非洲**: 摩洛哥、突尼斯、坦桑尼亚
- **欧洲**: 立陶宛、瑞士
- **南美洲**: 厄瓜多尔

### 语言覆盖
- **13种主要语言**
- **60+个广告关键词**
- **覆盖Pinterest前11个用户国家**

## 未来扩展

### 计划添加的语言
1. **俄文** (Russian) - 俄罗斯用户
2. **葡萄牙文** (Portuguese) - 巴西用户
3. **印地文** (Hindi) - 印度用户
4. **土耳其文** (Turkish) - 土耳其用户

### 优化方向
1. **动态关键词更新** - 从服务器获取最新关键词
2. **用户自定义** - 允许用户添加自定义关键词
3. **机器学习** - 使用AI识别新的广告模式
4. **社区贡献** - 开放关键词库供社区贡献

---
*多语言支持版本: v2.0*
*支持语言数量: 13种*
*关键词总数: 60+个*

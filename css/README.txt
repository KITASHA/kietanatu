CSS分割版

使い方：
1. このフォルダ内のCSSファイルを、プロジェクトの css フォルダへコピーします。
2. HTML側はこれまでどおり次の1行だけで使えます。

<link rel="stylesheet" href="css/style.css">

style.css がほかのCSSを @import で読み込みます。

ファイル構成：
- style.css       読み込み順を管理
- base.css        リセット・文字・基本設定
- layout.css      ヘッダー・ナビ・メイン・フッター
- components.css  見出し・パネル・関連リンク・表・ボタン
- home.css        トップページ専用
- pages.css       歴史・広報など通常ページ
- story.css       intro・ending・文書などARG専用
- responsive.css  スマホ・タブレット対応

整理した点：
- 重複していた .section-heading を1か所に統合
- 重複していた a と body の指定を整理
- important-heading を専用スタイルとして分離
- フッターの余白をコンパクト版に統一
- news-section の縦余白を統一
- レスポンシブ指定を1ファイルへ集約

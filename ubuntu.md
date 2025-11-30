# Ubuntu 超入門まとめ（初心者向け）

Ubuntu は Linux の代表的なディストリビューションで、初心者でも使いやすいのが特徴です。この文章では、Ubuntu を使ううえで知っておきたい基礎をまとめます。

---

## 1. Ubuntu とは？
- 無料で使える OS（Linux の一種）
- セキュリティに強い
- 開発環境に最適（Python / Go / Node など）
- 世界中で利用者が多く、情報が豊富

---

## 2. Ubuntu の基本構造

### ファイル構造（ディレクトリ）
Ubuntu のルートは `/`（スラッシュ）で表されます。

| ディレクトリ | 意味 |
|--------------|------|
| /home/<ユーザー名> | 個人の作業領域 |
| /etc | 設定ファイル |
| /var | ログや変化するデータ |
| /usr/bin | コマンドの実体 |
| /tmp | 一時ファイル |

---

## 3. コマンドの基本

### 移動
cd /path/to/dir  
cd  
cd ..

### ファイル一覧
ls  
ls -l  
ls -a

### 作成・削除
mkdir test  
touch file.txt  
rm file.txt  
rm -r folder

### 編集
nano file.txt  
code .

---

## 4. パッケージ管理（apt）

### よく使う apt コマンド
sudo apt update  
sudo apt upgrade  
sudo apt install xxx  
sudo apt remove xxx

例：Git のインストール  
sudo apt install git

---

## 5. 権限と sudo

- sudo = 一時的に管理者権限を得るコマンド
- 危険な操作ができてしまうので注意

---

## 6. WSL + Ubuntu で Windows と連携

### Windows へファイルをコピー
cp file.txt /mnt/c/Users/<名前>/Desktop/

### Windows のファイルを Ubuntu で参照
ls /mnt/c/

---

## 7. 覚えておくと便利なコマンド

pwd  
df -h  
free -h  
ps aux

---

## 8. 開発者向け Tips

### Node.js
nvm を使うのがおすすめ。

### Python 仮想環境
python3 -m venv venv  
source venv/bin/activate

### Git
git init  
git add .  
git commit -m "first commit"

---

## 9. 困ったら

- sudo apt update
- エラーメッセージをそのまま検索
- 権限チェック（chmod / chown）
- systemctl status でサービス確認
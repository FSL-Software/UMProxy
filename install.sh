curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
apt-get install git sudo
sudo apt-get install -y nodejs
git https://github.com/UnityMCPE/UMProxy.git
cd UMProxy
npm install object-inspect
node .\app.js
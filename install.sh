curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
apt-get install sudo
sudo apt-get install -y nodejs
cd UMProxy
npm install object-inspect
node .\app.js

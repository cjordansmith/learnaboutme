LEARN ABOUT ME APP INFORMATION

** HEROKU **

app name:   cjs-learnaboutme
app url:    https://cjs-learnaboutme.herokuapp.com/
git url:    https://git.heroku.com/cjs-learnaboutme.git

** MONGO LAB **

username:   heroku_56d031pn
password:   r0fc1hdfko2enma4iera2tm3gu
server:     ds017193.mlab.com
port:       17193
database:   heroku_56d031pn

MONGODB_URI:  mongodb://heroku_56d031pn:r0fc1hdfko2enma4iera2tm3gu@ds017193.mlab.com:17193/heroku_56d031pn

NODE_ENV: production

** DUMPING DATA FROM THE DEVELOPMENT DATABASE **
$ mongodump -h localhost:27017 -d Loc8r -o ~/tmp/mongodump

** PUSHING DATA TO THE LIVE DATABASE **
$ mongorestore -h ds017193.mlab.com:17193 -d heroku_56d031pn -u heroku_56d031pn -p r0fc1hdfko2enma4iera2tm3gu ~/tmp/mongodump/lam

** CONNECT TO THE LIVE MONGODB SHELL - MONGOLAB - HEROKU **
$ mongo ds017193.mlab.com:17193/heroku_56d031pn -u heroku_56d031pn -p r0fc1hdfko2enma4iera2tm3gu



** MONGODB LOCATION OBJECTID'S **

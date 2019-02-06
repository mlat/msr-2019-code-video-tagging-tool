# Installation instructions
## Prerequisites
* Nginx (Recommended, but Apache or other could probably work as well)
* Mysql
* Nodejs (We used 8.9.4)
* Npm (We used 5.6.0)

## Setting up
### Nginx
1. Tweak the included nginx config file or create your own
2. Place the file in the `sites-available` directory
3. Symlink the file to `sites-enabled`

### Mysql
1. Create the database `codeVidTool`
2. Import the provided sql dump

### Node app
1. Install dependencies using npm
2. (Recommended) Install pm2 to manage and restart application in case of a crash. pm2 can also be set up to auto start the tool in the event of a restart
3. Build the frontend for production `npm run build:prod`

## Starting the server
* Without pm2 `npm run start`
* Using pm2 `pm2 start ./bin/www --name="tagTool"`


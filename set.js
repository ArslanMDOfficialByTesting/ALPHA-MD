const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ARSLAN-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0lFRDhTdFVjaHFFRmNCS29XdmI1cUdlYW50ZGFPS25jY1BKMWZkQ1ExYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVhrV3hqRlkzOUY0QWVBMlRFSW0yeXhua2pXTHJLNlhpSXRjY2RCaHpsMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQjJaNDBzRndrZFhMeGJPdkxoVFlTMDArYm5uY1JFaTFEQzYrUDRHTVhFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNaWRrVmwxbTVhZFdJcVNzV3lXYjZ1WmJYM3pMYlc4bzBrT2tXdXgwVDBnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVCY1g1bVo0cmJLVjh4YjNOcGlDWUFwZkdTT1grZHZHcDJXQ21RSVd6bVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdZTEZONjgwcE1VcE5TUWtZcmNKYk5ldWRkTlN6VE1FR2VxT25uWFVjQnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtvRVM4ais4YjJhaUpIWERtUG43cUwyNnNkMmEwY0RtVW84UTFLZE9IQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickkwWWJwemtCOE1sUUdvQnI1ZUE5Vnl3aTYvZ0k2UGlockFEelBJcGdIQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhGUWw5bDd1YTRIN2pETkxFZUwwZVZVV3NqV2JTWmJrQW45dndDTis4OXVFZmJNVDkwOG8xb0lxbnRybE5FRFF4Tm5aTWNuRFA1TVVIYWY5dmcyb0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTczLCJhZHZTZWNyZXRLZXkiOiJDa3N5eTZOajBZdFY1M3VGcFNySWhjMjkweXRaZG83VmhwbEIxYTZJbkE0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllVUFJBREVWIiwibWUiOnsiaWQiOiI5MjMyMzQ3MzUyNDM6MTlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMDQ4MjM1OTI2NDQ3NDc6MTlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJNlczMllRd0tUL3lRWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQSWc4bUM1ZkVwUnMwcVliTWdHdmNOR2pBbHI1bXRtZmlWVTVqVjUvQ1hrPSIsImFjY291bnRTaWduYXR1cmUiOiJTL3JhY0xOeHRTQVV1c3VKOWRzNjlRQ2RkVFo2WVU4ZTFaZ1Znd3ovRzBvL1E1S05ma3lJQjdrbFYwUFAxeUtqSE5zOFgxMk5UcEFhSElFU282WTlCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTjR2ZXdoN0NOQTliM2U5YXVYdktGdm4yM1BQNkFaV1M2WWJoVnM5clBINHp3Tm45c3MxU3h3MkhoT202MzhBdEN0emhJSkkrRnh2MDAyWkhOQ29YQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMyMzQ3MzUyNDM6MTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHlJUEpndVh4S1ViTkttR3pJQnIzRFJvd0phK1pyWm40bFZPWTFlZndsNSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRZ04ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzY1NzkwMjkwLCJsYXN0UHJvcEhhc2giOiIzUjlaMzkifQ==',
    PREFIXE: process.env.PREFIX || "",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748387615",  
    GCF : process.env.GROUP_CONTROL || "yes",
    GREET : process.env.GREET || "yes",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by alpha md',
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'yes',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',                          
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no',
    AUTOBIO: process.env.AUTOBIO || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || 'THIS IS ALPHA MD.I DECLINE THIS CALL BECAUSE MY OWNER IS BUSY' ,              
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE : process.env.ANTIDELETE || "yes",               
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

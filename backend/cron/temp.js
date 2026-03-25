const cron = require("node-cron");
const db = require("../config/db");

console.log("Cron Loaded...");

cron.schedule("* * * * *", async () => {

try {

console.log("Checking expired campaigns...");

const [result] = await db.query(`
DELETE FROM campaigns
WHERE expiry_date <= NOW()
`);

if(result.affectedRows > 0){
console.log(`${result.affectedRows} expired campaigns deleted`);
}

} catch (error) {

console.error("Cron Error:", error);

}

});
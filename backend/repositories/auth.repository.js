const db = require("../config/db");


exports.createUser = async (user) => {

const sql = `
INSERT INTO users
(first_name,last_name,email,phone,password,role)
VALUES (?,?,?,?,?,?)
`;

const [result] = await db.execute(sql,[
user.firstName,
user.lastName,
user.email,
user.phone,
user.password,
user.role
]);

return result;

};



exports.findByEmail = async (email) => {

    const sql = `SELECT * FROM users WHERE email=?`;

    const [rows] = await db.execute(sql, [email]);

    return rows[0];

};



exports.findByEmailAndRole = async (email, role) => {

    const sql = `
SELECT * FROM users
WHERE email=? AND role=?
`;

    const [rows] = await db.execute(sql, [email, role]);

    return rows[0];

};
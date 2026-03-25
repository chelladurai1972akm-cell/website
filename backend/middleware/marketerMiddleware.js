module.exports = (req, res, next) => {

if (req.user.role.toLowerCase() !== "marketer") {
return res.status(403).json({
message: "Marketer only access"
});
}

next();

};
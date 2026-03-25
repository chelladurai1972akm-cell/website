const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("../repositories/auth.repository");


exports.register = async (data) => {

const {
firstName,
lastName,
email,
phone,
password,
role
} = data;

const hashedPassword = await bcrypt.hash(password,10);

return await authRepository.createUser({
firstName,
lastName,
email,
phone,
password: hashedPassword,
role
});

};



exports.login = async (data) => {

    const { email, password, role } = data;


    // Find user
    const user = await authRepository.findByEmailAndRole(email, role);

    if (!user) {
        throw new Error("User not found");
    }


    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }


    // Generate token
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );


    return {
        token,
        user
    };

};
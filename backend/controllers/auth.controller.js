const authService = require("../services/auth.service");


exports.register = async (req, res) => {

try {

const result = await authService.register(req.body);

res.status(201).json({
success:true,
message:"User registered successfully"
});

} catch (error) {

res.status(500).json({
success:false,
message:error.message
});

}

};



exports.login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        res.json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

};
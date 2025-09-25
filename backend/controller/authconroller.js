const Usermodel = require("../Models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, profileurl, website, linkedin, bio, skills, company, department, position, location, phone, username } = req.body;
        const user = await Usermodel.findOne({ username, email })
        if (user) {
            return res.status(409).json({
                message: 'User is already exist , you can login',
                success: false
            })
        }
        const usermodel = new Usermodel({ firstname, lastname, email, password, profileurl, website, linkedin, bio, skills, company, department, position, location, phone, username });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();
        res.status(201).json({
            message: 'signup successfully',
            success: true
        })


    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            status: false
        })
    }

}

const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await Usermodel.findOne({ username });
        const errmsg = "Auth failed username or password is incorrect"
        if (!user) {
            return res.status(403).json({
                message: errmsg,
                success: false
            })
        }
        const ispassequal = await bcrypt.compare(password, user.password);
        if (!ispassequal) {
            return res.status(403).json({
                message: errmsg,
                success: false
            })
        }
        const jwttoken = jwt.sign({ email: user.email, _id: user._id, fullname: user.firstname + user.lastname }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie('token', jwttoken, { maxAge: 900000, httpOnly: true }

        );

        return res.status(200).json({
            message: 'login successfully',
            success: true,
            jwttoken,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            phone: user.phone,
            position: user.position,
            department: user.department,
            company: user.company,
            profileurl: user.profileurl,
            website: user.website,
            linkedin: user.linkedin,
            bio: user.bio,
            skills: user.skills,
            joindate: user.joinDate,
            _id: user._id
        })

    }
    catch (err) {
        res.status(500).json({
            message: err,
            status: false
        })
    }

}

const Getusers=async(req,res)=>{
    try {
        const _id = req.body;
        const users = await Usermodel.findOne(_id);//to fetch all users.
      // res.status(200).json(users);
          res.json({
            success:true,
            data:users
          })
    }

    catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }


}

const Updateuser = async (req, res) => {
    const _id = await req.params;
    console.log(_id);
    const {firstname, lastname, email, password, profileurl, website, linkedin, bio, skills, company, department, position, location, phone, username  } = req.body;
    try {
        const updateduser = await Usermodel.findByIdAndUpdate(_id,{ firstname, lastname, email, password, profileurl, website, linkedin, bio, skills, company, department, position, location, phone, username  });//it returns a response that is stored iin updated user.
        if (!updateduser) {
            res.json({
                message: "User not found"
            })
        }
        //but if you have updated the user successfully
        res.status(200).json({
            success: true,
            user: updateduser

        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })


    }
}

module.exports = {
    login,
    signup,
    Updateuser,
    Getusers
}
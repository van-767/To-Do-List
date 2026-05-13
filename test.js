import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from "../db.js";
const authController = {
    register: async (req, res) =>
    {
        const {user_email, password} = req.body;
        try
        {
            const email = await pool.query(
                "select * from users where email = $1", [user_email]
            );
            if (email.rows.length > 0)
            {
                return res.status(400).json({message: 'email da duoc su dung'})
            };
            const hashPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'insert into users (email, password_hash) values ($1, $2)',
                [user_email, hashPassword]
            );
            return res.status(201).json({message: "asdasdasd"});
        }
        catch (err)
        {
            console.log('error', errr);

        }
    },
    login: async (req, res) =>
    {
        const {user_email, password} = req.body;
        try
        {
            const email = await pool.query(
                `select * from users where email = $1`, [user_email]
            );
            const user = email.rows[0]
            if (!user)
            {
                return res.status(400).json();
            };
            const passwordMatch = await bcrypt.compare(password, user.password_hash)
            if (!passwordMatch)
            {
                return res.status(400).json();
            };
            const accessToken = jwt.sign(
                {userID: user.id},
                process.env.jwt,
                {expiresIn: '15m'}
            )
            const refreshToken = jwt.sign(
                {userId: user.id},
                process.env.jwt,
                {expiresIn: '7d'}
            );
            await pool.query(
                `update users set refresh__Token = $1 where id = $2`,
                [refreshToken, user.id]
            );
            res.json(accessToken)
        }
        catch (err)
        {
            console.log(err);
            res.status(500).json();
        }
    },
    refresh: async (req, res) =>
    {
        const refeshToken = req.cookies.refeshToken;
        if (!refeshToken)
        {
            return res.status(401).json();
        }
        const result = await pool.query(
            `select * from users where refesh_token = $1`, [refeshToken]
        )
        const user = result.rows[0];
        if (!user)
        {
            return res.status(401).json();
        }
        const decoded = await jwt.verify(refeshToken, process.env.jwt);
        const accessToken = jwt.sign(
            {userID: decoded.userID},
            process.env.jwt,
            {expiresIn: '15m'}
        )
        return res.json();
    },
    logout: async (req, res) => 
    {
        const refeshToken = req.cookies.refeshToken;
        if (!refeshToken)
        {
            return res.status(401).json();
        };
        await pool.query(
            `update users set refesh_token = NULL where refresh_toen = $1`, [refeshToken]
        );
        res.json();
    }

}
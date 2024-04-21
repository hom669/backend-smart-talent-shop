import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import User from '../models/user';
import UserDetail from '../models/userDetail';
import { Model } from 'sequelize';
import Profile from '../models/profile';
import jwt from "jsonwebtoken";

interface IUser extends Model {
    id: number;
    username: string;
    password: string;
    idProfile: number;
    profile: {
        id: number,
        name: string
    }
}

interface IProfile extends Model {
    id: number;
    name: string;
}

export const newUser = async (req: Request, res: Response) => {
    const { username, password, fullName, identification, email, profile } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ where: { username: username } });
    let profileSelect = null;
    if (!profile) {
        const profileDefault = await Profile.findOne({ where: { name: 'Cliente' } }) as IProfile | null;
        if (profileDefault) {
            profileSelect = profileDefault.id;
        }
    } else {
        profileSelect = profile;
    }

    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`,
        })
    }

    try {
        const userCreate = await User.create({
            username,
            password: hashedPassword,
            idProfile: profileSelect
        }) as IUser | null;

        if (userCreate) {
            const userDetails = await UserDetail.create({
                idUser: userCreate.id,
                fullName: fullName,
                identification: identification,
                email: email
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: "Ups Ocurrio un Error",
            error: error
        })
    }

    res.json({
        msg: `Usuario ${username} creado correctamente.`,
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    // Validamos si usuario existe en base de datos

    const user = await User.findOne({
        where: { username: username }, include: [{
            model: Profile,
            as: 'profile' // El alias que usaste en la definición de la relación
        }]
    }) as IUser | null;

    if (!user) {
        return res.status(400).json({ msg: `Usuario y/o Contraseña Incorrectos` });
    }

    // Validamos Password
    const passworValid = await bcrypt.compare(password, user.password)

    if (!passworValid) {
        return res.status(400).json({ msg: `Usuario y/o Contraseña Incorrectos` });
    }



    // Generamos Token
    const token = jwt.sign({
        username: username,
        profile: user.profile.name
    }, process.env.SECRET_KEY || 'Hom1223456')

    res.json({
        token,
        profile: user.profile.name,
        user: user.id
    })

}
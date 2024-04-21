"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const userDetail_1 = __importDefault(require("../models/userDetail"));
const profile_1 = __importDefault(require("../models/profile"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullName, identification, email, profile } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_1.default.findOne({ where: { username: username } });
    let profileSelect = null;
    if (!profile) {
        const profileDefault = yield profile_1.default.findOne({ where: { name: 'Cliente' } });
        if (profileDefault) {
            profileSelect = profileDefault.id;
        }
    }
    else {
        profileSelect = profile;
    }
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`,
        });
    }
    try {
        const userCreate = yield user_1.default.create({
            username,
            password: hashedPassword,
            idProfile: profileSelect
        });
        if (userCreate) {
            const userDetails = yield userDetail_1.default.create({
                idUser: userCreate.id,
                fullName: fullName,
                identification: identification,
                email: email
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups Ocurrio un Error",
            error: error
        });
    }
    res.json({
        msg: `Usuario ${username} creado correctamente.`,
    });
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si usuario existe en base de datos
    const user = yield user_1.default.findOne({
        where: { username: username }, include: [{
                model: profile_1.default,
                as: 'profile' // El alias que usaste en la definición de la relación
            }]
    });
    if (!user) {
        return res.status(400).json({ msg: `Usuario y/o Contraseña Incorrectos` });
    }
    // Validamos Password
    const passworValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passworValid) {
        return res.status(400).json({ msg: `Usuario y/o Contraseña Incorrectos` });
    }
    // Generamos Token
    const token = jsonwebtoken_1.default.sign({
        username: username,
        profile: user.profile.name
    }, process.env.SECRET_KEY || 'Hom1223456');
    res.json({
        token,
        profile: user.profile.name,
        user: user.id
    });
});
exports.loginUser = loginUser;

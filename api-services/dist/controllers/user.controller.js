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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const user_entities_1 = require("../entities/user.entities");
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        // Outros métodos como login, etc.
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(user_entities_1.User);
            const users = yield userRepository.find();
            res.json(users);
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, authType } = req.body;
            try {
                const user = yield this.userService.createUser(name, email, password, authType);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield this.userService.authenticateUser(email, password);
                if (!user) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.UserController = UserController;
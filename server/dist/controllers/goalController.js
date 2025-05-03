"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoalController = exports.updateGoalController = exports.getGoalsController = exports.createGoalController = void 0;
const goalModel = __importStar(require("../models/goalModel"));
const createGoalController = async (req, res) => {
    try {
        const goal = await goalModel.createGoal({
            ...req.body,
            user_id: req.user.id,
        });
        res.status(201).json(goal);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createGoalController = createGoalController;
const getGoalsController = async (req, res) => {
    try {
        const goals = await goalModel.getGoalsByUserId(req.user.id);
        res.status(200).json(goals);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getGoalsController = getGoalsController;
const updateGoalController = async (req, res) => {
    try {
        const updatedGoal = await goalModel.updateGoal(Number(req.params.id), req.body);
        res.status(200).json(updatedGoal);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateGoalController = updateGoalController;
const deleteGoalController = async (req, res) => {
    try {
        const result = await goalModel.deleteGoal(Number(req.params.id));
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteGoalController = deleteGoalController;

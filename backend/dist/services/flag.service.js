"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagService = void 0;
const session_manager_1 = require("./session.manager");
class FlagService {
    static instance;
    completedHistory = new Map();
    constructor() { }
    static getInstance() {
        if (!FlagService.instance) {
            FlagService.instance = new FlagService();
        }
        return FlagService.instance;
    }
    completeObjective(sessionId, objectiveIndex) {
        const sessionManager = session_manager_1.SessionManager.getInstance();
        const session = sessionManager.getSession(sessionId);
        if (!session)
            return false;
        if (!session.completedObjectives.includes(objectiveIndex)) {
            session.completedObjectives.push(objectiveIndex);
            session.completedObjectives.sort((a, b) => a - b);
            return true;
        }
        return false;
    }
    validateFlag(sessionId, submittedFlag) {
        const sessionManager = session_manager_1.SessionManager.getInstance();
        const session = sessionManager.getSession(sessionId);
        if (!session || session.status !== 'active') {
            return { success: false, message: 'No active session found.' };
        }
        const cleanFlag = submittedFlag.trim();
        // Check if the previous objectives (0 and 1) were executed
        if (!session.completedObjectives.includes(0) || !session.completedObjectives.includes(1)) {
            return {
                success: false,
                message: 'Complete the first two lab objectives before submitting the flag.',
                session
            };
        }
        // Match against dynamic session HMAC flag OR the lab's default flag pattern
        const isMatch = cleanFlag === session.dynamicFlag || cleanFlag === session.lab.defaultFlagPattern;
        if (!isMatch) {
            return {
                success: false,
                message: 'Incorrect flag. Inspect the environment files carefully and try again.',
                session
            };
        }
        // Mark flag objective (index 2) complete
        this.completeObjective(sessionId, 2);
        // Save to user history
        const userHistory = this.completedHistory.get(session.userId) || [];
        if (!userHistory.some((h) => h.labId === session.lab.id)) {
            userHistory.push({
                labId: session.lab.id,
                labName: session.lab.name,
                os: session.os,
                completedAt: Date.now()
            });
            this.completedHistory.set(session.userId, userHistory);
        }
        return {
            success: true,
            message: 'Flag captured! Lab completed successfully.',
            session,
            completedLab: true
        };
    }
    getUserHistory(userId) {
        return this.completedHistory.get(userId) || [];
    }
}
exports.FlagService = FlagService;

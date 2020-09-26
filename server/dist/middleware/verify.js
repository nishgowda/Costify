"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.status(404).send("Unauthorized");
    }
};
//# sourceMappingURL=verify.js.map
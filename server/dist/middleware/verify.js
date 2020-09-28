"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId !== undefined) {
        next();
    }
    else {
        console.log(req.session.userId);
        res.status(404).send("Unauthorized");
    }
};
//# sourceMappingURL=verify.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8000";
exports.default = {
    cats: `${apiHost}/cats`,
};
//# sourceMappingURL=api.js.map
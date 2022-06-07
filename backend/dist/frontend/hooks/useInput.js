"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useInput(initialValue) {
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const handleChange = (0, react_1.useCallback)(({ target: { value } }) => {
        setValue(value);
    }, []);
    return [value, handleChange, setValue];
}
exports.default = useInput;
//# sourceMappingURL=useInput.js.map
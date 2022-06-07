"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.useAuth = void 0;
const react_1 = require("react");
const contextDefaultValues = {
    me: null,
    login: (me) => { },
    logout: () => { },
};
const Context = (0, react_1.createContext)(contextDefaultValues);
const useAuth = () => {
    return (0, react_1.useContext)(Context);
};
exports.useAuth = useAuth;
const AuthProvider = ({ children }) => {
    const [me, setMe] = (0, react_1.useState)(null);
    const login = (me) => {
        setMe(me);
    };
    const logout = () => {
        setMe(null);
    };
    const value = {
        me,
        login,
        logout,
    };
    return (<>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>);
};
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=store.js.map
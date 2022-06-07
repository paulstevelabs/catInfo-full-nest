"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const head_1 = require("next/head");
const styled_components_1 = require("styled-components");
const antd_1 = require("antd");
const AppLayout_1 = require("components/layouts/AppLayout");
const useInput_1 = require("hooks/useInput");
const axios_1 = require("axios");
const router_1 = require("next/router");
const api_1 = require("utils/api");
const ZButton = (0, styled_components_1.default)(antd_1.Button) `
  background-color: rgb(228, 35, 76);
  border-color: rgb(228, 35, 76);
  font-weight: 500;
`;
const Signup = () => {
    const [email, handleEmail] = (0, useInput_1.default)("");
    const [name, handleName] = (0, useInput_1.default)("");
    const [password, handlePassword] = (0, useInput_1.default)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleSubmit = (0, react_1.useCallback)(async () => {
        const data = { email, name, password };
        console.log(data);
        try {
            const response = await axios_1.default.post(api_1.default.cats, data, {
                withCredentials: true,
            });
            console.log(response.data);
            router_1.default.replace("/");
        }
        catch (error) {
            if (error.response) {
                console.log(error.response);
                alert(error.response.data.message);
            }
            else {
                alert(error.message);
            }
        }
    }, [email, password]);
    return (<>
      <head_1.default>
        <title>C.I.C</title>
      </head_1.default>
      <AppLayout_1.default isSignup={true}>
        <antd_1.Form onFinish={handleSubmit}>
          <div>
            <label htmlFor="email">Cat Email</label>
            <br />
            <antd_1.Input name="email" type="email" value={email} required onChange={handleEmail}/>
          </div>
          <div>
            <label htmlFor="name">Cat Name</label>
            <br />
            <antd_1.Input name="name" value={name} required onChange={handleName}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <antd_1.Input name="password" type="password" value={password} required onChange={handlePassword}/>
          </div>

          <div style={{ marginTop: 10 }}>
            <ZButton type="primary" htmlType="submit" loading={isLoading}>
              Sign up
            </ZButton>
          </div>
        </antd_1.Form>
      </AppLayout_1.default>
    </>);
};
exports.default = Signup;
//# sourceMappingURL=signup.js.map
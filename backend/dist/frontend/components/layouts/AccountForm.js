"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = require("next/link");
const styled_components_1 = require("styled-components");
const antd_1 = require("antd");
const useInput_1 = require("hooks/useInput");
const store_1 = require("utils/store");
const axios_1 = require("axios");
const api_1 = require("utils/api");
const FormWrapper = (0, styled_components_1.default)(antd_1.Form) `
  padding: 1rem;
`;
const ButtonWrapper = styled_components_1.default.div `
  margin-top: 0.8rem;
`;
const ZButton = (0, styled_components_1.default)(antd_1.Button) `
  background-color: rgb(228, 35, 76);
  border-color: rgb(228, 35, 76);
  font-weight: 500;
`;
const LoginForm = () => {
    const [email, handleEmail] = (0, useInput_1.default)("");
    const [password, handlePassword] = (0, useInput_1.default)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const [isLogging, setIsLogging] = (0, react_1.useState)(false);
    const { me, login, logout } = (0, store_1.useAuth)();
    const handleSubmit = (0, react_1.useCallback)(async () => {
        try {
            const response = await axios_1.default.post(`${api_1.default.cats}/login`, { email, password }, { withCredentials: true });
            console.log(response.data);
            const getReponse = await axios_1.default.get(`${api_1.default.cats}`, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + response.data.data.token,
                },
            });
            login(Object.assign(Object.assign({}, getReponse.data.data), { token: response.data.data.token }));
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
    return (<FormWrapper onFinish={handleSubmit}>
      <div>
        <label htmlFor="email">Cat Email</label>
        <br />
        <antd_1.Input name="email" value={email} onChange={handleEmail} required/>
      </div>
      <div>
        <label htmlFor="password">Cat Password</label>
        <br />
        <antd_1.Input name="password" type="password" value={password} onChange={handlePassword} required/>
      </div>
      <ButtonWrapper>
        <ZButton type="primary" htmlType="submit" loading={isLogging}>
          Login
        </ZButton>
        <link_1.default href="/signup">
          <a>
            <antd_1.Button>Sign up</antd_1.Button>
          </a>
        </link_1.default>
      </ButtonWrapper>
      <div>
        <span>{message}</span>
      </div>
    </FormWrapper>);
};
exports.default = LoginForm;
//# sourceMappingURL=AccountForm.js.map
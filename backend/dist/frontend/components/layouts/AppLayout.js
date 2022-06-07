"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const image_1 = require("next/image");
const router_1 = require("next/router");
const antd_1 = require("antd");
const styled_components_1 = require("styled-components");
const store_1 = require("utils/store");
const AccountForm_1 = require("./AccountForm");
const axios_1 = require("axios");
const api_1 = require("utils/api");
const { Header, Content, Footer, Sider } = antd_1.Layout;
const { Meta } = antd_1.Card;
const ZLayout = (0, styled_components_1.default)(antd_1.Layout) `
  min-height: 100vh;
`;
const ZHeader = (0, styled_components_1.default)(Header) `
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.5rem;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
  @media only screen and (max-width: 390px) {
    font-size: 1.2rem;
  }
`;
const ZSider = (0, styled_components_1.default)(Sider) `
  text-align: center;
`;
const ZCard = (0, styled_components_1.default)(antd_1.Card) `
  width: inherit;
`;
const XLoading = styled_components_1.default.div `
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
`;
const ZFooter = (0, styled_components_1.default)(Footer) `
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
  @media only screen and (max-width: 390px) {
    display: none;
  }
`;
const ZButton = (0, styled_components_1.default)(antd_1.Button) `
  background-color: rgb(228, 35, 76);
  border-color: rgb(228, 35, 76);
  color: rgb(0, 22, 40);
  font-weight: 500;
  @media only screen and (max-width: 390px) {
    position: relative;
    left: auto;
    bottom: auto;
    margin-top: 150px;
  }
  position: absolute;
  left: 30%;
  bottom: 30px;
`;
const XImageBox = styled_components_1.default.div `
  margin-top: 10px;
`;
const AppLayout = ({ children, isSignup = false }) => {
    const [collapsed, setCollapsed] = (0, react_1.useState)(true);
    const [broken, setBroken] = (0, react_1.useState)(false);
    const { me, login, logout } = (0, store_1.useAuth)();
    const [isUpdated, setIsUpdated] = (0, react_1.useState)(true);
    const [trigger, setTrigger] = (0, react_1.useState)(false);
    const imageInput = (0, react_1.useRef)();
    const handleLogOutClink = (0, react_1.useCallback)(async () => {
        logout();
    }, []);
    (0, react_1.useEffect)(() => {
        if (me && isSignup) {
            router_1.default.replace("/");
        }
    }, []);
    (0, react_1.useEffect)(() => {
        setIsUpdated(true);
    }, [trigger]);
    const handleCollapse = (0, react_1.useCallback)((collapsed, type) => {
        setCollapsed(collapsed);
    }, [collapsed]);
    const handleBroken = (0, react_1.useCallback)((broken) => {
        setBroken(broken);
    }, [broken]);
    const handleImgChange = (0, react_1.useCallback)(async (event) => {
        const files = event.target.files;
        const form = new FormData();
        Array.from(files).forEach((file) => {
            form.append("image", file);
        });
        console.log(form.getAll("image"));
        try {
            setIsUpdated(false);
            const newCatResponse = await axios_1.default.post(`${api_1.default.cats}/upload`, form, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + me.token,
                },
            });
            console.log(newCatResponse);
            login(Object.assign(Object.assign({}, newCatResponse.data.data), { token: me.token }));
            setTrigger((preState) => !preState);
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
    }, [me, isUpdated, trigger]);
    const handleImgUpload = (0, react_1.useCallback)(() => {
        if (imageInput.current !== undefined) {
            imageInput.current.click();
        }
    }, [imageInput.current]);
    return (<>
      <ZLayout>
        {me && (<ZSider breakpoint="lg" collapsedWidth="0" onBreakpoint={handleBroken} onCollapse={handleCollapse}>
            <ZCard hoverable cover={<antd_1.Image alt="cat" src={me.imgUrl}/>}>
              <Meta title={me.email} description={me.name}/>
            </ZCard>
            <XImageBox>
              <input type="file" name="image" multiple hidden ref={imageInput} onChange={handleImgChange}/>
              {!isUpdated && <XLoading>이미지 변경중...</XLoading>}
              <antd_1.Button onClick={handleImgUpload}>Image Update</antd_1.Button>
            </XImageBox>
            <ZButton type="primary" size={"large"} onClick={handleLogOutClink}>
              Logout
            </ZButton>
          </ZSider>)}
        <antd_1.Layout>
          <ZHeader style={{
            display: collapsed || !me
                ? "flex"
                : !collapsed && broken
                    ? "none"
                    : "flex",
        }}>
            <image_1.default width={43} height={"auto"} src="/nestjs.svg"/>
            <span style={{ marginLeft: 10 }}>Cat Information Community</span>
          </ZHeader>

          <Content style={{ margin: "45px 16px 0" }}>
            {me ? (<>{children}</>) : isSignup ? (<>{children}</>) : (<AccountForm_1.default />)}
          </Content>
          <ZFooter>C.I.C ©2021 Created by Yoon Sang Seok</ZFooter>
        </antd_1.Layout>
      </ZLayout>
    </>);
};
exports.default = AppLayout;
//# sourceMappingURL=AppLayout.js.map
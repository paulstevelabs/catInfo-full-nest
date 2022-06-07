"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppLayout_1 = require("components/layouts/AppLayout");
const antd_1 = require("antd");
const antd_2 = require("antd");
const styled_components_1 = require("styled-components");
const CatCard_1 = require("components/feature/index/CatCard");
const react_1 = require("react");
const axios_1 = require("axios");
const api_1 = require("utils/api");
const { Meta } = antd_1.Card;
const XCatList = styled_components_1.default.div ``;
function Home() {
    const [cats, setCats] = (0, react_1.useState)([]);
    const getCats = async () => {
        const response = await axios_1.default.get(`${api_1.default.cats}/all`, {
            withCredentials: true,
        });
        console.log(response.data.data);
        setCats(response.data.data);
    };
    (0, react_1.useEffect)(() => {
        getCats();
    }, []);
    return (<AppLayout_1.default>
      <XCatList>
        <antd_2.Row gutter={10}>
          {cats.map((cat) => (<CatCard_1.default key={cat.id} cat={cat}/>))}
        </antd_2.Row>
      </XCatList>
    </AppLayout_1.default>);
}
exports.default = Home;
//# sourceMappingURL=index.js.map
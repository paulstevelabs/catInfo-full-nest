"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const antd_2 = require("antd");
const { Meta } = antd_1.Card;
function CatCard({ cat }) {
    console.log(cat);
    return (<antd_2.Col xs={24} sm={12} md={8}>
      <antd_1.Card hoverable style={{ width: 300, marginBottom: 50 }} cover={<img alt="cat" src={cat.imgUrl}/>}>
        <Meta title={cat.email} description={cat.name}/>
      </antd_1.Card>
    </antd_2.Col>);
}
exports.default = CatCard;
//# sourceMappingURL=CatCard.js.map
import Document, { DocumentContext } from "next/document";
declare class MyDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<any>;
    render(): any;
}
export default MyDocument;

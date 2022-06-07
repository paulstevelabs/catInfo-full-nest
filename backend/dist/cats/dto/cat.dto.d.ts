import { Cat } from '../cats.schema';
declare const ReadOnlyCatDto_base: import("@nestjs/common").Type<Pick<Cat, "email" | "name">>;
export declare class ReadOnlyCatDto extends ReadOnlyCatDto_base {
    id: string;
}
export {};

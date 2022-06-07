import { Cat } from '../cats.schema';
declare const CatRequestDto_base: import("@nestjs/common").Type<Pick<Cat, "email" | "name" | "password">>;
export declare class CatRequestDto extends CatRequestDto_base {
}
export {};

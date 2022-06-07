"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const runningTime_interceptor_1 = require("./../common/interceptors/runningTime.interceptor");
const success_interceptor_1 = require("./../common/interceptors/success.interceptor");
const http_exception_filter_1 = require("../common/exceptions/http-exception.filter");
const cats_service_1 = require("./cats.service");
const common_1 = require("@nestjs/common");
const positiveInt_pipe_1 = require("../common/pipes/positiveInt.pipe");
const cats_request_dto_1 = require("./dto/cats.request.dto");
const swagger_1 = require("@nestjs/swagger");
const cat_dto_1 = require("./dto/cat.dto");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    async signUp(body) {
        return await this.catsService.signUp(body);
    }
    getAllCat() {
        throw new common_1.HttpException({ errorCode: 1001, message: 'myError' }, common_1.HttpStatus.FORBIDDEN);
        return 'all cat';
    }
    getOneCat(param) {
        console.log(param);
        console.log(typeof param);
        return 'one cat';
    }
    updateCat() {
        return 'update cat';
    }
    updatePartialCat() {
        return 'patch catF';
    }
    deleteCat() {
        return 'delete cat';
    }
    uploadCatImage() {
        return 'upload image';
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '성공',
        type: cat_dto_1.ReadOnlyCatDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'server error',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cats_request_dto_1.CatRequestDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양이 전부 가져오기' }),
    (0, common_1.Get)(),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getAllCat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 고양이 가져오기' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, positiveInt_pipe_1.PositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getOneCat", null);
__decorate([
    (0, common_1.Put)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "updateCat", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "updatePartialCat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "deleteCat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양이 이미지 업로드' }),
    (0, common_1.Post)('upload/cats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "uploadCatImage", null);
CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, common_1.UseInterceptors)(runningTime_interceptor_1.RunningTimeInterceptor, success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map
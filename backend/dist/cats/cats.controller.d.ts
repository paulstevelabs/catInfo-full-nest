import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    getAllCat(): string;
    getOneCat(param: number): string;
    updateCat(): string;
    updatePartialCat(): string;
    deleteCat(): string;
    uploadCatImage(): string;
}

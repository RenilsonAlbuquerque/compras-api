import { ISugestionRepository } from "../contracts/repository/ISugestion.repository";
import { ISugestionService } from "../contracts/service/ISugestion.service";
import { ProductShoppingListDTO } from "../dto/sugestion/product.shopping.list";
import { ProductSugestionDto } from "../dto/sugestion/product.sugestion.dto";
import { SugestionRepository } from "../repository/sugestion.repository";
import { IACartSugestionStrategy } from "../strategy/cart/IACartSugestionStrategy";

class SugestionService implements ISugestionService {

    private sugestionRepository:ISugestionRepository;
    

    constructor() {
        this.sugestionRepository = new SugestionRepository();
    }
    async listCartSugestionByProfile(profileId: number): Promise<ProductShoppingListDTO[]> {
       return await new IACartSugestionStrategy().execute(profileId);
    }
    async listSugestionBySupermarket(marketId: number): Promise<ProductSugestionDto[]> {
        return await this.sugestionRepository.listSugestionBySupermarket(marketId);
    }
}

export default new SugestionService();
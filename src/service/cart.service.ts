import { ICartRepository } from "../contracts/repository/ICartRepository";
import { ICartService } from "../contracts/service/ICartService";
import { ISugestionService } from "../contracts/service/ISugestion.service";
import { ProductShoppingListDTO } from "../dto/sugestion/product.shopping.list";
import { CartRepository } from "../repository/cart.repository";
import sugestionService from "./sugestion.service";

class CartService implements ICartService {

    private cartRepository:ICartRepository;
    private sugestionService: ISugestionService;
    

    constructor() {
        this.sugestionService = sugestionService;
        this.cartRepository = new CartRepository();
    }
    async listCartByProfileId(profileId:number): Promise<ProductShoppingListDTO[]> {
        let result = await this.cartRepository.listCartItemsByProfileId(profileId);
        if(result.length <= 0){
            result = await this.sugestionService.listCartSugestionByProfile(profileId);
        }
        return result;
    }
    public async saveCart(cart: ProductShoppingListDTO[],profileId:number){
        for(let prodIndex = 0; prodIndex < cart.length;prodIndex++){
            await this.checkProductAndSave(cart[prodIndex],profileId);
        } 
    }
    public async ClearCartByProfileId(profileId:number):Promise<boolean>{
        await this.cartRepository.deleteCart(profileId);
        return true;
    }
    private async checkProductAndSave(product: ProductShoppingListDTO,profileId:number){
        let search = await this.cartRepository.searchByName(product); 
        if(search.id < 0){
            product = await this.cartRepository.save(product,profileId);
        }else{
            product = await this.cartRepository.update(product);
        }
        return product;
    }
    public async updateCart(cart: ProductShoppingListDTO[],profileId:number){
        for(let prodIndex = 0; prodIndex < cart.length;prodIndex++){
            await this.checkProductAndSave(cart[prodIndex],profileId);
        } 
    }
    
   
}

export default new CartService();
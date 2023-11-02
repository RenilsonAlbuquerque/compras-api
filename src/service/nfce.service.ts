import { IProductService } from "../contracts/service/IProduct.service";
import { Product } from "../model/product";
import axios, {AxiosResponse} from 'axios';
import cheerio from 'cheerio';
import { Place } from "../model/place";
import { Nfce } from "../model/nfce";
import { INfceService } from "../contracts/service/INfce.service";
import { INfceRepository } from "../contracts/repository/INfceRepository";
import { NfceExtractionDto } from "../dto/nfce.extraction.dto";
import { IPlaceService } from "../contracts/service/IPlace.service";
import { NfceRepository } from "../repository/nfce.repository";
import placeService from "./place.service";
import productService from "./product.service";
import { ProductTax } from "../dto/product-tax.dto";
import { SaveNfceDto } from "../dto/nfce/save.nfce.dto";
import { NfceProfileRepository } from "../repository/nfce.profile.repository";
import { IproductRepository } from "../contracts/repository/IProduct.repository";
import { ProductRepository } from "../repository/Product.repository";
import { NfceOverviewDto } from "../dto/nfce/nfce.overview.dto";
import { ProductExtraction } from "../dto/product/product.extraction";
import { concatDuplicates } from "../mappers/product.mapper";

class NFCEService implements INfceService {
   

    private nfceRepository:INfceRepository;
    private _productRepository: IproductRepository;
    private _productService: IProductService;
    private _placeService: IPlaceService;
    private _nfceProfileRepository: NfceProfileRepository;

    constructor(){
        this.nfceRepository = new NfceRepository();
        this._placeService = placeService;
        this._productService = productService;
        this._nfceProfileRepository = new NfceProfileRepository();
        this._productRepository = new ProductRepository();
    }
    async getNfceDetail(nfceId:number):Promise<NfceOverviewDto>{
        let nfceDetail = await this.nfceRepository.getNfceDetailById(nfceId);
        nfceDetail.products = await this._productRepository.listAllProductsByNfceId(nfceId);
        return nfceDetail;
    }
    async describeDetaislsAndSave(saveDto:SaveNfceDto):Promise<Boolean>{
        
        let details = await this.getDetails(saveDto.link);
        await this.saveNFce(details,saveDto.profileId);
        return true;
    }
    async getDetails(link:string):Promise<NfceExtractionDto>{
        let url = link.includes('http')? link : `http://nfce.sefaz.pe.gov.br/nfce-web/consultarNFCe?p=${link}`;
        let result = {};
        let error = undefined;
        await axios.get<any>(url).then(async response => {
            const html = response.data;
            const $ = cheerio.load(html);
        
            const findError = $('erro').text()
            if(findError){
                error = "O Link da NFCE é inválido "
            }else{
                result = await this.extractElementsFromXML($,result);
            }
        })
        .catch(e =>{
            error = "Não foi possível acessar o link da NFCE"
        })
        return new Promise<NfceExtractionDto>((resolve,reject) =>{
            if(error && error.length > 0){
                reject(error)
            }else{
                resolve(result as NfceExtractionDto);
            }
        }) 
       
    }
    public async saveNFce(compra:NfceExtractionDto,profileId:number):Promise<Boolean>{
        try{
            let nfceExistis = await this.checkNfceExists(compra.nfce);
            if(!nfceExistis){
                let place = await this._placeService.checkPlaceAndSave(compra.place);
                compra.nfce.idMercado = place.id;
                let nfce = await this.checkNfceExistsAndSave(compra.nfce);
                let nfceProfile = await this._nfceProfileRepository.save(profileId,nfce.id);
                for(let i = 0; i< compra.produtos.length;i++){
                    await this._productService.checkProductAndSaveInNfce(compra.produtos[i].produto,compra.produtos[i].valores as ProductTax,nfce);
                }
            }
            return true;
        }
        catch(error){
            return false;
        }
        
        // try{
        //     let nfce = await this.checkNfceExistsAndSave(compra.nfce);  
        //     let place = await this._placeService.checkPlaceAndSave(compra.place);
        //     for(let i = 0; i< compra.produtos.length;i++){
        //         await this._productService.(compra.produtos[i].produto,compra.produtos[i].valores as ProductTax,nfce);
        //     }
        // }catch(error){
        //     console.log(error)
        // }
    }
    public async checkNfceExistsAndSave(nfce:Nfce):Promise<Nfce>{
        let result:Nfce = await this.nfceRepository.searchByNumeroAndSerie(nfce.numero,nfce.serie);
        // if(result.id > 0){
        //     throw Error("A nfce já existe");
        // }else
        if(result.id <= 0){
            result = await this.nfceRepository.save(nfce);
        } 
        return result;
    }
    private async checkNfceExists(nfce:Nfce):Promise<Boolean>{
        let result:Nfce = await this.nfceRepository.searchByNumeroAndSerie(nfce.numero,nfce.serie);
        if(result.id > 0){
            throw Error("A nfce já existe");
        }else{
            return false;
        }
    }
    private async extractElementsFromXML($,result){
        
            const data = $('dhRecbto').text().substring(0,10);
            const hora = $('dataHora').text().substring(11,19);
            
            let lugar = {
                    nome : $('xNome').text(),
                    cnpj : $('CNPJ').text().substring(0,14),
                    logradouro : $('xLgr').text(),
                    numero : parseInt($('nro').text()),
                    bairro : $('xBairro').text(),
                    municipio : $('xMun').text(),
                    uf : $('UF').text(),
                    cep : $('CEP').text()
                } as Place
            
         
            const listaItemsXml = $('det') 
            let listaItems = [];
            
            listaItemsXml.each(function(){
                listaItems.push({
                    produto:{
                        id:0,
                        codigo: $(this).find('cProd').text(),
                        cean: $(this).find('cean').text(),
                        nome: $(this).find('xprod').text(),
                        ncm: $(this).find('ncm').text(),
                        cest: $(this).find('CEST').text(),
                        
                    } as Product,
                    cfop: $(this).find('CFOP').text(),
                    valores: {
                        unidadeComprada: $(this).find('uCom').text(),
                        quantidadeComprada: parseInt($(this).find('qCom').text()),
                        valorUnidade: parseFloat($(this).find('vUnCom').text()),
                        valorProduto: parseFloat($(this).find('vProd').text()),
                        cEANTrib: $(this).find('cEANTrib').text(),
                        uTrib:$(this).find('uTrib').text(),
                        qTrib:parseInt($(this).find('qTrib').text()),
                        vUnTrib:parseFloat($(this).find('vUnTrib').text()),
                        indTot:parseInt($(this).find('indTot').text()),
                        valorIcms:parseFloat($(this).find('vICMS').text()) | 0,
                        valorTotalImposto:parseFloat($(this).find('vTotTrib').text())/(  (parseInt($(this).find('qCom').text()) >= 1)? parseInt($(this).find('qCom').text()): 1),
                    } as ProductTax,
                    imposto:{
                       
                         icms:{
                            orig:$(this).find('icms').find('orig').text(),
                            cst:$(this).find('icms').find('CST').text(),
                            picms:parseFloat($(this).find('icms').find('pICMS').text()) || 0,
                            valorIcms:parseFloat($(this).find('icms').find('vICMS').text()) || 0
                         },
                         pis:{
                            valorBaseCompra:parseFloat($(this).find('PIS').find('vBC').text()) || 0,
                            pPis:parseFloat($(this).find('PIS').find('pPIS').text()) || 0,
                            valorPis:parseFloat($(this).find('PIS').find('vPIS').text()) || 0,
                         },
                         cofins:{
                            valorBaseCompra:parseFloat($(this).find('COFINS').find('vBC').text()) || 0,
                            pCOFINS:parseFloat($(this).find('COFINS').find('pCOFINS').text()) || 0,
                            vCOFINS:parseFloat($(this).find('COFINS').find('vCOFINS').text()) || 0,
                         }
                    }
                    
    
                } as ProductExtraction)
            });
            concatDuplicates(listaItems);
            
            let total = {
                vbc: parseFloat($('total').find('ICMSTot').find('vBC').text()),
                vIcms: parseFloat($('total').find('ICMSTot').find('vICMS').text()),
                vICMSDeson: parseFloat($('total').find('ICMSTot').find('vICMSDeson').text()),
                valorProdutos: parseFloat($('total').find('ICMSTot').find('vProd').text()),
                valorNotaFiscal: parseFloat($('total').find('ICMSTot').find('vNF').text()),
            }
            let nfce = {
                id: 0,
                data_compra: data,
                hora: hora,
                numero: parseInt($('nNF').text()),
                serie: parseInt($('serie').text()),
                valorTotal:parseFloat($('total').find('ICMSTot').find('vBC').text()),
                valorIcms:parseFloat($('total').find('ICMSTot').find('vICMS').text()),
                valorIcmsDesc:parseFloat($('total').find('ICMSTot').find('vICMSDeson').text()),
                valorProdutos:parseFloat($('total').find('ICMSTot').find('vProd').text()),
                valorNotaFiscal:parseFloat($('total').find('ICMSTot').find('vNF').text())
            } as Nfce;
            let compra = {
                place: lugar,
                produtos: listaItems,
                nfce:nfce,
            } as NfceExtractionDto;      
            result = compra;
            return result;
    }
   
}

export default new NFCEService();
export interface ProductNFCE{
    idProduto:number,
    idCompra:number,
    unidadeComprada:string,
    quantidadeComprada:number,
    valorUnidade:number,
    valorProduto:number,
    ceantrib:string,
    utrib:string,
    qtrib:number,
    vunTrib:number,
    indtot:number,
    valorIcms:number
    valorTotalImposto:number
}
export const ProductNfceEntityName = 'mtm_produto_compra';
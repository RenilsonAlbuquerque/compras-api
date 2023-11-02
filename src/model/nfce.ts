export interface Nfce{
    id:number,
    idMercado:number,
    data_compra: string,
    hora: string,
    numero:number,
    serie:number,
    valorTotal:number,
    valorIcms:number,
    valorIcmsDesc:number,
    valorProdutos:number,
    valorNotaFiscal:number
}
export const NfceEntityName = 'tb_compra';
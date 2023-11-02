use comprasdb;

select produto.id,
	produto.nome,
	(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras
from tb_produto as produto 
inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto
inner join tb_compra as compra on compra.id = prod_comp.id_compra
inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado
where estabelecimento.id = 1
order by qtd_compras desc; 

select produto.id,
	produto.nome,
    compra.data_compra,
	(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras
from tb_produto as produto 
inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto
inner join tb_compra as compra on compra.id = prod_comp.id_compra
inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado
where estabelecimento.id = 1
order by qtd_compras desc; 

SELECT DATEDIFF('2020-10-30', '2020-10-01') AS 'Result';

select produto.id,produto.nome,(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras from tb_produto as produto inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto inner join tb_compra as compra on compra.id = prod_comp.id_compra inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado where estabelecimento.id = 1 order by qtd_compras desc; 


select produto.id,produto.nome,(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras from tb_produto as produto inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto inner join tb_compra as compra on compra.id = prod_comp.id_compra inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado where estabelecimento.id = 1 order by qtd_compras desc; 


use comprasdb;
select data_compra,valor_total from tb_compra where month(data_compra) = 3 order by data_compra asc;

select comp.id from tb_compra as comp inner join tb_estabelecimento as estab on comp.id_mercado = estab.id where month(data_compra) = 4 order by data_compra asc;
import express from 'express';
import nfceController from './controls/nfce.controller';
import userController from './controls/user.controller';
import sugestionController from './controls/sugestion.controller';
import ChartController from  './controls/chart.controller';
import PlaceController  from './controls/place.controller';
import ProfileController  from './controls/profile.controller';
import productController from './controls/product.controller';
import cartController from './controls/cart.controller';


const app = express();
app.use(express.json());

var cors = require('cors');

// use it before all route definitions
app.use(cors());
//app.options('*',cors())

const port = 8080;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});


app.post('/nfce/detalhes-salvar', nfceController.getDetailsAndSave);
app.post('/nfce/detalhes', nfceController.getDetails);
//app.post('/nfce/salvar',nfceController.saveNfce);

app.post('/login',userController.handleLogin);
app.get('/usuario/listar',userController.listAllUsersDto);

app.get('/sugestao/mercado/:id',sugestionController.takeSugestionByMarketId);
app.post('/grafico',ChartController.listBuys);
app.get('/place/all',PlaceController.listAllPlaces);

app.post('/perfil',ProfileController.saveNewProfile);
app.get('/perfil/usuario/:id',ProfileController.listProfilesByUserId);

app.get('/compra/:id',nfceController.getNfceDetailsById)

app.get('/product/ncms',productController.getAllNCMs)
app.get('/product/profile/:id',productController.listAllProductsByProfileId)
app.post('/product/analisis',productController.getProductAnalisis)


app.get('/cart/:id',cartController.listCartByProfileId);
app.post('/cart/:id',cartController.saveCartByProfile);
app.delete('/cart/:id',cartController.clearCartByProfile);
app.get('/cart/prediction/:id',cartController.listCartPredictionByProfileId);


app.listen(process.env.PORT || 5000, () => {
  
   return console.log(`server is listening on ${process.env.PORT}`);
});
// app.listen(port, () => {
  
//     return console.log(`server is listening on ${port}`);
// });
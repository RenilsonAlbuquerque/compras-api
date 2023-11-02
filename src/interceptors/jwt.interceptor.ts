import express from 'express';

function verifyJWT(req: express.Request, res: express.Response, next){
    // const token = req.headers['x-access-token'];
    // if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    // jwt.verify(token, process.env.SECRET, function(err, decoded) {
    //   if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
    //   // se tudo estiver ok, salva no request para uso posterior
    //   req.userId = decoded.id;
    //   next();
    // });
    console.log("teste de token")
}
app.get('/api', verifyToken, (req, res, next) =>{
    jwt.verify(req.token, process.env.password, (err, authData) => {
      if(err){
        res.sendStatus(403);
      } else {
        res.json({message:'Hello World', authData})
      }
    });  
  });
  //Api Login
  app.post('/api/login', (req, res) => {
    const user = {
      id: 1,
      username: process.env.user,
      email: 'darioedgar@gmail.com'
    }
    jwt.sign({user}, process.env.password, (err, token) => {
      res.json({
        token
      })
    })
  })
  
  function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1]
      req.token = bearerToken;
      next();
    }else{
      //I am Sorry!
      res.sendStatus(403);
    }
  }
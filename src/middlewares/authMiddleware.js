import jwtService from 'jsonwebtoken';

export const middlewareValidarJWT = (req, res, next) => {
  const auth = req.headers['authorization'];
  const jwt = auth ? auth.split(' ')[1] : null;
  const chavePrivada = process.env.JWT_SECRET_KEY;

  jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
    if (err) {
      res.status(401).json('Usuário não autorizado').end();
      return;
    }

    // O objeto "req" é alterado abaixo
    // recebendo uma nova propriedade userInfo.
    // Este mesmo objeto chegará na rota
    // podendo acessar o req.userInfo
    req.userInfo = userInfo;
    next();
  });
};
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const server = Server.instance;
let payload: { from: string, msg: string };

const router = Router();

router.get( '/mensajes', (req: Request, res: Response) => {

  res.json({
    ok: true,
    msg: 'Todo está bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  
  const { from, msg } = req.body;

  payload = {
    from,
    msg
  }

  server.io.emit('new-message', payload);

  res.json({
    ok: true,
    msg,
    from
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  
  const id: string = req.params.id;
  const { from, msg } = req.body;

  payload = {
    from,
    msg
  }

  server.io.in( id ).emit( 'private-message', payload );
  
  res.json({
    ok: true,
    msg,
    from,
    id
  });
});

export default router;

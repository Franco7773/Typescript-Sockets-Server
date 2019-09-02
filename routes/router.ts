import { Router, Request, Response } from 'express';


const router = Router();

router.get( '/mensajes', (req: Request, res: Response) => {

  res.json({
    ok: true,
    msg: 'Todo está bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  
  const { from, msg } = req.body;

  res.json({
    ok: true,
    msg,
    from
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  
  const id: string = req.params.id;
  const { from, msg } = req.body;

  res.json({
    ok: true,
    msg,
    from,
    id
  });
});

export default router;

import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import * as socket from '../sockets/sockets';

import { UsuariosLista } from './usuarios-lista';

import { GLOBAL_PORT as PORT } from '../global/environment';


export const usuariosConectados = new UsuariosLista();

export default class Server {
  
  private static instanceServer: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {

    this.app = express();
    this.port = PORT;

    this.httpServer = new http.Server( this.app );
    this.io = socketIO( this.httpServer );

    this.listenSockets();
  }
  
  public static get instance() {
    return this.instanceServer || ( this.instanceServer = new this()); 
  }
  
  public start( callback: () => void ): void {

    this.httpServer.listen( this.port, callback );
  }
  
  private listenSockets() {
    console.log('Escuchando sockets');;
    
    this.io.on('connection', cliente => {
      console.log('Nuevo cliente conectado con ID: ', cliente.id);
      socket.conectarCliente( cliente )

      socket.configurarUsuario( cliente, this.io );
      socket.message( cliente, this.io );
      socket.desconectar( cliente );
    });
  }
}

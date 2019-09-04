import { Socket } from 'socket.io';
import socketIO from 'socket.io';

import { Usuario } from '../classes/usuario';
import { usuariosConectados } from '../classes/server';

export const conectarCliente = ( cliente: Socket ) => {

  const usuario = new Usuario( cliente.id );
  usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket ) => {

  cliente.on('disconnect', () => {

    usuariosConectados.borrarUsuario( cliente.id );

    console.log('Cliente desconectado');
  });
}

export const message = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('sendMessage', (payload: { from: string, msg: string }) => {
    console.log( payload );

    io.emit('new-message', payload);
  });
}

export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {

  cliente.on('user-config', (payload: { user: string }, callback: ( arg: object ) => any) => {

    usuariosConectados.actualizarNombre( cliente.id, payload.user );
    
    callback({
      ok: true,
      mensaje: `Usuario ${ payload.user }, configurado`
    });
  });
}

import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {

  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}

export const message = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('sendMessage', (payload: { from: string, msg: string }) => {
    console.log( payload );

    io.emit('new-message', payload);
  });
}

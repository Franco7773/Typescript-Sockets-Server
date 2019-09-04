import { Usuario } from './usuario';

export class UsuariosLista {

  private lista: Usuario[] = [];

  constructor() { }

  // Agregar un usuario
  public agregar( usuario: Usuario ) {

    this.lista.push( usuario );

    return usuario;
  }

  public actualizarNombre( id: string, nombre: string ) {

    for( let usuario of this.lista ) {

      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }

    console.log('Actualizando usuario');
    console.log(this.lista);
  }

  // Obtener lista d usuarios
  public getLista() {
    return this.lista;
  }

  // Obtener un usuario
  public getUsuario( id: string ) {

    return this.lista.find( usuario => id === usuario.id);
  }

  // Obtener un usuario de una sala en particular
  public getUsuariosDeSala( sala: string ) {

    this.lista.filter( usuario => sala === usuario.sala);
  }

  // Borrar usuario
  public borrarUsuario( id: string ) {

    const tempUsuario = this.getUsuario( id );
    
    this.lista = this.lista.filter( usuario => id !== usuario.id );

    return tempUsuario
  }
}
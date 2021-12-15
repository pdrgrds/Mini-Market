import { bd, Login, Register, autenticacion, Collection, Doc, SetDoc } from './firebase';

export const ServicioLogin = ({correo, password}:any) => 
    Login(autenticacion, correo, password).then((userCredential:any) => userCredential)

export const ServicioRegistrar = ({correo, password}:any) => 
    Register(autenticacion, correo, password).then((userCreate:any) => userCreate)

export const ServicioRegistrarCollection = ({uid, data}:any) =>
    SetDoc(Doc(bd, "Usuarios", `${uid}`), data)
    .then((res:any) => res)
    .catch((err:any) => err)
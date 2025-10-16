import { DetalleActividad } from "./components/actividad/DetalleActividad";
import { ListaActividades } from "./components/actividad/ListaActividades";
import { RegistrarActividad } from "./components/actividad/RegistrarActividad";
import { ListaUsuarios } from "./components/user/ListaUsuarios";
import { RegistrarUsuario } from "./components/user/RegistrarUsuario";
import { UsuarioDetalle } from "./components/user/UsuarioDetalle";
import { DashboardPage } from "./pages/dashboard";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";

export const routes = [
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/inicio', element: <DashboardPage/>},
    {path: '/registrar-miembro', element: <RegistrarUsuario/>},
    {path: '/miembros', element: <ListaUsuarios/> },
    {path: '/miembros/:id', element: <UsuarioDetalle/>},
    {path: '/registrar-actividad', element: <RegistrarActividad/> },
    {path: '/actividades', element: <ListaActividades/>},
    {path: '/actividad/:id', element: <DetalleActividad/>}
]
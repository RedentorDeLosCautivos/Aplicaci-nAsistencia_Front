import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://aplicaci-nasistencia-back.onrender.com/asistencia-santamarta/v1/",
    timeout: 3000,
    httpsAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                }
            } catch (err) {
                console.warn("Error al leer el token:", err);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    return await apiClient.post('/auth/login', data);
};

export const registrarUsuario = async (data) => {
    try{
        const response = await apiClient.post('/user/registrar-miembro', data)
        return response.data
    } catch (e) {
        return { error: true, e };
    }
}

export const listarUsuarios = async () =>{
    try{
        const response = await apiClient.get('/user/listarUsuario')
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const usuarioById = async (id) =>{
    try{
        const response = await apiClient.get(`/user/usuario/${id}`)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const updateUsuario = async (id, data) => {
    try{
        const response = await apiClient.put(`/user/editarUsuario/${id}`, data)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const eliminarUsuario = async (id) =>{
    try{
        const response = await apiClient.delete(`/user/eliminarUsuario/${id}`)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const agregarActividad = async (data) => {
    try{
        const response = await apiClient.post('/actividad/agregarActividad', data)
        return response.data
    }catch(e){
        return { error: true, e };
    }  
}

export const listarActividades = async () => {
    try{
        const response = await apiClient.get('/actividad/listarActividad')
        return response.data
    }catch(e){
        return { error: true, e };
    }  
}

export const eliminarActividad = async (id) => {
    try{
        const response = await apiClient.delete(`/actividad/eliminarActividad/${id}`)  
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const updateActividad = async (id, data) => {
    try{
        const response = await apiClient.put(`/actividad/editarActividad/${id}`, data)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const actividadById = async (id) => {
    try{
        const response = await apiClient.get(`/actividad/buscarActividad/${id}`)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const registrarAsistencia = async (data) => {
    try{
        const response = await apiClient.post('/asistencia/registrarAsistencia', data)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const miembrosActividad = async (actividadId) => {
    try{
        const response = await apiClient.get(`/actividad/miembrosActividad/${actividadId}`)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}

export const actividadesMiembro = async (miembroId) => {
    try{
        const response = await apiClient.get(`/user/actividadesMiembro/${miembroId}`)
        return response.data
    }catch(e){
        return { error: true, e };
    }
}
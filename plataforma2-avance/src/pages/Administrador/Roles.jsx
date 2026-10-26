import { useState, useEffect } from 'react';
import api from '../../Config/env';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuAbiertoId, setMenuAbiertoId] = useState(null);

    // Estados para el Modal de Edición
    const [modalEditarOpen, setModalEditarOpen] = useState(false);
    const [rolEditando, setRolEditando] = useState(null);
    const [nombreRolEdit, setNombreRolEdit] = useState('');
    const [guardandoEdit, setGuardandoEdit] = useState(false);

    // Estados para el Modal de Crear Nuevo Rol
    const [modalCrearOpen, setModalCrearOpen] = useState(false);
    const [nombreNuevoRol, setNombreNuevoRol] = useState('');
    const [guardandoNuevo, setGuardandoNuevo] = useState(false);

    useEffect(() => {
        let ignore = false;

        const cargarRoles = async () => {
            try {
                const response = await api.get('/rols/list');
                console.log("Respuesta de la API:", response.data);

                if (!ignore) {
                    const data = response.data;
                    setRoles(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
                }
            } catch (error) {
                console.error('Error al cargar los roles:', error);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        cargarRoles();

        return () => {
            ignore = true;
        };
    }, []);

    // 1. Función para Crear un Nuevo Rol (POST)
    const guardarNuevoRol = async (e) => {
        e.preventDefault();
        if (!nombreNuevoRol.trim()) return;

        setGuardandoNuevo(true);
        try {
            // Cambia la ruta '/rols/store' si tu endpoint de Laravel es diferente (ej. '/rols' o '/rols/create')
            const response = await api.post('/rols/store', {
                name_role: nombreNuevoRol
            });

            console.log("Rol creado:", response.data);
            
            // Recargamos la lista completa o agregamos el nuevo rol devuelto por la API
            const rolCreado = response.data.rol || response.data;
            setRoles(prevRoles => [...prevRoles, rolCreado]);

            setNombreNuevoRol('');
            setModalCrearOpen(false);
        } catch (error) {
            console.error('Error al crear el rol:', error);
            alert('Hubo un error al intentar registrar el nuevo rol.');
        } finally {
            setGuardandoNuevo(false);
        }
    };

    // 2. Función para Eliminar un Rol
    const eliminarRol = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este rol?')) return;

        try {
            await api.delete(`/rols/${id}`);
            setRoles(roles.filter(rol => rol.id !== id));
            setMenuAbiertoId(null);
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            alert('Hubo un error al intentar eliminar el rol.');
        }
    };

    // 3. Abrir Modal de Edición
    const abrirModalEditar = (rol) => {
        setRolEditando(rol);
        setNombreRolEdit(rol.name_role || '');
        setMenuAbiertoId(null);
        setModalEditarOpen(true);
    };

    // 4. Guardar Cambios de Edición (PUT)
    const guardarEdicion = async (e) => {
        e.preventDefault();
        if (!nombreRolEdit.trim()) return;

        setGuardandoEdit(true);
        try {
            await api.put(`/rols/${rolEditando.id}`, {
                name_role: nombreRolEdit
            });

            setRoles(roles.map(r => r.id === rolEditando.id ? { ...r, name_role: nombreRolEdit, updated_at: new Date().toISOString() } : r));
            
            setModalEditarOpen(false);
            setRolEditando(null);
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            alert('Hubo un error al guardar los cambios.');
        } finally {
            setGuardandoEdit(false);
        }
    };

    // Función para asignar colores dinámicos según el nombre del rol
    const obtenerColorRol = (nombreRol) => {
        const rol = nombreRol?.toLowerCase() || '';
        
        if (rol.includes('admin')) {
            return 'bg-red-100 text-red-600 border border-red-200';
        } else if (rol.includes('rector') || rol.includes('director')) {
            return 'bg-amber-100 text-amber-700 border border-amber-200';
        } else if (rol.includes('coordinador') || rol.includes('docente') || rol.includes('profesor')) {
            return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
        } else if (rol.includes('estudiant') || rol.includes('alumno') || rol.includes('estudent')) {
            return 'bg-sky-100 text-sky-600 border border-sky-200';
        } else {
            return 'bg-slate-100 text-slate-600 border border-slate-200';
        }
    };

    const rolesFiltrados = roles.filter(rol => 
        rol.name_role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className={"contenido-principal-roles [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px] [min-height:100vh]"}>
                <header className={"header-tabla-roles [margin-bottom:30px]"}>
                    <div className="titulo-area">
                        <h1 className={"[.header-tabla-roles_&]:[color:var(--azul-navy)] [.header-tabla-roles_&]:[font-size:1.8rem] [.header-tabla-roles_&]:[margin:0]"}>Gestión de Roles y Accesos</h1>
                        <p className={"[.header-tabla-roles_&]:[color:#64748b] [.header-tabla-roles_&]:[margin-top:5px]"}>Configura los niveles de seguridad y permisos para los usuarios de la plataforma.</p>
                    </div>
                </header>
                 
                <section className="contenedor-roles">
                    <div className={"card-informativa-soft [background:linear-gradient(90deg,_#1a1c2d,_#2a2d45)] [color:white] [padding:25px] [border-radius:16px] [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:30px] [box-shadow:0_10px_20px_rgba(0,0,0,0.1)]"}>
                        <div className={"info-texto-roles [display:flex] [align-items:center] [gap:20px]"}>
                            <i className="bi bi-shield-check text-cyan-400 text-4xl"></i>
                            <div>
                                <strong className="block text-lg mb-1">Seguridad del Sitio</strong>
                                <p className="m-0 text-sm opacity-80">Visualiza y administra los niveles de seguridad y perfiles de acceso.</p>
                            </div>
                        </div>
                        <button className={"btn-secundario [background:rgba(255,255,255,0.1)] [border:1px_solid_rgba(255,255,255,0.2)] [color:white] [padding:10px_20px] [border-radius:10px] [cursor:pointer] [transition:0.3s]"}>
                            Ver Permisos <i className="bi bi-arrow-right ml-2"></i>
                        </button>
                    </div>

                    <div className={"contenedor-tabla-soft [background:var(--blanco)] [border-radius:20px] [padding:25px] [box-shadow:0_4px_20px_rgba(0,0,0,0.02)]"}>
                        <div className={"barra-herramientas [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:25px]"}>
                            <div className="titulo-tabla-interna">
                                <h2>Listado de Roles</h2>
                            </div>
                            <div className={"acciones [display:flex] [gap:15px]"}>
                                <div className="busqueda-contenedor flex items-center bg-[#f8fafc] border border-slate-200 rounded-xl px-3">
                                    <i className="bi bi-search text-slate-400 mr-2"></i>
                                    <input 
                                        type="text" 
                                        className="bg-transparent outline-none py-2 w-[250px] text-sm" 
                                        placeholder="Buscar rol..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button 
                                    onClick={() => setModalCrearOpen(true)}
                                    className={"btn-primario [background:var(--cyan-em)] [color:white] [border:none] [padding:10px_20px] [border-radius:10px] [font-weight:600] [cursor:pointer]"}
                                >
                                    <i className="bi bi-plus-lg mr-1"></i> Nuevo Rol
                                </button>
                            </div>
                        </div>

                        {/* Tabla principal */}
                        <table className={"tabla-matriculados [width:100%] [border-collapse:collapse]"}>
                            <thead>
                                <tr>
                                    <th className={"[.tabla-matriculados_&]:[text-align:left] [.tabla-matriculados_&]:[padding:15px] [.tabla-matriculados_&]:[color:#64748b] [.tabla-matriculados_&]:[font-size:0.85rem] [.tabla-matriculados_&]:[text-transform:uppercase] [.tabla-matriculados_&]:[border-bottom:2px_solid_var(--border-color)]"}>Nombre del Rol</th>
                                    <th className={"[.tabla-matriculados_&]:[text-align:left] [.tabla-matriculados_&]:[padding:15px] [.tabla-matriculados_&]:[color:#64748b] [.tabla-matriculados_&]:[font-size:0.85rem] [.tabla-matriculados_&]:[text-transform:uppercase] [.tabla-matriculados_&]:[border-bottom:2px_solid_var(--border-color)]"}>Última Edición</th>
                                    <th className={"[.tabla-matriculados_&]:[text-align:left] [.tabla-matriculados_&]:[padding:15px] [.tabla-matriculados_&]:[color:#64748b] [.tabla-matriculados_&]:[font-size:0.85rem] [.tabla-matriculados_&]:[text-transform:uppercase] [.tabla-matriculados_&]:[border-bottom:2px_solid_var(--border-color)]"}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6 text-slate-500">Cargando roles desde la API...</td>
                                    </tr>
                                ) : rolesFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6 text-slate-500">No hay roles registrados.</td>
                                    </tr>
                                ) : (
                                    rolesFiltrados.map((rol) => (
                                        <tr key={rol.id}>
                                            <td className={"[.tabla-matriculados_&]:[padding:18px_15px] [.tabla-matriculados_&]:[border-bottom:1px_solid_var(--border-color)]"}>
                                                <span className={`rol-tag px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide ${obtenerColorRol(rol.name_role)}`}>
                                                    {rol.name_role}
                                                </span>
                                            </td>
                                            <td className={"[.tabla-matriculados_&]:[padding:18px_15px] [.tabla-matriculados_&]:[border-bottom:1px_solid_var(--border-color)]"}>
                                                {rol.updated_at ? new Date(rol.updated_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className={"[.tabla-matriculados_&]:[padding:18px_15px] [.tabla-matriculados_&]:[border-bottom:1px_solid_var(--border-color)] relative"}>
                                                <button 
                                                    onClick={() => setMenuAbiertoId(menuAbiertoId === rol.id ? null : rol.id)}
                                                    className={"btn-tabla [background:none] [border:none] [color:#94a3b8] [cursor:pointer] [font-size:1.2rem]"}
                                                >
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </button>

                                                {/* Menú flotante de acciones */}
                                                {menuAbiertoId === rol.id && (
                                                    <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1">
                                                        <button 
                                                            onClick={() => abrirModalEditar(rol)}
                                                            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <i className="bi bi-pencil text-blue-500"></i> Editar
                                                        </button>
                                                        <button 
                                                            onClick={() => eliminarRol(rol.id)}
                                                            className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <i className="bi bi-trash text-red-500"></i> Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Modal para Crear Nuevo Rol */}
            {modalCrearOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-800">Registrar Nuevo Rol</h3>
                            <button 
                                onClick={() => setModalCrearOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={guardarNuevoRol}>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                    Nombre del Rol
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500 transition-colors"
                                    value={nombreNuevoRol}
                                    onChange={(e) => setNombreNuevoRol(e.target.value)}
                                    placeholder="Ej. Docente, Coordinador"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setModalCrearOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    disabled={guardandoNuevo}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {guardandoNuevo ? 'Guardando...' : 'Crear Rol'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Edición */}
            {modalEditarOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-800">Editar Rol</h3>
                            <button 
                                onClick={() => setModalEditarOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={guardarEdicion}>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                    Nombre del Rol
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500 transition-colors"
                                    value={nombreRolEdit}
                                    onChange={(e) => setNombreRolEdit(e.target.value)}
                                    placeholder="Ej. Administrador"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setModalEditarOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    disabled={guardandoEdit}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {guardandoEdit ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;
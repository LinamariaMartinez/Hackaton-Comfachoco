
import toast from "react-hot-toast";
import { loginUser as loginUserChatbot } from "./chatbot";

/**
 * Login de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña SIN hashear (backend valida)
 * @returns {Promise<{success: boolean, role: string, user: object, token: string}>}
 */
export const loginUser = async (email, password) => {
  try {
    console.log("🔐 Intentando login con N8N (chatbot.js)...");
    console.log("Request payload:", {
      email_corp: email,
      contrasena: password,
    });

    const result = await loginUserChatbot({ email_corp: email, contrasena: password });
    
    if (!result.success) {
      // Obtener mensaje de error apropiado basado en el tipo de error
      let errorMessage = result.message;
      
      // Si hay datos del usuario, incluirlos en el error para debugging
      if (result.user_data) {
        console.log("📊 Datos del usuario encontrado:", result.user_data);
        
        // Personalizar mensaje si es error de contraseña
        if (result.error_type === "auth_failed") {
          errorMessage = "La contraseña ingresada no es correcta. Por favor, verifica e intenta nuevamente.";
        }
      }
      
      // Mostrar mensaje de error al usuario
      toast.error(errorMessage);
      
      // Lanzar error con información adicional
      const error = new Error(errorMessage);
      error.type = result.error_type;
      error.details = result;
      throw error;
    }

    // Si la autenticación fue exitosa
    const userData = result.data?.user_data || result.data?.user || {};
    const userRole = userData.rol?.toLowerCase() || "empleado";
    const token = result.data?.token || "temp-token";

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    toast.success("¡Bienvenido/a!");

    return {
      success: true,
      role: userRole,
      user: userData,
      token: token,
    };

  } catch (error) {
    console.error("❌ Error en login:", error);
    
    // Solo mostrar toast si no se ha mostrado ya un mensaje específico
    if (!error.message.includes("Contraseña")) {
      toast.error("Error al iniciar sesión");
    }
    
    throw error;
  }
};

/**
 * Crear nuevo usuario (solo RRHH)
 * @param {object} userData - Datos del usuario
 * @param {object} currentUser - Usuario actual (debe ser RRHH)
 * @returns {Promise<{success: boolean, userId: string, message: string}>}
 */
export const createUser = async (userData, currentUser) => {
  try {
    // Validar que el usuario actual sea RRHH
    const userRole = currentUser?.rol || currentUser?.role;
    if (
      !currentUser ||
      (userRole !== "hr" && userRole !== "rrhh" && userRole !== "RRHH")
    ) {
      const errorMsg = "Solo RRHH puede crear usuarios";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    console.log("👤 Creando usuario con N8N...");
    console.log("📤 Datos que se envían:");
    console.log(
      JSON.stringify(
        {
          email_corp: userData.email_corp,
          primer_nombre: userData.primer_nombre,
          primer_apellido: userData.primer_apellido,
          segundo_nombre: userData.segundo_nombre,
          segundo_apellido: userData.segundo_apellido,
          tipo_documento: userData.tipo_documento,
          numero_documento: userData.numero_documento,
          contrasena: userData.contrasena,
          rol: userData.rol,
          area_code: userData.area_code,
          rol_solicitante: "RRHH",
          is_active: true,
        },
        null,
        2,
      ),
    );

    const bodyPayload = {
      email_corp: userData.email_corp,
      primer_nombre: userData.primer_nombre,
      primer_apellido: userData.primer_apellido,
      segundo_nombre: userData.segundo_nombre,
      segundo_apellido: userData.segundo_apellido,
      tipo_documento: userData.tipo_documento,
      numero_documento: userData.numero_documento,
      contrasena: userData.contrasena,
      rol: userData.rol,
      area_code: userData.area_code,
      rol_solicitante: "RRHH",
      is_active: true,
    };

    const response = await fetch(ENDPOINTS.VITE_CREATE_USER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    console.log("📥 Respuesta del servidor:", response.status);
    const text = await response.text();
    console.log("📄 Response text:", text);

    if (!response.ok) {
      console.error("Response error text:", text);
      let errorMessage = "Error al crear usuario";
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error("No se pudo parsear respuesta de error como JSON");
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // 🔥 FIX: Manejar respuesta vacía como éxito
    if (response.status === 201 || response.status === 200) {
      // Si la respuesta está vacía o es {} pero el status es exitoso
      if (!text || text.trim() === "{}" || text.trim() === "") {
        console.log(
          "✅ Usuario creado exitosamente (respuesta vacía pero status OK)",
        );
        toast.success("Usuario creado exitosamente");

        return {
          success: true,
          userId: `user_${Date.now()}`,
          message: "Usuario creado exitosamente",
        };
      }
    }

    // Intentar parsear JSON
    let data;
    try {
      data = text ? JSON.parse(text) : {};
      console.log("Parsed data:", data);
    } catch (e) {
      // Si no se puede parsear pero el status fue exitoso
      if (response.status === 201 || response.status === 200) {
        console.log(
          "✅ Usuario creado exitosamente (respuesta no JSON pero status OK)",
        );
        toast.success("Usuario creado exitosamente");

        return {
          success: true,
          userId: `user_${Date.now()}`,
          message: "Usuario creado exitosamente",
        };
      }

      console.error("Server error: invalid JSON response", e);
      toast.error("Server error: invalid response format");
      throw new Error("Server error: invalid JSON response");
    }

    // 🔥 NUEVA VALIDACIÓN: Solo fallar si hay error explícito
    if (data && data.success === false) {
      throw new Error(data?.message || "No se pudo crear el usuario");
    }

    // Si llegamos aquí, fue exitoso
    console.log(
      "✅ Usuario creado exitosamente:",
      data?.userId || data?.user_id || "ID no disponible",
    );
    toast.success(data?.message || "Usuario creado exitosamente");

    return {
      success: true,
      userId: data?.userId || data?.user_id || `user_${Date.now()}`,
      message: data?.message || "Usuario creado exitosamente",
    };
  } catch (error) {
    console.error("❌ Error creando usuario:", error);
    if (!error.message.includes("Solo RRHH")) {
      toast.error(error.message || "Error al crear usuario");
    }
    throw error;
  }
};

// Mantener función legacy para compatibilidad
export const login = async (email, password) => {
  const result = await loginUser(email, password);
  return {
    user: result.user,
    token: result.token,
  };
};

export const logout = async () => {
  try {
    console.log("👋 Cerrando sesión...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Verificar si hay usuario guardado en localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      console.log("🔍 Usuario encontrado en localStorage:", user);
      return user;
    }
    console.log("❌ No hay usuario en localStorage");
    return null;
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
};

export const onAuthStateChange = (callback) => {
  // En modo actual, ejecutar callback inmediatamente si hay usuario
  const userStr = localStorage.getItem("user");
  if (userStr) {
    callback(JSON.parse(userStr));
  }

  // Retornar función de cleanup vacía
  return () => {};
};

/* import api from './api';

 // Mock users para desarrollo
const mockUsers = {
  'empleado@comfachoco.com': {
    password: '123456',
    user: {
      id: 1,
      name: 'Juan Pérez',
      email: 'empleado@comfachoco.com',
      role: 'employee',
      department: 'Desarrollo',
    },
    token: 'mock-token-employee-123',
  },
  'supervisor@comfachoco.com': {
    password: '123456',
    user: {
      id: 2,
      name: 'María García',
      email: 'supervisor@comfachoco.com',
      role: 'supervisor',
      department: 'Operaciones',
    },
    token: 'mock-token-supervisor-456',
  },
  'rrhh@comfachoco.com': {
    password: '123456',
    user: {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'rrhh@comfachoco.com',
      role: 'hr',
      department: 'Recursos Humanos',
    },
    token: 'mock-token-hr-789',
  },
};

export const login = async (email, password) => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validar usuario mock
  const mockUser = mockUsers[email];

  if (!mockUser || mockUser.password !== password) {
    throw new Error('Credenciales incorrectas');
  }

  // Guardar token
  localStorage.setItem('token', mockUser.token);
  localStorage.setItem('user', JSON.stringify(mockUser.user));

  return {
    user: mockUser.user,
    token: mockUser.token,
  };

  // API real (comentada para desarrollo)
  // const response = await api.post('/auth/login', { email, password });
  // if (response.data.token) {
  //   localStorage.setItem('token', response.data.token);
  // }
  // return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }

  // API real (comentada para desarrollo)
  // const response = await api.get('/auth/me');
  // return response.data;

  return null;
}; */

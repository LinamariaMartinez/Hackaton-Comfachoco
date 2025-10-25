/**
 * Servicio de localStorage para persistencia de datos
 * Maneja solicitudes, historial de chat y cache de datos
 */

const KEYS = {
  REQUESTS: 'comfachoco_requests',
  CHAT_HISTORY: 'comfachoco_chat_history',
  USER_DATA: 'comfachoco_user_data',
  BALANCE_CACHE: 'comfachoco_balance_cache',
};

/**
 * Obtiene solicitudes del usuario desde localStorage
 */
export const getSolicitudesFromStorage = (userId) => {
  try {
    const stored = localStorage.getItem(KEYS.REQUESTS);
    if (!stored) return [];

    const allRequests = JSON.parse(stored);
    // Filtrar por usuario
    return allRequests.filter(req => req.userId === userId);
  } catch (error) {
    console.error('Error leyendo solicitudes de localStorage:', error);
    return [];
  }
};

/**
 * Guarda una nueva solicitud en localStorage
 */
export const saveSolicitudToStorage = (userId, solicitud) => {
  try {
    const stored = localStorage.getItem(KEYS.REQUESTS);
    const allRequests = stored ? JSON.parse(stored) : [];

    const newRequest = {
      ...solicitud,
      userId,
      id: `req_${Date.now()}`,
      fecha_creacion: new Date().toISOString(),
      estado: solicitud.estado || 'pending',
    };

    allRequests.push(newRequest);
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(allRequests));

    console.log('✅ Solicitud guardada en localStorage:', newRequest);
    return newRequest;
  } catch (error) {
    console.error('Error guardando solicitud en localStorage:', error);
    throw error;
  }
};

/**
 * Actualiza el estado de una solicitud (aprobar/rechazar)
 */
export const updateSolicitudStatus = (requestId, newStatus) => {
  try {
    const stored = localStorage.getItem(KEYS.REQUESTS);
    if (!stored) return false;

    const allRequests = JSON.parse(stored);
    const index = allRequests.findIndex(req => req.id === requestId);

    if (index === -1) return false;

    allRequests[index].estado = newStatus;
    allRequests[index].fecha_actualizacion = new Date().toISOString();

    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(allRequests));
    console.log('✅ Solicitud actualizada:', allRequests[index]);
    return true;
  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    return false;
  }
};

/**
 * Obtiene historial de chat del usuario
 */
export const getChatHistoryFromStorage = (userId) => {
  try {
    const stored = localStorage.getItem(KEYS.CHAT_HISTORY);
    if (!stored) return [];

    const allHistory = JSON.parse(stored);
    return allHistory[userId] || [];
  } catch (error) {
    console.error('Error leyendo historial de chat:', error);
    return [];
  }
};

/**
 * Guarda el historial de chat del usuario
 */
export const saveChatHistoryToStorage = (userId, messages) => {
  try {
    const stored = localStorage.getItem(KEYS.CHAT_HISTORY);
    const allHistory = stored ? JSON.parse(stored) : {};

    allHistory[userId] = messages;
    localStorage.setItem(KEYS.CHAT_HISTORY, JSON.stringify(allHistory));

    console.log('✅ Historial de chat guardado para usuario:', userId);
  } catch (error) {
    console.error('Error guardando historial de chat:', error);
  }
};

/**
 * Limpia el historial de chat del usuario
 */
export const clearChatHistory = (userId) => {
  try {
    const stored = localStorage.getItem(KEYS.CHAT_HISTORY);
    if (!stored) return;

    const allHistory = JSON.parse(stored);
    delete allHistory[userId];
    localStorage.setItem(KEYS.CHAT_HISTORY, JSON.stringify(allHistory));

    console.log('🧹 Historial de chat limpiado para usuario:', userId);
  } catch (error) {
    console.error('Error limpiando historial de chat:', error);
  }
};

/**
 * Guarda datos de usuario en cache
 */
export const saveUserDataCache = (userId, data) => {
  try {
    const stored = localStorage.getItem(KEYS.USER_DATA);
    const allData = stored ? JSON.parse(stored) : {};

    allData[userId] = {
      ...data,
      timestamp: Date.now(),
    };

    localStorage.setItem(KEYS.USER_DATA, JSON.stringify(allData));
  } catch (error) {
    console.error('Error guardando datos de usuario:', error);
  }
};

/**
 * Obtiene datos de usuario desde cache
 */
export const getUserDataCache = (userId) => {
  try {
    const stored = localStorage.getItem(KEYS.USER_DATA);
    if (!stored) return null;

    const allData = JSON.parse(stored);
    const userData = allData[userId];

    // Verificar si el cache es muy antiguo (más de 1 hora)
    if (userData && (Date.now() - userData.timestamp) > 3600000) {
      console.log('⚠️ Cache de usuario expirado');
      return null;
    }

    return userData;
  } catch (error) {
    console.error('Error leyendo cache de usuario:', error);
    return null;
  }
};

/**
 * Guarda saldo en cache
 */
export const saveBalanceCache = (userId, balance) => {
  try {
    const stored = localStorage.getItem(KEYS.BALANCE_CACHE);
    const allBalances = stored ? JSON.parse(stored) : {};

    allBalances[userId] = {
      ...balance,
      timestamp: Date.now(),
    };

    localStorage.setItem(KEYS.BALANCE_CACHE, JSON.stringify(allBalances));
  } catch (error) {
    console.error('Error guardando cache de saldo:', error);
  }
};

/**
 * Obtiene saldo desde cache
 */
export const getBalanceCache = (userId) => {
  try {
    const stored = localStorage.getItem(KEYS.BALANCE_CACHE);
    if (!stored) return null;

    const allBalances = JSON.parse(stored);
    const balance = allBalances[userId];

    // Cache válido por 5 minutos
    if (balance && (Date.now() - balance.timestamp) > 300000) {
      return null;
    }

    return balance;
  } catch (error) {
    console.error('Error leyendo cache de saldo:', error);
    return null;
  }
};

/**
 * Limpia todos los datos de localStorage (útil para logout)
 */
export const clearAllStorage = () => {
  try {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('🧹 Todos los datos de localStorage limpiados');
  } catch (error) {
    console.error('Error limpiando localStorage:', error);
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const CHATBOT_ENDPOINT = import.meta.env.VITE_CHATBOT_ENDPOINT

/**
 * Enviar solicitud a N8N
 */
export const submitRequest = async (requestData, user) => {
  try {
    // Validar que el usuario tiene documento
    if (!user.documento) {
      throw new Error('El usuario no tiene número de documento configurado')
    }

    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje: requestData.mensaje || `Solicitud de ${requestData.proceso_solicitado}`,
      proceso_solicitado: requestData.proceso_solicitado || 'vacaciones',
      fecha_inicio: requestData.fecha_inicio,
      fecha_fin: requestData.fecha_fin
    }

    console.log('📤 Enviando a N8N:', payload)

    const response = await fetch(`${API_BASE_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      message: '✅ Solicitud enviada correctamente al sistema',
      data: result
    }

  } catch (error) {
    console.error('Error al enviar solicitud:', error)
    return {
      success: false,
      message: '❌ Error al conectar con el sistema',
      error: error.message
    }
  }
}

/**
 * Consultar saldo via N8N
 */
export const consultarSaldo = async (user) => {
  try {
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje: "Consulta de saldo de días disponibles",
      proceso_solicitado: "consulta_saldo"
    }

    const response = await fetch(`${API_BASE_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      saldo: result.dias_disponibles || 0,
      usado: result.dias_usados || 0,
      total: result.dias_asignados || 0,
      pendientes: result.solicitudes_pendientes || 0,
      data: result
    }

  } catch (error) {
    console.error('Error al consultar saldo:', error)
    return {
      success: false,
      message: 'Error al consultar saldo',
      error: error.message
    }
  }
}

/**
 * Consultar estado de licencias via N8N
 */
export const consultarEstadoLicencias = async (user) => {
  try {
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje: "Consulta de estado de licencias",
      proceso_solicitado: "consulta_estado_licencias"
    }

    const response = await fetch(`${API_BASE_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      solicitudes: result.solicitudes || [],
      data: result
    }

  } catch (error) {
    console.error('Error al consultar estado:', error)
    return {
      success: false,
      message: 'Error al consultar estado de licencias',
      error: error.message
    }
  }
}

/**
 * Función principal del chatbot
 */
export const sendMessage = async (message, context = {}) => {
  const { user } = context
  
  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  try {
    const payload = {
      id_empleado: user.documento,
      nombres: user.name,
      d_area: user.department,
      mensaje: message,
      proceso_solicitado: "consulta_chatbot"
    }

    console.log('📤 Enviando a N8N:', payload)

    const response = await fetch(`${API_BASE_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()
    console.log('📄 Respuesta de N8N:', responseText || '(vacía)')

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${responseText}`)
    }

    // 🔥 MANEJAR RESPUESTA VACÍA DE N8N
    if (!responseText.trim()) {
      return {
        text: `✅ Tu consulta "${message}" ha sido procesada correctamente por el sistema.\n\n` +
              `📊 Detalles:\n` +
              `• Usuario: ${user.name}\n` +
              `• Documento: ${user.documento}\n` +
              `• Área: ${user.department}\n\n` +
              `El sistema está funcionando. N8N recibió tu solicitud exitosamente.`,
        action: 'backend_response',
        data: { status: 'processed', empty_response: true }
      }
    }

    // Parsear JSON si hay contenido
    try {
      const result = JSON.parse(responseText)
      return {
        text: result.respuesta || result.message || responseText,
        action: 'backend_response',
        data: result
      }
    } catch (jsonError) {
      return {
        text: responseText,
        action: 'backend_response',
        data: { raw: responseText }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error)
    
    return {
      text: `❌ Error de conexión: ${error.message}`,
      action: 'error',
      error: error.message
    }
  }
}

export default {
  sendMessage,
  submitRequest,
  consultarSaldo,
  consultarEstadoLicencias,
}

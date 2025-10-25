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

    console.log('📤 Enviando payload a N8N:', payload)
    console.log('🔗 URL completa:', `${API_BASE_URL}${CHATBOT_ENDPOINT}`)

    const response = await fetch(`${API_BASE_URL}${CHATBOT_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    console.log('📡 Respuesta HTTP:', response.status, response.statusText)
    
    // 🔥 VERIFICAR SI LA RESPUESTA ES EXITOSA
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error HTTP completo:', errorText)
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
    }

    // 🔥 VERIFICAR EL CONTENT-TYPE
    const contentType = response.headers.get('content-type')
    console.log('📋 Content-Type recibido:', contentType)

    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text()
      console.warn('⚠️ Respuesta no es JSON:', textResponse)
      
      // Si N8N devuelve texto plano, usarlo directamente
      return {
        text: textResponse || 'Respuesta recibida del sistema',
        action: 'backend_response',
        data: { raw_response: textResponse }
      }
    }

    // 🔥 INTENTAR PARSEAR JSON CON MANEJO DE ERRORES
    let result
    try {
      const responseText = await response.text()
      console.log('📄 Respuesta cruda:', responseText)
      
      if (!responseText.trim()) {
        console.warn('⚠️ Respuesta vacía del servidor')
        return {
          text: 'Consulta procesada correctamente',
          action: 'backend_response',
          data: {}
        }
      }

      result = JSON.parse(responseText)
      console.log('✅ JSON parseado correctamente:', result)
      
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError)
      const responseText = await response.text()
      console.log('📄 Texto que causó error:', responseText)
      
      // Usar el texto tal como viene si no es JSON
      return {
        text: responseText || 'Respuesta procesada',
        action: 'backend_response',
        data: { error: 'response_not_json', raw: responseText }
      }
    }
    
    // 🔥 EXTRAER RESPUESTA SEGÚN ESTRUCTURA DE N8N
    const responseText = 
      result.respuesta ||     // Si N8N devuelve 'respuesta'
      result.message ||       // Si N8N devuelve 'message'  
      result.texto ||         // Si N8N devuelve 'texto'
      result.output ||        // Si N8N devuelve 'output'
      JSON.stringify(result)  // Último recurso: mostrar todo

    return {
      text: responseText,
      action: 'backend_response',
      data: result
    }

  } catch (error) {
    console.error('❌ Error completo en sendMessage:', error)
    
    // 🔥 RESPUESTA DE DEBUGGING PARA DESARROLLO
    return {
      text: `🔧 Error de conexión (Debug): ${error.message}\\n\\n` +
            `URL: ${API_BASE_URL}${CHATBOT_ENDPOINT}\\n` +
            `Usuario: ${user.documento}\\n` +
            `Mensaje: ${message}\\n\\n` +
            'Verifica:\\n' +
            '1. Variables de entorno\\n' +
            '2. Endpoint de N8N funcionando\\n' +
            '3. Formato de respuesta de N8N',
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

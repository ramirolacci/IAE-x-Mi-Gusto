import { useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from './lib/supabase';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// URL de la imagen para el email (puedes cambiarla)
const EMAIL_IMAGE_URL = 'https://via.placeholder.com/600x300/8B5CF6/FFFFFF?text=IAE+x+Mi+Gusto';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleObtener = async () => {
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Por favor ingresa un email válido' });
      return;
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Por favor ingresa un email válido' });
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setMessage({ 
        type: 'error', 
        text: 'Configuración de EmailJS incompleta. Por favor contacta al administrador.' 
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 1. Obtener un código disponible de Supabase
      const { data: codigoData, error: codigoError } = await supabase
        .from('email_codes')
        .select('id, codigo')
        .eq('used', false)
        .limit(1)
        .single();

      if (codigoError || !codigoData) {
        throw new Error('No hay códigos disponibles en este momento. Por favor intenta más tarde.');
      }

      const codigo = codigoData.codigo;
      const codigoId = codigoData.id;

      // 2. Marcar el código como usado
      const { error: updateError } = await supabase
        .from('email_codes')
        .update({ 
          used: true, 
          used_at: new Date().toISOString(),
          email: email.trim()
        })
        .eq('id', codigoId);

      if (updateError) {
        console.error('Error al actualizar código:', updateError);
        // Continuamos de todas formas para enviar el email
      }

      // 3. Crear el HTML del email
      const emailHTML = `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #2c3e50; max-width: 600px; margin: 0 auto;">
  <!-- Texto inicial -->
  <div style="padding: 20px 15px;">
    <p style="margin: 0 0 15px 0; font-size: 16px; color: #2c3e50;">
      ¡Hola!
    </p>
    <p style="margin: 0 0 15px 0; font-size: 16px; color: #2c3e50;">
      Gracias por tu interés en <strong style="color: #8B5CF6;">IAE x Mi Gusto</strong>. Estamos emocionados de tenerte con nosotros.
    </p>
    <p style="margin: 0; font-size: 16px; color: #2c3e50;">
      Este es un momento especial y queremos compartirlo contigo.
    </p>
  </div>

  <!-- Imagen -->
  <div style="margin: 25px 0; padding: 0 15px;">
    <img 
      src="${EMAIL_IMAGE_URL}" 
      alt="IAE x Mi Gusto" 
      style="width: 100%; height: auto; display: block; border-radius: 8px; max-width: 100%;" 
    />
  </div>

  <!-- Código promocional -->
  <div
    style="
      margin-top: 25px;
      padding: 20px 15px;
      border-width: 1px 0;
      border-style: dashed;
      border-color: #e0e0e0;
      background-color: #f9fafb;
    "
  >
    <div style="text-align: center; margin-bottom: 15px;">
      <p style="margin: 0 0 10px 0; font-size: 15px; color: #666666;">
        Tu código promocional exclusivo es:
      </p>
    </div>
    <table role="presentation" style="width: 100%; margin: 15px 0;">
      <tr>
        <td style="text-align: center; vertical-align: middle;">
          <div
            style="
              padding: 15px 25px;
              margin: 0 auto;
              background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
              border-radius: 8px;
              display: inline-block;
              box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
            "
          >
            <div style="color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 3px; font-family: 'Courier New', monospace; text-align: center;">
              ${codigo}
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div style="text-align: center; margin-top: 15px;">
      <p style="margin: 0; font-size: 13px; color: #999999; font-style: italic;">
        Guarda este código y úsalo cuando hagas tu próximo pedido.
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="padding: 20px 15px; text-align: center; margin-top: 25px; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0; font-size: 13px; color: #999999;">
      Saludos,<br>
      <strong style="color: #8B5CF6; font-size: 14px;">El equipo de IAE x Mi Gusto</strong>
    </p>
  </div>
</div>
      `.trim();

      // Versión texto plano para clientes que no soportan HTML
      const emailText = `
¡Hola!

Gracias por tu interés en IAE x Mi Gusto. Estamos emocionados de tenerte con nosotros.

Tu código promocional exclusivo es: ${codigo}

Guarda este código y úsalo cuando hagas tu próximo pedido.

Saludos,
El equipo de IAE x Mi Gusto
      `.trim();

      // 4. Inicializar EmailJS y enviar el email
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const templateParams = {
        to_email: email.trim(),
        to_name: email.split('@')[0],
        message: emailText,
        message_html: emailHTML,
        codigo: codigo,
      };

      console.log('📧 Enviando email con:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        to_email: email.trim(),
        codigo: codigo,
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Respuesta de EmailJS:', response);

      setMessage({ 
        type: 'success', 
        text: '¡Código enviado a tu correo! Revisa tu bandeja de entrada (y spam)' 
      });
      setEmail(''); // Limpiar el campo después del envío exitoso
    } catch (error: any) {
      console.error('❌ Error completo:', error);
      console.error('Status:', error.status);
      console.error('Text:', error.text);
      
      let errorMessage = 'Error al enviar el email. ';
      
      if (error.status === 412) {
        errorMessage += 'Error 412: Problema de configuración en la plantilla de EmailJS. ';
        errorMessage += 'Verifica que el campo "To Email" esté configurado como {{to_email}} y que la plantilla esté correctamente configurada.';
      } else if (error.status === 400) {
        errorMessage += 'Error 400: Parámetros inválidos. Verifica la configuración de EmailJS.';
      } else if (error.text) {
        errorMessage += `Detalles: ${error.text}`;
      } else if (error.message) {
        errorMessage += error.message;
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleObtener();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-800 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-purple-500/30">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
            IAE x Mi Gusto
          </h1>

          <div className="space-y-5 sm:space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu email"
                autoComplete="email"
              />
            </div>

            <button
              onClick={handleObtener}
              disabled={loading}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                'Obtener'
              )}
            </button>

            {message && (
              <div
                className={`mt-4 p-4 sm:p-5 rounded-lg flex items-start sm:items-center gap-3 animate-fade-in ${
                  message.type === 'success'
                    ? 'bg-green-500/20 border border-green-400/30'
                    : 'bg-red-500/20 border border-red-400/30'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                ) : (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                )}
                <p className={`font-medium text-sm sm:text-base leading-relaxed ${message.type === 'success' ? 'text-green-100' : 'text-red-100'}`}>
                  {message.text}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

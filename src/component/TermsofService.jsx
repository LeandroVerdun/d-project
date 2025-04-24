import React from 'react';
import "../css/TermsOfService.css";

export const TermsofService = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div 
        className="terms-content text-black bg-white bg-opacity-50 p-1 m-0 rounded"
        style={{ width: '40%', height: '100%', marginRight: '70%' }}
      >
        <h1 className="text-danger fw-bold">Términos y Condiciones</h1>
        <hr />
        <div className="border p-3">
          <div className="overflow-auto" style={{ maxHeight: '200px', whiteSpace: 'pre-wrap' }}>
            <p><strong>Chisato Zone</strong><br />Última actualización: [Fecha]</p>

            <h5 className="text-danger fw-bold">1. Aceptación de los Términos</h5>
            <p>Al acceder y utilizar nuestros Servicios, usted acepta cumplir con estos Términos y Condiciones, junto con nuestra Política de Privacidad...</p>

            <h5 className="text-danger fw-bold">2. Modificación de los Términos</h5>
            <p>Nos reservamos el derecho de modificar, actualizar o cambiar estos Términos en cualquier momento...</p>

            <h5 className="text-danger fw-bold">3. Uso de los Servicios</h5>
            <p><strong>3.1 Acceso y Registro:</strong> Para utilizar algunos de nuestros Servicios, puede que se le solicite crear una cuenta...</p>
            <p><strong>3.2 Restricciones:</strong> Usted se compromete a no utilizar nuestros Servicios para realizar actividades ilegales, acoso, transmitir material no autorizado, etc.</p>

            <h5 className="text-danger fw-bold">4. Propiedad Intelectual</h5>
            <p>Los derechos de propiedad intelectual sobre los contenidos son propiedad de Chisato Zone o sus licenciantes...</p>

            <h5 className="text-danger fw-bold">5. Pagos y Facturación</h5>
            <p><strong>5.1 Precios y Facturación:</strong> Los Servicios pueden tener costos asociados...</p>
            <p><strong>5.2 Métodos de Pago:</strong> Aceptamos [Visa, MasterCard, PayPal, etc.]...</p>
            <p><strong>5.3 Política de Reembolsos:</strong> Todos los pagos realizados son finales, salvo que se indique lo contrario...</p>

            <h5 className="text-danger fw-bold">6. Privacidad y Seguridad</h5>
            <p><strong>6.1 Protección de Datos:</strong> Nos comprometemos a proteger su privacidad...</p>
            <p><strong>6.2 Uso de la Información:</strong> Podemos recopilar y utilizar datos personales para proporcionar nuestros Servicios...</p>

            <h5 className="text-danger fw-bold">7. Responsabilidades del Usuario</h5>
            <p>Usted es responsable de utilizar nuestros Servicios de acuerdo con estos Términos...</p>

            <h5 className="text-danger fw-bold">8. Exoneración de Responsabilidad</h5>
            <p><strong>8.1 Limitación de Responsabilidad:</strong> Chisato Zone no será responsable por daños indirectos, incidentales, etc...</p>
            <p><strong>8.2 Sin Garantías:</strong> Nuestros Servicios se proporcionan "tal como están"...</p>

            <h5 className="text-danger fw-bold">9. Terminación</h5>
            <p>Podemos suspender o terminar su acceso a los Servicios si incumple estos Términos...</p>

            <h5 className="text-danger fw-bold">10. Fuerza Mayor</h5>
            <p>No seremos responsables por retrasos o incumplimientos por eventos fuera de nuestro control razonable...</p>

            <h5 className="text-danger fw-bold">11. Ley Aplicable y Jurisdicción</h5>
            <p>Estos Términos se rigen por las leyes de [país o jurisdicción]...</p>

            <h5 className="text-danger fw-bold">12. Indemnización</h5>
            <p>Usted se compromete a indemnizar y eximir de responsabilidad a Chisato Zone por cualquier reclamo, daño, gasto, etc...</p>

            <h5 className="text-danger fw-bold">13. Disposiciones Generales</h5>
            <p><strong>13.1 Acuerdo Completo:</strong> Estos Términos constituyen el acuerdo completo entre usted y Chisato Zone...</p>
            <p><strong>13.2 Separabilidad:</strong> Si alguna disposición se considera inválida, el resto seguirá siendo válido...</p>
            <p><strong>13.3 Cesión:</strong> Chisato Zone podrá ceder sus derechos sin consentimiento previo...</p>
          </div>
        </div>
      </div>

      <div className="terms-container d-flex justify-content-center align-items-center"></div>
    </div>
  );
};

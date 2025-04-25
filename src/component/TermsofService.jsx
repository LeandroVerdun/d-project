// src/component/TermsofService.jsx
import React from "react";
import "../css/TermsOfService.css";
import termsImage from "../assets/img/ChatGPT Image 23 abr 2025, 08_08_19 a.m..png"; // Asegúrate de que la ruta sea correcta

export const TermsofService = () => {
  return (
    <div className="terms-container">
      <div className="terms-image-container">
        <img src={termsImage} alt="Terms of Service" className="terms-image" />
      </div>
      <div className="terms-content-wrapper">
        <div className="terms-content">
          <h1 className="terms-title">Terms and Conditions</h1>
          <hr className="terms-divider" />
          <div className="terms-scrollable">
            <p>
              <strong>Chisato Zone</strong>
              <br />
              Last Updated: [April 25, 2025]
            </p>

            <h5 className="terms-subtitle">1. Acceptance of Terms</h5>
            <p>
              By accessing and using our Services, you agree to comply with
              these Terms and Conditions, along with our Privacy Policy...
            </p>

            <h5 className="terms-subtitle">2. Modification of Terms</h5>
            <p>
              We reserve the right to modify, update, or change these Terms at
              any time...
            </p>

            <h5 className="terms-subtitle">3. Use of Services</h5>
            <p>
              <strong>3.1 Access and Registration:</strong> To use some of our
              Services, you may be required to create an account...
            </p>
            <p>
              <strong>3.2 Restrictions:</strong> You agree not to use our
              Services for illegal activities, harassment, transmitting
              unauthorized material, etc.
            </p>

            <h5 className="terms-subtitle">4. Intellectual Property</h5>
            <p>
              The intellectual property rights to the content are owned by
              Chisato Zone or its licensors...
            </p>

            <h5 className="terms-subtitle">5. Payments and Billing</h5>
            <p>
              <strong>5.1 Prices and Billing:</strong> Services may have
              associated costs...
            </p>
            <p>
              <strong>5.2 Payment Methods:</strong> We accept [Visa, MasterCard,
              PayPal, etc.]...
            </p>
            <p>
              <strong>5.3 Refund Policy:</strong> All payments made are final,
              unless otherwise indicated...
            </p>

            <h5 className="terms-subtitle">6. Privacy and Security</h5>
            <p>
              <strong>6.1 Data Protection:</strong> We are committed to
              protecting your privacy...
            </p>
            <p>
              <strong>6.2 Use of Information:</strong> We may collect and use
              personal data to provide our Services...
            </p>

            <h5 className="terms-subtitle">7. User Responsibilities</h5>
            <p>
              You are responsible for using our Services in accordance with
              these Terms...
            </p>

            <h5 className="terms-subtitle">8. Disclaimer of Liability</h5>
            <p>
              <strong>8.1 Limitation of Liability:</strong> Chisato Zone will
              not be liable for indirect, incidental damages, etc...
            </p>
            <p>
              <strong>8.2 No Warranties:</strong> Our Services are provided "as
              is"...
            </p>

            <h5 className="terms-subtitle">9. Termination</h5>
            <p>
              We may suspend or terminate your access to the Services if you
              violate these Terms...
            </p>

            <h5 className="terms-subtitle">10. Force Majeure</h5>
            <p>
              We will not be liable for delays or failures due to events beyond
              our reasonable control...
            </p>

            <h5 className="terms-subtitle">
              11. Governing Law and Jurisdiction
            </h5>
            <p>
              These Terms are governed by the laws of [country or
              jurisdiction]...
            </p>

            <h5 className="terms-subtitle">12. Indemnification</h5>
            <p>
              You agree to indemnify and hold Chisato Zone harmless from any
              claims, damages, expenses, etc...
            </p>

            <h5 className="terms-subtitle">13. General Provisions</h5>
            <p>
              <strong>13.1 Entire Agreement:</strong> These Terms constitute the
              entire agreement between you and Chisato Zone...
            </p>
            <p>
              <strong>13.2 Severability:</strong> If any provision is deemed
              invalid, the rest will remain valid...
            </p>
            <p>
              <strong>13.3 Assignment:</strong> Chisato Zone may assign its
              rights without prior consent...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

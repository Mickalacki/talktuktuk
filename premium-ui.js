/**
 * TALK TUK TUK PREMIUM UI
 * Single $4.99 Premium unlock
 * Access is verified through Supabase
 */

const PremiumUI = {

  /**
   * Show Premium unlock screen
   */
  showPaymentPrompt: function() {

    const overlay = document.createElement('div');

    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    `;

    const content = document.createElement('div');

    content.style.cssText = `
      background: white;
      border-radius: 20px;
      padding: 28px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    `;

    content.innerHTML = `
      <div style="font-size:52px;margin-bottom:10px;">⭐</div>

      <div style="
        font-family:Fredoka One,cursive;
        font-size:26px;
        color:#1565C0;
        margin-bottom:10px;
      ">
        Talk Tuk Tuk Premium
      </div>

      <div style="
        font-size:15px;
        color:#555;
        line-height:1.6;
        margin-bottom:20px;
      ">
        Unlock all 160 Premium Khmer phrases
        with a one-time payment of <strong>$4.99</strong>.
      </div>

      <div style="
        background:#FFF8DC;
        padding:15px;
        border-radius:12px;
        margin-bottom:20px;
        font-size:13px;
        color:#555;
      ">
        🔓 Lifetime access<br>
        🚫 No subscription<br>
        🚫 No advertisements
      </div>

      <button
        onclick="PremiumUI.showAccessCodeBox()"
        style="
          width:100%;
          background:linear-gradient(135deg,#FFD700,#FFA500);
          color:white;
          border:none;
          border-radius:30px;
          padding:14px;
          font-family:Fredoka One,cursive;
          font-size:17px;
          font-weight:700;
          cursor:pointer;
          margin-bottom:10px;
        "
      >
        🔑 I Have My Access Code
      </button>

      <button
        onclick="this.parentElement.parentElement.remove()"
        style="
          width:100%;
          background:#eee;
          color:#333;
          border:none;
          border-radius:30px;
          padding:12px;
          font-size:14px;
          cursor:pointer;
        "
      >
        Later
      </button>
    `;

    overlay.appendChild(content);

    overlay.onclick = function(e) {
      if (e.target === overlay) {
        overlay.remove();
      }
    };

    document.body.appendChild(overlay);
  },


  /**
   * Show access code entry
   */
  showAccessCodeBox: function() {

    const existing = document.querySelector('#ttt-premium-overlay');

    if (existing) {
      existing.remove();
    }

    const overlay = document.createElement('div');

    overlay.id = 'ttt-premium-overlay';

    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    `;

    const content = document.createElement('div');

    content.style.cssText = `
      background:white;
      border-radius:20px;
      padding:28px;
      max-width:400px;
      width:100%;
      text-align:center;
      box-sizing:border-box;
    `;

    content.innerHTML = `
      <div style="font-size:48px;margin-bottom:10px;">🔑</div>

      <div style="
        font-family:Fredoka One,cursive;
        font-size:24px;
        color:#1565C0;
        margin-bottom:10px;
      ">
        Enter Your Access Code
      </div>

      <div style="
        font-size:14px;
        color:#666;
        margin-bottom:18px;
      ">
        Enter the Premium access code you received after payment.
      </div>

      <input
        id="ttt-premium-code"
        type="text"
        placeholder="Enter access code"
        autocomplete="off"
        style="
          width:100%;
          box-sizing:border-box;
          padding:14px;
          border:2px solid #ddd;
          border-radius:12px;
          font-size:16px;
          text-align:center;
          margin-bottom:12px;
        "
      >

      <div
        id="ttt-premium-message"
        style="
          min-height:22px;
          font-size:13px;
          margin-bottom:12px;
        "
      ></div>

      <button
        id="ttt-premium-verify"
        onclick="PremiumUI.verifyAccessCode()"
        style="
          width:100%;
          background:linear-gradient(135deg,#FFD700,#FFA500);
          color:white;
          border:none;
          border-radius:30px;
          padding:14px;
          font-family:Fredoka One,cursive;
          font-size:17px;
          font-weight:700;
          cursor:pointer;
          margin-bottom:10px;
        "
      >
        🔓 Unlock Premium
      </button>

      <button
        onclick="this.parentElement.parentElement.remove()"
        style="
          width:100%;
          background:#eee;
          color:#333;
          border:none;
          border-radius:30px;
          padding:12px;
          font-size:14px;
          cursor:pointer;
        "
      >
        Cancel
      </button>
    `;

    overlay.appendChild(content);

    document.body.appendChild(overlay);

    setTimeout(function() {
      document.getElementById('ttt-premium-code').focus();
    }, 100);
  },


  /**
   * Verify the customer's access code
   */
  verifyAccessCode: async function() {

    const input = document.getElementById('ttt-premium-code');
    const message = document.getElementById('ttt-premium-message');
    const button = document.getElementById('ttt-premium-verify');

    if (!input || !message || !button) {
      return;
    }

    const code = input.value.trim();

    if (!code) {

      message.textContent = 'Please enter your access code.';
      message.style.color = '#d32f2f';

      return;
    }

    button.disabled = true;
    button.textContent = 'Checking...';

    message.textContent = '';

    const result = await PremiumLicense.verifyCode(code);

    if (result.success) {

      message.textContent = '✅ Premium unlocked successfully!';
      message.style.color = '#2e7d32';

      setTimeout(function() {
        location.reload();
      }, 1200);

    } else {

      message.textContent = '❌ ' + result.message;
      message.style.color = '#d32f2f';

      button.disabled = false;
      button.textContent = '🔓 Unlock Premium';
    }
  },


  /**
   * Check whether Premium is required
   */
  checkPhraseAccess: function(phraseId) {

    const payment = PremiumLicense.needsPayment(phraseId);

    if (payment) {

      this.showPaymentPrompt();

      return false;
    }

    return true;
  },


  /**
   * Render Premium section
   */
  renderPremiumSection: function() {

    if (!PremiumLicense.isEnabled()) {
      return '';
    }

    if (PremiumLicense.isUnlocked()) {

      return `
        <div style="
          margin:14px 12px 0;
          background:white;
          border-radius:16px;
          padding:20px;
          box-shadow:0 4px 24px rgba(0,0,0,0.35);
          text-align:center;
        ">
          <div style="font-size:42px;">⭐</div>

          <div style="
            font-family:Fredoka One,cursive;
            font-size:24px;
            color:#2e7d32;
            margin:8px 0;
          ">
            Premium Unlocked
          </div>

          <div style="
            font-size:13px;
            color:#555;
          ">
            You have access to all Premium phrases.
          </div>
        </div>
      `;

    }

    return `
      <div style="
        margin:14px 12px 0;
        background:white;
        border-radius:16px;
        padding:20px;
        box-shadow:0 4px 24px rgba(0,0,0,0.35);
        text-align:center;
      ">

        <div style="font-size:48px;margin-bottom:10px;">
          ⭐
        </div>

        <div style="
          font-family:Fredoka One,cursive;
          font-size:27px;
          color:#1565C0;
          margin-bottom:8px;
        ">
          Talk Tuk Tuk Premium
        </div>

        <div style="
          font-size:14px;
          color:#555;
          line-height:1.6;
          margin-bottom:15px;
        ">
          Unlock all 160 Premium Khmer phrases.
        </div>

        <div style="
          font-size:18px;
          font-weight:700;
          color:#1565C0;
          margin-bottom:15px;
        ">
          One-time payment: $4.99
        </div>

        <button
          onclick="PremiumUI.showPaymentPrompt()"
          style="
            width:100%;
            background:linear-gradient(135deg,#FFD700,#FFA500);
            color:white;
            border:none;
            border-radius:30px;
            padding:14px;
            font-family:Fredoka One,cursive;
            font-size:17px;
            font-weight:700;
            cursor:pointer;
          "
        >
          ⭐ Unlock Premium
        </button>

        <div style="
          margin-top:12px;
          font-size:11px;
          color:#777;
        ">
          Lifetime access • No subscription • No ads
        </div>

      </div>
    `;
  },


  /**
   * Premium updated
   */
  onPremiumUpdated: function(event) {

    console.log('🎉 Premium updated!', event.detail);

    location.reload();
  }
};


// Listen for Premium unlock
if (typeof window !== 'undefined') {

  window.addEventListener(
    'premiumUpdated',
    function(e) {
      PremiumUI.onPremiumUpdated(e);
    }
  );

}


// Export if using modules
if (typeof module !== 'undefined' && module.exports) {

  module.exports = PremiumUI;

}

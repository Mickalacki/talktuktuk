/**
 * TALK TUK TUK PREMIUM LICENSE SYSTEM
 * Supabase-powered single Premium unlock
 */

const PremiumLicense = {

  price: '$4.99',

  storageKey: 'ttt_premium_unlocked',

  codeStorageKey: 'ttt_premium_code',

  isEnabled: function() {
    return true;
  },

  isUnlocked: function() {
    return localStorage.getItem(this.storageKey) === 'true';
  },

  getStoredCode: function() {
    return localStorage.getItem(this.codeStorageKey);
  },

  verifyCode: async function(accessCode) {

    if (!accessCode) {
      return {
        success: false,
        message: 'Please enter your access code.'
      };
    }

    const code = accessCode.trim();

    try {

      const { data, error } = await supabaseClient
        .from('premium_access')
        .select('access_code, premium')
        .eq('access_code', code)
        .eq('premium', true)
        .maybeSingle();

      if (error) {

        console.error('Supabase error:', error);

        return {
          success: false,
          message: 'Unable to check your access code. Please try again.'
        };
      }

      if (!data) {

        return {
          success: false,
          message: 'Invalid access code.'
        };
      }

      localStorage.setItem(this.storageKey, 'true');
      localStorage.setItem(this.codeStorageKey, code);

      window.dispatchEvent(
        new CustomEvent('premiumUpdated', {
          detail: {
            action: 'unlocked',
            accessCode: code
          }
        })
      );

      return {
        success: true,
        message: 'Premium unlocked successfully!'
      };

    } catch (err) {

      console.error('Premium verification error:', err);

      return {
        success: false,
        message: 'Something went wrong. Please try again.'
      };
    }
  },

  hasAccess: function() {
    return this.isUnlocked();
  },

  hasAccessToPack: function(packId) {
    return this.isUnlocked();
  },

  needsPayment: function(phraseId) {

    if (!this.isEnabled()) {
      return null;
    }

    if (this.isUnlocked()) {
      return null;
    }

    return {
      premium: true,
      phraseId: phraseId
    };
  },

  addLicense: function() {

    localStorage.setItem(this.storageKey, 'true');

    window.dispatchEvent(
      new CustomEvent('premiumUpdated', {
        detail: {
          action: 'unlocked'
        }
      })
    );
  },

  restorePurchases: function() {

    if (this.isUnlocked()) {

      return {
        success: true,
        message: 'Premium is already unlocked on this device.'
      };

    }

    return {
      success: false,
      message: 'Please enter your Premium access code.'
    };
  },

  getPurchaseStatus: function() {

    return {
      enabled: true,
      unlocked: this.isUnlocked(),
      price: this.price
    };
  },

  clearAccess: function() {

    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.codeStorageKey);

    window.dispatchEvent(
      new CustomEvent('premiumUpdated', {
        detail: {
          action: 'locked'
        }
      })
    );
  }

};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PremiumLicense;
}

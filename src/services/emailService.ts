import { v4 as uuidv4 } from 'uuid';

interface VerificationToken {
  token: string;
  userId: string;
  expiresAt: Date;
}

// Simuler le stockage des tokens de vérification
const verificationTokens: { [key: string]: VerificationToken } = {};

export const emailService = {
  async sendVerificationEmail(email: string, userId: string, name: string): Promise<string> {
    // Générer un token unique
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Expire après 24h

    // Stocker le token
    verificationTokens[token] = {
      token,
      userId,
      expiresAt
    };

    // En production, envoyez un vrai email ici
    console.log(`
      À: ${email}
      Sujet: Vérification de votre compte KeyHome24
      
      Bonjour ${name},
      
      Bienvenue sur KeyHome24 ! Pour activer votre compte, veuillez cliquer sur le lien suivant :
      
      ${window.location.origin}/verify-email?token=${token}
      
      Ce lien expirera dans 24 heures.
      
      L'équipe KeyHome24
    `);

    return token;
  },

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // En production, envoyez un vrai email ici
    console.log(`
      À: ${email}
      Sujet: Réinitialisation de votre mot de passe KeyHome24
      
      Bonjour,
      
      Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour créer un nouveau mot de passe :
      
      ${window.location.origin}/reset-password?token=${token}
      
      Ce lien expirera dans 1 heure.
      
      Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
      
      L'équipe KeyHome24
    `);
  },

  async verifyEmail(token: string): Promise<string | null> {
    const verification = verificationTokens[token];
    
    if (!verification) {
      return null;
    }

    if (new Date() > verification.expiresAt) {
      delete verificationTokens[token];
      return null;
    }

    // Supprimer le token après utilisation
    delete verificationTokens[token];
    
    return verification.userId;
  }
};
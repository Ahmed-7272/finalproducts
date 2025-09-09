import { transporter, initializeTransporter } from './email-service';

/**
 * Verify email connection on server start
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    // Ensure transporter is initialized
    const initialized = initializeTransporter();
    if (!initialized) {
      console.error('Failed to initialize email transporter');
      return false;
    }
    
    // Verify connection configuration
    const verification = await transporter.verify();
    console.log('Email server connection verified with Titan:', verification);
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}

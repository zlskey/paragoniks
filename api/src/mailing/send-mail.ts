import type { SentMessageInfo } from 'nodemailer'
import nodemailer from 'nodemailer'
import config from 'src/config'

// Email configuration interface
export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

// Email content interface
export interface EmailContent {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  from?: string
  replyTo?: string
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: Array<{
    filename: string
    content: string | Buffer
    contentType?: string
  }>
}

// Email response interface
export interface EmailResponse {
  success: boolean
  messageId?: string
  error?: string
  info?: SentMessageInfo
}

// Default ProtonMail configuration
const DEFAULT_PROTONMAIL_CONFIG: EmailConfig = {
  host: 'smtp.protonmail.ch',
  port: 465,
  secure: true,
  auth: {
    user: config.PROTONMAIL_USER,
    pass: config.PROTONMAIL_TOKEN,
  },
}

/**
 * Creates a nodemailer transporter for ProtonMail SMTP
 * @param config - Optional custom email configuration
 * @returns Nodemailer transporter instance
 */
export function createTransporter(config?: Partial<EmailConfig>): nodemailer.Transporter {
  const emailConfig: EmailConfig = {
    ...DEFAULT_PROTONMAIL_CONFIG,
    ...config,
  }

  // Validate required environment variables
  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error('PROTONMAIL_USER and PROTONMAIL_TOKEN environment variables are required')
  }

  return nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass,
    },
    // STARTTLS configuration
    tls: {
      rejectUnauthorized: false,
    },
    // Connection pool settings
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 14, // Limit to 14 emails per second
  })
}

/**
 * Sends an email using ProtonMail SMTP
 * @param emailContent - Email content and recipients
 * @param config - Optional custom email configuration
 * @returns Promise with email response
 */
export async function sendMail(
  emailContent: EmailContent,
  config?: Partial<EmailConfig>,
): Promise<EmailResponse> {
  try {
    const transporter = createTransporter(config)

    // Set default from address if not provided
    const fromAddress = emailContent.from || process.env.PROTONMAIL_USER || 'noreply@protonmail.ch'

    const mailOptions = {
      from: fromAddress,
      to: emailContent.to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      replyTo: emailContent.replyTo,
      cc: emailContent.cc,
      bcc: emailContent.bcc,
      attachments: emailContent.attachments,
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)

    // Close the transporter
    await transporter.close()

    return {
      success: true,
      messageId: info.messageId,
      info,
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Sends a simple text email
 * @param to - Recipient email address(es)
 * @param subject - Email subject
 * @param text - Email body text
 * @param config - Optional custom email configuration
 * @returns Promise with email response
 */
export async function sendTextMail(
  to: string | string[],
  subject: string,
  text: string,
  config?: Partial<EmailConfig>,
): Promise<EmailResponse> {
  return sendMail({ to, subject, text }, config)
}

/**
 * Sends an HTML email
 * @param to - Recipient email address(es)
 * @param subject - Email subject
 * @param html - Email body HTML
 * @param config - Optional custom email configuration
 * @returns Promise with email response
 */
export async function sendHtmlMail(
  to: string | string[],
  subject: string,
  html: string,
  config?: Partial<EmailConfig>,
): Promise<EmailResponse> {
  return sendMail({ to, subject, html }, config)
}

// Export default function for convenience
export default sendMail

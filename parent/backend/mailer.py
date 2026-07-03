import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load local environment variables from .env file if it exists
load_dotenv()

# SMTP Configuration Loader
SMTP_HOST = os.getenv("SMTP_HOST", os.getenv("MAIL_SERVER", "smtp.gmail.com"))
try:
    SMTP_PORT = int(os.getenv("SMTP_PORT", os.getenv("MAIL_PORT", "587")))
except ValueError:
    SMTP_PORT = 587

SMTP_USERNAME = os.getenv("SMTP_USERNAME", os.getenv("MAIL_USERNAME"))
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", os.getenv("MAIL_PASSWORD"))
SMTP_SENDER = os.getenv("SMTP_SENDER", os.getenv("MAIL_USERNAME"))
SMTP_RECIPIENT = os.getenv("SMTP_RECIPIENT", os.getenv("MAIL_USERNAME"))

def send_inquiry_email(name: str, email: str, company: str, message: str):
    """
    Sends an inbound contact inquiry notification to the designated recipient address.
    Runs synchronously (intended to be offloaded to a background task in FastAPI).
    """
    # Guard clause: Ensure minimum SMTP requirements are met
    if not all([SMTP_USERNAME, SMTP_PASSWORD, SMTP_SENDER, SMTP_RECIPIENT]):
        print("\n[MAILER WARNING] SMTP parameters are not fully configured. Email was not sent.")
        print(f"  To enable, configure: SMTP_USERNAME, SMTP_PASSWORD, SMTP_SENDER, SMTP_RECIPIENT")
        print(f"  Details of unsent email: To={SMTP_RECIPIENT}, From={name} <{email}>\n")
        return False

    try:
        # Create message container
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Inbound Inquiry] {name} // sharexpress"
        msg["From"] = f"sharexpress Gateway <{SMTP_SENDER}>"
        msg["To"] = SMTP_RECIPIENT
        msg["Reply-To"] = email

        # Asymmetrical Premium HTML Template Design
        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #000000;
      color: #eaeaea;
      margin: 0;
      padding: 40px 20px;
      -webkit-font-smoothing: antialiased;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      background-color: #070707;
      border: 1px solid #1a1a1a;
      border-radius: 16px;
      padding: 36px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.8);
    }}
    .header {{
      border-bottom: 1px solid #161616;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }}
    .brand {{
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.45);
    }}
    .brand-accent {{
      color: #ffffff;
    }}
    .badge {{
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.08);
      background-color: rgba(255, 255, 255, 0.03);
      padding: 4px 10px;
      border-radius: 100px;
      margin-bottom: 16px;
    }}
    .heading {{
      font-size: 24px;
      font-weight: 500;
      letter-spacing: -0.035em;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 24px;
      line-height: 1.25;
    }}
    .grid {{
      margin-bottom: 24px;
    }}
    .field {{
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 14px;
    }}
    .field:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .label {{
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.25);
      letter-spacing: 0.08em;
      margin-bottom: 6px;
    }}
    .value {{
      font-size: 14px;
      color: #ffffff;
      line-height: 1.6;
    }}
    .message-box {{
      background-color: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 18px;
      font-size: 13.5px;
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 6px;
      white-space: pre-wrap;
    }}
    .footer {{
      border-top: 1px solid #161616;
      margin-top: 36px;
      padding-top: 20px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.15);
      text-align: center;
      letter-spacing: 0.01em;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">
        <img src="https://sharexpress.in/logo.png" alt="sharexpress" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; border: 0;" />
        <span style="vertical-align: middle;">share<span class="brand-accent">xpress</span> // Gatekeeper Service</span>
      </div>
    </div>
    
    <span class="badge">Inbound Transmission</span>
    <h2 class="heading">Inquiry Received</h2>
    
    <div class="grid">
      <div class="field">
        <div class="label">Origin Name</div>
        <div class="value">{name}</div>
      </div>
      
      <div class="field">
        <div class="label">Contact Endpoint</div>
        <div class="value"><a href="mailto:{email}" style="color: #ffffff; text-decoration: underline;">{email}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Entity / Company</div>
        <div class="value">{company or "N/A"}</div>
      </div>
      
      <div class="field">
        <div class="label">Payload Message</div>
        <div class="message-box">{message}</div>
      </div>
    </div>
    
    <div class="footer">
      Automated system transmission. IP: logged. All operations secure.
    </div>
  </div>
</body>
</html>
"""
        # Plain text fallback
        text_content = f"""
SHAREXPRESS // Gatekeeper Service
Inbound Transmission Inquiry Received

Name: {name}
Email: {email}
Company: {company or "N/A"}

Message:
{message}

Automated system transmission.
"""

        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        # Establish SMTP Connection
        if SMTP_PORT == 465:
            # SSL
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT)
        else:
            # TLS / STARTTLS
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            server.starttls()
        
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_SENDER, SMTP_RECIPIENT, msg.as_string())
        server.quit()

        print(f"[MAILER SUCCESS] Email notification dispatched to {SMTP_RECIPIENT} from {email}.")
        return True

    except Exception as e:
        print(f"[MAILER ERROR] Failed to dispatch email notification: {str(e)}")
        return False

def send_acknowledgement_email(name: str, email: str, company: str, message: str):
    """
    Sends an automated receipt / acknowledgement email back to the inquiry author.
    """
    # Guard clause: Ensure minimum SMTP requirements are met
    if not all([SMTP_USERNAME, SMTP_PASSWORD, SMTP_SENDER]):
        print("\n[MAILER WARNING] SMTP parameters are not fully configured. Acknowledgement email was not sent.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "We received your inquiry // sharexpress"
        msg["From"] = f"sharexpress Gateway <{SMTP_SENDER}>"
        msg["To"] = email

        # Premium HTML Template for user acknowledgement
        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #000000;
      color: #eaeaea;
      margin: 0;
      padding: 40px 20px;
      -webkit-font-smoothing: antialiased;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      background-color: #070707;
      border: 1px solid #1a1a1a;
      border-radius: 16px;
      padding: 36px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.8);
    }}
    .header {{
      border-bottom: 1px solid #161616;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }}
    .brand {{
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.45);
    }}
    .brand-accent {{
      color: #ffffff;
    }}
    .badge {{
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #3b82f6;
      border: 1px solid rgba(59, 130, 246, 0.2);
      background-color: rgba(59, 130, 246, 0.05);
      padding: 4px 10px;
      border-radius: 100px;
      margin-bottom: 16px;
    }}
    .heading {{
      font-size: 24px;
      font-weight: 500;
      letter-spacing: -0.035em;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 24px;
      line-height: 1.25;
    }}
    .intro {{
      font-size: 14.5px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 28px;
    }}
    .summary-box {{
      background-color: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 28px;
    }}
    .summary-title {{
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 0.08em;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 8px;
    }}
    .field {{
      margin-bottom: 16px;
    }}
    .field:last-child {{
      margin-bottom: 0;
    }}
    .label {{
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.25);
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }}
    .value {{
      font-size: 13.5px;
      color: #ffffff;
      line-height: 1.5;
    }}
    .message-text {{
      font-size: 13px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      white-space: pre-wrap;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.02);
      margin-top: 4px;
    }}
    .footer {{
      border-top: 1px solid #161616;
      margin-top: 36px;
      padding-top: 20px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.15);
      text-align: center;
      letter-spacing: 0.01em;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">
        <img src="https://sharexpress.in/logo.png" alt="sharexpress" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; border: 0;" />
        <span style="vertical-align: middle;">share<span class="brand-accent">xpress</span> // Gateway Service</span>
      </div>
    </div>
    
    <span class="badge">Inquiry Confirmed</span>
    <h2 class="heading">Hello {name},</h2>
    
    <div class="intro">
      We have received your message and registered it in our transmission log. Our systems engineering team is reviewing your details and will get in touch with you shortly.
    </div>
    
    <div class="summary-box">
      <div class="summary-title">Submission Record Reference</div>
      
      <div class="field">
        <div class="label">Organization</div>
        <div class="value">{company or "N/A"}</div>
      </div>
      
      <div class="field">
        <div class="label">Your Message</div>
        <div class="message-text">{message}</div>
      </div>
    </div>
    
    <div class="footer">
      This is an automated transmission confirming your submission. Please do not reply directly to this mail.
    </div>
  </div>
</body>
</html>
"""
        # Plain text fallback
        text_content = f"""
Hello {name},

Thank you for contacting sharexpress. We have received your inquiry:

Company: {company or "N/A"}
Message:
{message}

Our team is reviewing it and will get back to you shortly.

---
This is an automated transmission. Please do not reply directly to this mail.
"""

        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        # Establish SMTP Connection
        if SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT)
        else:
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            server.starttls()
        
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_SENDER, email, msg.as_string())
        server.quit()

        print(f"[MAILER SUCCESS] Acknowledgement email dispatched to {email}.")
        return True

    except Exception as e:
        print(f"[MAILER ERROR] Failed to dispatch acknowledgement email: {str(e)}")
        return False


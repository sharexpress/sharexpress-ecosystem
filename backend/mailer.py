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
        msg["Subject"] = f"[Inbound Inquiry] {name} // ShareXpress"
        msg["From"] = f"ShareXpress Gateway <{SMTP_SENDER}>"
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
      text-transform: uppercase;
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
      <div class="brand">Share<span class="brand-accent">Xpress</span> // Gatekeeper Service</div>
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

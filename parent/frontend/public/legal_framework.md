# ShareXpress Ecosystem: Legal & Governance Framework

This document outlines the Terms of Service, Privacy Policies, and Cookie Management guidelines for **ShareXpress** (parent infrastructure namespace) and **Interleet** (systems grading sandbox).

---

## Part 1: ShareXpress (Parent Company) Legal framework

### 1.1 Terms of Service (TOS)
1. **Namespace & Routing Registry**: ShareXpress provides global root-level namespace coordinates (`*.sharexpress.in`). By deploying or accessing routers under this registry, you agree to comply with rate-limiting quotas and RPC connection parameters.
2. **Acceptable Use of Distribution Conduits**: Users must not deploy scripts that trigger deliberate buffer overflows, distributed denial of service (DDoS) loops, or unauthorized port scanning against edge nodes.
3. **Data Transit Limits**: ShareXpress transit nodes operate under fair-use bandwidth limits. We reserve the right to throttle or temporarily suspend ingress proxies that exceed 10 TB/month of raw transfer without dedicated SLA contracts.
4. **Security & Cryptography Disclosures**: All encryption mechanisms on files sharing instances are client-side non-custodial. ShareXpress cannot access, recover, or decrypt storage objects. The user holds absolute custody of passphrase hashes.

### 1.2 Privacy Policy
1. **Zero-Knowledge Core**: We do not capture, sell, or index storage keys, filenames, or directory structures. Metadata is cached strictly in volatile memory (Redis) and cleared instantly upon connection terminations.
2. **Proxy Logs Lifecycle**: Ingress routing servers cache access logs (IP, method, edge region, and latency) for a maximum of 48 hours to troubleshoot routing anomalies. Logs are permanently scrubbed after this period.
3. **Third-Party Data Flow**: No telemetry is transmitted to third-party ad networks. We run local, sandboxed Prometheus clusters for diagnostics.

### 1.3 Cookie Management
1. **Strictly Essential Only**: ShareXpress sets zero tracking or marketing cookies.
2. **Session Cookies**:
   - `__sx_ingress`: Caches the designated edge gateway region to reduce TLS handshake latencies (essential, expires in 24 hours).
   - `__sx_auth`: Stores encrypted JWT access tokens for organization namespaces (essential, session lifecycle).

---

## Part 2: Interleet (Systems Sandbox) Legal framework

### 2.1 Terms of Service (TOS)
1. **Sandbox Container Limits**: Interleet provisions sandboxed Linux runtimes (Docker/Kubernetes) to compile and grade systems engineering challenges. Runtimes are capped at 0.5 vCPU and 256MB RAM. Attempts to bypass cgroups limits or access the node host file system will result in instant sandbox termination.
2. **Grading & Challenge Integrity**: Interleet tracks challenge outputs. Submitting decompiled grade keys, exploiting grade script vulnerabilities, or executing grading-bot exploits violates the terms of academic and professional challenge runs.
3. **Intellectual Property**: Code compiled or written inside the sandbox remains the absolute property of the user. Interleet stores submission code history strictly for grading verification.

### 2.2 Privacy Policy
1. **Grading & Terminal logs**: Runtimes capture terminal command histories (bash logs) and stdout/stderr outputs to calculate challenge completion scores. These records are cached inside sandbox databases and are visible only to the grading team.
2. **Analytics**: Captures CPU/Memory utilization logs during runs to optimize challenge runtimes.
3. **Account Isolation**: Database rows containing user credentials and challenge history are isolated using row-level security (RLS) filters on database layers.

### 2.3 Cookie Management
1. **Session & Security Tokens**:
   - `__il_session`: Tracks grading session lifecycles (essential, expires on logout).
   - `__il_csrf`: Anti-Cross-Site Request Forgery security tokens (essential, session lifecycle).
2. **Local Caching (LocalStorage)**:
   - Challenge code cache is stored locally in the browser to prevent grading code loss on network drops.

---

## Part 3: Cookie Banner Compliance
- All ecosystem domains implement a standard dark, developer-aligned Cookie banner that restricts cookie settings to **Strictly Essential** cookies unless explicit consent is recorded.

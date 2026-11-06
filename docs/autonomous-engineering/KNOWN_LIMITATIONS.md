# ZYLVEX SPACE — KNOWN LIMITATIONS & TECHNICAL BOUNDARIES

**Owner:** Zylvex Technologies Ltd  
**Product Authority:** ZYLVEX SPACE  
**Website:** [www.zylvex.tech](https://www.zylvex.tech)  

---

## Technical Limitations Register

1. **Precision vs Real-World Accuracy Boundary:**
   - Numerical floating-point coordinates in WebGL/IEEE 754 provide double-precision in JavaScript (`number`), allowing millimeter display resolution.
   - However, physical LiDAR and photogrammetry accuracy is constrained by physical sensor noise (e.g. $\pm 2\text{ mm}$ to $\pm 10\text{ mm}$ for terrestrial scanners). The platform must never claim that displaying 3 decimal places equals sub-millimeter physical measurement certainty without hardware calibration certificates.

2. **Web Crypto Availability:**
   - Web Crypto (`crypto.subtle`) is universally available in secure contexts (`https://` or `localhost`). In insecure HTTP contexts, `crypto.subtle` may be undefined. The engine safely detects this and flags the state as `UNVERIFIABLE`.

3. **Client-Side File Parsing Memory Limits:**
   - In-browser single-threaded parsing of Point Clouds (PCD) is optimal up to $\approx 2,000,000$ points. Larger point clouds ($>5\text{M}$ points) require chunked streaming and WebGL BufferAttribute allocation to avoid freezing the UI thread.

4. **External Services & Write Operations:**
   - Strict read-only posture is enforced across all CRM, email, code repository, and financial boundaries. External write operations remain blocked by policy.

# ZYLVEX SPACE — ENGINEERING DECISION LOG

**Owner:** Zylvex Technologies Ltd  
**Product Authority:** ZYLVEX SPACE  
**Website:** [www.zylvex.tech](https://www.zylvex.tech)  

---

## Architecture Decision Records (ADRs)

### ADR-001: Google Maps Platform Permanent Deactivation
- **Date:** 2026-11-06
- **Decision:** Google Maps Platform must remain permanently deactivated. Zero external map scripts, zero billing, zero external API keys.
- **Rationale:** ZYLVEX SPACE is an independent, sovereign spatial intelligence platform focused on CAD/BIM facilities, local datum coordinate systems, and LiDAR point clouds. External map dependencies create vendor lock-in, data sovereignty risks, and billing exposure.

### ADR-002: Native Web Crypto SHA-256 vs Third-Party Cryptographic Libraries
- **Date:** 2026-11-06
- **Decision:** Use standard W3C Web Crypto API (`crypto.subtle.digest("SHA-256", ...)`) natively supported by modern browsers and Node.js v19+.
- **Rationale:** Native Web Crypto is constant-time, hardware-accelerated, zero-dependency, and strictly complies with FIPS 180-4. If unavailable, the engine reports `UNVERIFIABLE` rather than silently degrading to weak hashes.

### ADR-003: Pure Client-Side CAD/Point Cloud Parsing
- **Date:** 2026-11-06
- **Decision:** Implement zero-server-upload parsers for PCD, STL, and OBJ file formats running in standard Web Workers or main thread buffers.
- **Rationale:** Engineering CAD/BIM assets are confidential intellectual property. Running parsers locally in client memory guarantees that no customer proprietary geometry ever leaves the browser, aligning with defense/institutional air-gapped requirements.

### ADR-004: Explicit Coordinate Reference System (CRS) Matrix Transformations
- **Date:** 2026-11-06
- **Decision:** Enforce mathematical transformation pipelines between CAD Standard (Z-Up, Right-Handed, Millimeters) and WebGL Standard (Y-Up, Right-Handed, Meters).
- **Rationale:** CAD files from Revit/SolidWorks/AutoCAD natively place $Z$ as the vertical elevation axis. Three.js and WebGL use $Y$ as vertical. Converting with explicit $4 \times 4$ rotation matrices $(-90^\circ \text{ about } X)$ prevents upside-down or mirrored geometry.

# Files & Directories Preserved Due To Uncertainty

In accordance with the **Absolute No-Regression & No-Unconfirmed-Deletion Rule**, all files and directories where dependency or cross-role reference could not be 100% disproven have been preserved untouched.

---

## Preserved Item Classification & Audit Rationale

### 1. `C:\Users\bansa\Desktop\CCS\src\` (Root Frontend Source)
- **Classification**: Class B — POSSIBLY REQUIRED
- **Reason Preserved**: Contains UI components, mock data definitions (`src/data/`), utility functions, and style assets that may be imported or referenced by auxiliary scripts or future module extensions. Preserved to prevent broken dependencies across any role workflow.

### 2. `C:\Users\bansa\Desktop\CCS\ccserp\` (Secondary App Folder)
- **Classification**: Class B — POSSIBLY REQUIRED
- **Reason Preserved**: Preserved in its entirety to avoid accidental loss of AI Studio exported assets or utility functions.

### 3. `C:\Users\bansa\Desktop\CCS\mantis-free-react-admin-template-master\` (Admin Template)
- **Classification**: Class B — POSSIBLY REQUIRED
- **Reason Preserved**: Contains original UI template components, icons, and theme assets from which dashboard widgets were developed. Kept intact as reference material.

### 4. `C:\Users\bansa\Desktop\CCS\frontend\` (Sub-Frontend Directory)
- **Classification**: Class B — POSSIBLY REQUIRED
- **Reason Preserved**: Contains Vite & TypeScript configuration manifests (`tsconfig.app.json`, `jsconfig.json`). Kept intact to avoid build tool dependency breaks.

### 5. `C:\Users\bansa\Desktop\CCS\scratch\` (Scratch Directory)
- **Classification**: Class B — POSSIBLY REQUIRED
- **Reason Preserved**: Temporary data files and experiment scripts preserved for debugging and evaluation.

### 6. `C:\Users\bansa\Desktop\CCS\dist\` (Build Output)
- **Classification**: Class E — GENERATED / REBUILDABLE (PRESERVED)
- **Reason Preserved**: Contains pre-built static assets. Kept intact to preserve historical build output.

### 7. Root Configuration & Script Files
- `django_verify.py` & `verify_backend.py`: Preserved for database & model verification.
- Root `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `jsconfig.json`, `.oxlintrc.json`, `fix_menus.cjs`, `logo (1).png`: Preserved for workspace integrity.

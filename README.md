# GESTLOG AC — PWA

Sistema de Gestión Logística para Automáticos Canarios.  
Instalable como aplicación en Android e iPhone mediante tecnología PWA.

---

## 📦 Estructura del proyecto

```
gestlog-pwa/
├── index.html          ← Aplicación principal
├── manifest.json       ← Configuración PWA
├── sw.js               ← Service Worker (caché + offline)
├── icons/              ← Íconos para todos los dispositivos
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md
```

---

## 🚀 Publicar en GitHub Pages (paso a paso)

### 1. Crear cuenta en GitHub
Ve a https://github.com y crea una cuenta gratuita si no tienes una.

### 2. Crear repositorio nuevo
- Haz clic en **"New repository"**
- Nombre: `gestlog-ac` (o el que prefieras)
- Visibilidad: **Public** ✅ (necesario para GitHub Pages gratuito)
- Haz clic en **"Create repository"**

### 3. Subir los archivos
En la página del repositorio vacío:
- Haz clic en **"uploading an existing file"**
- Arrastra TODOS los archivos de esta carpeta (incluyendo la carpeta `icons/`)
- Escribe un mensaje como "Versión inicial GESTLOG AC"
- Haz clic en **"Commit changes"**

### 4. Activar GitHub Pages
- Ve a **Settings** (pestaña del repositorio)
- En el menú izquierdo: **Pages**
- En "Source" selecciona: **Deploy from a branch**
- Branch: **main** / carpeta: **/ (root)**
- Haz clic en **Save**

### 5. Esperar 1-2 minutos
GitHub te dará una URL como:
```
https://TU_USUARIO.github.io/gestlog-ac/
```

¡Listo! Esa es la URL de tu aplicación.

---

## 📱 Cómo instalar en el móvil

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparecerá un banner **"Añadir a pantalla de inicio"** — tócalo
3. Si no aparece: menú ⋮ → **"Añadir a pantalla de inicio"**

### iPhone / iPad (Safari)
1. Abre la URL en Safari (⚠️ debe ser Safari, no Chrome)
2. Toca el botón compartir 
3. Selecciona **"Añadir a pantalla de inicio"**
4. Confirma

---

## 🔧 Si cambias el backend de Google Apps Script

Edita la línea en `index.html`:
```javascript
const BACKEND_URL = 'https://script.google.com/macros/s/NUEVA_URL.../exec';
```

---

## 🔒 Seguridad

- Los datos siguen almacenados en **Google Sheets** (no en GitHub)
- GitHub Pages solo sirve el frontend (la interfaz)
- La autenticación la gestiona **Google Apps Script**
- GitHub Pages usa **HTTPS** obligatorio

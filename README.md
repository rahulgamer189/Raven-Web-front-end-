# Raven — Disaster Management System

A front-end Smart India Hackathon demo built with HTML, CSS and vanilla JavaScript.

## Included workflows

- Command-center dashboard with live metrics, risk matrix, weather, rainfall chart, operational preview map, broadcasts and unified feed.
- Leaflet + OpenStreetMap operational map with danger zones, SOS signals, shelters, simulated rainfall circles, geolocation and layer toggles.
- SOS workflow with optional situation details, geolocation capture, active/withdrawn state and local persistence.
- Simulated offline peer network with node scanning, node selection and locally persisted messages.
- Authority emergency broadcasts with localStorage persistence and visible success feedback.
- Field responder reports with severity filtering, photo-name metadata and visible success feedback.
- Editable local operator profile with emergency contacts, validation and local persistence.
- Responsive dark tactical UI with light-contrast toggle, mobile navigation, toast feedback and keyboard-accessible controls.

## Run

For the best experience, use a local server because Geolocation and some browser APIs are restricted on `file://`.

```bash
cd raven_sih_demo
python3 -m http.server 5500
```

Then open `http://localhost:5500/` or `http://localhost:5500/dashboard.html`.

## Demo / production boundary

Peer discovery and message delivery, live backend feeds, weather prediction, SOS transmission, broadcast delivery and field-report backend storage remain front-end simulations. For production, replace those modules with native Android/BLE transport, authenticated REST/WebSocket APIs, a weather service, a real emergency gateway, server-side persistence and proper encryption/authentication.

## External libraries

Leaflet 1.9.4, Chart.js 4.4.4 and OpenStreetMap tiles are loaded from public CDNs. An internet connection is required for the live map tiles and rainfall chart.

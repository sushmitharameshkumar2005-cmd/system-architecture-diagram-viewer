# System Architecture Diagram Viewer

An interactive, responsive, vector SVG-based cloud architecture visualization and documentation application built with HTML5, CSS3, and Vanilla JavaScript (ES6).

---

## 🌟 Overview

The **System Architecture Diagram Viewer** is designed as a technical architecture documentation platform for exploring modern cloud-native system architectures and DevOps deployment pipelines. It provides an interactive vector SVG diagram, component search, detailed technical documentation modals, and real-time interactive simulations of Kubernetes resilience capabilities (Self-Healing, Zero-Downtime Rolling Updates, and Horizontal Pod Scaling).

This project serves as the core static application layer for a future multi-phase DevOps mini project.

---

## ✨ Features

- **Interactive SVG Architecture Diagram**: High-resolution vector diagram representing the full DevOps delivery pipeline and AWS EKS runtime cluster.
- **Component Inspection Modals**: Clickable components that open comprehensive technical modals covering Purpose, Responsibilities, Input/Output data schemas, Technologies used, and Example use cases.
- **Pan & Zoom Viewport Controls**: Zoom In, Zoom Out, Reset, and Fullscreen capabilities for large architecture diagrams.
- **Real-Time Component Search & Highlighting**: Quick search bar filtering components and visually highlighting matching SVG elements and sidebar items.
- **Interactive Kubernetes Simulations**:
  1. **Self-Healing**: Simulates pod failure and automatic recovery by the Kubernetes ReplicaSet controller.
  2. **Rolling Update**: Demonstrates progressive pod replacement with zero downtime (v1.0.0 → v2.0.0).
  3. **Application Scalability**: Dynamic horizontal scaling of application pod replicas (1 to 6 pods).
- **Categorized Index Sidebar**: Quick-access component directory grouped into Source Control, CI/CD, Containerization, Infrastructure, Configuration Management, Kubernetes, and Application layers.
- **Modern Dark DevOps Dashboard UI**: Custom CSS theme with slate/navy dark colors, glassmorphism modals, and smooth animations.
- **Production-Ready & Static**: Lightweight static web application that requires no runtime backend, database, or Node.js server. Can be directly served using Nginx in Docker.

---

## 📐 Architecture Overview

```
USER BROWSER
    │
    ▼
LOAD BALANCER / AWS ALB
    │
    ▼
KUBERNETES INGRESS
    │
    ▼
KUBERNETES SERVICE (ClusterIP)
    │
    ▼
KUBERNETES DEPLOYMENT CONTROLLER
    │
    ├─────────────────┼─────────────────┐
    ▼                 ▼                 ▼
APP POD 1         APP POD 2         APP POD 3
 (Nginx)           (Nginx)           (Nginx)
    │                 │                 │
    └─────────────────┴─────────────────┘
                      │
                      ▼
         SYSTEM ARCHITECTURE DIAGRAM VIEWER
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document structure & ARIA accessibility.
- **CSS3**: Modern CSS grid/flexbox layout, CSS custom variables, glassmorphism backdrop filters, responsive media queries.
- **Vanilla JavaScript (ES6)**: Modular event handlers, SVG transformation matrix math, interactive simulations.
- **SVG (Scalable Vector Graphics)**: Custom vector architecture diagram with interactive node groups and styling.

---

## 📁 Project Structure

```
system-architecture-diagram-viewer/
├── index.html                # Main entry point & application layout
├── css/
│   └── style.css             # Custom dark theme stylesheet
├── js/
│   ├── app.js                # Main DOM orchestrator & modal bindings
│   ├── architecture.js       # SVG pan/zoom, search, & K8s simulations
│   └── components.js         # Component metadata registry & data store
├── assets/
│   └── architecture.svg      # Standalone vector architecture SVG asset
├── tests/
│   └── test.html             # Automated browser test suite
├── README.md                 # Technical documentation
└── .gitignore                # Git ignore rules
```

---

## 🚀 How to Run Locally

Since this is a lightweight static application, no Node.js installation or package manager is required.

### Method 1: Open Directly in Web Browser
Double-click `index.html` or open it using any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Brave, Safari).

### Method 2: Serve via Python HTTP Server (Recommended)
Navigate to the project directory in your terminal and run:
```bash
python -m http.server 8080
```
Open your browser and navigate to `http://localhost:8080`.

### Method 3: Serve via VS Code Live Server
Open the folder in Visual Studio Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🧪 Automated Testing

An automated frontend test suite is included in `tests/test.html`.

To run tests:
1. Open `tests/test.html` in your web browser.
2. The suite will execute tests checking:
   - Data registry integrity
   - Component search query matching
   - SVG Zoom logic bounds
   - K8s pod scaling limits
3. Results are displayed on screen.

---

## 🔄 Future DevOps Delivery Pipeline Roadmap

In Phase 2 of this project, this static application will be containerized and deployed automatically using a complete DevOps toolchain:

1. **Source Control (GitHub)**: Code pushed to main branch triggers webhooks.
2. **CI/CD Automation (Jenkins)**: Jenkins pipeline executes automated tests and builds the application.
3. **Containerization (Docker)**: Multi-stage Dockerfile packages static web files into a lightweight Nginx Alpine container image.
4. **Container Registry (AWS ECR / Docker Hub)**: Pushes built container image tags.
5. **Infrastructure as Code (Terraform)**: Provisions AWS VPC, Subnets, and EKS Kubernetes cluster.
6. **Configuration Management (Ansible)**: Configures server host dependencies and runtime modules.
7. **Container Orchestration (Kubernetes)**: Deploys containerized pods with Ingress routing and Service load balancing.

---

## 📄 License

This project is created for educational and technical architecture documentation purposes.

/**
 * System Architecture Diagram Viewer - Component Data Registry
 * Contains definitions, purpose, responsibilities, input/output, and metadata for all architecture components.
 */

const ARCHITECTURE_COMPONENTS = {
    "developer": {
        id: "developer",
        name: "Developer",
        category: "Source Control",
        badge: "Human Actor",
        icon: "👨‍💻",
        shortDescription: "Writes application code and commits changes to source control.",
        purpose: "Initiates the software development lifecycle by authoring features, bug fixes, and documentation.",
        responsibilities: [
            "Write modular, clean, and tested application code",
            "Create pull requests for review",
            "Trigger automated CI/CD workflows via commits",
            "Maintain local dev environment"
        ],
        technologies: ["Git", "VS Code", "HTML/CSS/JS", "CLI"],
        input: "Feature requirements and user stories",
        output: "Git commits and Pull Requests",
        importance: "The origin of all software changes in the CI/CD pipeline.",
        exampleUseCase: "Pushing a bug fix or new feature branch to GitHub to trigger automated build tests."
    },
    "github": {
        id: "github",
        name: "GitHub",
        category: "Source Control",
        badge: "VCS",
        icon: "🐙",
        shortDescription: "Hosts and manages the application source code with version control.",
        purpose: "Provides secure cloud Git repository hosting, code review workflows, and webhook integration for CI/CD.",
        responsibilities: [
            "Version control & branch management",
            "Pull request code reviews & status checks",
            "Webhook events for automated build triggers",
            "Audit trail of code changes"
        ],
        technologies: ["Git", "GitHub Webhooks", "Git Flow", "Markdown"],
        input: "Developer source code & commit objects",
        output: "Version-controlled repository & Webhook events",
        importance: "Serves as the single source of truth for all source code and infrastructure configuration.",
        exampleUseCase: "Receiving main branch merge event and notifying Jenkins to start build pipeline."
    },
    "jenkins": {
        id: "jenkins",
        name: "Jenkins",
        category: "CI/CD",
        badge: "Automation Server",
        icon: "⚙️",
        shortDescription: "Automates building, testing, and containerizing the application.",
        purpose: "Orchestrates continuous integration and continuous delivery workflows automatically on code pushes.",
        responsibilities: [
            "Execute automated pipeline stages (Build, Test, Package)",
            "Run unit and integration tests",
            "Trigger Docker image build process",
            "Notify team of build status"
        ],
        technologies: ["Jenkinsfile", "Groovy", "Pipeline Plugin", "Bash"],
        input: "GitHub repository webhook trigger & source code",
        output: "Tested build artifacts & Docker container image push trigger",
        importance: "Ensures code quality and automates repetitive delivery tasks with zero human delay.",
        exampleUseCase: "Pulling latest code, verifying syntax, building Docker image, and executing Terraform scripts."
    },
    "docker": {
        id: "docker",
        name: "Docker",
        category: "Containerization",
        badge: "Runtime Engine",
        icon: "🐳",
        shortDescription: "Packages the web app into a lightweight, portable container image.",
        purpose: "Standardizes the runtime environment using Nginx static web serving inside lightweight container layers.",
        responsibilities: [
            "Package static web files (HTML/CSS/JS) with Nginx base image",
            "Ensure consistency across dev, test, and production",
            "Provide isolated container environment",
            "Expose web port 80"
        ],
        technologies: ["Dockerfile", "Nginx Alpine", "Multi-stage builds"],
        input: "Application source code & Nginx config",
        output: "OCI compliant Docker container image",
        importance: "Eliminates 'works on my machine' bugs by containerizing runtime dependencies.",
        exampleUseCase: "Building docker image `architecture-viewer:v1.0` during Jenkins pipeline execution."
    },
    "container-registry": {
        id: "container-registry",
        name: "Container Registry (ECR / Docker Hub)",
        category: "Containerization",
        badge: "Image Store",
        icon: "📦",
        shortDescription: "Secure repository for storing and tagging Docker container images.",
        purpose: "Centralized storage for compiled container images accessible by Kubernetes clusters for deployments.",
        responsibilities: [
            "Version-tagged image storage (e.g. :v1.0.0, :latest)",
            "Vulnerability scanning of image layers",
            "Access control & authentication for Kubernetes pulls",
            "Fast layer distribution"
        ],
        technologies: ["AWS ECR", "Docker Registry API", "IAM Authentication"],
        input: "Pushed Docker images from Jenkins",
        output: "Immutable container images pulled by Kubernetes worker nodes",
        importance: "Acts as the distribution bridge between CI build pipelines and Kubernetes deployment clusters.",
        exampleUseCase: "Jenkins pushing `12345.dkr.ecr.us-east-1.amazonaws.com/sys-arch-viewer:latest`."
    },
    "terraform": {
        id: "terraform",
        name: "Terraform",
        category: "Infrastructure",
        badge: "IaC",
        icon: "🏗️",
        shortDescription: "Provisions cloud virtual machines, networks, and EKS cluster automatically.",
        purpose: "Defines infrastructure as code (IaC) to create repeatable, version-controlled cloud environments.",
        responsibilities: [
            "Provision AWS VPC, subnets, internet gateways, and security groups",
            "Provision EKS Cluster and worker node groups",
            "Manage infrastructure state file (`terraform.tfstate`)",
            "Automate infrastructure creation and teardown"
        ],
        technologies: ["HCL (HashiCorp Configuration Language)", "AWS Provider", "State Management"],
        input: "Declarative `.tf` configuration scripts",
        output: "Provisioned cloud infrastructure (VPC, VMs, EKS)",
        importance: "Ensures infrastructure is documented, reproducible, and free from manual configuration drift.",
        exampleUseCase: "Executing `terraform apply` to create an 3-node AWS EKS cluster with managed VPC."
    },
    "ansible": {
        id: "ansible",
        name: "Ansible",
        category: "Configuration Management",
        badge: "Config Engine",
        icon: "📜",
        shortDescription: "Configures servers, installs dependencies, and sets up node prerequisites.",
        purpose: "Automates server configuration management and software provisioning without agents.",
        responsibilities: [
            "Configure EC2 instances and OS kernel parameters",
            "Install Docker, kubectl, container runtime dependencies",
            "Deploy system monitoring agents & security policies",
            "Maintain target node state consistency"
        ],
        technologies: ["YAML Playbooks", "SSH", "Jinja2 Templates", "Ansible Roles"],
        input: "Ansible Inventory & YAML Playbooks",
        output: "Configured target servers ready for container orchestration",
        importance: "Automates node bootstrap steps cleanly via SSH without agent overhead.",
        exampleUseCase: "Running playbook `site.yml` to prepare EC2 worker nodes with necessary container runtime modules."
    },
    "kubernetes": {
        id: "kubernetes",
        name: "Kubernetes (K8s)",
        category: "Kubernetes",
        badge: "Orchestrator",
        icon: "☸️",
        shortDescription: "Orchestrates container deployment, scaling, load balancing, and self-healing.",
        purpose: "Provides production-grade automated container management, health checking, and service discovery.",
        responsibilities: [
            "Automate container rollout & rollback strategies",
            "Monitor container health & auto-replace failed pods",
            "Scale pod replicas based on traffic load",
            "Manage cluster network routing & internal DNS"
        ],
        technologies: ["Kubernetes Control Plane", "kubelet", "etcd", "CoreDNS"],
        input: "YAML Deployment & Service manifests",
        output: "Resilient running microservices across cluster nodes",
        importance: "Ensures zero-downtime availability and horizontal scaling for container applications.",
        exampleUseCase: "Maintaining 3 active healthy pods of System Architecture Diagram Viewer across availability zones."
    },
    "eks": {
        id: "eks",
        name: "AWS EKS (Elastic Kubernetes Service)",
        category: "Infrastructure",
        badge: "Managed K8s",
        icon: "☁️",
        shortDescription: "Managed Kubernetes control plane hosted on Amazon Web Services.",
        purpose: "Eliminates control plane maintenance overhead while providing native integration with AWS IAM and VPC.",
        responsibilities: [
            "Manage highly available Kubernetes API server & etcd database",
            "Integrate with AWS IAM for RBAC authentication",
            "Provision autoscaling EC2 node groups",
            "Provide automatic security patching"
        ],
        technologies: ["AWS IAM", "AWS VPC CNI", "EKS Managed Node Groups"],
        input: "Kubernetes cluster configuration",
        output: "Enterprise Kubernetes Cluster backend",
        importance: "Reduces infrastructure management overhead while delivering enterprise reliability.",
        exampleUseCase: "Running Kubernetes workloads securely across multiple Availability Zones in AWS."
    },
    "load-balancer": {
        id: "load-balancer",
        name: "Cloud Load Balancer / ALB",
        category: "Kubernetes",
        badge: "Networking",
        icon: "⚖️",
        shortDescription: "Distributes incoming HTTP/HTTPS traffic across Kubernetes Ingress controllers.",
        purpose: "Entry point for public client requests, providing SSL termination and high availability traffic routing.",
        responsibilities: [
            "Distribute client web traffic evenly",
            "Perform health checks on target ingress nodes",
            "Terminate TLS/SSL certificates",
            "DDoS mitigation & edge protection"
        ],
        technologies: ["AWS ALB / NGINX Ingress Controller", "TLS 1.3", "HTTP/2"],
        input: "External user HTTP requests (Port 80 / 443)",
        output: "Balanced internal requests routed to Ingress controller",
        importance: "Prevents single point of failure and handles peak user traffic load smoothly.",
        exampleUseCase: "Receiving user requests at `arch-viewer.devops.internal` and routing to cluster pods."
    },
    "ingress": {
        id: "ingress",
        name: "Kubernetes Ingress",
        category: "Kubernetes",
        badge: "Routing",
        icon: "🚪",
        shortDescription: "Manages external HTTP routing rules to internal cluster services.",
        purpose: "Acts as the smart HTTP reverse proxy inside Kubernetes to map URLs to backend Kubernetes Services.",
        responsibilities: [
            "Route traffic based on hostnames or path rules (e.g. `/`, `/api`)",
            "Manage SSL/TLS certificate bindings",
            "Configure connection timeouts and rate limits",
            "Decouple routing rules from service definitions"
        ],
        technologies: ["Ingress NGINX", "Cert-Manager", "YAML Manifest"],
        input: "HTTP requests from Cloud Load Balancer",
        output: "Routed internal traffic sent to Kubernetes Service",
        importance: "Provides clean URL path routing without needing expensive dedicated load balancers for every service.",
        exampleUseCase: "Routing path `/` to service `sys-arch-viewer-service:80`."
    },
    "service": {
        id: "service",
        name: "Kubernetes Service (ClusterIP)",
        category: "Kubernetes",
        badge: "Service Discovery",
        icon: "🔌",
        shortDescription: "Provides stable virtual IP and DNS name for pod endpoints.",
        purpose: "Abstitutes dynamic pod IP addresses behind a static stable ClusterIP for load balancing.",
        responsibilities: [
            "Maintain static internal IP and DNS record (`sys-arch-viewer-svc`)",
            "Load balance requests across healthy backend Pod endpoints",
            "Automatic endpoint updates when pods restart or scale",
            "Filter out unhealthy pods automatically"
        ],
        technologies: ["Kube-proxy", "iptables/IPVS", "CoreDNS"],
        input: "Requests routed from Ingress",
        output: "Forwarded packets to healthy Application Pods",
        importance: "Ensures seamless communication to pods even when pod IPs change during replacements.",
        exampleUseCase: "Round-robin load balancing of requests across Pod 1, Pod 2, and Pod 3."
    },
    "deployment": {
        id: "deployment",
        name: "Kubernetes Deployment",
        category: "Kubernetes",
        badge: "Workload Spec",
        icon: "📄",
        shortDescription: "Declaratively manages ReplicaSets, rolling updates, and pod templates.",
        purpose: "Defines desired application state (desired replica count, container image, environment variables).",
        responsibilities: [
            "Enforce desired pod replica count (e.g. `replicas: 3`)",
            "Execute progressive Rolling Updates with zero downtime",
            "Support easy instant rollbacks (`kubectl rollout undo`)",
            "Pass health checks (liveness and readiness probes) spec"
        ],
        technologies: ["Deployment Spec YAML", "ReplicaSet", "K8s Controller Manager"],
        input: "Deployment YAML manifest file",
        output: "Managed ReplicaSet & underlying running Pods",
        importance: "Enables declarative app updates and guarantees cluster resilience.",
        exampleUseCase: "Updating container image tag from `v1.0.0` to `v1.0.1` cleanly."
    },
    "app-pod-1": {
        id: "app-pod-1",
        name: "Application Pod 1",
        category: "Application",
        badge: "Replica 1",
        icon: "🧊",
        shortDescription: "Running instance of the System Architecture Diagram Viewer container.",
        purpose: "Executes Nginx web server hosting the compiled HTML/CSS/JS frontend application.",
        responsibilities: [
            "Serve static web assets (HTML5, SVG, CSS3, JS)",
            "Respond to HTTP GET requests from Service load balancer",
            "Report health status to Kubernetes Liveness Probe",
            "Handle client sessions efficiently"
        ],
        technologies: ["Nginx Alpine", "Static HTML5/SVG/JS"],
        input: "HTTP GET request from K8s Service",
        output: "HTML page and static assets payload",
        importance: "Active execution worker hosting app instance 1 of 3 for redundancy.",
        exampleUseCase: "Serving architecture diagram interactive viewer UI to client web browser."
    },
    "app-pod-2": {
        id: "app-pod-2",
        name: "Application Pod 2",
        category: "Application",
        badge: "Replica 2",
        icon: "🧊",
        shortDescription: "Redundant running pod instance of the web application.",
        purpose: "Provides horizontal redundancy and load sharing alongside Pod 1 and Pod 3.",
        responsibilities: [
            "Serve web frontend requests",
            "Ensure system fault tolerance",
            "Provide independent pod runtime isolation"
        ],
        technologies: ["Nginx Alpine", "Static HTML5/SVG/JS"],
        input: "HTTP GET request from K8s Service",
        output: "HTML page and static assets payload",
        importance: "Ensures high availability. If Pod 1 fails, Pod 2 and Pod 3 handle 100% of traffic.",
        exampleUseCase: "Accepting user interactions smoothly during peak traffic."
    },
    "app-pod-3": {
        id: "app-pod-3",
        name: "Application Pod 3",
        category: "Application",
        badge: "Replica 3",
        icon: "🧊",
        shortDescription: "Redundant running pod instance of the web application.",
        purpose: "Third replica ensuring zero service interruption during node maintenance or failure.",
        responsibilities: [
            "Serve web frontend requests",
            "Balance high concurrent traffic",
            "Maintain container health"
        ],
        technologies: ["Nginx Alpine", "Static HTML5/SVG/JS"],
        input: "HTTP GET request from K8s Service",
        output: "HTML page and static assets payload",
        importance: "Maintains quorum and SLA guarantee across multi-AZ deployment.",
        exampleUseCase: "Handling client requests during rolling updates."
    },
    "app-viewer": {
        id: "app-viewer",
        name: "System Architecture Diagram Viewer",
        category: "Application",
        badge: "Core Frontend App",
        icon: "🖥️",
        shortDescription: "Interactive SVG-based cloud architecture visualization web tool.",
        purpose: "Empowers DevOps engineers and stakeholders to explore, search, and inspect the cloud architecture and deployment pipeline visually.",
        responsibilities: [
            "Render interactive responsive SVG cloud architecture diagram",
            "Provide pan, zoom, reset, and fullscreen controls",
            "Provide quick search, categorization, and visual component highlighting",
            "Display detailed modal documentation for all pipeline layers",
            "Provide interactive simulations (Self-Healing, Rolling Updates, Pod Scaling)"
        ],
        technologies: ["HTML5", "CSS3 Dark Dashboard", "Vanilla JavaScript ES6", "SVG Vector Graphics"],
        input: "User mouse/touch interactions, search inputs, and simulation triggers",
        output: "Interactive visual diagrams, modal documentation, and animated simulations",
        importance: "The main user-facing application delivering clean documentation and operational clarity.",
        exampleUseCase: "Exploring component roles or simulating pod failure recovery in Kubernetes."
    }
};

// Export for usage across modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARCHITECTURE_COMPONENTS };
}

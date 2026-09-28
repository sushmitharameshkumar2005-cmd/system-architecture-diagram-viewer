/**
 * System Architecture Diagram Viewer - Architecture & Interactive Module
 * Handles SVG Pan/Zoom, Search & Highlighting, and K8s Interactive Simulations.
 */

// Pan & Zoom State
let currentZoom = 1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;

let isPanning = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

// K8s Simulation State
let currentReplicas = 3;
let isSimulationRunning = false;

/**
 * Initialize SVG Pan/Zoom Listeners
 */
function initSvgControls() {
    const viewport = document.getElementById('svg-viewport');
    const svg = document.getElementById('main-architecture-svg');

    if (!viewport || !svg) return;

    // Zoom Buttons
    document.getElementById('btn-zoom-in')?.addEventListener('click', zoomIn);
    document.getElementById('btn-zoom-out')?.addEventListener('click', zoomOut);
    document.getElementById('btn-reset')?.addEventListener('click', resetZoom);
    document.getElementById('btn-fullscreen')?.addEventListener('click', toggleFullscreen);

    // Mouse Pan Controls
    viewport.addEventListener('mousedown', (e) => {
        if (e.target.closest('.svg-node')) return; // Allow clicking nodes without dragging
        isPanning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        viewport.style.cursor = 'grabbing';
    });

    viewport.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    window.addEventListener('mouseup', () => {
        isPanning = false;
        if (viewport) viewport.style.cursor = 'grab';
    });

    // Mouse Wheel Zoom
    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }, { passive: false });
}

/**
 * Zoom In
 */
function zoomIn() {
    if (currentZoom < MAX_ZOOM) {
        currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
        applyTransform();
    }
}

/**
 * Zoom Out
 */
function zoomOut() {
    if (currentZoom > MIN_ZOOM) {
        currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
        applyTransform();
    }
}

/**
 * Reset Zoom & Pan
 */
function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
}

/**
 * Apply SVG Transform matrix
 */
function applyTransform() {
    const svg = document.getElementById('main-architecture-svg');
    if (svg) {
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    }
}

/**
 * Toggle Fullscreen Viewport Mode
 */
function toggleFullscreen() {
    const viewport = document.getElementById('svg-viewport-card') || document.getElementById('svg-viewport');
    if (!viewport) return;

    if (!document.fullscreenElement) {
        if (viewport.requestFullscreen) {
            viewport.requestFullscreen().catch(err => {
                console.warn(`Error attempting to enable fullscreen: ${err.message}`);
            });
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/**
 * Search and Highlight Component in SVG and Sidebar
 */
function searchComponents(query) {
    const cleanQuery = query.trim().toLowerCase();
    const allSvgNodes = document.querySelectorAll('.svg-node');
    const allSidebarItems = document.querySelectorAll('.component-item');
    const searchStatus = document.getElementById('search-status-text');

    let matchCount = 0;

    // Reset previous highlights
    allSvgNodes.forEach(node => node.classList.remove('search-match'));
    allSidebarItems.forEach(item => item.classList.remove('active'));

    if (!cleanQuery) {
        if (searchStatus) searchStatus.textContent = '';
        return;
    }

    // Search against components registry
    Object.keys(ARCHITECTURE_COMPONENTS).forEach(id => {
        const comp = ARCHITECTURE_COMPONENTS[id];
        const isMatch = comp.name.toLowerCase().includes(cleanQuery) ||
                        comp.category.toLowerCase().includes(cleanQuery) ||
                        comp.purpose.toLowerCase().includes(cleanQuery);

        if (isMatch) {
            matchCount++;
            // Highlight SVG node
            const svgNode = document.getElementById(id);
            if (svgNode) svgNode.classList.add('search-match');

            // Highlight Sidebar item
            const sidebarItem = document.querySelector(`[data-component-id="${id}"]`);
            if (sidebarItem) sidebarItem.classList.add('active');
        }
    });

    if (searchStatus) {
        if (matchCount > 0) {
            searchStatus.textContent = `Found ${matchCount} matching component(s).`;
            searchStatus.style.color = 'var(--accent-amber)';
        } else {
            searchStatus.textContent = 'No component found.';
            searchStatus.style.color = 'var(--accent-rose)';
        }
    }
}

/**
 * Highlight a specific component by ID
 */
function highlightComponent(componentId) {
    document.querySelectorAll('.svg-node').forEach(node => node.classList.remove('active'));
    document.querySelectorAll('.component-item').forEach(item => item.classList.remove('active'));

    const targetSvg = document.getElementById(componentId);
    if (targetSvg) targetSvg.classList.add('active');

    const targetSidebar = document.querySelector(`[data-component-id="${componentId}"]`);
    if (targetSidebar) targetSidebar.classList.add('active');
}

/* ==========================================================================
   INTERACTIVE SIMULATIONS
   ========================================================================== */

/**
 * Simulation 1: Pod Failure & Kubernetes Self-Healing
 */
function simulatePodFailure() {
    if (isSimulationRunning) return;
    isSimulationRunning = true;

    const podBox = document.getElementById('sim-pod-2');
    const podStatus = document.getElementById('sim-pod-status-2');
    const simLog = document.getElementById('heal-sim-log');

    const svgPodRect = document.getElementById('pod-rect-2');
    const svgPodStatus = document.getElementById('pod-status-2');

    // Step 1: Pod Failure
    if (podBox) podBox.className = 'pod-box failed';
    if (podStatus) podStatus.textContent = 'Failed';
    if (svgPodRect) svgPodRect.setAttribute('fill', '#991b1b');
    if (svgPodStatus) svgPodStatus.textContent = 'Unhealthy';

    if (simLog) simLog.textContent = '🚨 WARNING: Pod 2 failed liveness check! Status: CrashLoopBackOff.';

    // Step 2: K8s Detection
    setTimeout(() => {
        if (simLog) simLog.textContent = '🔍 K8s Control Plane detected failure. Triggering eviction policy...';
    }, 1500);

    // Step 3: Replacement creation
    setTimeout(() => {
        if (simLog) simLog.textContent = '⚙️ ReplicaSet creating replacement Pod 2 instance...';
    }, 3000);

    // Step 4: Recovery completed
    setTimeout(() => {
        if (podBox) podBox.className = 'pod-box';
        if (podStatus) podStatus.textContent = 'Healthy';
        if (svgPodRect) svgPodRect.setAttribute('fill', '#064e3b');
        if (svgPodStatus) svgPodStatus.textContent = 'Healthy';

        if (simLog) simLog.textContent = '✅ Self-healing completed! 3/3 Pod replicas running & healthy.';
        isSimulationRunning = false;
    }, 4500);
}

/**
 * Simulation 2: Rolling Update
 */
function simulateRollingUpdate() {
    if (isSimulationRunning) return;
    isSimulationRunning = true;

    const simLog = document.getElementById('update-sim-log');
    const pods = [
        { id: 1, simVer: 'sim-pod-ver-1', svgVer: 'pod-ver-1', box: 'sim-pod-1' },
        { id: 2, simVer: 'sim-pod-ver-2', svgVer: 'pod-ver-2', box: 'sim-pod-2' },
        { id: 3, simVer: 'sim-pod-ver-3', svgVer: 'pod-ver-3', box: 'sim-pod-3' }
    ];

    if (simLog) simLog.textContent = '🔄 Rolling Update initiated: Target image sys-arch-viewer:v2.0.0';

    pods.forEach((pod, index) => {
        setTimeout(() => {
            const boxEl = document.getElementById(pod.box);
            if (boxEl) boxEl.className = 'pod-box updating';

            if (simLog) simLog.textContent = `🚀 Updating Pod ${pod.id} to image version v2.0.0...`;

            setTimeout(() => {
                const simVerEl = document.getElementById(pod.simVer);
                const svgVerEl = document.getElementById(pod.svgVer);
                if (simVerEl) simVerEl.textContent = 'v2.0.0';
                if (svgVerEl) svgVerEl.textContent = 'v2.0.0';
                if (boxEl) boxEl.className = 'pod-box';

                if (index === pods.length - 1) {
                    if (simLog) simLog.textContent = '✨ Rolling update completed successfully! Zero downtime achieved.';
                    isSimulationRunning = false;
                }
            }, 1000);
        }, index * 1800);
    });
}

/**
 * Simulation 3: Application Scalability (Scale Up / Scale Down)
 */
function scaleApplication(delta) {
    const newCount = currentReplicas + delta;
    if (newCount < 1 || newCount > 6) return;

    currentReplicas = newCount;

    const replicaCountDisplay = document.getElementById('replica-count');
    const scaleLog = document.getElementById('scale-sim-log');
    const scaleCanvas = document.getElementById('scale-pods-canvas');

    if (replicaCountDisplay) replicaCountDisplay.textContent = currentReplicas;

    if (scaleLog) {
        scaleLog.textContent = `📈 Horizontal Pod Autoscaler adjusted replicas to ${currentReplicas}.`;
    }

    // Render scaled pod boxes
    if (scaleCanvas) {
        scaleCanvas.innerHTML = '';
        for (let i = 1; i <= currentReplicas; i++) {
            const pod = document.createElement('div');
            pod.className = 'pod-box';
            pod.innerHTML = `
                <div class="pod-icon">🧊</div>
                <div class="pod-name">Pod ${i}</div>
                <div class="pod-ver">v1.0.0</div>
            `;
            scaleCanvas.appendChild(pod);
        }
    }
}

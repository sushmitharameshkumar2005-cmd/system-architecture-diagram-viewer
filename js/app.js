/**
 * System Architecture Diagram Viewer - Main Application Orchestrator
 * Integrates Component Registry, Architecture Viewer, Modal Handlers, and UI Rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

/**
 * Main Initialization Function
 */
function initApp() {
    renderSidebarComponents();
    renderDocumentationCards();
    bindSvgComponentClicks();
    bindGlobalEvents();
    initSvgControls();
    scaleApplication(0); // Initialize scaling simulation canvas with default 3 replicas
}

/**
 * Render Sidebar Component List grouped by Category
 */
function renderSidebarComponents() {
    const sidebarContainer = document.getElementById('sidebar-categories');
    if (!sidebarContainer) return;

    sidebarContainer.innerHTML = '';

    // Group components by category
    const categories = {};
    Object.values(ARCHITECTURE_COMPONENTS).forEach(comp => {
        if (!categories[comp.category]) {
            categories[comp.category] = [];
        }
        categories[comp.category].push(comp);
    });

    // Generate Category Blocks
    Object.keys(categories).forEach(catName => {
        const catGroup = document.createElement('div');
        catGroup.className = 'component-category-group';

        const catHeader = document.createElement('div');
        catHeader.className = 'category-header';
        catHeader.textContent = catName;
        catGroup.appendChild(catHeader);

        const list = document.createElement('ul');
        list.className = 'component-list';

        categories[catName].forEach(comp => {
            const item = document.createElement('li');
            item.className = 'component-item';
            item.setAttribute('data-component-id', comp.id);
            item.innerHTML = `<span>${comp.icon}</span> <span>${comp.name}</span>`;

            item.addEventListener('click', () => {
                openComponentModal(comp.id);
                highlightComponent(comp.id);
            });

            list.appendChild(item);
        });

        catGroup.appendChild(list);
        sidebarContainer.appendChild(catGroup);
    });
}

/**
 * Render Documentation Cards in Documentation Section
 */
function renderDocumentationCards() {
    const docGrid = document.getElementById('doc-cards-grid');
    if (!docGrid) return;

    docGrid.innerHTML = '';

    Object.values(ARCHITECTURE_COMPONENTS).forEach(comp => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.setAttribute('data-component-id', comp.id);
        card.innerHTML = `
            <div class="doc-icon">${comp.icon}</div>
            <div class="doc-title">${comp.name}</div>
            <div class="doc-role">${comp.category} • ${comp.badge}</div>
            <div class="doc-text">${comp.shortDescription}</div>
        `;

        card.addEventListener('click', () => {
            openComponentModal(comp.id);
            highlightComponent(comp.id);
        });

        docGrid.appendChild(card);
    });
}

/**
 * Attach Click Event Listeners to all SVG Nodes
 */
function bindSvgComponentClicks() {
    const svgNodes = document.querySelectorAll('.svg-node');

    svgNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const componentId = node.getAttribute('id');
            if (componentId && ARCHITECTURE_COMPONENTS[componentId]) {
                openComponentModal(componentId);
                highlightComponent(componentId);
            }
        });
    });
}

/**
 * Bind Global Listeners (Modal, Search, Keyboard, Mobile Nav)
 */
function bindGlobalEvents() {
    // Search input binding
    const searchInput = document.getElementById('component-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchComponents(e.target.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const matches = document.querySelectorAll('.svg-node.search-match');
                if (matches.length > 0) {
                    const matchId = matches[0].getAttribute('id');
                    openComponentModal(matchId);
                    highlightComponent(matchId);
                }
            }
        });
    }

    // Modal Close button
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('component-modal');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Escape key listener for Modal & Reset Search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Simulation Trigger Buttons
    document.getElementById('btn-sim-failure')?.addEventListener('click', simulatePodFailure);
    document.getElementById('btn-sim-update')?.addEventListener('click', simulateRollingUpdate);
    document.getElementById('btn-scale-up')?.addEventListener('click', () => scaleApplication(1));
    document.getElementById('btn-scale-down')?.addEventListener('click', () => scaleApplication(-1));
}

/**
 * Open Detail Modal for Component
 */
function openComponentModal(componentId) {
    const comp = ARCHITECTURE_COMPONENTS[componentId];
    const modalOverlay = document.getElementById('component-modal');
    if (!comp || !modalOverlay) {
        console.warn(`Component with ID '${componentId}' not found in registry.`);
        return;
    }

    // Populate Modal Content
    document.getElementById('modal-icon').textContent = comp.icon;
    document.getElementById('modal-title').textContent = comp.name;
    document.getElementById('modal-category').textContent = comp.category;
    document.getElementById('modal-badge').textContent = comp.badge;

    document.getElementById('modal-purpose').textContent = comp.purpose;
    document.getElementById('modal-importance').textContent = comp.importance;
    document.getElementById('modal-input').textContent = comp.input;
    document.getElementById('modal-output').textContent = comp.output;
    document.getElementById('modal-usecase').textContent = comp.exampleUseCase;

    // Populate Responsibilities List
    const respList = document.getElementById('modal-responsibilities');
    if (respList) {
        respList.innerHTML = '';
        comp.responsibilities.forEach(resp => {
            const li = document.createElement('li');
            li.textContent = resp;
            respList.appendChild(li);
        });
    }

    // Populate Technologies Tags
    const techBox = document.getElementById('modal-technologies');
    if (techBox) {
        techBox.innerHTML = comp.technologies.map(t => `<span class="modal-category-badge">${t}</span>`).join(' ');
    }

    // Display Modal
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock scroll
}

/**
 * Close Modal
 */
function closeModal() {
    const modalOverlay = document.getElementById('component-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock scroll
    }
}

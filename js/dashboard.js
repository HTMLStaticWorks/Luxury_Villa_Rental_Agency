document.addEventListener('DOMContentLoaded', () => {
    // Dashboard Sidebar Toggle
    const sidebarOpen = document.getElementById('sidebarOpen');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarOpen && sidebar) {
        sidebarOpen.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.add('show');
            if (sidebarOverlay) sidebarOverlay.classList.add('show');
        });
    }

    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.remove('show');
            if (sidebarOverlay) sidebarOverlay.classList.remove('show');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991.98 && sidebar && sidebar.classList.contains('show')) {
            if (!sidebar.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // Dashboard Tab Switching Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-target]');
    const dashboardPanes = document.querySelectorAll('.dashboard-pane');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return;

            e.preventDefault();

            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update visible pane
            dashboardPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetId) {
                    pane.classList.add('active');
                }
            });

            // Close sidebar after selection
            if (sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                if (sidebarOverlay) sidebarOverlay.classList.remove('show');
            }
        });
    });

    // Mock Chart Rendering (UI Only)
    // Simulated chart with simple DOM bars animated
    const chartContainers = document.querySelectorAll('.chart-mockup');
    chartContainers.forEach(container => {
        const bars = container.querySelectorAll('.bar');
        bars.forEach(bar => {
            const height = bar.getAttribute('data-height');
            setTimeout(() => {
                bar.style.height = height + '%';
            }, 500);
        });
    });
});

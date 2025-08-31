// ===== ADMIN PANEL JAVASCRIPT - CREACIONES AMI =====

class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.currentTab = 'gallery';
        this.galleryItems = [];
        this.isGridView = true;
        
        this.init();
        this.loadDemoData();
    }
    
    init() {
        // Event listeners
        this.setupEventListeners();
        
        // Check if user is already logged in
        this.checkExistingSession();
    }
    
    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });
        
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // File upload
        this.setupFileUpload();
        
        // Upload form
        document.getElementById('uploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFileUpload();
        });
        
        // Save draft button
        document.getElementById('saveDraftBtn').addEventListener('click', () => {
            this.saveDraft();
        });
        
        // View toggle
        document.getElementById('viewToggle').addEventListener('click', () => {
            this.toggleView();
        });
        
        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterGallery(e.target.value);
        });
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Toast close
        document.getElementById('closeToast').addEventListener('click', () => {
            this.hideToast();
        });
    }
    
    // ===== AUTHENTICATION =====
    
    checkExistingSession() {
        const savedUser = localStorage.getItem('amiAdminUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }
    
    handleLogin() {
        const userSelect = document.getElementById('userSelect').value;
        const password = document.getElementById('password').value;
        
        if (!userSelect) {
            this.showToast('Por favor selecciona tu perfil', 'error');
            return;
        }
        
        if (!password) {
            this.showToast('Por favor ingresa tu contraseña', 'error');
            return;
        }
        
        // Simular autenticación (aquí iría la lógica real con Supabase)
        const validPasswords = ['ami2024', 'creaciones', 'admin'];
        
        if (validPasswords.includes(password.toLowerCase())) {
            this.currentUser = {
                type: userSelect,
                name: userSelect === 'admin' ? 'Admin Principal' : 'Creativa',
                loginTime: new Date().toISOString()
            };
            
            // Guardar sesión
            localStorage.setItem('amiAdminUser', JSON.stringify(this.currentUser));
            
            this.showToast(`¡Bienvenida ${this.currentUser.name}! 👋`, 'success');
            this.showDashboard();
        } else {
            this.showToast('Contraseña incorrecta', 'error');
        }
    }
    
    handleLogout() {
        localStorage.removeItem('amiAdminUser');
        this.currentUser = null;
        this.showToast('Sesión cerrada correctamente', 'success');
        this.showLogin();
    }
    
    showLogin() {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('adminDashboard').classList.remove('active');
        
        // Reset form
        document.getElementById('loginForm').reset();
    }
    
    showDashboard() {
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('adminDashboard').classList.add('active');
        
        // Update user info
        document.getElementById('currentUser').textContent = 
            `${this.currentUser.name} ${this.currentUser.type === 'admin' ? '👑' : '🎨'}`;
        
        // Load initial data
        this.loadGalleryContent();
        this.loadStats();
        this.loadRecentActivity();
    }
    
    // ===== NAVIGATION =====
    
    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
        
        this.currentTab = tabName;
        
        // Load specific content if needed
        if (tabName === 'stats') {
            this.loadAnalytics();
        }
    }
    
    // ===== FILE UPLOAD =====
    
    setupFileUpload() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        
        // Click to select files
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
        
        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--accent-pink)';
            dropZone.style.background = '#f8f9fa';
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = 'var(--primary-pink)';
            dropZone.style.background = '';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary-pink)';
            dropZone.style.background = '';
            
            this.handleFiles(e.dataTransfer.files);
        });
    }
    
    handleFiles(files) {
        const filePreview = document.getElementById('filePreview');
        filePreview.innerHTML = '';
        filePreview.classList.remove('hidden');
        
        Array.from(files).forEach((file, index) => {
            if (this.validateFile(file)) {
                const previewItem = this.createFilePreview(file);
                filePreview.appendChild(previewItem);
            }
        });
    }
    
    validateFile(file) {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov'];
        
        if (file.size > maxSize) {
            this.showToast(`El archivo ${file.name} es demasiado grande (máx. 50MB)`, 'error');
            return false;
        }
        
        if (!allowedTypes.includes(file.type)) {
            this.showToast(`Tipo de archivo no soportado: ${file.name}`, 'error');
            return false;
        }
        
        return true;
    }
    
    createFilePreview(file) {
        const div = document.createElement('div');
        div.className = 'file-preview-item';
        div.style.cssText = `
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.style.cssText = `
                width: 100%;
                height: 100px;
                object-fit: cover;
            `;
            const reader = new FileReader();
            reader.onload = (e) => img.src = e.target.result;
            reader.readAsDataURL(file);
            div.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.style.cssText = `
                width: 100%;
                height: 100px;
                object-fit: cover;
            `;
            video.controls = false;
            const reader = new FileReader();
            reader.onload = (e) => video.src = e.target.result;
            reader.readAsDataURL(file);
            div.appendChild(video);
        }
        
        const fileName = document.createElement('p');
        fileName.textContent = file.name;
        fileName.style.cssText = `
            padding: 8px;
            margin: 0;
            font-size: 0.8rem;
            text-align: center;
            background: #f8f9fa;
        `;
        div.appendChild(fileName);
        
        return div;
    }
    
    handleFileUpload() {
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const tags = document.getElementById('tags').value;
        const files = document.getElementById('fileInput').files;
        
        if (!title || !category) {
            this.showToast('Por favor completa los campos obligatorios', 'error');
            return;
        }
        
        if (files.length === 0) {
            this.showToast('Por favor selecciona al menos un archivo', 'error');
            return;
        }
        
        // Simular upload (aquí iría la lógica real con Supabase)
        this.simulateUpload(title, category, description, price, tags, files);
    }
    
    simulateUpload(title, category, description, price, tags, files) {
        this.showToast('Subiendo archivos...', 'info');
        
        // Simular delay de upload
        setTimeout(() => {
            const newItem = {
                id: Date.now().toString(),
                title,
                category,
                description,
                price: price ? parseFloat(price) : null,
                tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
                files: Array.from(files).map(file => ({
                    name: file.name,
                    type: file.type,
                    size: file.size
                })),
                uploadedBy: this.currentUser.name,
                uploadDate: new Date().toISOString(),
                status: 'published',
                views: 0,
                likes: 0
            };
            
            this.galleryItems.unshift(newItem);
            this.saveToLocalStorage();
            this.loadGalleryContent();
            this.loadStats();
            
            this.showToast('¡Contenido subido exitosamente! 🎉', 'success');
            
            // Reset form
            document.getElementById('uploadForm').reset();
            document.getElementById('filePreview').classList.add('hidden');
            
            // Switch to gallery tab
            this.switchTab('gallery');
        }, 2000);
    }
    
    saveDraft() {
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        
        if (!title) {
            this.showToast('Ingresa al menos un título para guardar el borrador', 'error');
            return;
        }
        
        // Save draft to localStorage
        const draft = {
            title,
            category,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            tags: document.getElementById('tags').value,
            savedAt: new Date().toISOString()
        };
        
        localStorage.setItem('amiDraft', JSON.stringify(draft));
        this.showToast('Borrador guardado 💾', 'success');
    }
    
    // ===== GALLERY =====
    
    loadGalleryContent() {
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = '';
        
        if (this.galleryItems.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-images" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No hay contenido aún</h3>
                    <p>Comienza subiendo tu primera creación</p>
                </div>
            `;
            return;
        }
        
        this.galleryItems.forEach(item => {
            const itemElement = this.createGalleryItem(item);
            galleryGrid.appendChild(itemElement);
        });
    }
    
    createGalleryItem(item) {
        const div = document.createElement('div');
        div.className = 'gallery-item slide-up';
        
        const mediaType = item.files[0].type.startsWith('image/') ? 'image' : 'video';
        const mediaElement = mediaType === 'image' ? 
            `<img src="https://via.placeholder.com/300x200/${this.getCategoryColor(item.category)}/FFFFFF?text=${encodeURIComponent(item.title)}" alt="${item.title}">` :
            `<video><source src="https://via.placeholder.com/300x200/${this.getCategoryColor(item.category)}/FFFFFF?text=${encodeURIComponent(item.title)}" type="video/mp4"></video>`;
        
        div.innerHTML = `
            ${mediaElement}
            <div class="gallery-item-info">
                <h4 class="gallery-item-title">${item.title}</h4>
                <div class="gallery-item-meta">
                    <span>${this.formatDate(item.uploadDate)}</span>
                    <span>${this.getCategoryEmoji(item.category)} ${item.category}</span>
                </div>
                <div class="gallery-item-actions">
                    <button class="action-edit" onclick="adminPanel.editItem('${item.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="action-publish" onclick="adminPanel.togglePublish('${item.id}')">
                        <i class="fas fa-${item.status === 'published' ? 'eye-slash' : 'eye'}"></i>
                        ${item.status === 'published' ? 'Ocultar' : 'Publicar'}
                    </button>
                    <button class="action-delete" onclick="adminPanel.deleteItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return div;
    }
    
    filterGallery(category) {
        const filteredItems = category === 'all' ? 
            this.galleryItems : 
            this.galleryItems.filter(item => item.category === category);
        
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = '';
        
        filteredItems.forEach(item => {
            const itemElement = this.createGalleryItem(item);
            galleryGrid.appendChild(itemElement);
        });
    }
    
    toggleView() {
        this.isGridView = !this.isGridView;
        const viewToggle = document.getElementById('viewToggle');
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (this.isGridView) {
            viewToggle.innerHTML = '<i class="fas fa-th"></i>';
            galleryGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        } else {
            viewToggle.innerHTML = '<i class="fas fa-list"></i>';
            galleryGrid.style.gridTemplateColumns = '1fr';
        }
    }
    
    // ===== ITEM ACTIONS =====
    
    editItem(id) {
        const item = this.galleryItems.find(item => item.id === id);
        if (!item) return;
        
        // Populate edit modal
        document.getElementById('editTitle').value = item.title;
        document.getElementById('editDescription').value = item.description;
        
        // Show edit modal
        document.getElementById('editModal').classList.add('active');
    }
    
    togglePublish(id) {
        const item = this.galleryItems.find(item => item.id === id);
        if (!item) return;
        
        item.status = item.status === 'published' ? 'draft' : 'published';
        this.saveToLocalStorage();
        this.loadGalleryContent();
        
        const action = item.status === 'published' ? 'publicado' : 'ocultado';
        this.showToast(`Contenido ${action}`, 'success');
    }
    
    deleteItem(id) {
        if (!confirm('¿Estás segura de que quieres eliminar este contenido?')) {
            return;
        }
        
        this.galleryItems = this.galleryItems.filter(item => item.id !== id);
        this.saveToLocalStorage();
        this.loadGalleryContent();
        this.loadStats();
        
        this.showToast('Contenido eliminado', 'success');
    }
    
    // ===== STATISTICS =====
    
    loadStats() {
        const totalImages = this.galleryItems.filter(item => 
            item.files.some(file => file.type.startsWith('image/'))).length;
        const totalVideos = this.galleryItems.filter(item => 
            item.files.some(file => file.type.startsWith('video/'))).length;
        const totalViews = this.galleryItems.reduce((sum, item) => sum + item.views, 0);
        const totalLikes = this.galleryItems.reduce((sum, item) => sum + item.likes, 0);
        
        document.getElementById('totalImages').textContent = totalImages;
        document.getElementById('totalVideos').textContent = totalVideos;
        document.getElementById('totalViews').textContent = totalViews.toLocaleString();
        document.getElementById('totalLikes').textContent = totalLikes.toLocaleString();
    }
    
    loadRecentActivity() {
        const activityList = document.getElementById('activityList');
        const recentItems = this.galleryItems
            .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
            .slice(0, 5);
        
        if (recentItems.length === 0) {
            activityList.innerHTML = `
                <div class="activity-item">
                    <i class="fas fa-info-circle"></i>
                    <div class="activity-content">
                        <h4>No hay actividad reciente</h4>
                        <p>La actividad aparecerá aquí cuando subas contenido</p>
                    </div>
                </div>
            `;
            return;
        }
        
        activityList.innerHTML = '';
        recentItems.forEach(item => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const icon = item.files[0].type.startsWith('image/') ? 'fa-image' : 'fa-video';
            
            activityItem.innerHTML = `
                <i class="fas ${icon}"></i>
                <div class="activity-content">
                    <h4>Nuevo contenido subido</h4>
                    <p>${item.title} - ${this.formatDate(item.uploadDate)}</p>
                </div>
            `;
            
            activityList.appendChild(activityItem);
        });
    }
    
    loadAnalytics() {
        // Simulated analytics data - here you would connect to real analytics
        const categoryStats = {};
        this.galleryItems.forEach(item => {
            categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
        });
        
        // Display category breakdown
        const categoryChart = document.getElementById('categoryChart');
        categoryChart.innerHTML = '';
        
        Object.entries(categoryStats).forEach(([category, count]) => {
            const bar = document.createElement('div');
            bar.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                margin: 8px 0;
                background: var(--primary-pink);
                border-radius: 6px;
            `;
            bar.innerHTML = `
                <span>${this.getCategoryEmoji(category)} ${category}</span>
                <span style="font-weight: bold;">${count}</span>
            `;
            categoryChart.appendChild(bar);
        });
    }
    
    // ===== UTILITY FUNCTIONS =====
    
    loadDemoData() {
        // Load from localStorage or create demo data
        const savedItems = localStorage.getItem('amiGalleryItems');
        if (savedItems) {
            this.galleryItems = JSON.parse(savedItems);
        } else {
            // Create some demo content
            this.galleryItems = [
                {
                    id: '1',
                    title: 'Aretes Corazón Rosa',
                    category: 'aretes',
                    description: 'Hermosos aretes en forma de corazón, perfectos para ocasiones especiales.',
                    price: 15.00,
                    tags: ['rosa', 'corazón', 'elegante'],
                    files: [{ name: 'aretes-rosa.jpg', type: 'image/jpeg', size: 1024000 }],
                    uploadedBy: 'Demo',
                    uploadDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
                    status: 'published',
                    views: 45,
                    likes: 12
                },
                {
                    id: '2',
                    title: 'Tutorial Llaveros Personalizados',
                    category: 'videos',
                    description: 'Video paso a paso para crear llaveros únicos.',
                    price: null,
                    tags: ['tutorial', 'llaveros', 'diy'],
                    files: [{ name: 'tutorial-llaveros.mp4', type: 'video/mp4', size: 15600000 }],
                    uploadedBy: 'Demo',
                    uploadDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                    status: 'published',
                    views: 123,
                    likes: 34
                }
            ];
            this.saveToLocalStorage();
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('amiGalleryItems', JSON.stringify(this.galleryItems));
    }
    
    getCategoryColor(category) {
        const colors = {
            'aretes': 'F8C8DC',
            'llaveros': 'BA68C8',
            'decoraciones': '81C784',
            'manualidades': 'FFD54F',
            'videos': '87CEEB'
        };
        return colors[category] || 'CCCCCC';
    }
    
    getCategoryEmoji(category) {
        const emojis = {
            'aretes': '🎀',
            'llaveros': '🔑',
            'decoraciones': '🎄',
            'manualidades': '🎨',
            'videos': '📹'
        };
        return emojis[category] || '📁';
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastContent = toast.querySelector('.toast-content');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toastContent.className = `toast-content ${type}`;
        
        toast.classList.add('show');
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            this.hideToast();
        }, 4000);
    }
    
    hideToast() {
        document.getElementById('toast').classList.remove('show');
    }
}

// Initialize the admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
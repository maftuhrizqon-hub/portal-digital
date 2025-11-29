document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer untuk animasi saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Fungsi helper untuk toggle login
    function setupLoginToggle(boxId, initialContentId, loginFormId, closeBtnId, formId, redirectUrl) {
        const box = document.getElementById(boxId);
        const initialContent = document.getElementById(initialContentId);
        const loginForm = document.getElementById(loginFormId);
        const closeBtn = document.getElementById(closeBtnId);
        
        box.addEventListener('click', function(event) {
            if (event.target.closest('#' + formId)) return;
            initialContent.classList.toggle('hidden');
            loginForm.classList.toggle('hidden');
            loginForm.classList.toggle('visible');
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 500);
        });
        
        closeBtn.addEventListener('click', function() {
            initialContent.classList.remove('hidden');
            loginForm.classList.add('hidden');
            loginForm.classList.remove('visible');
        });
        
        document.getElementById(formId).addEventListener('submit', function(event) {
            event.preventDefault();
            const username = this.querySelector('input[name="username"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const role = this.querySelector('select[name="role"]') ? this.querySelector('select[name="role"]').value : 'mahasiswa';
            
            if (username && password && (role || !this.querySelector('select[name="role"]'))) {
                alert('Login berhasil! Selamat datang, ' + username);
                window.location.href = redirectUrl;
            } else {
                alert('Harap isi semua field.');
            }
        });
    }

    // Setup untuk Box 2 (Tenaga Kerja)
    setupLoginToggle('box2', 'initial-content2', 'login-form2', 'close-login2', 'loginForm2', 'dashboard-tenaga.html');
});
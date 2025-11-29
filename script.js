// /c:/Users/Asus/Desktop/ms/script.js
// Script sederhana untuk menambahkan animasi saat scroll dengan fallback
document.addEventListener('DOMContentLoaded', function () {
    const elements = Array.from(document.querySelectorAll('.fade-in, [data-animate]'));

    function initElement(el) {
        // optional attributes: data-delay, data-duration, data-animate-once ("true"/"false")
        if (el.dataset.delay) el.style.animationDelay = el.dataset.delay;
        if (el.dataset.duration) el.style.animationDuration = el.dataset.duration;
        el.style.animationPlayState = 'paused';
    }

    elements.forEach(initElement);

    function handleInView(el) {
        el.style.animationPlayState = 'running';
        if (el.dataset.animateOnce !== "false") {
            // default: animate once -> stop observing
            safeUnobserve(el);
        }
    }

    function handleOutOfView(el) {
        if (el.dataset.animateOnce === "false") {
            el.style.animationPlayState = 'paused';
        }
    }

    // safe observer wrapper so we can unobserve even if using fallback
    let observer = null;
    const observed = new WeakSet();

    function safeObserve(el) {
        if (observer) {
            observer.observe(el);
            observed.add(el);
        }
    }

    function safeUnobserve(el) {
        if (observer && observed.has(el)) {
            observer.unobserve(el);
            observed.delete(el);
        }
    }

    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                if (entry.isIntersecting) handleInView(el);
                else handleOutOfView(el);
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });

        elements.forEach(safeObserve);
    } else {
        // Fallback for older browsers: throttled scroll + resize check
        let ticking = false;
        function check() {
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
                if (inView) handleInView(el);
                else handleOutOfView(el);
            });
            ticking = false;
        }
        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(check);
            }
        }
        // initial check and listeners
        check();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }
   // Event listener untuk klik pada Box 1 (ubah dari toggle login ke redirect)
const box1 = document.getElementById('box1');
box1.addEventListener('click', function() {
    // Konfirmasi opsional
    if (confirm('Apakah Anda ingin pindah ke halaman dashboard?')) {
        window.location.href = 'box1.html'; // Redirect ke halaman 
    }

    let redirectPage = 'dashboard-tenaga.html'; // Default
if (role === 'direktur') {
    redirectPage = 'dashboard-dosen.html';
} else if (role === 'staf') {
    redirectPage = 'dashboard-staf.html';
}
window.location.href = redirectPage;

});

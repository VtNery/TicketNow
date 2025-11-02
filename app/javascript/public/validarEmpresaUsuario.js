    document.addEventListener("DOMContentLoaded", function () {
        const params = new URLSearchParams(window.location.search);
        const msg = params.get("msg");

        if (msg === 'empresa_existente') {
            alert('Você já possui uma empresa cadastrada! \nEstamos direcionando para seu Dashboard');
            window.location.href = '/dashboard';
        }
    });
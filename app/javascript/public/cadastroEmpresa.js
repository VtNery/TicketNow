const radios = document.querySelectorAll('input[type=radio]');
radios.forEach(radio => {
    radio.addEventListener('change', function() {
        radios.forEach(r => {
            r.nextElementSibling.classList.remove('border-blue-500');
            r.nextElementSibling.classList.remove('font-bold');
            if (r.checked) {
                r.nextElementSibling.classList.add('border-blue-500');
                r.nextElementSibling.classList.add('font-bold');
            }
        });
    });
});

const checkboxes = document.querySelectorAll('.opcaoFestas');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = checkbox.nextElementSibling;
        if (checkbox.checked) {
            label.classList.add('border-blue-500');
            label.classList.add('font-bold');
        } else {
            label.classList.remove('border-blue-500');
            label.classList.remove('font-bold');
        }
    });
});
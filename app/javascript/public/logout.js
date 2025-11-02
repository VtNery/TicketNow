document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', () => {
  fetch('/logout')
    .then(response => response.text())
      // Redirecionar para página de login, por exemplo:
      window.location.href = '/login';
    })
});

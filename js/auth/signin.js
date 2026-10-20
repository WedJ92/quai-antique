// Implémenter le JS de la page de connexion

const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    // Ici, il faudra appeler l'API pour vérifier les identifiants en BDD

    if (mailInput.value === "test@mail.com" && passwordInput.value === "123") {
        // Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);

        // Placer le rôle en cookie (valable 7 jours)
        setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/");
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}
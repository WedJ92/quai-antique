// Implémenter le JS de la page de connexion

const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("formulaireConnexion");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    const dataForm = new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": dataForm.get("Email"),
        "password": dataForm.get("Password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "login", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }
            return response.json();
        })
        .then(result => {
            setToken(result.apiToken);

            // Traduire le rôle de l'API (ROLE_ADMIN / ROLE_USER) en rôle du front (admin / client)
            const role = result.roles.includes("ROLE_ADMIN") ? "admin" : "client";
            setCookie(RoleCookieName, role, 7);

            window.location.replace("/");
        })
        .catch(error => {
            console.error("Erreur lors de la connexion", error);
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        });
}
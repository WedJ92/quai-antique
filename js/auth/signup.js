// Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput",);
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("input", validateForm);
inputPreNom.addEventListener("input", validateForm);
inputMail.addEventListener("input", validateForm);
inputPassword.addEventListener("input", validateForm);
inputValidationPassword.addEventListener("input", validateForm);
btnValidation.addEventListener("click", inscrireUtilisateur);

// Fonction permettant de valider tout le formulaire
function validateForm() {

    validateRequired(inputNom);
    validateRequired(inputPreNom);
    validateMail(inputMail);
    validatePassword(inputPassword);
    validateConfirmationPassword(inputPassword, inputValidationPassword);
}


// Vérifie qu'un champ n'est pas vide (les espaces seuls ne comptent pas)
function validateRequired(input) {
    if (input.value.trim() !== "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Vérifie que l'email a la forme texte@texte.texte
function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    const mailUser = input.value.trim();
    if (emailRegex.test(mailUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordRegex.test(passwordUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Vérifie que la confirmation est identique au mot de passe
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputConfirmPwd.value !== "" && inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.remove("is-valid");
        inputConfirmPwd.classList.add("is-invalid");
        return false;
    }
}

// Envoie l'inscription à l'API
function inscrireUtilisateur() {
    const myHeaders = new Headers();
    const dataForm = new FormData(formInscription);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstName": dataForm.get("Prenom"),
        "lastName": dataForm.get("Nom"),
        "email": dataForm.get("Email"),
        "password": dataForm.get("Password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

        fetch(apiUrl + "registration", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }
            return response.json();
        })
        .then(() => {
            alert("Bravo " + inputPreNom.value.trim()+ ", vous êtes maintenant inscrit, vous pouvez vous connecter.");
            document.location.href = "/signin";
        })
        .catch(error => {
            console.error("Erreur lors de l'inscription", error);
            alert("Erreur lors de l'inscription. Cet email est peut-être déjà utilisé.");
        });
}

/* 
Déclaration des variables 
*/
let myNav = document.querySelectorAll('nav a');
let myForm = document.querySelector('form');

console.log(myNav);
console.log(myForm);
// 

/* 
Création d'une fonction fetch  
*/
const fetchHtmlData = (page = 'contacts') => {
    fetch(`./content/${page}.html`)
        // 1er callback : analyse et traitement du fetch
        .then(rawReponse => {
            //Renvoyer la réponse au format texte 
            return rawReponse.text()
        })
        // 2e callback : manipuler les données 
        .then(textResponse => {
            // Ajouter le contenu dans le DOM
            document.querySelector('main').innerHTML = textResponse

            // Envoyer le nom de la page dan le dernier then 
            return page
        })
        .then(page => {
            // / Verifier le nom de la page active 
            if (page === 'contacts') submitForm()
        })
        // Capter les erreurs 
        .catch(error => {
            console.error(error)
        });
}
// 


/* 
Gestion du formulaire 
*/
const submitForm = () => {
    let myForm = document.querySelector('form');


    // Validation du formulaire
    let msgSubject = document.querySelector('[name="sujet"]');
    let msgEmail = document.querySelector('[name="email"]');
    let msgMessage = document.querySelector('[name="message"]');

    let messageList = document.querySelector('form + ul');

    myForm.addEventListener('submit', (event) => {
        // Bloquer le comportement naturel de la balise
        let formError = 0;
        event.preventDefault();


        // Le sujet est valide SI il contient au minimum 2 caractères 
        if (msgSubject.value.length < 1) {
            // incrémenter de 1 formError
            formError++
            // Ajouter la class formError sur msgSubject
            msgSubject.classList.add('formError')
        }

        if (msgEmail.value.length < 4) {
            // incrémenter de 1 formError
            formError++
            // Ajouter la class formError sur msgEmail
            msgEmail.classList.add('formError')
        }

        if (msgMessage.value.length < 4) {
            // incrémenter de 1 formError
            formError++
            // Ajouter la class formError sur msgMessage
            msgMessage.classList.add('formError')
        }



        if (formError === 0) {
            console.log('Le formulaire est validé !');

            // Afficher le message dans la liste 
            messageList.innerHTML += `
            <li>
                <h3>${msgSubject.value} <b>${msgEmail.value}</b></h3>
                <p>${msgMessage.value}</p>
            </li>
            
            `
            // Vider le formulaire
            msgSubject.value =''; 
            msgMessage.value =''; 
            msgEmail.value =''; 
        }

    })

    // Supprimer message d'erreur au Focus 
    msgSubject.addEventListener('focus', () => {
        msgSubject.classList.remove('formError');
    });

    // Supprimer message d'erreur au Focus 
    msgEmail.addEventListener('focus', () => {
        msgEmail.classList.remove('formError');
    });

    // Supprimer message d'erreur au Focus 
    msgMessage.addEventListener('focus', () => {
        msgMessage.classList.remove('formError');
    });

}

/* 
Activer la navigation
*/
// Faire une boucle sur myNav (collection de liens)
for (let item of myNav) {
    // item => lien de la nav
    console.log(item);

    // capter le clic sur le lien   
    item.addEventListener('click', (event) => {
        // Event permet de bloquer le comportement naturel de la balise
        event.preventDefault(); // la balise <a> ne cherche plus a redirigé vers le liens situé dans la href

        // Récuperer la valeur de l'attribut link-data
        const pageName = item.getAttribute('link-data');

        // Ajouter le contenu dans le DOM
        fetchHtmlData(pageName);

    });
};

/* Charger contenu de la page d'accueil */
fetchHtmlData();
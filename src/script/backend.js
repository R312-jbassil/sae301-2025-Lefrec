import Pocketbase from "pocketbase";
const pb = new Pocketbase('https://tavue.pb.paolo-vincent.fr:443');

//_Fonctions d'authentification_________________________________

//création de compte + connexion
export async function createUser(data) {
    try {
        await pb.collection("users").create({
            Prenom: data.prenom,
            Nom: data.nom,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        });
        await pb.collection("users").authWithPassword(data.email, data.password);
        location.href = "/";
        return "Ton compte a bien été créé";
    } catch (error) {
        console.error(error);
        return "Ton compte n'a pas pu être créé";
    }
}

//connexion
export async function authUser(email, password) {
    try {
        await pb.collection("users").authWithPassword(
            email,
            password
        );
        location.href = "/";
        return;
    } catch (error) {
        console.error(error);
        return "Nous n'avons pas réussi à te connecter"
    }
}

//Vérifie si l'utilisateur est connecté et renvoie ces infos si oui
export async function getAuth() {
    try {
        if (pb.authStore.isValid) {
            console.log("Connected");
            console.log(pb.authStore.record);
            return pb.authStore.record;
        } else {
            console.log("Not Connected");
            return;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

//Déconnect l'utilisateur
export async function logOut() {
    pb.authStore.clear();
    location.href = location.href;
}

export async function googleAuth() {
    try {
      await pb.collection("users").authWithOAuth2({ provider: "google" });
      location.href = "/";
    } catch (error) {
      console.error(error);
      return "Échec de connexion Google";
    }
}

//_Fonctions spécifiques au site_____________________________

//récupère la liste TeinteVerre
export async function getTeinteVerre() {
    try {
        const TeinteVerre = await pb.collection("TeinteVerre").getFullList();
        return TeinteVerre;
    } catch (error) {
        console.error(error);
    }
}
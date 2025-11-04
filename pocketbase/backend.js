import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090');

export async function getTeinteVerre() {
    try {
        const TeinteVerre = await pb.collection("TeinteVerre").getFullList();
        return TeinteVerre;
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(data) {
    try {
        await pb.collection("users").create({
            Prenom : data.prenom,
            Nom : data.nom,
            email : data.email,
            password : data.password,
            passwordConfirm : data.passwordConfirm,
        });
        return "Ton compte a bien été créé"
    } catch (error) {
        console.error(error);
        return "Ton compte n'a pas pu être créé"
    }
}

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
    }
}
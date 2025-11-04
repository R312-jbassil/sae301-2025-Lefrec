import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090');

export async function getTeinteVerre() {
    try {
        const TeinteVerre = await pb.collection("TeinteVerre").getFullList();
        return TeinteVerre;
    } catch (error) {
        return error;
    }
}
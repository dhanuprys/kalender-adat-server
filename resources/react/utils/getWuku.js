import weeksBetween from "./weeksBetween";

export const wukuNames= [
    "Sinta", "Landep", "Ukir", "Kulantir", "Tolu", "Gumbreg", "Wariga",
    "Warigadean", "Julungwangi", "Sungsang", "Dungulan", "Kuningan",
    "Langkir", "Medangsia", "Pujut", "Pahang", "Krulut", "Merakih",
    "Tambir", "Medangkungan", "Matal", "Uye", "Menail", "Prangbakat",
    "Bala", "Ugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
];

// Tanggal pertama dimulainya wuku Sinta
const referenceDate = new Date(2023, 12, 19);

function getWuku(current) {
    // Menghitung jarak tanggal pada parameter dengan referensi
    const betweenWeek = weeksBetween(
        referenceDate,
        current);

    // Membagi dan kalkulasi untuk mencari index wuku
    const resetDate = Math.floor(betweenWeek / 30);

    const preDate = resetDate * 30;
    // 32 - 30 = 2 => Ukir
    const wukuIndex = betweenWeek - preDate;

    return wukuNames[wukuIndex];
}

export default getWuku;

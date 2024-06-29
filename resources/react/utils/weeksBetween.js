// Menghitung jarak minggu antar tanggal
function weeksBetween(d1, d2) {
    return Math.round(
        (d2.getTime() - d1.getTime())
        / (7 * 24 * 60 * 60 * 1000)
    );
}

export default weeksBetween;

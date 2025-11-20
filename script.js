const makanan = [
    { nama: "🍗 Ayam Goreng", kalori: 260 },
    { nama: "🥚 Telur Rebus", kalori: 78 },
    { nama: "🍚 Nasi Putih", kalori: 204 },
    { nama: "🍜 Mie Goreng", kalori: 320 },
    { nama: "🥦 Brokoli", kalori: 55 },
    { nama: "🍅 Tomat", kalori: 22 },
    { nama: "🧀 Keju", kalori: 113 },
    { nama: "🍞 Roti", kalori: 75 },
    { nama: "🥩 Daging Sapi", kalori: 250 },
    { nama: "🍌 Pisang", kalori: 89 },
    { nama: "🍪 Biskuit", kalori: 50 },
    { nama: "🥛 Susu", kalori: 150 },
    { nama: "🍟 Kentang Goreng", kalori: 312 }
];

// Render makanan ke HTML
const makananList = document.getElementById("makananList");
makanan.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "makanan-item";
    div.innerHTML = `
        <div class="icon">${item.nama.split(" ")[0]}</div>
        <div>${item.nama.replace(/^[^\s]+/, "")}</div>
        <small>${item.kalori} kcal</small>
    `;
    div.addEventListener("click", () => pilihMakanan(index));
    makananList.appendChild(div);
});

let totalKalori = 0;

// Saat makanan dipilih
function pilihMakanan(i) {
    totalKalori += makanan[i].kalori;
    alert(`${makanan[i].nama} ditambahkan! (+${makanan[i].kalori} kcal)`);
}

// Tombol hitung ditekan
document.getElementById("hitungBtn").addEventListener("click", () => {
    const target = Number(document.getElementById("targetKalori").value);
    const aktivitas = document.getElementById("aktivitas").value;
    const hasilArea = document.getElementById("hasil");

    if (!target) return alert("Isi target kalori dulu!");

    let kategori = "";
    let pesan = "";

    if (totalKalori < target - 100) {
        kategori = "Kalori Kurang ❗";
        pesan = "Bekal kamu masih kurang. Tambahkan makanan berkarbohidrat seperti nasi, roti, atau ayam.";
    } 
    else if (totalKalori > target + 100) {
        kategori = "Kalori Terlalu Banyak ⚠️";
        pesan = "Bekal kamu terlalu banyak kalori. Kurangi gorengan dan pilih makanan berprotein ringan.";
    } 
    else {
        kategori = "Kalori Pas 👍";
        pesan = "Bekal kamu seimbang! Bagus untuk menjalani aktivitas harian.";
    }

    // Saran aktivitas
    let saranAktivitas = "";
    if (aktivitas === "ringan")
        saranAktivitas = "Aktivitasmu ringan, jadi kebutuhan kalorimu tidak terlalu banyak.";
    else if (aktivitas === "sedang")
        saranAktivitas = "Aktivitas sedang membutuhkan kalori yang cukup dan seimbang.";
    else
        saranAktivitas = "Aktivitas berat memerlukan kalori lebih! Pastikan makan cukup protein dan karbohidrat.";

    // Output HTML
    hasilArea.innerHTML = `
        <h3>Total Kalori: ${totalKalori} kcal</h3>
        <p><strong>${kategori}</strong></p>
        <p>${pesan}</p>
        <div class="saran">
            <strong>Saran berdasarkan aktivitas:</strong><br>${saranAktivitas}
        </div>
    `;
});

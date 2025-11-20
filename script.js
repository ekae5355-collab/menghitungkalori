// ====== DATA MAKANAN ======
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

const makananList = document.getElementById("makananList");
const totalDisplay = document.getElementById("totalKalori");
let totalKalori = 0;
let selectedItems = new Set(); // untuk track makanan yang dipilih

// ====== RENDER MAKANAN KE HTML ======
makanan.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "makanan-item";
    div.innerHTML = `
        <div class="icon">${item.nama.split(" ")[0]}</div>
        <div>${item.nama.replace(/^[^\s]+/, "")}</div>
        <small>${item.kalori} kcal</small>
    `;

    // klik makanan → toggle pilih/unselect
    div.addEventListener("click", () => {
        if (selectedItems.has(index)) {
            selectedItems.delete(index);
            totalKalori -= item.kalori;
            div.classList.remove("selected");
        } else {
            selectedItems.add(index);
            totalKalori += item.kalori;
            div.classList.add("selected");
        }
        // update total kalori realtime
        totalDisplay.textContent = `Total Kalori: ${totalKalori} kcal`;
    });

    makananList.appendChild(div);
});

// ====== TOMBOL HITUNG ======
document.getElementById("hitungBtn").addEventListener("click", () => {
    const target = Number(document.getElementById("targetKalori").value);
    const aktivitas = document.getElementById("aktivitas").value;
    const hasilArea = document.getElementById("hasil");

    if (!target) return alert("Isi target kalori dulu!");

    // kategori kalori
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

    // saran aktivitas
    let saranAktivitas = "";
    if (aktivitas === "ringan") {
        saranAktivitas = 
            "🌼 Aktivitasmu hari ini <b>ringan</b>. Tubuh tidak butuh terlalu banyak kalori.<br><br>" +
            "➤ Rekomendasi aktivitas:<br>" +
            "• 🚶‍♀️ Jalan santai 10–15 menit<br>" +
            "• 🧘‍♀️ Stretching ringan<br>" +
            "• 💧 Banyak minum air putih<br>";
    }
    else if (aktivitas === "sedang") {
        saranAktivitas = 
            "🌸 Aktivitas sedang, kalori cukup seimbang.<br><br>" +
            "➤ Rekomendasi aktivitas:<br>" +
            "• 🚴‍♂️ Bersepeda ringan 20–30 menit<br>" +
            "• 🤸‍♀️ Senam ringan<br>" +
            "• 🍎 Makan buah untuk energi tambahan<br>";
    }
    else {
        saranAktivitas = 
            "🔥 Aktivitas berat, butuh energi ekstra.<br><br>" +
            "➤ Rekomendasi aktivitas:<br>" +
            "• 🏃‍♂️ Olahraga intens 30 menit<br>" +
            "• 💪 Latihan kekuatan<br>" +
            "• 🍗 Makan protein cukup<br>";
    }

    // output final
    hasilArea.innerHTML = `
        <h3>Total Kalori: ${totalKalori} kcal</h3>
        <p><strong>${kategori}</strong></p>
        <p>${pesan}</p>
        <div class="saran">
            <strong>Saran berdasarkan aktivitas:</strong><br>${saranAktivitas}
        </div>
    `;
});

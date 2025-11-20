// ==== Suara Klik ====
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.5;

// =========================
// DATA MAKANAN
// =========================
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
let totalKalori = 0;
let selectedItems = new Set();
function updateTotalDisplay() {
    const totalDisplay = document.getElementById("totalKalori");
    if (totalDisplay) {
        totalDisplay.textContent = `Total Kalori: ${totalKalori} kcal`;
    }
}


// =========================
// RENDER ITEM MAKANAN KE HTML
// =========================
makanan.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "makanan-item";

    div.innerHTML = `
        <div class="icon" style="font-size:32px">${item.nama.split(" ")[0]}</div>
        <div style="margin-top:5px">${item.nama.replace(/^[^\s]+/, "")}</div>
        <small>${item.kalori} kcal</small>
    `;

    div.addEventListener("click", () => {
        // === Efek suara ===
    clickSound.currentTime = 0;
    clickSound.play();

    // === Animasi pop ===
    div.classList.add("pop");
    setTimeout(() => div.classList.remove("pop"), 200);
        
        if (selectedItems.has(index)) {
            selectedItems.delete(index);
            totalKalori -= item.kalori;
            div.classList.remove("selected");
        } else {
            selectedItems.add(index);
            totalKalori += item.kalori;
            div.classList.add("selected");
        }

        updateTotalDisplay();
    });

    makananList.appendChild(div);
});


// =========================
// UPDATE TOTAL KALORI REALTIME
// =========================
function updateTotalDisplay() {
    const hasilBox = document.getElementById("hasil");
    hasilBox.innerHTML = `
        <h3>Total Kalori Sementara: ${totalKalori} kcal</h3>
    `;

    updateProgress();
}


// =========================
// PROGRESS BAR
// =========================
function updateProgress() {
    const target = Number(document.getElementById("targetKalori").value);
    const fill = document.getElementById("progressFill");

    if (!target) {
        fill.style.width = "0%";
        return;
    }

    let persen = (totalKalori / target) * 100;
    if (persen > 100) persen = 100;

    fill.style.width = persen + "%";
}


// =========================
// TOMBOL HITUNG
// =========================
document.getElementById("hitungBtn").addEventListener("click", () => {
    const target = Number(document.getElementById("targetKalori").value);
    const kondisi = document.getElementById("aktivitas").value;
    const hasilArea = document.getElementById("hasil");

    if (!target) return alert("Isi target kalori dulu!");

    // Penilaian
    let kategori = "";
    let pesan = "";

    if (totalKalori < target - 100) {
        kategori = "Kalori Kurang ❗";
        pesan = "Bekal kamu masih kurang nih. Tambahin makanan seperti nasi, roti, atau ayam biar kuat seharian 💪";
    } 
    else if (totalKalori > target + 100) {
        kategori = "Kalori Kebanyakan ⚠️";
        pesan = "Kalorinya agak berlebih… Kurangi gorengan atau pilih makanan lebih ringan 😊";
    } 
    else {
        kategori = "Kalori Pas 👍";
        pesan = "Bekal kamu udah pas dan seimbang! Mantap buat menjalani hari ✨";
    }

    // Saran berdasarkan keadaan hari ini
    let saranAktivitas = "";

    if (kondisi === "ringan") {
        saranAktivitas = `
            Hari kamu kelihatannya santai 😌<br>
            Rekomendasi ringan:<br>
            • Jalan pelan 10 menit<br>
            • Stretching<br>
            • Minum air putih cukup 💧
        `;
    }
    else if (kondisi === "sedang") {
        saranAktivitas = `
            Hari ini cukup aktif ✨<br>
            Rekomendasi:<br>
            • Senam ringan<br>
            • Bersepeda ringan<br>
            • Makan buah untuk tenaga 🍎
        `;
    }
    else {
        saranAktivitas = `
            Wah, hari kamu berat ya 🔥<br>
            Rekomendasi aktivitas:<br>
            • Olahraga 20–30 menit<br>
            • Latihan kekuatan<br>
            • Asupan protein cukup 🍗
        `;
    }

    // Output ke layar
    hasilArea.innerHTML = `
        <h3>Total Kalori: ${totalKalori} kcal</h3>
        <p><strong>${kategori}</strong></p>
        <p>${pesan}</p>

        <div class="progress">
            <div id="progressFill"></div>
        </div>

        <div class="saran" style="margin-top:10px">
            <strong>Saran berdasarkan keadaan hari ini:</strong><br>
            ${saranAktivitas}
        </div>
    `;
});

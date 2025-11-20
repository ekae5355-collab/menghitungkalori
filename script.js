// =============================
// SUARA KLIK
// =============================
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.5;


// =============================
// DATA MAKANAN
// =============================
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


// =============================
// UPDATE TOTAL KALORI DI PANEL MAKANAN
// =============================
function updateTotalDisplay() {
    const totalDisplay = document.getElementById("totalKalori");
    if (totalDisplay) {
        totalDisplay.textContent = `Total Kalori: ${totalKalori} kcal`;
    }
}


// =============================
// RENDER MAKANAN + KLIK
// =============================
makanan.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "makanan-item";

    div.innerHTML = `
        <div class="icon" style="font-size:32px">${item.nama.split(" ")[0]}</div>
        <div style="margin-top:5px">${item.nama.replace(/^[^\s]+/, "")}</div>
        <small>${item.kalori} kcal</small>
    `;

    div.addEventListener("click", () => {

        // Suara klik
        clickSound.currentTime = 0;
        clickSound.play();

        // Animasi pop
        div.classList.add("pop");
        setTimeout(() => div.classList.remove("pop"), 200);

        // Tambah / Hapus Pilihan
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
        updateHasilDisplay(); // ⬅ ditambahkan supaya realtime
    });

    makananList.appendChild(div);
});


// =============================
// UPDATE PROGRESS BAR
// =============================
function updateProgress() {
    const target = Number(document.getElementById("targetKalori").value);
    const fill = document.getElementById("progressFill");

    if (!fill) return;

    if (!target) {
        fill.style.width = "0%";
        return;
    }

    let persen = (totalKalori / target) * 100;
    if (persen > 100) persen = 100;

    fill.style.width = persen + "%";
}


// =============================
// UPDATE TOTAL KALORI DI PANEL HASIL
// =============================
function updateHasilDisplay() {
    const hasilBox = document.getElementById("hasil");

    hasilBox.innerHTML = `
        <h3>Total Kalori Sementara: ${totalKalori} kcal</h3>
    `;

    updateProgress();
}



// =============================
// TOMBOL HITUNG
// =============================
document.getElementById("hitungBtn").addEventListener("click", () => {
    const target = Number(document.getElementById("targetKalori").value);
    const kondisi = document.getElementById("aktivitas").value;
    const hasilArea = document.getElementById("hasil");

    if (!target) return alert("Isi target kalori dulu!");

    let kategori = "";
    let pesan = "";

    if (totalKalori < target - 100) {
        kategori = "Kalori Kurang ❗";
        pesan = "Bekal kamu masih kurang. Tambahkan makanan seperti nasi, roti, atau ayam.";
    } 
    else if (totalKalori > target + 100) {
        kategori = "Kalori Berlebih ⚠️";
        pesan = "Kalorinya agak berlebih... Kurangi gorengan atau pilih makanan lebih ringan.";
    } 
    else {
        kategori = "Kalori Pas 👍";
        pesan = "Bekal kamu seimbang! Mantap untuk menjalani hari.";
    }

    // Saran berdasarkan kondisi
    let saranAktivitas = "";
    if (kondisi === "ringan") {
        saranAktivitas = `
            Kamu terlihat santai hari ini 😌<br>
            • Jalan pelan 10 menit<br>
            • Stretching ringan<br>
            • Banyak minum air 💧
        `;
    } 
    else if (kondisi === "sedang") {
        saranAktivitas = `
            Kamu cukup aktif ✨<br>
            • Senam ringan<br>
            • Bersepeda ringan<br>
            • Buah untuk energi 🍎
        `;
    } 
    else {
        saranAktivitas = `
            Hari kamu cukup berat 🔥<br>
            • Olahraga 20–30 menit<br>
            • Latihan kekuatan<br>
            • Protein cukup 🍗
        `;
    }

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

    updateProgress();
});

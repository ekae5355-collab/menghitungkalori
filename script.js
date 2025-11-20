// Daftar makanan dan kalorinya (per porsi)
const makananList = {
  "Tempe": 150,
  "Ayam": 250,
  "Sayur": 80,
  "Susu": 120
};

// Saran gizi berdasarkan makanan yang dipilih
const giziSaran = {
  "Tempe": "Tempe kaya protein nabati dan serat. Cocok untuk energi stabil dan pencernaan sehat.",
  "Ayam": "Ayam adalah sumber protein hewani yang bagus untuk pembentukan otot.",
  "Sayur": "Sayur membantu memenuhi kebutuhan serat, vitamin, dan menjaga metabolisme.",
  "Susu": "Susu memberikan kalsium dan energi tambahan untuk aktivitas harian."
};

function hitungKalori() {
  const menu = document.getElementById('menu').value;
  const hasil = document.getElementById('hasil');

  if (!menu || !makananList[menu]) {
    hasil.innerHTML = "Pilih makanan yang valid dari daftar.";
    return;
  }

  const kalori = makananList[menu];
  let rekomendasi = "";

  if (kalori > 300) {
    rekomendasi = `Kalori makanan ini cukup tinggi.<br><br>Saran aktivitas: <br>• Jalan cepat 15 menit <br>• Kurangi tambahan karbohidrat berlebih.`;
  } else if (kalori < 100) {
    rekomendasi = `Kalori makanan ini cukup rendah.<br><br>Saran tambahan: <br>• Tambahkan lauk lain agar kebutuhan energi tercukupi.`;
  } else {
    rekomendasi = `Kalori makanan ini cukup seimbang untuk bekal harian Anda.`;
  }

  hasil.innerHTML = `
    <strong>Makanan:</strong> ${menu}<br>
    <strong>Kalori:</strong> ${kalori} kcal<br><br>
    <strong>Saran Gizi:</strong> ${giziSaran[menu]}<br><br>
    <strong>Rekomendasi:</strong><br>${rekomendasi}
  `;
}

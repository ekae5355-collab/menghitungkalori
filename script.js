// Data makanan: kalori (per porsi) + kategori gizi + ikon lucu
const makananList = {
  "Tempe": { kcal: 150, kategori: ['Protein Nabati','Serat'], icon: "🍱" },
  "Ayam": { kcal: 250, kategori: ['Protein Hewani'], icon: "🍗" },
  "Sayur": { kcal: 80, kategori: ['Serat','Vitamin'], icon: "🥦" },
  "Susu": { kcal: 120, kategori: ['Kalsium','Protein'], icon: "🥛" },
  "Telur": { kcal: 90, kategori: ['Protein'], icon: "🥚" },
  "Nasi": { kcal: 200, kategori: ['Karbohidrat'], icon: "🍚" },
  "Ikan": { kcal: 180, kategori: ['Protein','Omega-3'], icon: "🐟" },
  "Buah": { kcal: 70, kategori: ['Vitamin','Serat'], icon: "🍎" }
};

// Generate checkbox makanan + ikon lucu
function renderMakananList() {
  makananContainer.innerHTML = '';
  Object.keys(makananList).forEach(nama => {
    const info = makananList[nama];
    const wrap = document.createElement('label');
    wrap.className = 'makanan-item';
    wrap.innerHTML = `
      <span class="icon">${info.icon}</span>
      <input type="checkbox" value="${nama}" />
      <span>${nama} — ${info.kcal} kcal</span>
    `;
    makananContainer.appendChild(wrap);
  });
}

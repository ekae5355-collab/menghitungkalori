// Data makanan: kalori (per porsi) + kategori gizi
if (!selected.includes('Telur')) rekomendasiMenu += 'Telur, ';
if (!selected.includes('Nasi')) rekomendasiMenu += 'Nasi, ';
rekomendasiMenu = rekomendasiMenu.replace(/, $/, '');
} else if (target && total > target + 100) {
rekomendasiMenu = 'Kurangi porsi Nasi atau makanan berlemak; tambahkan sayur.';
} else {
rekomendasiMenu = 'Menu sudah cukup seimbang.';
}


hasilEl.innerHTML = `
<div class="result-block">
<strong>Detail:</strong> ${detail.join(' • ')}<br>
<strong>Total Kalori:</strong> ${total} kcal<br>
${analisis}<br><br>
<strong>Saran Gizi:</strong><br>${saranGizi}<br><br>
<strong>Rekomendasi Menu:</strong> ${rekomendasiMenu}<br><br>
<strong>Saran Aktivitas:</strong><br>${aktivitas}
</div>
`;


updateChartWithToday(total);
}


// Chart & Riwayat (localStorage)
function saveToday() {
const selected = getSelectedMakanan();
if (selected.length === 0) return alert('Pilih makanan dulu.');
const total = selected.reduce((s,n)=> s + makananList[n].kcal, 0);
const today = new Date().toISOString().slice(0,10);
const store = JSON.parse(localStorage.getItem('bekal_history') || '[]');
store.push({ date: today, kcal: total, items: selected });
// simpan maksimal 30 hari untuk sederhana
const trimmed = store.slice(-30);
localStorage.setItem('bekal_history', JSON.stringify(trimmed));
renderHistory();
alert('Tersimpan ke riwayat.');
}


function renderHistory(){
const store = JSON.parse(localStorage.getItem('bekal_history') || '[]');
historyEl.innerHTML = '';
store.slice().reverse().forEach(item => {
const li = document.createElement('li');
li.innerHTML = `${item.date} — ${item.kcal} kcal <br><small>${item.items.join(', ')}</small>`;
historyEl.appendChild(li);
});
updateChartFromStore();
}


function clearHistory(){
if (!confirm('Hapus semua riwayat?')) return;
localStorage.removeItem('bekal_history');
renderHistory();
}


// Chart helpers
function updateChartFromStore(){
const store = JSON.parse(localStorage.getItem('bekal_history') || '[]');
const last7 = store.slice(-7);
const labels = last7.map(s => s.date);
const data = last7.map(s => s.kcal);
renderChart(labels,data);
}


function updateChartWithToday(kcal){
const store = JSON.parse(localStorage.getItem('bekal_history') || '[]');
const today = new Date().toISOString().slice(0,10);
const last6 = store.slice(-6);
const last7k = last6.map(s=>s.kcal).concat([kcal]);
const lab

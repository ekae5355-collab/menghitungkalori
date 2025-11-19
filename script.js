let totalKalori = 0;

const makananSelect = document.getElementById("makanan");
const gramInput = document.getElementById("gram");
const daftarKalori = document.getElementById("daftarKalori");
const totalKaloriText = document.getElementById("totalKalori");
const tambahBtn = document.getElementById("tambahBtn");
const resetBtn = document.getElementById("resetBtn");

tambahBtn.addEventListener("click", () => {
    const kaloriPer100 = parseFloat(makananSelect.value);
    const gram = parseFloat(gramInput.value);

    if (isNaN(kaloriPer100) || isNaN(gram)) {
        alert("Pilih makanan dan masukkan jumlah gram!");
        return;
    }

    const kalori = (kaloriPer100 / 100) * gram;
    totalKalori += kalori;

    const listItem = document.createElement("li");
    listItem.textContent = `${makananSelect.options[makananSelect.selectedIndex].text} - ${gram}g = ${kalori.toFixed(2)} kcal`;
    daftarKalori.appendChild(listItem);

    totalKaloriText.textContent = `Total Kalori: ${totalKalori.toFixed(2)} kcal`;

    gramInput.value = "";
    makananSelect.value = "";
});

resetBtn.addEventListener("click", () => {
    totalKalori = 0;
    daftarKalori.innerHTML = "";
    totalKaloriText.textContent = "Total Kalori: 0 kcal";
});

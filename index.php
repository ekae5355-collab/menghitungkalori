<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kalkulator Kalori Bekal</title>

    <!-- ICON -->
    <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" type="image/x-icon">

    <!-- FONT -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- STYLE -->
    <link rel="stylesheet" href="style.css" />
</head>
<body>

    <!-- Main Container -->
    <div class="container">

        <!-- Header -->
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/706/706164.png" alt="lunchbox" class="icon">
            <h1>🍱 Kalkulator Kalori Bekal</h1>
            <p class="subtitle">Hitung total kalori bekal harianmu dengan cepat & mudah</p>
        </div>

        <!-- Form Input -->
        <div class="form">
            <div class="input-group">
                <label for="makanan">Pilih Makanan</label>
                <select id="makanan">
                    <option value="">-- pilih makanan --</option>
                    <option value="175">Nasi Putih (175 kcal / 100g)</option>
                    <option value="260">Ayam Goreng (260 kcal / 100g)</option>
                    <option value="155">Telur Rebus (155 kcal / 100g)</option>
                    <option value="193">Tempe Goreng (193 kcal / 100g)</option>
                    <option value="78">Tahu Goreng (78 kcal / 100g)</option>
                    <option value="40">Sayur Tumis (40 kcal / 100g)</option>
                    <option value="240">Ikan Goreng (240 kcal / 100g)</option>
                    <option value="209">Mie Goreng (209 kcal / 100g)</option>
                    <option value="250">Roti Tawar (250 kcal / 100g)</option>
                </select>
            </div>

            <div class="input-group">
                <label for="gram">Berapa gram?</label>
                <input type="number" id="gram" placeholder="misal: 100" />
            </div>

            <button id="tambahBtn" class="add-btn">+ Tambah ke daftar</button>
        </div>

        <!-- Daftar -->
        <h2 class="section-title">📋 Daftar Bekal</h2>
        <ul id="daftarKalori" class="list"></ul>

        <!-- Total -->
        <h2 id="totalKalori" class="total">Total Kalori: 0 kcal</h2>

        <button id="resetBtn" class="reset-btn">Reset</button>
    </div>

    <!-- Script -->
    <script src="script.js"></script>

</body>
</html>

document.getElementById("convertBtn").addEventListener("click", function () {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            document.getElementById("result").textContent =
                `${amount} ${from} = ${rate} ${to}`;
        })
        .catch(() => {
            document.getElementById("result").textContent =
                "Bir hata oluştu, lütfen tekrar deneyin.";
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.getElementById("from").value;
    loadRates(fromCurrency);

    document.getElementById("from").addEventListener("change", function () {
        loadRates(this.value);
    });
});

function loadRates(from) {
    document.getElementById("rateHeader").textContent = `1 ${from} Karşılığı`;

    const url = `https://api.frankfurter.app/latest?from=${from}&to=TRY,USD,EUR,GBP`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#rateTable tbody");
            tbody.innerHTML = "";

            // Para birimi - ülke kodu eşleşmeleri
            const flags = {
                "TRY": "tr",
                "USD": "us",
                "EUR": "eu",
                "GBP": "gb"
            };

            for (let currency in data.rates) {
                const row = document.createElement("tr");

                // Para birimi hücresi
                const cell1 = document.createElement("td");
                const img = document.createElement("img");
                img.src = `https://flagcdn.com/24x18/${flags[currency]}.png`; // Bayrak resmi
                img.alt = currency;
                img.style.marginRight = "8px"; // Yazıyla arasına boşluk
                img.style.verticalAlign = "middle"; // Dikey ortalama

                cell1.appendChild(img); // Bayrağı ekle
                cell1.appendChild(document.createTextNode(currency)); // Kodunu ekle

                // Değer hücresi
                const cell2 = document.createElement("td");
                cell2.textContent = data.rates[currency];

                // Satırı tabloya ekle
                row.appendChild(cell1);
                row.appendChild(cell2);
                tbody.appendChild(row);
            }
        })
        .catch(() => {
            alert("Kurlar yüklenemedi, lütfen internetinizi kontrol edin.");
        });
}

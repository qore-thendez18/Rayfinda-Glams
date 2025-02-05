const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'templates', 'product_detail_template.html');
const dataPath = path.join(__dirname, 'data', 'products.json');
const outputDir = path.join(__dirname, 'pages');

// Baca template HTML
const template = fs.readFileSync(templatePath, 'utf8');

// Baca data produk
const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Buat direktori output jika belum ada
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Fungsi untuk mengganti placeholder dengan data produk
function replacePlaceholders(template, product, category) {
    return template
        .replace(/{{productName}}/g, product.name)
        .replace(/{{imagePath}}/g, product.image)
        .replace(/{{originalPrice}}/g, product.originalPrice)
        .replace(/{{discountedPrice}}/g, product.discountedPrice)
        .replace(/{{itemNumber}}/g, product.itemNumber)
        .replace(/{{category}}/g, category);
}

// Loop melalui setiap kategori dan produk
for (const category in productsData) {
    const products = productsData[category];
    for (const product of products) {
        const outputPath = path.join(outputDir, `${category}`, `${product.name.toLowerCase().replace(/ /g, '_')}.html`);
        const outputDirPath = path.dirname(outputPath);

        // Buat direktori kategori jika belum ada
        if (!fs.existsSync(outputDirPath)) {
            fs.mkdirSync(outputDirPath, { recursive: true });
        }

        // Ganti placeholder dengan data produk
        const outputContent = replacePlaceholders(template, product, category);

        // Tulis halaman produk ke file
        fs.writeFileSync(outputPath, outputContent);
        console.log(`Generated: ${outputPath}`);
    }
}

import { db } from './index';
import { productsTable } from './schema';
import { toCents } from '../utils/price';

async function seed() {
  try {
    const products = [
      {
        name: "MacBook Pro M3",
        description: "Dernier MacBook Pro avec puce M3",
        price: toCents(1999.99),
        stock: 50,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290"
      },
      {
        name: "iPhone 15 Pro",
        description: "iPhone 15 Pro avec Dynamic Island",
        price: toCents(1199.99),
        stock: 75,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-black-titanium-select?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1692875661780"
      },
      {
        name: "iPad Air",
        description: "iPad Air avec puce M1",
        price: toCents(699.99),
        stock: 30,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688"
      },
      {
        name: "Sony WH-1000XM5",
        description: "Casque sans fil à réduction de bruit",
        price: toCents(399.99),
        stock: 25
      },
      {
        name: "Samsung Galaxy S23",
        description: "Smartphone haut de gamme Samsung",
        price: toCents(899.99),
        stock: 40
      },
      {
        name: "Nintendo Switch OLED",
        description: "Console de jeux portable avec écran OLED",
        price: toCents(349.99),
        stock: 35
      },
      // Informatique
      {
        name: "Logitech MX Master 3S",
        description: "Souris sans fil professionnelle",
        price: toCents(99.99),
        stock: 60
      },
      {
        name: "Dell XPS 15",
        description: "Ordinateur portable premium",
        price: toCents(1799.99),
        stock: 20
      },
      {
        name: "Moniteur LG 27GP850",
        description: "Moniteur gaming 27\" QHD 165Hz",
        price: toCents(449.99),
        stock: 15
      },
      // Audio
      {
        name: "AirPods Pro 2",
        description: "Écouteurs sans fil avec réduction de bruit",
        price: toCents(279.99),
        stock: 100
      },
      {
        name: "Sonos Arc",
        description: "Barre de son premium",
        price: toCents(899.99),
        stock: 10
      },
      {
        name: "JBL Flip 6",
        description: "Enceinte bluetooth portable",
        price: toCents(129.99),
        stock: 45
      },
      // Photo
      {
        name: "Canon EOS R6",
        description: "Appareil photo hybride plein format",
        price: toCents(2499.99),
        stock: 8
      },
      {
        name: "GoPro Hero 11",
        description: "Caméra d'action 5.3K",
        price: toCents(399.99),
        stock: 30
      },
      {
        name: "DJI Mini 3 Pro",
        description: "Drone compact avec caméra 4K",
        price: toCents(759.99),
        stock: 12
      },
      // Gaming
      {
        name: "PS5 Digital Edition",
        description: "Console de jeu next-gen",
        price: toCents(449.99),
        stock: 25
      },
      {
        name: "Xbox Series X",
        description: "Console de jeu 4K",
        price: toCents(499.99),
        stock: 20
      },
      {
        name: "Razer BlackShark V2 Pro",
        description: "Casque gaming sans fil",
        price: toCents(199.99),
        stock: 40
      },
      // Accessoires
      {
        name: "Apple Watch Series 9",
        description: "Montre connectée",
        price: toCents(449.99),
        stock: 55
      },
      {
        name: "Samsung Galaxy Watch 6",
        description: "Montre connectée Android",
        price: toCents(329.99),
        stock: 35
      },
      // Smart Home
      {
        name: "Philips Hue Starter Kit",
        description: "Kit d'éclairage connecté",
        price: toCents(199.99),
        stock: 25
      },
      {
        name: "Ring Video Doorbell 4",
        description: "Sonnette vidéo connectée",
        price: toCents(219.99),
        stock: 30
      },
      {
        name: "Nest Learning Thermostat",
        description: "Thermostat intelligent",
        price: toCents(249.99),
        stock: 15
      },
      // Stockage
      {
        name: "Samsung 970 EVO Plus 1TB",
        description: "SSD NVMe haute performance",
        price: toCents(119.99),
        stock: 50
      },
      {
        name: "WD Black 4TB",
        description: "Disque dur gaming",
        price: toCents(149.99),
        stock: 30
      },
      // Périphériques
      {
        name: "Keychron Q1",
        description: "Clavier mécanique custom",
        price: toCents(169.99),
        stock: 20
      },
      {
        name: "Wacom Intuos Pro",
        description: "Tablette graphique professionnelle",
        price: toCents(379.99),
        stock: 15
      },
      // Réseaux
      {
        name: "ASUS ROG Rapture GT-AX11000",
        description: "Routeur gaming WiFi 6",
        price: toCents(449.99),
        stock: 10
      },
      {
        name: "Synology DS920+",
        description: "NAS 4 baies hautes performances",
        price: toCents(549.99),
        stock: 8
      },
      // Impression
      {
        name: "Brother HL-L3270CDW",
        description: "Imprimante laser couleur",
        price: toCents(299.99),
        stock: 15
      },
      {
        name: "Epson EcoTank ET-2850",
        description: "Imprimante à réservoirs rechargeables",
        price: toCents(279.99),
        stock: 20
      },
      // Composants PC
      {
        name: "AMD Ryzen 9 7950X",
        description: "Processeur haut de gamme",
        price: toCents(699.99),
        stock: 12
      },
      {
        name: "NVIDIA RTX 4080",
        description: "Carte graphique gaming",
        price: toCents(1199.99),
        stock: 8
      },
      // Accessoires mobiles
      {
        name: "Anker PowerCore 26800",
        description: "Batterie externe haute capacité",
        price: toCents(59.99),
        stock: 100
      },
      {
        name: "Belkin MagSafe 3-en-1",
        description: "Station de charge sans fil",
        price: toCents(149.99),
        stock: 30
      },
      // Audio Pro
      {
        name: "Shure SM7B",
        description: "Microphone de studio professionnel",
        price: toCents(399.99),
        stock: 10
      },
      {
        name: "Focusrite Scarlett 2i2",
        description: "Interface audio USB",
        price: toCents(169.99),
        stock: 25
      },
      // Streaming
      {
        name: "Elgato Stream Deck MK.2",
        description: "Contrôleur pour streaming",
        price: toCents(149.99),
        stock: 20
      },
      {
        name: "Elgato Cam Link 4K",
        description: "Capture HDMI vers USB",
        price: toCents(129.99),
        stock: 15
      },
      // Sécurité
      {
        name: "Arlo Pro 4",
        description: "Caméra de sécurité sans fil",
        price: toCents(199.99),
        stock: 25
      },
      {
        name: "YubiKey 5C NFC",
        description: "Clé de sécurité USB-C",
        price: toCents(55.99),
        stock: 40
      },
      // Accessoires Bureau
      {
        name: "Herman Miller Aeron",
        description: "Chaise de bureau ergonomique",
        price: toCents(1499.99),
        stock: 5
      },
      {
        name: "Fully Jarvis",
        description: "Bureau assis-debout électrique",
        price: toCents(599.99),
        stock: 8
      },
      // Réalité Virtuelle
      {
        name: "Meta Quest 3",
        description: "Casque VR autonome",
        price: toCents(549.99),
        stock: 15
      },
      {
        name: "HP Reverb G2",
        description: "Casque VR haute résolution",
        price: toCents(599.99),
        stock: 10
      },
    ];

    console.log('🌱 Seeding products...');
    await db.insert(productsTable).values(products);
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
}

seed(); 

/* ===============================
   ULTIMATE FIX CENTRAL HANDLER
   =============================== */
function isStokKosong(produk){
  return typeof produk.stok !== 'undefined' && Number(produk.stok) === 0;
}

function tambahQtyUniversal(produk){
  if (isStokKosong(produk)) return;
  let item = keranjang.find(i=>i.id===produk.id && !i.isManual);
  if(!item){
    keranjang.push({
      id: produk.id,
      nama: produk.nama,
      harga: produk.harga,
      qty: 1,
      isManual:false
    });
  }else if(item.qty < 999){
    item.qty++;
  }
  updateKeranjang();
  displayProduk();
}
/* Full script.js with fixes:
   - added guard checks before attaching listeners to optional login buttons
   - added handler for new btn-kasir-icon (user icon beside KATALOG HARINFOOD)
   - preserved all original behavior and functions
   Replace the repository file with this content (keep filename script.js and update query string in index.html if needed).
*/

document.addEventListener('DOMContentLoaded', () => {
    // ====== FUNGSI SUARA ======
    function playSound(type) {
        if (type === 'click') {
            const audio = document.getElementById('audio-click');
            if (audio) { audio.currentTime = 0; audio.play(); }
        } else if (type === 'beep') {
            const audio = document.getElementById('audio-beep');
            if (audio) { audio.currentTime = 0; audio.play(); }
        } else if (type === 'ding') {
            const audio = document.getElementById('audio-ding');
            if (audio) { audio.currentTime = 0; audio.play(); }
        } else if (type === 'aaa') {
            const audio = document.getElementById('audio-aaa');
            if (audio) { audio.currentTime = 0; audio.play(); }
        }
    }

    // ====== BINDING SUARA TOMBOL ======
    function enableSpecialButtonSounds() {
        if (localStorage.getItem('userRole') !== 'pelanggan') return;

        // Tombol hapus keranjang (id: pelanggan-fab-clear-cart)
        const hapusBtn = document.getElementById('pelanggan-fab-clear-cart');
        if (hapusBtn && !hapusBtn._hasSound) {
            hapusBtn.addEventListener('click', () => playSound('beep'), { capture: true });
            hapusBtn._hasSound = true;
        }

        // Tombol keranjang belanjaan (id: cart-fab)
        const keranjangBtn = document.getElementById('cart-fab');
        if (keranjangBtn && !keranjangBtn._hasSound) {
            keranjangBtn.addEventListener('click', () => playSound('click'), { capture: true });
            keranjangBtn._hasSound = true;
        }

        // Tombol pesan WhatsApp (id: floating-pesan-whatsapp)
        const waBtn = document.getElementById('floating-pesan-whatsapp');
        if (waBtn && !waBtn._hasSound) {
            waBtn.addEventListener('click', () => playSound('click'), { capture: true });
            waBtn._hasSound = true;
        }

        // Tombol PESAN pada popup keranjang pelanggan (id: popup-keranjang-whatsapp)
        const popupPesanBtn = document.getElementById('popup-keranjang-whatsapp');
        if (popupPesanBtn && !popupPesanBtn._hasSound) {
            popupPesanBtn.addEventListener('click', () => playSound('aaa'), { capture: true });
            popupPesanBtn._hasSound = true;
        }
    }

    // Observer agar event suara selalu nempel pada elemen dinamis
    const observer = new MutationObserver(enableSpecialButtonSounds);
    observer.observe(document.body, { childList: true, subtree: true });
    enableSpecialButtonSounds();
    // Jalankan sekali saat awal
    enableSpecialButtonSounds();

    const loginPopup = document.getElementById('login-popup');
    const btnPelanggan = document.getElementById('btn-pelanggan');
    const btnKasir = document.getElementById('btn-kasir');
    // NEW: icon user button next to title in updated index.html
    const btnKasirIcon = document.getElementById('btn-kasir-icon');
    const formPelanggan = document.getElementById('form-pelanggan');
    const formKasir = document.getElementById('form-kasir');
    const namaPelangganLoginInput = document.getElementById('nama-pelanggan-login');
    const alamatPelangganLoginInput = document.getElementById('alamat-pelanggan-login');
    const namaKasirLoginInput = document.getElementById('nama-kasir-login');
    const passwordKasirLoginInput = document.getElementById('password-kasir-login');
    const appContainer = document.getElementById('app-container');
    const kasirFabs = document.getElementById('kasir-fabs');
    const pesanInfoLabel = document.getElementById('pesan-info-label');
    const paymentChoiceButtons = document.getElementById('payment-choice-buttons');
    const cetakStrukButton = document.getElementById('cetak-struk-button');
    const namaPemesanInput = document.getElementById('nama-pemesan');
    const alamatPemesanInput = document.getElementById('alamat-pemesan');
    const keteranganPesananInput = document.getElementById('keterangan-pesanan');
    const nominalPembayaranInput = document.getElementById('nominal-pembayaran');
    const kembalianDisplay = document.getElementById('kembalian-display');
    const produkList = document.getElementById('produk-list');
    const keranjangItems = document.getElementById('keranjang-items');
    const keranjangTotal = document.getElementById('keranjang-total');
    const manualOrderModal = document.getElementById('manualOrderModal');
    const manualProductNameInput = document.getElementById('manualProductName');
    const manualProductPriceInput = document.getElementById('manualProductPrice');
    const manualProductQtyInput = document.getElementById('manualProductQty');
    const addManualOrderFab = document.getElementById('add-manual-order-fab');
    const clearCartFab = document.getElementById('clear-cart-fab');
    const shareOrderFab = document.getElementById('share-order-fab');
    const printFab = document.getElementById('print-fab');
    const printOptionsPopup = document.getElementById('print-options-popup');
    const btnPrintTunai = document.getElementById('btn-print-tunai');
    const btnPrintQris = document.getElementById('btn-print-qris');
    const closePrintPopupBtn = document.getElementById('close-print-popup');
    const productSearchBarcodeInput = document.getElementById('product-search-barcode');
    const searchBarcodeFeedback = document.getElementById('search-barcode-feedback');
    const namaPemesanModal = document.getElementById('namaPemesanModal');
    const inputNamaPemesan = document.getElementById('inputNamaPemesan');
    const diskonSection = document.getElementById('diskon-section');
    const namaDiskonInput = document.getElementById('nama-diskon');
    const nilaiDiskonInput = document.getElementById('nilai-diskon');
    const cartFab = document.getElementById('cart-fab');
    const floatingPesanWhatsapp = document.getElementById('floating-pesan-whatsapp');
    let popupKeranjang = document.getElementById('popup-keranjang');
    let popupKeranjangNominal = document.getElementById('popup-keranjang-nominal');
    let popupKembalianDisplay = document.getElementById('popup-kembalian-display');
    let popupKeranjangTotal = document.getElementById('popup-keranjang-total');
    let popupKeranjangPrintBtn = null;
    let popupNamaPelangganInput = null;
    let popupAlamatPelangganInput = null;
    let popupWhatsAppBtn = null;
    let kembalianModal;
    let popupKembalianInformasi = null;
    let pelangganFabClearCart = null;
    // Tambahan variabel barcode popup
    let popupProductSearchBarcodeInput = null;
    let popupSearchBarcodeFeedback = null;

    function createPelangganFabClearCart() {
        if (document.getElementById('pelanggan-fab-clear-cart')) return;
        pelangganFabClearCart = document.createElement('button');
        pelangganFabClearCart.id = 'pelanggan-fab-clear-cart';
        pelangganFabClearCart.title = 'Bersihkan Keranjang';
        pelangganFabClearCart.innerHTML = '<i class="fas fa-trash"></i> <span style="font-size:0.95em;font-weight:600;margin-left:7px;letter-spacing:0.2px;">HAPUS KERANJANG</span>';
        pelangganFabClearCart.style.position = 'fixed';
        pelangganFabClearCart.style.zIndex = '10012';
        pelangganFabClearCart.style.background = 'linear-gradient(45deg, #e01212, #e01212)';
        pelangganFabClearCart.style.color = '#fff';
        pelangganFabClearCart.style.border = '1px #000000';
        pelangganFabClearCart.style.borderRadius = '28px';
        pelangganFabClearCart.style.boxShadow = '0 4px 16px rgba(255,77,77,0.22)';
        pelangganFabClearCart.style.fontSize = '1.15em';
        pelangganFabClearCart.style.fontWeight = 'bold';
        pelangganFabClearCart.style.width = 'auto';
        pelangganFabClearCart.style.height = '54px';
        pelangganFabClearCart.style.display = 'none';
        pelangganFabClearCart.style.alignItems = 'center';
        pelangganFabClearCart.style.justifyContent = 'center';
        pelangganFabClearCart.style.cursor = 'pointer';
        pelangganFabClearCart.style.transition = 'opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)';
        pelangganFabClearCart.style.padding = '0 22px 0 20px';
        pelangganFabClearCart.style.gap = '2px';
        pelangganFabClearCart.addEventListener('click', function() {
            keranjang = [];
            resetHargaProdukKeDefault();
            updateKeranjang();
            updateProdukControls();
            namaPemesanInput.value = '';
            alamatPemesanInput.value = '';
            keteranganPesananInput.value = '';
            nominalPembayaranInput.value = 0;
            namaDiskonInput.value = '';
            nilaiDiskonInput.value = 0;
            delete nominalPembayaranInput.dataset.autofilled;
            hitungKembalian();
            updateActionButtonVisibility();
            productSearchBarcodeInput.value = '';
            productSearchBarcodeInput.focus();
            updateFloatingButtonVisibility();
            updatePelangganFabClearCartVisibility();
            saveKeranjangToStorage();
            localStorage.removeItem('catatanPesanan');
        });
        document.body.appendChild(pelangganFabClearCart);
    }
    createPelangganFabClearCart();
    function updatePelangganFabClearCartVisibility() {
        const currentUserRole = localStorage.getItem('userRole');
        if (!pelangganFabClearCart || !floatingPesanWhatsapp) return;
        if (currentUserRole === 'pelanggan' && keranjang.length > 0) {
            pelangganFabClearCart.style.display = 'flex';
            pelangganFabClearCart.style.opacity = '1';
            pelangganFabClearCart.style.pointerEvents = 'auto';
            pelangganFabClearCart.style.transform = 'scale(1)';
            let left = 5, bottom = 0;
            if (window.innerWidth <= 600) {
                left = 5;
                bottom = 9 + floatingPesanWhatsapp.offsetHeight + 2;
            } else {
                left = 5;
                bottom = 10 + floatingPesanWhatsapp.offsetHeight + 2;
            }
            pelangganFabClearCart.style.left = left + 'px';
            pelangganFabClearCart.style.right = 'auto';
            pelangganFabClearCart.style.bottom = bottom + 'px';
            pelangganFabClearCart.style.position = 'fixed';
        } else {
            pelangganFabClearCart.style.opacity = '0';
            pelangganFabClearCart.style.pointerEvents = 'none';
            pelangganFabClearCart.style.transform = 'scale(0.7)';
            pelangganFabClearCart.style.display = 'none';
        }
    }
    window.addEventListener('resize', updatePelangganFabClearCartVisibility);
    function formatNumberWithDots(n) {
        if (typeof n === "string") n = n.replace(/\./g, '');
        let x = n.toString().replace(/[^0-9]/g, '');
        if (x === "") return "";
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    function parseNumberFromDots(str) {
        return parseInt((str || "").toString().replace(/\./g, "")) || 0;
    }
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }
    function getBase64Image(imgUrl, callback) {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
        };
        img.onerror = function() {
            callback(null);
        };
        img.src = imgUrl;
    }
    function createKembalianModal() {
        const old = document.getElementById('kembalian-modal');
        if (old) old.remove();
        kembalianModal = document.createElement('div');
        kembalianModal.id = "kembalian-modal";
        kembalianModal.style.display = "none";
        kembalianModal.innerHTML = `
            <div class="kembalian-modal-content" tabindex="0">
                <span id="close-kembalian-modal" style="position:absolute;right:20px;top:10px;font-size:2em;cursor:pointer;color:#333;">&times;</span>
                <h2 style="text-align:center;color:#28a745;margin-bottom: 1em;">Kembalian</h2>
                <div id="kembalian-modal-value" style="font-size:2.5em;font-weight:bold;text-align:center;color:#28a745;letter-spacing: 2px; margin-bottom: 20px;">Rp 0</div>
                <button id="ok-kembalian-modal" style="margin-top:10px; padding:0.7em 2.5em; border-radius:8px; background:#00f0ff; color:#222; border:none; font-weight:bold; font-size:1.15em; cursor:pointer;">OK</button>
            </div>
        `;
        document.body.appendChild(kembalianModal);
        const closeBtn = document.getElementById('close-kembalian-modal');
        const okBtn = document.getElementById('ok-kembalian-modal');
        const modalContent = kembalianModal.querySelector('.kembalian-modal-content');
        function closeModal() {
            kembalianModal.style.display = "none";
            if (popupKeranjang && popupKeranjang.style.display !== "none") {
                const closePopupBtn = document.getElementById('close-popup-keranjang');
                if (closePopupBtn) closePopupBtn.focus();
            }
            tampilkanKembalianPopupKeranjang();
        }
        closeBtn.onclick = closeModal;
        okBtn.onclick = closeModal;
        kembalianModal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                okBtn.click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeBtn.click();
            }
        });
        setTimeout(() => {
            okBtn.focus();
        }, 180);
        modalContent.focus();
    }
    createKembalianModal();
    const produkData = [
        { id: 1, nama: "Risol", harga: 3000, gambar: "risol.webp", barcode: "risol", stok: 1},
        { id: 2, nama: "Cibay", harga: 2500, gambar: "cibay.webp", barcode: "cibay" , stok: 1},
        { id: 3, nama: "Citung", harga: 2500, gambar: "citung.webp", barcode: "citung", stok: 0 },
        { id: 4, nama: "Tteokbokki 5K", harga: 5000, gambar: "toppoki.webp", barcode: "toppoki", stok: 1 },
        { id: 5, nama: "Tteokbokki", harga: 10000, gambar: "toppoki1.webp", barcode: "toppoki10" , stok: 1},
        { id: 6, nama: "spaghetti tanpa toping", harga: 6000, gambar: "spaghetti.webp", barcode: "spaghetti", stok: 0 },
        { id: 7, nama: "spaghetti dengan toping", harga: 10000, gambar: "spaghetti1.webp", barcode: "spaghetti1", stok: 0},
        { id: 8, nama: "Balungan", harga: 6000, gambar: "balungan.webp", barcode: "balungan", stok: 0 },
        { id: 14, nama: "spaghetti balungan", harga: 12000, gambar: "sbalungan.webp", barcode: "spaghetti2" , stok: 0 },
        { id: 15, nama: "Es Teh jumbo", harga: 3000, gambar: "esteh.webp", barcode: "esteh" },
        { id: 9, nama: "Es Teh sedang", harga: 2500, gambar: "esteh2.webp", barcode: "esteh3" },
        { id: 10, nama: "Es Teh kecil", harga: 2000, gambar: "esteh1.webp", barcode: "esteh2" },
        { id: 11, nama: "Es Rasa rasa", harga: 2000, gambar: "2000.webp", barcode: "rasa" },
        { id: 12, nama: "kopi", harga: 4000, gambar: "kopi.webp", barcode: "kopi" },
        { id: 13, nama: "Es Tawar", harga: 1000, gambar: "estawar.webp", barcode: "tawar" }
    ];
    const produkDefaultHarga = produkData.map(p => ({ id: p.id, harga: p.harga }));
    let keranjang = [];
    let nextManualItemId = 1000;
    let isNominalInputFocused = false;
    function saveKeranjangToStorage() {
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        if (keteranganPesananInput.value && keranjang.length > 0) {
            localStorage.setItem('catatanPesanan', keteranganPesananInput.value);
        } else {
            localStorage.removeItem('catatanPesanan');
        }
    }
    function loadKeranjangFromStorage() {
        try {
            const data = localStorage.getItem('keranjang');
            keranjang = data ? JSON.parse(data) : [];
        } catch (e) {
            keranjang = [];
        }
        const catatan = localStorage.getItem('catatanPesanan');
        if (catatan && keranjang.length > 0) {
            keteranganPesananInput.value = catatan;
        } else {
            keteranganPesananInput.value = '';
        }
    }
    function resetHargaProdukKeDefault() {
        produkDefaultHarga.forEach(def => {
            const produk = produkData.find(p => p.id === def.id);
            if (produk) produk.harga = def.harga;
        });
        localStorage.removeItem('produkHarga');
    }
    let tawkWidgetScript = null;
    function loadTawktoWidget() {
        if (tawkWidgetScript) return;
        tawkWidgetScript = document.createElement("script");
        tawkWidgetScript.type = "text/javascript";
        tawkWidgetScript.async = true;
        tawkWidgetScript.src = 'https://embed.tawk.to/687a5f045100991915b4e88b/1j0f06avl';
        tawkWidgetScript.charset = 'UTF-8';
        tawkWidgetScript.setAttribute('crossorigin','*');
        tawkWidgetScript.id = "tawkto-script-widget";
        let s0 = document.getElementsByTagName("script")[0];
        s0.parentNode.insertBefore(tawkWidgetScript, s0);
    }
    function removeTawktoWidget() {
        if (tawkWidgetScript) {
            tawkWidgetScript.remove();
            tawkWidgetScript = null;
        }
        const tawkIframe = document.querySelector('iframe[src*="tawk.to"]');
        if (tawkIframe && tawkIframe.parentNode) {
            tawkIframe.parentNode.removeChild(tawkIframe);
        }
        const tawkDiv = document.getElementById('tawkchat-container');
        if (tawkDiv && tawkDiv.parentNode) {
            tawkDiv.parentNode.removeChild(tawkDiv);
        }
        if (window.Tawk_API) delete window.Tawk_API;
        if (window.Tawk_LoadStart) delete window.Tawk_LoadStart;
    }

    // If optional old buttons exist, attach handlers. Also attach handler to new icon button.
    if (btnPelanggan) {
        btnPelanggan.addEventListener('click', () => {
            formPelanggan.style.display = 'flex';
            formKasir.style.display = 'none';
            if (namaPelangganLoginInput) namaPelangganLoginInput.focus();
        });
    }
    if (btnKasir) {
        btnKasir.addEventListener('click', () => {
            formKasir.style.display = 'flex';
            formPelanggan.style.display = 'none';
            if (namaKasirLoginInput) namaKasirLoginInput.focus();
        });
    }
    // New handler: user icon next to title opens kasir form
    if (btnKasirIcon) {
        btnKasirIcon.addEventListener('click', () => {
            if (formKasir) formKasir.style.display = 'flex';
            if (formPelanggan) formPelanggan.style.display = 'none';
            if (namaKasirLoginInput) namaKasirLoginInput.focus();
        });
    }

    if (formPelanggan) {
        formPelanggan.addEventListener('submit', (event) => {
            event.preventDefault();
            playSound('ding');
            const nama = namaPelangganLoginInput.value.trim();
            const alamat = alamatPelangganLoginInput.value.trim();
            if (nama && alamat) {
                localStorage.setItem('userRole', 'pelanggan');
                localStorage.setItem('namaPelanggan', nama);
                localStorage.setItem('alamatPelanggan', alamat);
                localStorage.setItem('namaPemesan', nama);
                loginPopup.style.display = 'none';
                appContainer.style.display = 'block';
                kasirFabs.style.display = 'none';
                pesanInfoLabel.style.display = 'block';
                pesanInfoLabel.textContent = "Terima kasih pelanggan setia, sehat selalu ya 🙏 tanpa anda tidak ada cerita di kedai kita. Selalu kunjungi kami ya";
                initializeApp();
                loadTawktoWidget();
            }
        });
    }
    if (formKasir) {
        formKasir.addEventListener('submit', (event) => {
            event.preventDefault();
            const namaKasir = namaKasirLoginInput.value.trim();
            const passwordKasirLoginInput = document.getElementById('password-kasir-login');
            if (namaKasir === 'Harry' && passwordKasirLoginInput.value.trim() === '313121') {
                localStorage.setItem('userRole', 'kasir');
                localStorage.setItem('namaKasir', namaKasir);
                localStorage.removeItem('namaPelanggan');
                localStorage.removeItem('alamatPelanggan');
                localStorage.removeItem('namaPemesan');
                loginPopup.style.display = 'none';
                appContainer.style.display = 'block';
                kasirFabs.style.display = 'block';
                namaPemesanModal.style.display = 'none';
                pesanInfoLabel.style.display = 'none';
                initializeApp();
                removeTawktoWidget();
            } else {
                alert('Nama kasir atau password salah!');
            }
        });
    }

    document.getElementById('btnSimpanNamaPemesan').onclick = function() {
        var nama = inputNamaPemesan.value.trim();
        if (nama.length < 2) { return; }
        localStorage.setItem('namaPemesan', nama);
        localStorage.setItem('namaPelanggan', nama);
        namaPemesanModal.style.display = 'none';
        autofillNamaPemesanForm();
    };
    inputNamaPemesan.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnSimpanNamaPemesan').click();
        }
    });
    function autofillNamaPemesanForm() {
        const currentUserRole = localStorage.getItem('userRole');
        let nama = '';
        let alamat = '';
        if (currentUserRole === 'pelanggan') {
            nama = localStorage.getItem('namaPemesan') || '';
            alamat = localStorage.getItem('alamatPelanggan') || '';
        }
        if (namaPemesanInput) namaPemesanInput.value = nama;
        if (alamatPemesanInput) alamatPemesanInput.value = alamat;
    }
    function initializeApp() {
        const currentUserRole = localStorage.getItem('userRole');
        if (currentUserRole === 'kasir') {
            diskonSection.style.display = 'flex';
        } else {
            diskonSection.style.display = 'none';
            namaDiskonInput.value = '';
            nilaiDiskonInput.value = 0;
        }
        if (currentUserRole === 'pelanggan' && !localStorage.getItem('namaPemesan')) {
            namaPemesanModal.style.display = 'flex';
            inputNamaPemesan.focus();
        } else if (currentUserRole === 'kasir') {
            namaPemesanModal.style.display = 'none';
        }
        autofillNamaPemesanForm();
        loadKeranjangFromStorage();
        displayProduk();
        updateKeranjang();
        hitungKembalian();
        updateActionButtonVisibility();
        paymentChoiceButtons.style.display = 'flex';
        updatePelangganFabClearCartVisibility();
    }
    function showKembalianModalPopupKeranjang() {
        createKembalianModal();
        if (!popupKeranjangNominal || !popupKeranjangTotal) return;
        const totalBelanja = parseFloat(popupKeranjangTotal.textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.')) || 0;
        const nominalPembayaran = parseNumberFromDots(popupKeranjangNominal.value);
        const kembalian = nominalPembayaran - totalBelanja;
        const valDiv = document.getElementById('kembalian-modal-value');
        if (nominalPembayaran < totalBelanja) {
            valDiv.style.color = '#dc3545';
            valDiv.innerHTML = 'Nominal pembayaran harus lebih dari total belanjaan!';
        } else {
            valDiv.style.color = '#28a745';
            valDiv.innerHTML = formatRupiah(kembalian);
        }
        kembalianModal.style.display = 'flex';
        kembalianModal.style.justifyContent = 'center';
        kembalianModal.style.alignItems = 'center';
        setTimeout(() => {
            const okBtn = document.getElementById('ok-kembalian-modal');
            if (okBtn) okBtn.focus();
        }, 180);
    }
    function tampilkanKembalianPopupKeranjang() {
        if (!popupKeranjangNominal || !popupKeranjangTotal) return;
        let info = document.getElementById('popup-kembalian-informasi');
        if (!info) {
            info = document.createElement('span');
            info.id = 'popup-kembalian-informasi';
            popupKeranjangNominal.parentNode.appendChild(info);
        }
        popupKembalianInformasi = info;
        updateKembalianInformasiPopupKeranjang();
        popupKeranjangNominal.removeEventListener('input', updateKembalianInformasiPopupKeranjang);
        popupKeranjangNominal.addEventListener('input', updateKembalianInformasiPopupKeranjang);
        popupKeranjangNominal.removeEventListener('blur', updateKembalianInformasiPopupKeranjang);
        popupKeranjangNominal.addEventListener('blur', updateKembalianInformasiPopupKeranjang);
    }
    function updateKembalianInformasiPopupKeranjang() {
        if (!popupKeranjangNominal || !popupKeranjangTotal || !popupKembalianInformasi) return;
        const totalBelanja = parseFloat(popupKeranjangTotal.textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.')) || 0;
        const nominalPembayaran = parseNumberFromDots(popupKeranjangNominal.value);
        const kembalian = nominalPembayaran - totalBelanja;
        if (nominalPembayaran < totalBelanja) {
            popupKembalianInformasi.textContent = 'Kembalian: -';
            popupKembalianInformasi.style.color = '#dc3545';
        } else {
            popupKembalianInformasi.textContent = 'Kembalian: ' + formatRupiah(kembalian);
            popupKembalianInformasi.style.color = '#28a745';
        }
    }

    function displayProduk() {
        produkList.innerHTML = '';
        const currentUserRole = localStorage.getItem('userRole');
        let storedKeranjang = [];
        try {
            const data = localStorage.getItem('keranjang');
            storedKeranjang = data ? JSON.parse(data) : [];
        } catch (e) {
            storedKeranjang = [];
        }
        produkData.forEach(produk => {
            let itemInCart = keranjang.find(item => item.id === produk.id && !item.isManual);
            if (!itemInCart) {
                itemInCart = storedKeranjang.find(item => item.id === produk.id && !item.isManual);
            }
            let qty = itemInCart ? itemInCart.qty : 0;
            const produkDiv = document.createElement('div');
if(isStokKosong(produk)) produkDiv.classList.add('stok-habis');
            produkDiv.classList.add('produk-item');
            produkDiv.setAttribute('data-id', produk.id);

            let hargaDisplayHtml = `<p>Harga: <span class="price-display">${formatRupiah(produk.harga)}</span></p>`;
            if (currentUserRole === 'kasir') {
                hargaDisplayHtml = `<p>Harga: <span class="price-display">${formatRupiah(produk.harga)}</span></p>`;
            }
            let controlsHtml = '';
            if (currentUserRole === 'pelanggan' && qty > 0) {
                controlsHtml = `
                    <button class="qty-control-btn qty-btn minus-btn" data-id="${produk.id}" data-action="minus" title="Kurangi qty">-</button>
                    <input type="number" class="qty-edit-input" data-id="${produk.id}" min="1" max="999" value="${qty}" 
                        style="width:60px;text-align:center;font-size:1.1em;font-weight:bold;border-radius:7px;border:1.5px solid #00f0ff;"
                        onfocus="this.value='';" 
                    >
                `;
            } else if (qty < 1) {
                controlsHtml = `
                    <button class="add-to-cart-btn qty-btn" data-id="${produk.id}" title="Tambah ke keranjang"><i class="fas fa-plus"></i></button>
                `;
            } else {
                controlsHtml = `
                    <button class="qty-control-btn qty-btn minus-btn" data-id="${produk.id}" data-action="minus" title="Kurangi qty">-</button>
                    <input type="number" class="qty-edit-input" data-id="${produk.id}" min="1" max="999" value="${qty}" 
                        style="width:60px;text-align:center;font-size:1.1em;font-weight:bold;border-radius:7px;border:1.5px solid #00f0ff;"
                        onfocus="this.value='';" 
                    >
                `;
            }
            produkDiv.innerHTML = `
                <img src="${produk.gambar}" alt="${produk.nama}" data-id="${produk.id}" class="produk-img" style="cursor:pointer;">
                <h3>${produk.nama}</h3>${isStokKosong(produk)?'<div class="badge-stok-kosong">STOK KOSONG</div>':''}
                ${hargaDisplayHtml} 
                <div class="produk-controls" id="controls-${produk.id}">
                    ${controlsHtml}
                </div>
            `;
            produkList.appendChild(produkDiv);
        });

        // Event binding untuk qty-edit-input pelanggan
        const qtyInputs = document.querySelectorAll('.qty-edit-input');
        qtyInputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.value = '';
            });
            input.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').slice(0, 3);
            });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    let produkId = parseInt(this.dataset.id);
                    let val = parseInt(this.value);
                    if (isNaN(val) || val < 1) {
                        keranjang = keranjang.filter(item => !(item.id === produkId && !item.isManual));
                    } else {
                        let item = keranjang.find(item => item.id === produkId && !item.isManual);
                        if (item) {
                            item.qty = val;
                        }
                    }
                    updateKeranjang();
                    displayProduk();
                    updatePelangganFabClearCartVisibility();
                }
            });
            input.addEventListener('blur', function () {
                let produkId = parseInt(this.dataset.id);
                let val = parseInt(this.value);
                if (isNaN(val) || val < 1) {
                    keranjang = keranjang.filter(item => !(item.id === produkId && !item.isManual));
                } else {
                    let item = keranjang.find(item => item.id === produkId && !item.isManual);
                    if (item) {
                        item.qty = val;
                    }
                }
                updateKeranjang();
                displayProduk();
                updatePelangganFabClearCartVisibility();
            });
        });

        // Event binding untuk gambar produk (mode pelanggan)
        if (localStorage.getItem('userRole') === 'pelanggan') {
            const imgElements = produkList.querySelectorAll('.produk-img');
            imgElements.forEach(imgEl => {
                imgEl.addEventListener('click', function (ev) {
                    let produkId = parseInt(imgEl.getAttribute('data-id'));
                    let item = keranjang.find(item => item.id === produkId && !item.isManual);
                    if (!item) {
                        // Belum ada di keranjang, area gambar tidak berfungsi
                        return;
                    } else {
                        // Sudah ada, tambah qty +1 (maks 999)
                        if (item.qty < 999) item.qty += 1;
                        updateKeranjang();
                        displayProduk();
                        updatePelangganFabClearCartVisibility();
                    }
                });
            });
        }
    }

    function updateProdukControls() { displayProduk(); }
    window.handlePriceChange = function(inputElement, produkId) {
        let newPrice = parseFloat(inputElement.value);
        if (isNaN(newPrice) || newPrice < 0) newPrice = 0;
        const produk = produkData.find(p => p.id === produkId);
        if (produk) {
            produk.harga = newPrice;
            keranjang.forEach(item => {
                if (!item.isManual && item.id === produkId) {
                    item.harga = newPrice;
                }
            });
            localStorage.setItem('produkHarga', JSON.stringify(produkData.map(p => ({ id: p.id, harga: p.harga }))));
            updateKeranjang();
        }
    };
    window.formatPriceInput = function(inputElement) {
        let value = parseFloat(inputElement.value);
        if (isNaN(value)) value = 0;
        inputElement.value = value;
    };
    produkList.addEventListener('focusin', function(e) {
        const input = e.target;
        if (input.classList.contains('product-price-input')) input.value = '';
    });
    produkList.addEventListener('keydown', function(e) {
        const input = e.target;
        if (input.classList.contains('product-price-input') && e.key === 'Enter') {
            e.preventDefault();
            const produkId = parseInt(input.dataset.id);
            window.handlePriceChange(input, produkId);
            input.blur();
        }
    });
    produkList.addEventListener('click', function(e) {
        const produkDiv = e.target.closest('.produk-item');
        const btn = e.target.closest('button');
        // Jika klik pada tombol khusus, gunakan logika lama
        if (btn) {
            const produkId = parseInt(btn.dataset.id);
            if (btn.classList.contains('add-to-cart-btn')) {
                const product = produkData.find(p => p.id === produkId);
                if (product) tambahKeKeranjang(product);
                updatePelangganFabClearCartVisibility();
                return;
            }
            if (btn.classList.contains('plus-btn')) {
                const itemInCart = keranjang.find(item => item.id === produkId && !item.isManual);
                if (itemInCart) {
                    itemInCart.qty++;
                    updateKeranjang();
                    updateProdukControls();
                    updatePelangganFabClearCartVisibility();
                }
                return;
            }
            if (btn.classList.contains('minus-btn')) {
                const itemInCart = keranjang.find(item => item.id === produkId && !item.isManual);
                if (itemInCart) {
                    itemInCart.qty--;
                    if (itemInCart.qty <= 0) {
                        keranjang = keranjang.filter(item => !(item.id === produkId && !item.isManual));
                    }
                    updateKeranjang();
                    updateProdukControls();
                    updatePelangganFabClearCartVisibility();
                }
                return;
            }
        }
        // Jika klik di area produk (bukan tombol plus/minus), tambahkan produk
        if (produkDiv && !e.target.closest('button') && !e.target.classList.contains('product-price-input')) {
            // Ambil ID produk dari dataset input price atau dari elemen gambar/h3 parent
            let produkId = null;
            // Coba dari input price
            const priceInput = produkDiv.querySelector('.product-price-input');
            if (priceInput) produkId = parseInt(priceInput.dataset.id);
            // Jika tidak ada, coba dari button plus
            if (!produkId) {
                const plusBtn = produkDiv.querySelector('.add-to-cart-btn, .plus-btn');
                if (plusBtn) produkId = parseInt(plusBtn.dataset.id);
            }
            if (produkId) {
                const product = produkData.find(p => p.id === produkId);
                if (product) tambahKeKeranjang(product);
                updatePelangganFabClearCartVisibility();
            }
        }
    });
    function tambahKeKeranjang(produkSumber) {
        let productToAdd;
        if (produkSumber.isManual) {
            productToAdd = { ...produkSumber };
        } else {
            const existingItem = keranjang.find(item => !item.isManual && item.id === produkSumber.id);
            if (existingItem) {
                existingItem.qty += (produkSumber.qty || 1);
                updateKeranjang();
                updateProdukControls();
                saveKeranjangToStorage();
                updatePelangganFabClearCartVisibility();
                return;
            } else {
                productToAdd = { ...produkSumber, qty: produkSumber.qty || 1 };
            }
        }
        if (productToAdd.isManual && !productToAdd.hasOwnProperty('id')) {
            productToAdd.id = nextManualItemId++;
        } else if (!productToAdd.hasOwnProperty('id') && !productToAdd.barcode) {
            productToAdd.id = nextManualItemId++;
            productToAdd.isManual = true;
        }
        keranjang.push(productToAdd);
        updateKeranjang();
        updateProdukControls();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    }
    function updateKeranjang() {
        let total = 0;
        keranjangItems.innerHTML = '';
        if (keranjang.length === 0) {
            keranjangItems.innerHTML = '<tr><td colspan="4" class="empty-cart-message">Keranjang kosong.</td></tr>';
        } else {
            keranjang.forEach((item, index) => {
                const subtotal = item.harga * item.qty;
                total += subtotal;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.nama}</td>
                    <td>
                        <input type="number" value="${item.qty}" min="1"
                            onchange="updateCartItemQty(${index}, this.value)"
                            onfocus="clearQtyOnFocus(this, ${index})"
                        >
                    </td>
                    <td>${formatRupiah(subtotal)}</td>
                    <td><button onclick="removeFromCart(${index})" class="btn-remove-item"><i class="fas fa-trash-alt"></i></button></td>
                `;
                keranjangItems.appendChild(row);
            });
        }
        let totalSetelahDiskon = total;
        if (localStorage.getItem('userRole') === 'kasir') {
            let diskon = parseFloat(nilaiDiskonInput.value) || 0;
            if (diskon < 0) diskon = 0;
            totalSetelahDiskon = Math.max(total - diskon, 0);
        }
        keranjangTotal.textContent = formatRupiah(totalSetelahDiskon);

        if (!isNominalInputFocused) {
            nominalPembayaranInput.value = totalSetelahDiskon > 0 ? totalSetelahDiskon : "";
            nominalPembayaranInput.dataset.lastTotal = totalSetelahDiskon;
        }
        hitungKembalian();
        updatePopupKeranjang();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    }
    nilaiDiskonInput.addEventListener('input', updateKeranjang);
    window.clearQtyOnFocus = function(inputElement, index) { inputElement.value = ''; };
    window.updateCartItemQty = function(index, newQty) {
        let quantity = parseInt(newQty);
        if (isNaN(quantity) || quantity < 1) quantity = 0;
        if (quantity === 0) keranjang.splice(index, 1);
        else keranjang[index].qty = quantity;
        updateKeranjang();
        updateProdukControls();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    };
    window.removeFromCart = function(index) {
        keranjang.splice(index, 1);
        updateKeranjang();
        updateProdukControls();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    };
    clearCartFab.addEventListener('click', () => {
        keranjang = [];
        resetHargaProdukKeDefault();
        updateKeranjang();
        updateProdukControls();
        namaPemesanInput.value = '';
        alamatPemesanInput.value = '';
        keteranganPesananInput.value = '';
        nominalPembayaranInput.value = 0;
        namaDiskonInput.value = '';
        nilaiDiskonInput.value = 0;
        delete nominalPembayaranInput.dataset.autofilled;
        hitungKembalian();
        updateActionButtonVisibility();
        productSearchBarcodeInput.value = '';
        productSearchBarcodeInput.focus();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
        localStorage.removeItem('catatanPesanan');
    });
    keteranganPesananInput.addEventListener('input', () => {
        if (keranjang.length > 0) {
            localStorage.setItem('catatanPesanan', keteranganPesananInput.value);
        } else {
            localStorage.removeItem('catatanPesanan');
        }
    });
    function hitungKembalian() {
        const totalBelanja = parseFloat(keranjangTotal.textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.')) || 0;
        const nominalPembayaran = parseFloat(nominalPembayaranInput.value) || 0;
        const kembalian = nominalPembayaran - totalBelanja;
        kembalianDisplay.textContent = formatRupiah(kembalian);
        kembalianDisplay.style.color = kembalian < 0 ? '#dc3545' : '#ffcc00';
    }
    nominalPembayaranInput.addEventListener('focus', () => {
        isNominalInputFocused = true;
        nominalPembayaranInput.value = "";
    });
    nominalPembayaranInput.addEventListener('blur', () => {
        isNominalInputFocused = false;
        if (nominalPembayaranInput.value === "" || isNaN(parseFloat(nominalPembayaranInput.value))) {
            let total = keranjangTotal.textContent.replace(/[^0-9,]/g, "").replace(",", ".");
            total = parseFloat(total) || 0;
            nominalPembayaranInput.value = total > 0 ? total : "";
            nominalPembayaranInput.dataset.lastTotal = total;
        }
        hitungKembalian();
    });
    nominalPembayaranInput.addEventListener('input', () => {
        if (nominalPembayaranInput.value === "" || isNaN(parseFloat(nominalPembayaranInput.value))) {
            let total = keranjangTotal.textContent.replace(/[^0-9,]/g, "").replace(",", ".");
            total = parseFloat(total) || 0;
            nominalPembayaranInput.value = total > 0 ? total : "";
            nominalPembayaranInput.dataset.lastTotal = total;
        }
        hitungKembalian();
    });
    nominalPembayaranInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            hitungKembalian();
        }
    });

    // PEMBAHARUAN: generateStrukText dan doPrintStruk (tidak mencetak nama/alamat pelanggan jika kasir tidak mengisi)
    function generateStrukText(paymentMethod, qrisBase64 = null) {
        let namaPemesan = namaPemesanInput.value.trim();
        let alamatPemesan = alamatPemesanInput.value.trim();
        if (popupNamaPelangganInput && popupAlamatPelangganInput) {
            namaPemesan = popupNamaPelangganInput.value.trim();
            alamatPemesan = popupAlamatPelangganInput.value.trim();
        }
        let keteranganPesanan = keteranganPesananInput.value.trim();
        let popupCatatanInput = document.getElementById('popup-catatan-belanja');
        if (popupCatatanInput && popupCatatanInput.value.trim() !== "") {
            keteranganPesanan = popupCatatanInput.value.trim();
        }
        const kasirName = localStorage.getItem('namaKasir') || '-';
        const currentUserRole = localStorage.getItem('userRole');
        const totalBelanja = keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        let diskonNama = '', diskonNilai = 0;
        if (currentUserRole === 'kasir') {
            diskonNama = namaDiskonInput.value.trim() || '-';
            diskonNilai = parseFloat(nilaiDiskonInput.value) || 0;
        }
        const totalSetelahDiskon = Math.max(totalBelanja - diskonNilai, 0);
        let nominalPembayaran = parseFloat(nominalPembayaranInput.value) || 0;
        if (popupKeranjangNominal) {
            nominalPembayaran = parseNumberFromDots(popupKeranjangNominal.value) || nominalPembayaran;
        }
        const kembalian = nominalPembayaran - totalSetelahDiskon;
        if (keranjang.length === 0) {
            return { success: false, message: 'Keranjang belanja masih kosong!' };
        }
        let showNamaAlamat = true;
        if (currentUserRole === 'kasir' && (!namaPemesan && !alamatPemesan)) {
            showNamaAlamat = false;
        }
        let message = '';
        if (showNamaAlamat) {
            message += `Nama: ${namaPemesan || '-'}\nAlamat: ${alamatPemesan || '-'}\n`;
        }
        if (currentUserRole === 'kasir') {
            message += `Kasir: ${kasirName}\n`;
        }
        message += `Tanggal: ${new Date().toLocaleDateString('id-ID')}\nJam: ${new Date().toLocaleTimeString('id-ID')}\n-----------------------------\n`;
        keranjang.forEach(item => {
            message += `${item.nama} (${item.qty}x)  ${formatRupiah(item.harga * item.qty)}\n`;
        });
        if (currentUserRole === 'kasir' && diskonNilai > 0) {
            message += `-----------------------------\n`;
            message += `Diskon (${diskonNama}) : -${formatRupiah(diskonNilai)}\n`;
        }
        message += `-----------------------------\n`;
        message += `TOTAL     : ${formatRupiah(totalSetelahDiskon)}\n`;
        if (nominalPembayaran !== totalSetelahDiskon) {
            message += `Bayar     : ${formatRupiah(nominalPembayaran)}\n`;
            message += `Kembalian : ${formatRupiah(kembalian)}\n`;
        }
        if (keteranganPesanan) {
            message += `\nCatatan: ${keteranganPesanan}\n`;
        }
        message += `\n[Link Pembayaran QRIS]\nhttps://bit.ly/4eVAZkA`;
        return {
            success: true,
            message,
            total: totalSetelahDiskon,
            nominal: nominalPembayaran,
            qrisBase64: qrisBase64
        };
    }

    function printStruk(paymentMethod) {
        if (paymentMethod === 'QRIS') {
            getBase64Image('qris.webp', function(qrisBase64) {
                doPrintStruk(paymentMethod, qrisBase64);
            });
        } else {
            doPrintStruk(paymentMethod, null);
        }
    }
    function afterKasirTransaksiLangsungKosongkan() {
        localStorage.removeItem('namaPelanggan');
        localStorage.removeItem('alamatPelanggan');
        localStorage.removeItem('namaPemesan');
        if (namaPemesanInput) namaPemesanInput.value = '';
        if (alamatPemesanInput) alamatPemesanInput.value = '';
        if (popupNamaPelangganInput) popupNamaPelangganInput.value = '';
        if (popupAlamatPelangganInput) popupAlamatPelangganInput.value = '';
    }
    function doPrintStruk(paymentMethod, qrisBase64) {
        const shareResult = generateStrukText(paymentMethod, qrisBase64);
        if (!shareResult.success) {
            alert(shareResult.message);
            return false;
        }
        const defaultFooterText = "Terima kasih sehat selalu ya 🤲 🙏🥰";
        let printTableProduk = '';
        keranjang.forEach(item => {
            printTableProduk += `
                <tr>
                    <td class="print-item" style="text-align:left;word-break:break-word;font-size:11px;padding:0.5px 0;line-height:1.05;">${item.nama} (${item.qty}x)</td>
                    <td class="print-item" style="text-align:right;font-size:11px;padding:0.5px 0;line-height:1.05;">${formatRupiah(item.harga * item.qty)}</td>
                </tr>
            `;
        });
        let diskonTr = '';
        if (localStorage.getItem('userRole') === 'kasir' && (parseFloat(nilaiDiskonInput.value) || 0) > 0) {
            diskonTr = `
            <tr>
                <td style="text-align:left;font-size:11px;padding:0.5px 0;">Diskon (${namaDiskonInput.value || '-'})</td>
                <td style="text-align:right;font-size:11px;padding:0.5px 0;">-${formatRupiah(parseFloat(nilaiDiskonInput.value) || 0)}</td>
            </tr>`;
        }
        let keteranganPesanan = keteranganPesananInput.value.trim();
        let popupCatatanInput = document.getElementById('popup-catatan-belanja');
        if (popupCatatanInput && popupCatatanInput.value.trim() !== "") {
            keteranganPesanan = popupCatatanInput.value.trim();
        }
        let showNamaAlamat = true;
        const currentUserRole = localStorage.getItem('userRole');
        let namaCetak = popupNamaPelangganInput ? popupNamaPelangganInput.value.trim() : namaPemesanInput.value.trim();
        let alamatCetak = popupAlamatPelangganInput ? popupAlamatPelangganInput.value.trim() : alamatPemesanInput.value.trim();
        if (currentUserRole === 'kasir' && (!namaCetak && !alamatCetak)) {
            showNamaAlamat = false;
        }
        let infoNamaAlamatHTML = '';
        if (showNamaAlamat) {
            infoNamaAlamatHTML = `
                <p>Nama   : ${namaCetak || '-'}</p>
                <p>Alamat : ${alamatCetak || '-'}</p>
            `;
        }
        let printContent = `
            <html>
            <head>
                <title>Struk Belanja</title>
                <meta name="viewport" content="width=58mm, initial-scale=1">
                <link rel="stylesheet" href="style.css">
                <style>
                    @media print { .print-actions { display: none !important; } }
                    body, #print-area { font-family:'Arial', 'Poppins', sans-serif !important; font-size:11px !important; line-height:1.05 !important; font-weight:bold !important; margin:0 !important; }
                    #print-area { width:58mm !important; max-width:58mm !important; padding:2mm 2mm 0 2mm !important; }
                    table { width:100%; border-collapse: collapse; font-size:11px;}
                    td { padding:0.5px 0; font-weight:bold; font-size:11px;}
                    .total-row td { border-top:1.5px solid #000; font-size:12px;}
                    .print-header { text-align:center!important;margin-bottom:4px!important;font-size:14px!important;font-weight:bold!important;line-height:1.05!important;letter-spacing:0.02em!important; }
                    .print-header .shop-address-print, .print-header .shop-phone-print { font-size:11px!important;font-weight:bold!important;margin:0!important;line-height:1.05!important;}
                    .print-info p { margin:0!important;font-size:11px!important;font-weight:bold!important; }
                    .thank-you { text-align:center;margin-top:8px!important;font-size:11px!important;font-style:italic!important;font-weight:bold!important;}
                </style>
                <script>
                    function shareWhatsApp() {
                        var msg = encodeURIComponent(\`${shareResult.message}\`);
                        window.open('https://wa.me/?text=' + msg, '_blank');
                    }
                    function cetakUlang() {
                        window.print();
                    }
                    window.onload = function() {
                        window.print();
                    }
                <\/script>
            </head>
            <body>
                <div id="print-area">
                    <div class="print-header">
                        <p class="shop-name-print" style="font-size:14px;margin-bottom:1px;"><b>HARINFOOD</b></p>
                        <p class="shop-address-print">Jl Ender Rakit - Gedongan</p>
                        <p class="shop-phone-print">081235368643</p>
                    </div>
                    <div class="print-info">
                        ${infoNamaAlamatHTML}
                        ${localStorage.getItem('userRole') === 'kasir' ? `<p>Kasir  : ${localStorage.getItem('namaKasir')}</p>` : ''}
                        <p>Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
                        <p>Jam    : ${new Date().toLocaleTimeString('id-ID')}</p>
                    </div>
                    <hr style="margin:2px 0;">
                    <table>
                        ${printTableProduk}
                        ${diskonTr}
                        <tr class="total-row"><td style="text-align:left;font-size:11px;">TOTAL</td><td style="text-align:right;font-size:11px;">${formatRupiah(shareResult.total)}</td></tr>
                        ${
                            (shareResult.nominal !== shareResult.total)
                            ? `<tr><td style="text-align:left;font-size:11px;">Bayar</td><td style="text-align:right;font-size:11px;">${formatRupiah(shareResult.nominal)}</td></tr>
                               <tr><td style="text-align:left;font-size:11px;">Kembalian</td><td style="text-align:right;font-size:11px;">${formatRupiah(shareResult.nominal - shareResult.total)}</td></tr>`
                            : ''
                        }
                    </table>
        `;
        if (keteranganPesanan) {
            printContent += `
                    <hr style="margin:2px 0;">
                    <div class="print-notes"><strong>Catatan:</strong> ${keteranganPesanan}</div>
            `;
        }
        if (paymentMethod === 'QRIS') {
            printContent += `
                <div style="text-align: center; margin-top: 10px; margin-bottom: 5px;">
                    <img src="${shareResult.qrisBase64 ? shareResult.qrisBase64 : 'qris.webp'}" alt="QRIS Code" style="width: 45mm; height: auto; display: block; margin: 0 auto; padding-bottom: 5px;">
                </div>
                <p class="thank-you">${defaultFooterText} - Scan QRIS Untuk Pembayaran</p>
            `;
        } else {
            printContent += `<p class="thank-you">${defaultFooterText}</p>`;
        }
        printContent += `
            <div class="print-actions">
                <button onclick="cetakUlang()">Cetak Struk</button>
                <button onclick="shareWhatsApp()">Bagikan via WhatsApp</button>
            </div>
            </div></body></html>`;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            keranjang = [];
            saveKeranjangToStorage();
            resetHargaProdukKeDefault();
            updateKeranjang();
            updateProdukControls();
            namaPemesanInput.value = '';
            alamatPemesanInput.value = '';
            keteranganPesananInput.value = '';
            nominalPembayaranInput.value = 0;
            namaDiskonInput.value = '';
            nilaiDiskonInput.value = 0;
            hitungKembalian();
            paymentChoiceButtons.style.display = 'flex';
            updateActionButtonVisibility();
            productSearchBarcodeInput.value = '';
            productSearchBarcodeInput.focus();
            updateFloatingButtonVisibility();
            updatePelangganFabClearCartVisibility();
            localStorage.removeItem('catatanPesanan');
            if (localStorage.getItem('userRole') === 'kasir') {
                afterKasirTransaksiLangsungKosongkan();
            }
        }, 300);
        return true;
    }

    shareOrderFab && shareOrderFab.addEventListener('click', async () => {
        const shareResult = generateStrukText('Tunai');
        if (!shareResult.success) {
            alert(shareResult.message);
            return;
        }
        const messageToShare = shareResult.message;
        const totalBelanja = shareResult.total;
        const nominalPembayaran = shareResult.nominal;
        if (totalBelanja === 0) {
            alert('Keranjang belanja kosong. Tidak ada transaksi untuk dibagikan.');
            return;
        }
        if (nominalPembayaran < totalBelanja) {
            alert('Nominal pembayaran kurang dari total belanja. Harap selesaikan pembayaran sebelum membagikan transaksi.');
            return;
        }
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Detail Transaksi HARINFOOD',
                    text: messageToShare
                });
                keranjang = [];
                saveKeranjangToStorage();
                resetHargaProdukKeDefault();
                updateKeranjang();
                updateProdukControls();
                namaPemesanInput.value = '';
                alamatPemesanInput.value = '';
                keteranganPesananInput.value = '';
                nominalPembayaranInput.value = 0;
                namaDiskonInput.value = '';
                nilaiDiskonInput.value = 0;
                hitungKembalian();
                updateActionButtonVisibility();
                productSearchBarcodeInput.value = '';
                productSearchBarcodeInput.focus();
                updateFloatingButtonVisibility();
                updatePelangganFabClearCartVisibility();
                localStorage.removeItem('catatanPesanan');
                if (localStorage.getItem('userRole') === 'kasir') {
                    afterKasirTransaksiLangsungKosongkan();
                }
                return;
            }
        } catch (error) {}
        const encodedMessage = encodeURIComponent(messageToShare);
        const whatsappURL = `https://wa.me/6281235368643?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        keranjang = [];
        saveKeranjangToStorage();
        resetHargaProdukKeDefault();
        updateKeranjang();
        updateProdukControls();
        namaPemesanInput.value = '';
        alamatPemesanInput.value = '';
        keteranganPesananInput.value = '';
        nominalPembayaranInput.value = 0;
        namaDiskonInput.value = '';
        nilaiDiskonInput.value = 0;
        hitungKembalian();
        updateActionButtonVisibility();
        productSearchBarcodeInput.value = '';
        productSearchBarcodeInput.focus();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        localStorage.removeItem('catatanPesanan');
        if (localStorage.getItem('userRole') === 'kasir') {
            afterKasirTransaksiLangsungKosongkan();
        }
    });
    function kirimPesanWhatsappPelanggan() {
        if (keranjang.length === 0) {
            alert('Keranjang masih kosong, silakan pilih pesanan terlebih dahulu!');
            return;
        }
        const shareResult = generateStrukText('Tunai');
        if (!shareResult.success) {
            alert(shareResult.message);
            return;
        }
        const messageToSend = shareResult.message;
        const encodedMessage = encodeURIComponent(messageToSend);
        const whatsappURL = `https://wa.me/6281235368643?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        keranjang = [];
        saveKeranjangToStorage();
        resetHargaProdukKeDefault();
        updateKeranjang();
        updateProdukControls();
        namaPemesanInput.value = '';
        alamatPemesanInput.value = '';
        keteranganPesananInput.value = '';
        nominalPembayaranInput.value = 0;
        namaDiskonInput.value = '';
        nilaiDiskonInput.value = 0;
        hitungKembalian();
        updateActionButtonVisibility();
        productSearchBarcodeInput.value = '';
        productSearchBarcodeInput.focus();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        localStorage.removeItem('catatanPesanan');
    }
    function updateFloatingButtonVisibility() {
        const currentUserRole = localStorage.getItem('userRole');
        if (!floatingPesanWhatsapp) return;
        if (currentUserRole === 'pelanggan') {
            if (keranjang.length > 0) {
                floatingPesanWhatsapp.style.opacity = "1";
                floatingPesanWhatsapp.style.pointerEvents = "auto";
                floatingPesanWhatsapp.style.transform = "scale(1)";
                floatingPesanWhatsapp.style.transition = "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)";
            } else {
                floatingPesanWhatsapp.style.opacity = "0";
                floatingPesanWhatsapp.style.pointerEvents = "none";
                floatingPesanWhatsapp.style.transform = "scale(0.7)";
                floatingPesanWhatsapp.style.transition = "opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)";
            }
        } else {
            floatingPesanWhatsapp.style.opacity = "0";
            floatingPesanWhatsapp.style.pointerEvents = "none";
            floatingPesanWhatsapp.style.transform = "scale(0.7)";
        }
    }
    function updateKasirFabVisibility() {
        const currentUserRole = localStorage.getItem('userRole');
        if (kasirFabs) {
            kasirFabs.style.display = (currentUserRole === 'kasir') ? 'block' : 'none';
        }
    }
    if (printFab) {
        printFab.addEventListener('click', () => {
            if (keranjang.length === 0) {
                alert('Keranjang belanja kosong. Tidak ada yang bisa dicetak.');
                return;
            }
            printOptionsPopup.style.display = 'flex';
        });
    }
    cetakStrukButton.addEventListener('click', () => {
        if (keranjang.length === 0) {
            alert('Keranjang belanja kosong. Tidak ada yang bisa dicetak.');
            return;
        }
        printOptionsPopup.style.display = 'flex';
    });
    btnPrintTunai.addEventListener('click', () => {
        printOptionsPopup.style.display = 'none';
        printStruk('Tunai');
    });
    btnPrintQris.addEventListener('click', () => {
        printOptionsPopup.style.display = 'none';
        printStruk('QRIS');
    });
    closePrintPopupBtn.addEventListener('click', () => {
        printOptionsPopup.style.display = 'none';
    });
    addManualOrderFab.addEventListener('click', () => {
        manualOrderModal.style.display = 'flex';
        manualProductNameInput.value = '';
        manualProductPriceInput.value = '';
        manualProductQtyInput.value = '1';
        manualProductNameInput.focus();
    });
    manualProductNameInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            manualProductPriceInput.focus();
        }
    });
    manualProductPriceInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            manualProductQtyInput.focus();
        }
    });
    manualProductQtyInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            window.addManualOrderItem();
        }
    });
    window.closeManualOrderModal = function() {
        manualOrderModal.style.display = 'none';
        productSearchBarcodeInput.focus(); 
    };
    window.addManualOrderItem = function() {
        const name = manualProductNameInput.value.trim();
        const price = parseFloat(manualProductPriceInput.value);
        const qty = parseInt(manualProductQtyInput.value);
        if (!name || isNaN(price) || price < 0 || isNaN(qty) || qty < 1) {
            alert('Harap isi nama produk, harga (minimal 0), dan kuantitas (minimal 1) dengan benar.');
            return;
        }
        const newManualItem = {
            id: nextManualItemId++, 
            nama: name,
            harga: price,
            qty: qty,
            isManual: true 
        };
        tambahKeKeranjang(newManualItem);
        manualOrderModal.style.display = 'none';
        productSearchBarcodeInput.focus(); 
    };
    productSearchBarcodeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault(); 
            const query = productSearchBarcodeInput.value.trim();
            if (query) {
                const foundProduct = produkData.find(p => 
                    p.barcode === query || p.nama.toLowerCase().includes(query.toLowerCase())
                );
                if (foundProduct) {
                    tambahKeKeranjang(foundProduct);
                    searchBarcodeFeedback.textContent = `Produk "${foundProduct.nama}" ditambahkan!`;
                    searchBarcodeFeedback.style.color = '#28a745';
                    productSearchBarcodeInput.value = ''; 
                } else {
                    searchBarcodeFeedback.textContent = `Produk atau barcode "${query}" tidak ditemukan.`;
                    searchBarcodeFeedback.style.color = '#dc3545';
                }
            } else {
                searchBarcodeFeedback.textContent = 'Masukkan nama produk atau scan barcode.';
                searchBarcodeFeedback.style.color = '#e0e0e0';
            }
            productSearchBarcodeInput.focus();
        }
    });
    productSearchBarcodeInput.addEventListener('input', () => {
        searchBarcodeFeedback.textContent = '';
    });
    function updateActionButtonVisibility() {
        updateKasirFabVisibility();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
    }
    document.addEventListener('keydown', function(e) {
        const currentUserRole = localStorage.getItem('userRole');
        const manualOrderModal = document.getElementById('manualOrderModal');
        const manualOrderOpen = manualOrderModal && manualOrderModal.style.display === 'flex';
        if (currentUserRole !== 'kasir' || manualOrderOpen) return;
        if (e.key === "F12") {
            e.preventDefault();
            const dapurFab = document.getElementById('dapur-fab');
            if (dapurFab && dapurFab.style.display !== "none") {
                dapurFab.click();
            }
        }
        if (e.key === 'F1') {
            e.preventDefault();
            if (keranjang.length > 0 && printFab) printFab.click();
        }
        if (e.key === 'F2') {
            e.preventDefault();
            if (keranjang.length > 0 && shareOrderFab) shareOrderFab.click();
        }
        if (e.key === 'F3') {
            e.preventDefault();
            if (addManualOrderFab) addManualOrderFab.click();
        }
        if (e.key === 'F4') {
            e.preventDefault();
            if (clearCartFab) clearCartFab.click();
        }
        if (e.key === 'F6') {
            e.preventDefault();
            showPopupKeranjang(true);
        }
    });
    if (cartFab) {
        cartFab.addEventListener('click', function() {
            showPopupKeranjang(true);
        });
    }
    if (floatingPesanWhatsapp) {
        floatingPesanWhatsapp.onclick = function() {
            showPopupKeranjang(true);
        };
    }
    function setPopupKeranjangClosed(val) {
        localStorage.setItem('popupKeranjangClosed', val ? '1' : '');
    }
    function isPopupKeranjangClosed() {
        return localStorage.getItem('popupKeranjangClosed') === '1';
    }
    function showPopupKeranjang(forceShow = false) {
        if (!forceShow) {
            if (isPopupKeranjangClosed()) return;
            if (keranjang.length === 0) return;
        }
        updatePopupKeranjang(true);
        popupKeranjang.style.display = "flex";
        setPopupKeranjangClosed(false);
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.getElementById('close-popup-keranjang').focus();
        }, 100);
        tampilkanKembalianPopupKeranjang();
    }
    function hidePopupKeranjang() {
        popupKeranjang.style.display = "none";
        setPopupKeranjangClosed(true);
        document.body.style.overflow = "";
    }
    document.getElementById('close-popup-keranjang').onclick = hidePopupKeranjang;

    function updatePopupKeranjang(forceShow = false) {
        if (popupKeranjang.style.display === "none" && !forceShow) return;
        const tbody = document.getElementById('popup-keranjang-items');
        popupKeranjangTotal = document.getElementById('popup-keranjang-total');
        popupKeranjangNominal = document.getElementById('popup-keranjang-nominal');
        popupKembalianDisplay = document.getElementById('popup-kembalian-display');
        popupKeranjangPrintBtn = document.getElementById('popup-keranjang-print');
        popupWhatsAppBtn = document.getElementById('popup-keranjang-whatsapp');
        let namaPelangganPopup = document.getElementById('popup-nama-pelanggan');
        let alamatPelangganPopup = document.getElementById('popup-alamat-pemesan');
        let popupCatatanInput = document.getElementById('popup-catatan-belanja');
        if (!popupCatatanInput) {
            const catatanDiv = document.createElement('div');
            catatanDiv.style.marginBottom = "10px";
            catatanDiv.innerHTML = `
                <label style="font-weight:bold;color:#007bff;">Catatan/Keterangan Pesanan:</label>
                <textarea id="popup-catatan-belanja" style="width:99%;padding:7px;border-radius:5px;border:1px solid #007bff;min-height:40px;"></textarea>
            `;
            if (popupKeranjang.firstElementChild && popupKeranjang.firstElementChild.children.length >= 3) {
                popupKeranjang.firstElementChild.insertBefore(catatanDiv, popupKeranjang.firstElementChild.children[3]);
            }
            popupCatatanInput = document.getElementById('popup-catatan-belanja');
        }
        if (popupCatatanInput) {
            popupCatatanInput.value = keteranganPesananInput.value || localStorage.getItem('catatanPesanan') || '';
            popupCatatanInput.oninput = function() {
                keteranganPesananInput.value = popupCatatanInput.value;
                if (keranjang.length > 0) {
                    localStorage.setItem('catatanPesanan', popupCatatanInput.value);
                } else {
                    localStorage.removeItem('catatanPesanan');
                }
            };
        }
        if (!namaPelangganPopup || !alamatPelangganPopup) {
            const namaAlamatDiv = document.createElement('div');
            namaAlamatDiv.style.marginBottom = "10px";
            namaAlamatDiv.innerHTML = `
                <label style="font-weight:bold;color:#007bff;">Nama Pemesan:</label>
                <input type="text" id="popup-nama-pelanggan" style="width:99%;padding:7px;border-radius:5px;border:1px solid #007bff;margin-bottom:8px;">
                <label style="font-weight:bold;color:#007bff;">Alamat Pemesan:</label>
                <textarea id="popup-alamat-pemesan" style="width:99%;padding:7px;border-radius:5px;border:1px solid #007bff;min-height:40px;"></textarea>
            `;
            popupKeranjang.firstElementChild.insertBefore(namaAlamatDiv, popupKeranjang.firstElementChild.children[2]);
            namaPelangganPopup = document.getElementById('popup-nama-pelanggan');
            alamatPelangganPopup = document.getElementById('popup-alamat-pemesan');
        }
        popupNamaPelangganInput = namaPelangganPopup;
        popupAlamatPelangganInput = alamatPelangganPopup;
        const currentUserRole = localStorage.getItem('userRole');
        let namaPelangganDefault = '';
        let alamatPelangganDefault = '';
        if (currentUserRole === 'pelanggan') {
            namaPelangganDefault = localStorage.getItem('namaPemesan') || namaPemesanInput.value || "";
            alamatPelangganDefault = localStorage.getItem('alamatPelanggan') || alamatPemesanInput.value || "";
        }
        if (popupNamaPelangganInput) {
            popupNamaPelangganInput.value = popupNamaPelangganInput.value || namaPelangganDefault;
            popupNamaPelangganInput.onfocus = function () {
                this.value = '';
            };
            popupNamaPelangganInput.oninput = function() {
                if (currentUserRole === 'pelanggan') {
                    namaPemesanInput.value = popupNamaPelangganInput.value;
                    localStorage.setItem('namaPemesan', popupNamaPelangganInput.value);
                } else {
                    namaPemesanInput.value = popupNamaPelangganInput.value;
                }
            };
        }
        if (popupAlamatPelangganInput) {
            popupAlamatPelangganInput.value = popupAlamatPelangganInput.value || alamatPelangganDefault;
            popupAlamatPelangganInput.onfocus = function () {
                this.value = '';
            };
            popupAlamatPelangganInput.oninput = function() {
                if (currentUserRole === 'pelanggan') {
                    alamatPemesanInput.value = popupAlamatPelangganInput.value;
                    localStorage.setItem('alamatPelanggan', popupAlamatPelangganInput.value);
                } else {
                    alamatPemesanInput.value = popupAlamatPelangganInput.value;
                }
            };
        }
        if (popupNamaPelangganInput && popupNamaPelangganInput.value === "") popupNamaPelangganInput.value = namaPelangganDefault;
        if (popupAlamatPelangganInput && popupAlamatPelangganInput.value === "") popupAlamatPelangganInput.value = alamatPelangganDefault;
        popupNamaPelangganInput.oninput = function() {
            if (currentUserRole === 'pelanggan') {
                namaPemesanInput.value = popupNamaPelangganInput.value;
                localStorage.setItem('namaPemesan', popupNamaPelangganInput.value);
            } else {
                namaPemesanInput.value = popupNamaPelangganInput.value;
            }
        };
        popupAlamatPelangganInput.oninput = function() {
            if (currentUserRole === 'pelanggan') {
                alamatPemesanInput.value = popupAlamatPelangganInput.value;
                localStorage.setItem('alamatPelanggan', popupAlamatPelangganInput.value);
            } else {
                alamatPemesanInput.value = popupAlamatPelangganInput.value;
            }
        };
        let total = 0;
        tbody.innerHTML = '';
        if (keranjang.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#222;font-weight:500;">Keranjang kosong.</td></tr>`;
        } else {
            keranjang.forEach((item, idx) => {
    const subtotal = item.harga * item.qty;
    total += subtotal;
    const row = document.createElement('tr');
    if (currentUserRole === 'kasir') {
        // Nama (tetap, tidak bisa diedit), Harga (editable), Qty, Subtotal, Hapus
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>
                <input type="number" value="${item.harga}" min="0" style="width:70px;"
                    onchange="window.popupUpdateItemPrice(${idx}, this.value)">
            </td>
            <td>
                <input type="number" value="${item.qty}" min="1" style="width:48px;color:#222;"
                    onchange="window.popupUpdateQty(${idx}, this.value)">
            </td>
            <td style="color:#222;">${formatRupiah(subtotal)}</td>
            <td>
                <button onclick="window.popupRemoveItem(${idx})" style="background:none;border:none;color:#dc3545;font-size:1.2em;cursor:pointer;" title="Hapus"><i class="fas fa-trash"></i></button>
            </td>
        `;
    } else {
        // Pelanggan: Nama, Qty, Subtotal, Hapus (tidak bisa edit harga)
        row.innerHTML = `
            <td style="color:#222;">${item.nama}</td>
            <td style="color:#222;">${formatRupiah(item.harga)}</td>
            <td>
                <input type="number" value="${item.qty}" min="1" style="width:48px;color:#222;"
                    onchange="window.popupUpdateQty(${idx}, this.value)">
            </td>
            <td style="color:#222;">${formatRupiah(subtotal)}</td>
            <td>
                <button onclick="window.popupRemoveItem(${idx})" style="background:none;border:none;color:#dc3545;font-size:1.2em;cursor:pointer;" title="Hapus"><i class="fas fa-trash"></i></button>
            </td>
        `;
    }
    tbody.appendChild(row);
});
        }
        const staticNodes = popupKeranjang.querySelectorAll('div, strong, span');
        staticNodes.forEach(node => {
            if (
                node.textContent &&
                typeof node.textContent === "string" &&
                node.textContent.trim().match(/^Total:\s*Rp[\d\.]+$/i)
            ) {
                if (node.parentElement && node.parentElement.parentElement === popupKeranjang.firstElementChild) {
                    node.parentElement.remove();
                } else if (node.parentElement === popupKeranjang.firstElementChild) {
                    node.remove();
                }
            }
        });
        let pembayaranInline = popupKeranjang.querySelector('.pembayaran-section-inline');
        if (pembayaranInline && pembayaranInline.parentElement) {
            pembayaranInline.parentElement.removeChild(pembayaranInline);
        }
        pembayaranInline = document.createElement('div');
        pembayaranInline.className = 'pembayaran-section-inline';
        pembayaranInline.style.position = 'sticky';
        pembayaranInline.style.bottom = '62px';
        pembayaranInline.style.background = '#fff';
        pembayaranInline.style.zIndex = '22';
        pembayaranInline.style.padding = '6px 0 6px 0';
        pembayaranInline.style.margin = '0 -20px 0 -20px';
        pembayaranInline.style.borderTop = '1px solid #eee';
        pembayaranInline.style.display = 'flex';
        pembayaranInline.style.alignItems = 'center';
        pembayaranInline.style.justifyContent = 'space-between';
        pembayaranInline.style.gap = '8px';
        let leftDiv = document.createElement('div');
        leftDiv.style.display = 'flex';
        leftDiv.style.alignItems = 'center';
        let labelTotal = document.createElement('span');
        labelTotal.textContent = 'Total:';
        labelTotal.style.fontWeight = 'bold';
        labelTotal.style.color = '#222';
        labelTotal.style.fontSize = '1em';
        labelTotal.style.marginRight = '4px';
        let spanTotal = document.createElement('span');
        spanTotal.id = 'popup-keranjang-total';
        spanTotal.textContent = formatRupiah(total);
        spanTotal.style.fontWeight = 'bold';
        spanTotal.style.color = '#ff9800';
        spanTotal.style.fontSize = '1em';
        leftDiv.appendChild(labelTotal);
        leftDiv.appendChild(spanTotal);
        let rightDiv = document.createElement('div');
        rightDiv.style.display = 'flex';
        rightDiv.style.alignItems = 'center';
        let labelNominal = document.createElement('span');
        labelNominal.textContent = 'Bayar:';
        labelNominal.style.color = '#00f0ff';
        labelNominal.style.fontWeight = '700';
        labelNominal.style.fontSize = '1em';
        labelNominal.style.marginRight = '3px';
        let inputNominal = document.createElement('input');
        inputNominal.type = 'number';
        inputNominal.id = 'popup-keranjang-nominal';
        inputNominal.min = '0';
        inputNominal.value = total > 0 ? formatNumberWithDots(total) : "";
        inputNominal.style.width = '90px';
        inputNominal.style.padding = '6px';
        inputNominal.style.borderRadius = '4px';
        inputNominal.style.border = '2px solid #00f0ff';
        inputNominal.style.color = '#222';
        inputNominal.style.fontWeight = 'bold';
        inputNominal.style.background = '#f8f8f8';
        rightDiv.appendChild(labelNominal);
        rightDiv.appendChild(inputNominal);
        pembayaranInline.appendChild(leftDiv);
        pembayaranInline.appendChild(rightDiv);
        popupKeranjang.firstElementChild.appendChild(pembayaranInline);
        popupKeranjangTotal = pembayaranInline.querySelector('#popup-keranjang-total');
        popupKeranjangNominal = pembayaranInline.querySelector('#popup-keranjang-nominal');
        if (!popupKeranjangNominal._formatted) {
            popupKeranjangNominal.value = total > 0 ? formatNumberWithDots(total) : "";
            popupKeranjangNominal.dataset.lastTotal = total;
            popupKeranjangNominal._formatted = true;
        }
        popupKeranjangNominal.style.color = "#222";
        hitungKembalianPopup();
        popupKeranjangNominal.addEventListener('input', function(e) {
            let cursor = popupKeranjangNominal.selectionStart;
            let before = popupKeranjangNominal.value.length;
            let clean = formatNumberWithDots(popupKeranjangNominal.value);
            popupKeranjangNominal.value = clean;
            let after = clean.length;
            popupKeranjangNominal.setSelectionRange(cursor + (after - before), cursor + (after - before));
            hitungKembalianPopup();
        });
        popupKeranjangNominal.addEventListener('focus', function() {
            this.value = "";
        });
        popupKeranjangNominal.addEventListener('blur', function() {
            if (this.value === "" || isNaN(parseNumberFromDots(this.value))) {
                this.value = total > 0 ? formatNumberWithDots(total) : "";
                this.dataset.lastTotal = total;
            }
            hitungKembalianPopup();
        });
        popupKeranjangNominal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                hitungKembalianPopup();
                showKembalianModalPopupKeranjang();
            }
        });

        // Barcode input di popup: hanya kasir yang bisa lihat & pakai
        popupProductSearchBarcodeInput = document.getElementById('popup-product-search-barcode');
        popupSearchBarcodeFeedback = document.getElementById('popup-search-barcode-feedback');
        const barcodeInputWrapper = popupProductSearchBarcodeInput?.parentElement;
        if (barcodeInputWrapper) {
            if (currentUserRole === 'kasir') {
                barcodeInputWrapper.style.display = '';
            } else {
                barcodeInputWrapper.style.display = 'none';
            }
        }
        if (currentUserRole === 'kasir' && popupProductSearchBarcodeInput) {
            popupProductSearchBarcodeInput.value = '';
            popupSearchBarcodeFeedback.textContent = '';
            popupProductSearchBarcodeInput.onkeydown = function(e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                    const query = popupProductSearchBarcodeInput.value.trim();
                    if (!query) {
                        popupSearchBarcodeFeedback.textContent = 'Isi barcode atau nama produk.';
                        popupSearchBarcodeFeedback.style.color = '#e0e0e0';
                        return;
                    }
                    const foundProduct = produkData.find(p =>
                        (p.barcode && p.barcode.toLowerCase() === query.toLowerCase()) ||
                        p.nama.toLowerCase().includes(query.toLowerCase())
                    );
                    if (foundProduct) {
                        tambahKeKeranjang(foundProduct);
                        popupSearchBarcodeFeedback.textContent = `Produk "${foundProduct.nama}" ditambahkan!`;
                        popupSearchBarcodeFeedback.style.color = '#28a745';
                        popupProductSearchBarcodeInput.value = '';
                        setTimeout(() => popupProductSearchBarcodeInput.focus(), 120);
                        updatePopupKeranjang(true);
                    } else {
                        popupSearchBarcodeFeedback.textContent = `Produk/barcode "${query}" tidak ditemukan!`;
                        popupSearchBarcodeFeedback.style.color = '#dc3545';
                        popupProductSearchBarcodeInput.select();
                    }
                }
            };
            popupProductSearchBarcodeInput.oninput = function() {
                popupSearchBarcodeFeedback.textContent = '';
            };
            setTimeout(() => {
                if (popupProductSearchBarcodeInput && popupKeranjang.style.display !== "none") {
                    popupProductSearchBarcodeInput.focus();
                }
            }, 180);
        } else if (popupProductSearchBarcodeInput) {
            popupProductSearchBarcodeInput.onkeydown = null;
            popupProductSearchBarcodeInput.oninput = null;
        }

        const popupContent = popupKeranjang.querySelector('.popup-keranjang-content');
        let stickyFooter = popupContent.querySelector('.popup-sticky-footer');
        if (stickyFooter) stickyFooter.remove();
        stickyFooter = document.createElement('div');
        stickyFooter.className = 'popup-sticky-footer';
        stickyFooter.style.position = 'sticky';
        stickyFooter.style.bottom = '0';
        stickyFooter.style.left = '0';
        stickyFooter.style.right = '0';
        stickyFooter.style.background = '#fff';
        stickyFooter.style.zIndex = '20';
        stickyFooter.style.display = 'flex';
        stickyFooter.style.flexDirection = 'column';
        stickyFooter.style.gap = '2px';
        stickyFooter.style.paddingTop = '10px';
        stickyFooter.style.boxShadow = '0 -2px 12px #0002';
        if (!popupKeranjangPrintBtn) {
            popupKeranjangPrintBtn = document.createElement('button');
            popupKeranjangPrintBtn.id = 'popup-keranjang-print';
            popupKeranjangPrintBtn.innerHTML = '<i class="fas fa-print"></i> Cetak Struk';
            popupKeranjangPrintBtn.style.background = '#007bff';
            popupKeranjangPrintBtn.style.color = '#fff';
            popupKeranjangPrintBtn.style.border = 'none';
            popupKeranjangPrintBtn.style.padding = '8px 16px';
            popupKeranjangPrintBtn.style.borderRadius = '5px';
            popupKeranjangPrintBtn.style.cursor = 'pointer';
            popupKeranjangPrintBtn.style.fontWeight = 'bold';
            popupKeranjangPrintBtn.style.fontSize = '1em';
            popupKeranjangPrintBtn.style.width = '100%';
        }
        popupKeranjangPrintBtn.style.display = (currentUserRole === 'kasir') ? 'block' : 'none';
        popupKeranjangPrintBtn.onclick = function() {
            namaPemesanInput.value = popupNamaPelangganInput.value;
            alamatPemesanInput.value = popupAlamatPelangganInput.value;
            nominalPembayaranInput.value = parseNumberFromDots(popupKeranjangNominal.value);
            hitungKembalian();
            hidePopupKeranjang();
            printStruk('Tunai');
            setPopupKeranjangClosed(true);
        };
        if (!popupWhatsAppBtn) {
            popupWhatsAppBtn = document.createElement('button');
            popupWhatsAppBtn.id = 'popup-keranjang-whatsapp';
            popupWhatsAppBtn.innerHTML = '<i class="fab fa-whatsapp"></i> PESAN';
            popupWhatsAppBtn.style.background = 'linear-gradient(45deg, #25D366, #128C7E)';
            popupWhatsAppBtn.style.color = '#fff';
            popupWhatsAppBtn.style.border = 'none';
            popupWhatsAppBtn.style.padding = '8px 20px';
            popupWhatsAppBtn.style.borderRadius = '25px';
            popupWhatsAppBtn.style.cursor = 'pointer';
            popupWhatsAppBtn.style.fontSize = '1.8em';
            popupWhatsAppBtn.style.width = '100%';
            popupWhatsAppBtn.style.fontWeight = 'bold';
            popupWhatsAppBtn.style.zIndex = 10;
        }
        popupWhatsAppBtn.style.display = (currentUserRole === 'pelanggan') ? 'block' : 'none';
        popupWhatsAppBtn.onclick = function() {
            namaPemesanInput.value = popupNamaPelangganInput.value.trim();
            alamatPemesanInput.value = popupAlamatPelangganInput.value.trim();
            if (currentUserRole === 'pelanggan') {
                localStorage.setItem('namaPemesan', namaPemesanInput.value);
                localStorage.setItem('alamatPelanggan', alamatPemesanInput.value);
            }
            nominalPembayaranInput.value = parseNumberFromDots(popupKeranjangNominal.value);
            hitungKembalian();
            hidePopupKeranjang();
            kirimPesanWhatsappPelanggan();
            setPopupKeranjangClosed(true);
        };
        if(currentUserRole === 'kasir') {
            stickyFooter.appendChild(popupKeranjangPrintBtn);
        }
        if(currentUserRole === 'pelanggan') {
            stickyFooter.appendChild(popupWhatsAppBtn);
        }
        popupContent.appendChild(stickyFooter);
        tampilkanKembalianPopupKeranjang();
    }
    window.popupUpdateItemPrice = function(idx, newPrice) {
    let price = parseFloat(newPrice);
    if (isNaN(price) || price < 0) price = 0;
    keranjang[idx].harga = price;
    updateKeranjang();
    updatePopupKeranjang(true);
    saveKeranjangToStorage();
};
    window.popupUpdateQty = function(idx, val) {
        let quantity = parseInt(val);
        if (isNaN(quantity) || quantity < 1) quantity = 0;
        if (quantity === 0) keranjang.splice(idx, 1);
        else keranjang[idx].qty = quantity;
        updateKeranjang();
        updatePopupKeranjang(true);
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    };
    window.popupRemoveItem = function(idx) {
        keranjang.splice(idx, 1);
        updateKeranjang();
        updatePopupKeranjang(true);
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        saveKeranjangToStorage();
    };
    function showKembalianModalPopupKeranjang() {
        if (!popupKeranjangNominal || !popupKeranjangTotal) return;
        const totalBelanja = parseFloat(popupKeranjangTotal.textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.')) || 0;
        const nominalPembayaran = parseNumberFromDots(popupKeranjangNominal.value);
        const kembalian = nominalPembayaran - totalBelanja;
        createKembalianModal();
        const valDiv = document.getElementById('kembalian-modal-value');
        if (nominalPembayaran < totalBelanja) {
            valDiv.style.color = '#dc3545';
            valDiv.innerHTML = 'Nominal pembayaran harus lebih dari total belanjaan!';
        } else {
            valDiv.style.color = '#28a745';
            valDiv.innerHTML = formatRupiah(kembalian);
        }
        kembalianModal.style.display = 'flex';
        kembalianModal.style.justifyContent = 'center';
        kembalianModal.style.alignItems = 'center';
    }
    function hitungKembalianPopup() {}
    popupKeranjang.addEventListener('click', function(e) {
        if (e.target === popupKeranjang) {
            hidePopupKeranjang();
        }
    });
    function handleTawkVisibilityOnReload() {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole === 'pelanggan') {
            loadTawktoWidget();
        } else {
            removeTawktoWidget();
        }
    }
    handleTawkVisibilityOnReload();
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
        document.body.setAttribute("data-role", storedRole);
        loginPopup.style.display = 'none';
        appContainer.style.display = 'block';
        updateKasirFabVisibility();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        if (storedRole === 'kasir') {
            cetakStrukButton.style.display = 'none';
            pesanInfoLabel.style.display = 'none';
            shareOrderFab.style.display = 'flex';
            productSearchBarcodeInput.style.display = 'block';
            productSearchBarcodeInput.focus();
            if (printFab) printFab.style.display = 'flex';
            if (cartFab) cartFab.style.display = 'flex';
        } else {
            cetakStrukButton.style.display = 'none';
            pesanInfoLabel.style.display = 'block';
            pesanInfoLabel.textContent = "Terima kasih pelanggan setia, sehat selalu ya 🙏 tanpa anda tidak ada cerita di kedai kita. Selalu kunjungi kami ya";
            shareOrderFab.style.display = 'none';
            productSearchBarcodeInput.style.display = 'none';
            if (printFab) printFab.style.display = 'none';
            if (cartFab) cartFab.style.display = 'none';
        }
        initializeApp();
    } else {
        document.body.removeAttribute("data-role");
        loginPopup.style.display = 'flex';
        appContainer.style.display = 'none';
        updateKasirFabVisibility();
        updateFloatingButtonVisibility();
        updatePelangganFabClearCartVisibility();
        if (printFab) printFab.style.display = 'none';
        if (cartFab) cartFab.style.display = 'none';
    }
    const dapurFab = document.getElementById('dapur-fab');
    const dapurStrukModal = document.getElementById('dapurStrukModal');
    const dapurBodyInput = document.getElementById('dapurBodyInput');
    if (dapurFab) {
        dapurFab.addEventListener('click', () => {
            dapurBodyInput.value = '';
            dapurStrukModal.style.display = 'flex';
            dapurBodyInput.focus();
        });
    }
    window.closeDapurStrukModal = function() {
        dapurStrukModal.style.display = 'none';
    };
    window.printDapurStruk = function() {
        const isi = dapurBodyInput.value.trim();
        if (!isi) {
            alert('Isi pesanan/keterangan tidak boleh kosong!');
            return;
        }
        const headerHtml = `
            <div class="print-header">
                <p class="shop-name-print"><b>HARINFOOD</b></p>
                <p class="shop-address-print">Jl Ender Rakit - Gedongan</p>
                <p class="shop-phone-print">081235368643</p>
            </div>
        `;
        const footerHtml = `<p class="thank-you">Terima kasih sehat selalu ya 🤲 🙏🥰</p>`;
        const printContent = `
            <html>
            <head>
                <title>Struk Dapur</title>
                <meta name="viewport" content="width=58mm, initial-scale=1">
                <link rel="stylesheet" href="style.css">
                <style>
                    @media print { .print-actions { display: none !important; } }
                    .print-header { text-align: center !important; margin-bottom: 10px; }
                    .thank-you { text-align: center; margin-top: 8px !important; font-size: 1em !important; font-style: italic !important; font-weight: bold !important;}
                </style>
            </head>
            <body onload="window.print()">
                <div id="print-area">
                    ${headerHtml}
                    <pre style="font-family:inherit;font-size:inherit;white-space:pre-wrap;">${isi}</pre>
                    ${footerHtml}
                    <div class="print-actions">
                        <button onclick="window.print();">Cetak Struk</button>
                    </div>
                </div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            dapurStrukModal.style.display = 'none';
        }, 300);
    };
    function sendToQuickPrinter(strukText) {
        var textEncoded = encodeURI(strukText);
        window.location.href = "quickprinter://" + textEncoded;
    }
    function sendToQuickPrinterChrome(strukText) {
        var textEncoded = encodeURI(strukText);
        window.location.href = "intent://" + textEncoded + "#Intent;scheme=quickprinter;package=pe.diegoveloper.printerserverapp;end;";
    }
    function generateQuickPrinterStruk() {
        let nama = document.getElementById('popup-nama-pelanggan')?.value || '';
        let alamat = document.getElementById('popup-alamat-pemesan')?.value || '';
        let total = document.getElementById('popup-keranjang-total')?.textContent || '';
        let rows = Array.from(document.querySelectorAll('#popup-keranjang-items tr'));
        let belanjaan = '';
        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            if(tds.length === 4) {
                belanjaan += tds[0].textContent + " x" + tds[1].querySelector('input')?.value + " = " + tds[2].textContent + "<br>";
            }
        });
        let struk =
            "<big>HARINFOOD<br>" +
            "Jl Ender Rakit - Gedongan<br>" +
            "----------------------<br>" +
            "Nama: " + nama + "<br>" +
            "Alamat: " + alamat + "<br>" +
            "----------------------<br>" +
            belanjaan +
            "----------------------<br>" +
            "TOTAL: " + total + "<br>" +
            "<cut>";
        return struk;
    }
    // Event global agar tombol print mini selalu aktif
    document.addEventListener('click', function(e) {
        if (e.target.closest('#popup-keranjang-mini-print')) {
            var strukText = generateQuickPrinterStruk();
            sendToQuickPrinter(strukText);
            // Jika ingin pakai intent Chrome, ganti baris di atas jadi:
            // sendToQuickPrinterChrome(strukText);
        }
    });
    // ==== PWA Service Worker Registration ====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(function(reg) {
                    // Registration success, can do something if needed
                    // console.log('SW registered: ', reg);
                })
                .catch(function(error) {
                    // Registration failed
                    // console.error('SW registration failed: ', error);
                });
        });
    }
});
// === EVENT DELEGATION (FINAL) ===
document.addEventListener('DOMContentLoaded', function(){
  const list = document.getElementById('produk-list');
  if(!list) return;
  list.addEventListener('click', function(e){
    const item = e.target.closest('.produk-item');
    if(!item) return;
    if(e.target.closest('button')) return;

    const id = Number(item.dataset.id);
    const produk = produkData.find(p=>p.id===id);
    if(!produk) return;

    tambahQtyUniversal(produk);
  });
});


/* ==================================================
   TAMBAHAN TOMBOL + UNTUK KASIR (UI: - qty +)
   Pelanggan TIDAK berubah
   ================================================== */
(function () {
    function enhanceKasirQtyControls() {
        if (localStorage.getItem('userRole') !== 'kasir') return;

        document.querySelectorAll('.produk-item').forEach(item => {
            const controls = item.querySelector('.produk-controls');
            if (!controls) return;

            const qtyInput = controls.querySelector('.qty-edit-input');
            const minusBtn = controls.querySelector('.minus-btn');
            if (!qtyInput || !minusBtn) return;

            // Cegah double render
            if (controls.querySelector('.plus-btn')) return;

            const plusBtn = document.createElement('button');
            plusBtn.className = 'qty-control-btn qty-btn plus-btn';
            plusBtn.textContent = '+';
            plusBtn.title = 'Tambah qty';

            plusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value || '0', 10);
                if (val < 999) {
                    qtyInput.value = val + 1;
                    qtyInput.dispatchEvent(new Event('blur'));
                }
            });

            controls.appendChild(plusBtn);
        });
    }

    const observer = new MutationObserver(enhanceKasirQtyControls);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('DOMContentLoaded', enhanceKasirQtyControls);
})();

/* ===== PROXY KASIR BUTTONS TO HEADER ===== */
window.addEventListener('load', function(){
  const source = document.getElementById('kasir-fabs');
  const bar = document.getElementById('kasir-header-bar');
  if(!source || !bar) return;

  const map = [
    {key:'F12', label:'Kasir'},
    {key:'F1', label:'Tunai'},
    {key:'F2', label:'QRIS'},
    {key:'F3', label:'Share'},
    {key:'F6', label:'Clear'},
    {key:'F4', label:'Hapus'}
  ];

  const buttons = source.querySelectorAll('.fab-button');
  map.forEach((m,i)=>{
    const orig = buttons[i];
    if(!orig) return;
    const btn = document.createElement('div');
    btn.className = 'kasir-header-btn';
    btn.innerHTML = `<strong>${m.label}</strong><span>${m.key}</span>`;
    btn.onclick = ()=> orig.click();
    bar.appendChild(btn);
  });
});
/* ===== END PROXY ===== */

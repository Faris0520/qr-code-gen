document.getElementById('fetchIcon').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    const iconDisplay = document.getElementById('iconDisplay');

    if (url) {
        fetch(`https://icon.horse/api/icon/${url}`)
            .then(response => response.json())
            .then(data => {
                iconDisplay.innerHTML = '';
                if (data && data.icon) {
                    const img = document.createElement('img');
                    img.src = data.icon;
                    img.alt = 'Icon';
                    img.style.width = '100px';
                    img.style.height = '100px';
                    iconDisplay.appendChild(img);
                } else {
                    iconDisplay.innerHTML = 'Ikon tidak ditemukan.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                iconDisplay.innerHTML = 'Terjadi kesalahan. Silakan coba lagi.';
            });
    } else {
        iconDisplay.innerHTML = 'Silakan masukkan URL.';
    }
});
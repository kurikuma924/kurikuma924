document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    
    fetch('./static/data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const box = document.createElement('a');
                box.className = 'box';
                box.href = item.Link;
                
                box.innerHTML = `
                    <div class="image_">
                        <img src="./static/${item.ImagePath}" width="65" height="65"/>
                    </div>
                    <div class="text_">
                        <div class="title_">${item.Title}</div>
                        <div class="discription_">${item.Description}</div>
                    </div>
                `;
                
                container.appendChild(box);
            });
            const bottom = document.createElement('div');
            bottom.className = 'bottom-spacer';
            container.appendChild(bottom);
        })
        .catch(error => console.error('Error loading data:', error));
});
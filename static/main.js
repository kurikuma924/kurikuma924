document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    
    
    const scrollerContainer = document.createElement('div');
    scrollerContainer.className = 'scroller-container';
    document.body.appendChild(scrollerContainer);
    
    const scroller = document.createElement('div');
    scroller.className = 'scroller';
    scrollerContainer.appendChild(scroller);

    let data_ = [];
    
    fetch('./static/data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                data_.push(item);
                const box = document.createElement('a');
                box.className = 'box';
                box.href = item.Link;
                box.target = '_blank';
                
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
            window.addEventListener('resize', windowsResizeHandler);
            windowsResizeHandler();
            // updateScroller();
        })
        .catch(error => console.error('Error loading data:', error));

    function windowsResizeHandler() {
        while (document.getElementsByClassName('bottom-spacer').length != 0) {
            document.getElementsByClassName('bottom-spacer')[0].remove();
        }
        if (65*data_.length + 20*(data_.length-1) > container.clientHeight) {
            const bottom = document.createElement('div');
            bottom.className = 'bottom-spacer';
            container.appendChild(bottom);
            updateScroller();
            container.addEventListener('scroll', updateScroller);
        }else{
            scrollerContainer.style.display = 'none';
            container.removeEventListener('scroll', updateScroller);
        }
    };
    function updateScroller() {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll <= 0) {
            scrollerContainer.style.display = 'none';
            return;
        }
        scrollerContainer.style.display = 'block';
        
        const scrollPercent = scrollTop / maxScroll;
        
        const scrollerHeight = Math.max(30, (clientHeight / scrollHeight) * clientHeight);
        scroller.style.height = scrollerHeight + 'px';
        
        const maxScrollerTop = clientHeight - scrollerHeight;
        
        const scrollerTop = maxScrollerTop * scrollPercent;

        scroller.style.top = scrollerTop + 'px';
        if (window.innerWidth >= 440) {
            scrollerContainer.style.right = 'calc(50vw - 200px)';
        }else{
            scrollerContainer.style.right = '20px'
        }
    }

    
    
});
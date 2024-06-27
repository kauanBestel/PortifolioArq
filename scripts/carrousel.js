document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.slider-nav button');
    const slider = document.querySelector('.slider');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log(`Button ${index + 1} clicked`); // Log para verificar se o clique está funcionando
            slider.scrollTo({
                left: slider.offsetWidth * index,
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('mousemove', drag);

    carousel.addEventListener('touchstart', startDrag);
    carousel.addEventListener('touchend', endDrag);
    carousel.addEventListener('touchmove', drag);

    function startDrag(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < carousel.children.length - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();

        carousel.classList.remove('grabbing');
    }

    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setCarouselPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setCarouselPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -carousel.clientWidth;
        prevTranslate = currentTranslate;
        setCarouselPosition();
    }
});

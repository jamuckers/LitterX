window.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slider');
    const afterImg = document.querySelector('.after-img');
    const line = document.querySelector('.slider-line');
    const handle = document.querySelector('.slider-handle');

    function updateSlider(value) {
        afterImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        line.style.left = value + "%";
        handle.style.left = value + "%";
    }


    updateSlider(slider.value);


    slider.addEventListener('input', () => {
        updateSlider(slider.value);
    });
});
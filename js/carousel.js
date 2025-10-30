
        document.addEventListener('DOMContentLoaded', function() {
            const initCarousel = (id) => {
                const carousel = document.getElementById(id);
                if (!carousel) return;
                const track = carousel.querySelector(`#${id.replace('-carousel', '-track')}`);
                const slides = track.querySelectorAll('.flex-shrink-0');
                const prevBtn = carousel.querySelector(`#${id.replace('carousel', 'prev-btn')}`);
                const nextBtn = carousel.querySelector(`#${id.replace('carousel', 'next-btn')}`);
                const indicatorsContainer = carousel.querySelector(`#${id.replace('carousel', 'indicators')}`);

                if (slides.length <= 1) { 
                    if (prevBtn) prevBtn.style.display = 'none';
                    if (nextBtn) nextBtn.style.display = 'none';
                    if (indicatorsContainer) indicatorsContainer.style.display = 'none';
                    return;
                }

                let currentSlide = 0;
                const slideCount = slides.length;

                function updateCarousel() {
                    const offset = -currentSlide * 100;
                    track.style.transform = `translateX(${offset}%)`;

                    if (indicatorsContainer) {
                        const indicators = indicatorsContainer.querySelectorAll('button');
                        indicators.forEach((indicator, index) => {
                            indicator.classList.remove('opacity-100', 'opacity-50', 'hover:opacity-75');
                            if (index === currentSlide) {
                                indicator.classList.add('opacity-100');
                            } else {
                                indicator.classList.add('opacity-50', 'hover:opacity-75');
                            }
                        });
                    }
                }

                if (nextBtn) { nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateCarousel();
                }); }

                if (prevBtn) { prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                    updateCarousel();
                }); }

                if (indicatorsContainer) {
                    indicatorsContainer.addEventListener('click', (e) => {
                        const slideTo = e.target.getAttribute('data-slide-to');
                        if (slideTo !== null) {
                            currentSlide = parseInt(slideTo, 10);
                            updateCarousel();
                        }
                    });
                }
                updateCarousel();
            };
            initCarousel('gallery-carousel');
        });
    
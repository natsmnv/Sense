document.addEventListener('DOMContentLoaded', () => {
    // Schedule

    let scheduleIndex;

    const timeColumn = document.querySelector('tr');
    const daysRow = timeColumn.querySelectorAll('td:not(:first-child)');
    const allCells = document.querySelectorAll('td');
    const scheduleSelect = document.querySelector('select');
    const scheduleLabel = document.querySelector('.schedule-label');

    // Schedule adaptive

    function changeTable() {
        if (window.innerWidth <= 768) {
            allCells.forEach(cell => {
                cell.style.display = 'none';
            });
            scheduleSelect.classList.remove('hide');
            scheduleSelect.classList.add('show');
            scheduleLabel.classList.remove('hide');
            scheduleLabel.classList.add('show');
            
            for (let i = 0; i < allCells.length; i++) {
                if (i % 6 == 0) {
                    allCells[i].style.display = 'table-cell';
                    allCells[i + 1].style.display = 'table-cell';
                }
            }
        } else {
            allCells.forEach(cell => cell.style.display = 'table-cell');
            scheduleSelect.classList.remove('show');
            scheduleSelect.classList.add('hide');
            scheduleLabel.classList.remove('show');
            scheduleLabel.classList.add('hide');
        }
    }

    // Select day in schedule

    scheduleSelect.addEventListener('change', () => {
        let day = scheduleSelect.value;

        switch(day) {
            case 'monday':
                scheduleIndex = 1;
                break;
            case 'tuesday':
                scheduleIndex = 2;
                break;
            case 'wednesday':
                scheduleIndex = 3;
                break;
            case 'thursday':
                scheduleIndex = 4;
                break;
            case 'friday':
                scheduleIndex = 5;
                break;
        }

        daysRow.forEach(column => {
            if (column.getAttribute('data-column') == day) {
                allCells.forEach(cell => {
                    cell.style.display = 'none';
                });

                for (let i = 0; i < allCells.length; i++) {
                    if (i % 6 == 0) {
                        allCells[i].style.display = 'table-cell';
                        allCells[i + scheduleIndex].style.display = 'table-cell';
                    }
                }
            }
        });
    });

    window.addEventListener('load', changeTable);
    window.addEventListener('resize', changeTable);



    //Styles

    const stylesBtns = document.querySelectorAll('.buttons button');
    const stylesBlocks = document.querySelectorAll('.content__block');

    stylesBtns.forEach((button, i) => {
        button.addEventListener('click', () => {
            stylesBlocks.forEach((item, index) => {
                item.classList.add('hide');
                if (i == index) {
                    item.classList.remove('hide');
                    stylesBtns.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    button.classList.add('active');
                }
            })
        });
    });



    // Q/A 

    const questions = document.querySelectorAll('.content__question');

    questions.forEach(question => {
        question.addEventListener('click', (e) => {
            const sibling = e.currentTarget.nextElementSibling;
            if (sibling.classList.contains('hide')) {
                sibling.classList.remove('hide');
                sibling.classList.add('show');
            } else {
                sibling.classList.remove('show');
                sibling.classList.add('hide');
            }
        });
    });



    // Teachers 

    const prevSliderBtn = document.querySelector('.teachers__wrapper--prev');
    const nextSliderBtn = document.querySelector('.teachers__wrapper--next');
    const slides = document.querySelectorAll('.teachers__wrapper--content');

    let sliderIndex = 1;
    const totalSliderIndex = slides.length;

    function showSlide (index) {
        slides.forEach(slide => {
            slide.classList.remove('show');
            slide.classList.add('hide');
        });

        if (index > totalSliderIndex) {
            sliderIndex = 1;
        }

        if (index === 0) {
            sliderIndex = totalSliderIndex;
        }

        slides[sliderIndex - 1].classList.remove('hide');
        slides[sliderIndex - 1].classList.add('show');
    }

    showSlide(sliderIndex);

    prevSliderBtn.addEventListener('click', () => {
        showSlide(--sliderIndex);
    });

    nextSliderBtn.addEventListener('click', () => {
        showSlide(++sliderIndex);
    });
});
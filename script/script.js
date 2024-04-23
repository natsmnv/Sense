document.addEventListener('DOMContentLoaded', () => {
    // Schedule

    let index;

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
                index = 1;
                break;
            case 'tuesday':
                index = 2;
                break;
            case 'wednesday':
                index = 3;
                break;
            case 'thursday':
                index = 4;
                break;
            case 'friday':
                index = 5;
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
                        allCells[i + index].style.display = 'table-cell';
                    }
                }
            }
        });
    });

    window.addEventListener('load', changeTable);
    window.addEventListener('resize', changeTable);



    //Styles

    const buttons = document.querySelectorAll('.buttons button');
    const blocks = document.querySelectorAll('.content__block');

    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            blocks.forEach((item, index) => {
                item.classList.add('hide');
                if (i == index) {
                    item.classList.remove('hide');
                    buttons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    button.classList.add('active');
                }
            })
        });
    });
});
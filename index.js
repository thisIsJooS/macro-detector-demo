document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            seat.classList.toggle('selected');
        });
    });
});

document.querySelector('#macro-detect-target').addEventListener('click', function () {
    document.querySelector('.note').textContent = '예약 완료';

})

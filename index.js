document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            seat.classList.toggle('selected');
        });
    });
});

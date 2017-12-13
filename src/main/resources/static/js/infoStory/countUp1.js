function countUp(numberElement) {
    let current = 0;
    const total = parseInt(numberElement.textContent);
    const increment = Math.ceil(total / 1000);

    function step() {
        current += increment;
        if (current > total) current = total;
        numberElement.textContent = current.toLocaleString();
        (current !== total) && requestAnimationFrame(step);
    }
    step();
}

document.querySelectorAll('.cNum').forEach(elem => countUp(elem));
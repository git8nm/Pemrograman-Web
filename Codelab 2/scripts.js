function calculateSum() {
    const num1 = parseFloat(document.getElementById('angka1').value);
    const num2 = parseFloat(document.getElementById('angka2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = 'Result: Please enter valid numbers';
    } else {
        const sum = num1 + num2;
        document.getElementById('result').textContent = `Result: ${sum}`;
    }
}
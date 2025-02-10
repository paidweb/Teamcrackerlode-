const historySet = new Set(); // To prevent duplicate entries
const historyBody = document.getElementById('historyBody');
const periodNumberElement = document.getElementById('periodNumber');
const resultElement = document.getElementById('result');
const remainingSecondsElement = document.getElementById('remainingSeconds');

function calculatePeriodAndResult() {
  const now = new Date();
  const offset = 330; // Offset in minutes (5 hours 30 minutes)
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const periodCalculation = 10001 + totalMinutes - offset;

  // Format date as yyyyMMdd
  const currentDate = now.toISOString().slice(0, 10).replace(/-/g, '');

  // Combine date and period calculation
  const periodNumber = `${currentDate}1000${periodCalculation}`;
  periodNumberElement.textContent = periodNumber;

  // Calculate digit sum
  let digitSum = Array.from(String(periodCalculation)).reduce(
    (sum, digit) => sum + parseInt(digit),
    0
  );

  // Reduce digit sum to a single digit
  while (digitSum >= 10) {
    digitSum = Array.from(String(digitSum)).reduce(
      (sum, digit) => sum + parseInt(digit),
      0
    );
  }

  // Determine result
  const result = digitSum >= 0 && digitSum <= 4 ? 'SMALL' : 'BIG';
  resultElement.textContent = result;

  // Calculate remaining seconds to the next period
  const secondsPastCurrentMinute = now.getSeconds();
  const remainingSeconds = 60 - secondsPastCurrentMinute;
  remainingSecondsElement.textContent = remainingSeconds;

  // Add to history if not already present
  if (!historySet.has(periodNumber)) {
    historySet.add(periodNumber);

    // Append to history table
    const row = document.createElement('tr');
    const periodCell = document.createElement('td');
    const resultCell = document.createElement('td');

    periodCell.textContent = periodNumber;
    resultCell.textContent = result;

    row.appendChild(periodCell);
    row.appendChild(resultCell);
    historyBody.appendChild(row);
  }
}

// Run the calculation initially
calculatePeriodAndResult();

// Update every second
setInterval(calculatePeriodAndResult, 1000);
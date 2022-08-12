const container = document.getElementById('container');
const calculator = document.getElementById('calculator');
const result = document.getElementById('result');
const history = document.getElementById('history');
const historyValue = document.querySelector('#history-value');
const output = document.getElementById('output');
const outputValue = document.querySelector('#output-value');
const keyboard = document.getElementById('keyboard');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

const getHistory = () => history.innerText;

const printHistory = num => (historyValue.innerText = num);

const getOutput = () => output.innerText;

const printOutput = num => {
	if (num === '') outputValue.innerText = num;
	else if (num > 10 ** 18) outputValue.innerText = '∞';
	else outputValue.innerText = getFormattedNumber(num);
};

const getFormattedNumber = num => {
	if (num === '-') {
		return '';
	}
	const value = Number(num).toLocaleString('en-IN'); // add commas b/w numbers
	return value;
};

// removing commas
const reverseFormattedNumber = num => Number(num.replace(/,/g, ''));

operators.forEach(opt =>
	opt.addEventListener('click', function (e) {
		let output = getOutput();
		let history = getHistory();
		if (this.id === 'clear') {
			printHistory('');
			printOutput('');
		} else if (this.id === 'backspace') {
			let output = String(reverseFormattedNumber(getOutput()));
			if (output) {
				output = output.slice(0, -1);
				printOutput(output);
			}
		} else {
			if (output === '' && history !== '') {
				if (isNaN(history.slice(-1))) {
					history = history.slice(0, -1);
				}
			}

			if (output !== '' || history !== '') {
				output = output === '' ? output : reverseFormattedNumber(output);
				history = history + output;
				if (this.id === '=') {
					let result = eval(history);
					printOutput(result);
					printHistory('');
				} else {
					history += this.id;
					printHistory(history);
					printOutput('');
				}
			}
		}
	})
);

// printing numbers on the output window
numbers.forEach(num =>
	num.addEventListener('click', function (e) {
		let output = reverseFormattedNumber(getOutput());
		if (output !== NaN) {
			output += this.id;
			printOutput(output);
		}
	})
);

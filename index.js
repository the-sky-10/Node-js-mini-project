const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const parseInput = () => {
	if (argv._[0].toLowerCase() == 'add') {
		if (!argv.title || !argv.body) {
			console.log('Error');
			return;
		}
		fs.readFile('./list.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			let arr = [];
			if (data) {
				const x = JSON.parse(data);
				for (let i = 0; i < x.length; i++) {
					arr.push(x[i]);
				}
			}
			const obj = { title: argv.title, body: argv.body };
			arr.push(obj);
			const content = JSON.stringify(arr);
			fs.writeFile('./list.txt', content, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
		});
		console.log('title written!');
	} else if (argv._[0].toLowerCase() == 'list') {
		console.log('\nlist:');
		fs.readFile('./list.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			if (data) {
				const x = JSON.parse(data);
				for (let i = 0; i < x.length; i++) {
					console.log(x[i].title);
				}
			}
		});
	} else if (argv._[0].toLowerCase() == 'remove') {
		if (!argv.title) {
			console.log('Error');
			return;
		}
		fs.readFile('./list.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			let arr = [];
			if (data) {
				const x = JSON.parse(data);
				for (let i = 0; i < x.length; i++) {
					if (x[i].title != argv.title) {
						arr.push(x[i]);
					}
				}
			}
			const content = JSON.stringify(arr);
			fs.writeFile('./list.txt', content, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
		});
		console.log('title removed!');
	} else if (argv._[0].toLowerCase() == 'read') {
		if (!argv.title) {
			console.log('Error');
			return;
		}
		fs.readFile('./list.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			if (data) {
				const x = JSON.parse(data);
				for (let i = 0; i < x.length; i++) {
					if (x[i].title == argv.title) {
						console.log('title:' + x[i].title + ' body:' + x[i].body);
					}
				}
			}
		});
	}
};

parseInput();

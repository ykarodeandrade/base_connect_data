// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const OPTIONS = { encoding: 'utf8' };

function fail(message) {
    console.log(`Error: ${message}`);
    process.exit();
}

function mkdir(outPath) {
    if (fs.existsSync(outPath)) {
        let option;
        do {
            option = prompt(`Overwrite ${outPath}? (y/n) `);
        } while (option !== 'y' && option !== 'n');
        if (option === 'n') {
            process.exit();
        }
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
}

const argv = process.argv;

if (argv.length < 3) {
    fail('missing name');
}
if (argv.length < 4) {
    fail('missing type');
}
if (argv.length > 4) {
    fail('too many arguments');
}

let name = path.basename(argv[2]);
const lower = name.toLowerCase();
let code = lower.charCodeAt(0);
if (code < 97 || code > 122) {
    fail('name must start with a letter');
}
for (let i = 1; i < lower.length; i++) {
    code = lower.charCodeAt(i);
    if (code < 48 || (code > 57 && code < 97) || code > 122) {
        fail('name must have only digits or letters');
    }
}
name = lower.charAt(0).toUpperCase() + name.slice(1);

const context = { '{name}': name };

switch (argv[3].toLowerCase()) {
    case 'stack':
        context['{import}'] = 'import { createStackNavigator } from \'@react-navigation/stack\';';
        context['{create}'] = 'const Stack = createStackNavigator();';
        context['{type}'] = 'Stack';
        break;
    case 'drawer':
        context['{import}'] = 'import { createDrawerNavigator } from \'@react-navigation/drawer\';';
        context['{create}'] = 'const Drawer = createDrawerNavigator();';
        context['{type}'] = 'Drawer';
        break;
    case 'bottom-tabs':
        context['{import}'] = 'import { createMaterialBottomTabNavigator } from \'@react-navigation/material-bottom-tabs\';';
        context['{create}'] = 'const Tab = createMaterialBottomTabNavigator();';
        context['{type}'] = 'Tab';
        break;
    case 'top-tabs':
        context['{import}'] = 'import { createMaterialTopTabNavigator } from \'@react-navigation/material-top-tabs\';';
        context['{create}'] = 'const Tab = createMaterialTopTabNavigator();';
        context['{type}'] = 'Tab';
        break;
    default:
        fail('type must be stack, drawer, bottom-tabs or top-tabs');
}

const dirname = path.dirname(argv[2]);
if (dirname.startsWith(path.sep) || dirname.endsWith(path.sep)) {
    fail('name cannot start or end with a separator');
}

let filename, parts, outPath;

filename = `${name}.js`;
const prefix = ['..'];
const suffix = ['styles'];
if (dirname === '.') {
    parts = ['components', filename];
} else {
    parts = ['components', dirname, filename];
    for (const part of dirname.split(path.sep)) {
        if (part !== '.') {
            prefix.push('..');
            suffix.push(part);
        }
    }
}
outPath = parts.join(path.sep);
context['{prefix}'] = prefix.join('/');
context['{suffix}'] = suffix.join('/');
mkdir(outPath);

const inPath = ['lib', 'templates', 'Navigation.tpl'].join(path.sep);
const template = fs.readFileSync(inPath, OPTIONS);
const data = template.replace(/(\{import\}|\{create\}|\{type\}|\{name\}|\{prefix\}|\{suffix\})/g, (match) => context[match]);
fs.writeFileSync(outPath, data, OPTIONS);

filename = `${name}.css`;
if (dirname === '.') {
    parts = ['css', filename];
} else {
    parts = ['css', dirname, filename];
}
outPath = parts.join(path.sep);
mkdir(outPath);

fs.writeFileSync(outPath, '', OPTIONS);

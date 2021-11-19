// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const postcss = require('postcss');
const transform = require('css-to-react-native').default;

const DIR_OPTIONS = { recursive: true };
const FILE_OPTIONS = { encoding: 'utf8' };

function ignore(inPath) {
    if (fs.existsSync(inPath)) {
        const stats = fs.statSync(inPath);
        return stats.isFile() && !inPath.endsWith('.css');
    }
    return false;
}

function split(inPath) {
    const parts = inPath.split(path.sep);
    if (path.isAbsolute(inPath)) {
        const basePath = path.resolve('.');
        const length = basePath.split(path.sep).length;
        parts.splice(0, length);
    }
    parts.splice(0, 1, 'styles');
    return parts;
}

function replace(inPath) {
    const parts = split(inPath);
    const inName = parts.pop();
    const outName = `${inName.slice(0, -3)}json`;
    parts.push(outName);
    return parts.join(path.sep);
}

function convert(inPath, outPath) {
    const css = fs.readFileSync(inPath, FILE_OPTIONS);
    let root;
    try {
        root = postcss.parse(css);
    } catch (error) {
        console.error(error);
        return;
    }
    const styles = {};
    for (const block of root.nodes) {
        if (block instanceof postcss.Container) {
            const props = [];
            for (const item of block.nodes) {
                if (item instanceof postcss.Declaration) {
                    props.push([item.prop, item.value]);
                }
            }
            try {
                styles[block.selector] = transform(props);
            } catch (error) {
                console.error(error);
                return;
            }
        }
    }
    const data = JSON.stringify(styles, null, 2);
    fs.writeFileSync(outPath, data, FILE_OPTIONS);
}

function write(inPath) {
    const npm = JSON.parse(fs.readFileSync(inPath, FILE_OPTIONS));
    const lines = ['// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO\n\nexport default ['];
    for (const name in npm.dependencies) {
        if (name.startsWith('@expo-google-fonts/')) {
            lines.push(`    require('${name}'),`);
        }
    }
    lines.push('];\n');
    fs.writeFileSync('GoogleFonts.js', lines.join('\n'), FILE_OPTIONS);
    console.log('Updated GoogleFonts.js');
}

fs.rmdirSync('styles', DIR_OPTIONS);

chokidar.watch('css', { ignored: ignore, awaitWriteFinish: true })
    .on('add', (inPath) => {
        console.log(`Added ${inPath}`);
        const outPath = replace(inPath);
        const outDir = path.dirname(outPath);
        fs.mkdirSync(outDir, DIR_OPTIONS);
        convert(inPath, outPath);
    })
    .on('change', (inPath) => {
        console.log(`Changed ${inPath}`);
        const outPath = replace(inPath);
        convert(inPath, outPath);
    })
    .on('unlink', (inPath) => {
        console.log(`Removed ${inPath}`);
        const outPath = replace(inPath);
        if (fs.existsSync(outPath)) {
            fs.rmSync(outPath);
        }
    })
    .on('unlinkDir', (inPath) => {
        console.log(`Removed ${inPath}`);
        const paths = split(inPath);
        const outPath = paths.join(path.sep);
        if (fs.existsSync(outPath)) {
            fs.rmdirSync(outPath, DIR_OPTIONS);
        }
    });

chokidar.watch('package.json', { awaitWriteFinish: true })
    .on('add', write)
    .on('change', write);

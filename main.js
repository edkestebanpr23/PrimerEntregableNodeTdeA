const { cursos } = require('./data');
let fs = require('fs');
const opciones = {
    id: {
        demand: true,
        default: -8,
        alias: 'i'
    },
    name: {
        demand: true,
        alias: 'n'
    },
    document: {
        demand: true,
        alias: 'x'
    }
}

const argv = require('yargs')
.command('inscribir','inscribir curso', opciones)
.argv;

let print = (txt) => console.log(txt);
let n = '\n', tt = '\t', nn = n + n;

let printCurse = (i, t) => {
    setTimeout(function() {
        let curso = cursos[i];
        print('id: ' + curso.id + tt + 'nombre: ' + curso.nombre + n + 'duración: ' + curso.duracion + 'hrs' + tt + 'valor: $' + curso.valor + nn);
    }, t);
}

let listado = () => {
    print(n + 'Listado de cursos disponibles:' + nn);
    for (let i = 0; i < cursos.length; i++) {
        printCurse(i, ((i + 1) * 1000 * 2));
    }
}

let crearArchivo = (curso) => {
    let texto = 'El estudiante ' + argv.name + n + 
                'Con cedula ' + argv.document + n +
                'Se ha matriculado al curso de ' + curso.nombre + n +
                'Que tiene una duración de ' + curso.duracion + ' horas ' +
                'Y un valor de $' + curso.valor + ".";
    let matricula = "matricula_" + argv.id + ".txt";
    fs.writeFile( 'matricula.txt', texto, (err) => { 
        // En caso de error throw err, si no, archivo creado
        if (err) throw (err);
        console.log("Se ha creado archivo!");
    })
}

if (argv.id) {
    let curso = cursos.find(curse => curse.id == argv.id);
    if (curso) {
        crearArchivo(curso);
    } else {
        listado();
    }
} else {
    listado();
}



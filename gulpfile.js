
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps') //mapear o css
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');


function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //comprimir o arquivo css
        }))

        //sourcemaps.write -> pasta para mapear (já vai para pasta onde está o css)
        .pipe(sourcemaps.write('./maps')) //não precisa do "./build/styles/maps"
    
        //pipe -> serve para conseguir chamar uma função após o "gulp.src"
        .pipe(gulp.dest('./build/styles'));
        //dest -> enviar um arquivo para determinada pasta
}

//----------------------------------------------------------------------------
//Parte 4: Comprimir arquivos JS

function comprimeJs(){
     return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

//-------------------------------------------------------------------------
//Parte 5: Comprimir imagens

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}


exports.default = function() { //watch- para não ficar rodando o comando toda vez
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false} ,gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false} ,gulp.series(comprimeJs));
    gulp.watch('./source/images/*', {ignoreInitial: false} ,gulp.series(comprimeImagens));
}
/*{ignoreInitial: false} -> para ele de cara já executar o compilaSass
sem esperar que aconteça alguma mudança
*/
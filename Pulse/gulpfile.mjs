import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass'; 
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

const bs = browserSync.create();
const sass = gulpSass(dartSass);

// Static server
export const server = () => {
    bs.init({
        server: {
            baseDir: "dist"
        }
    });
};

// Compile and minify SASS
export const style = () => {
    return gulp.src("src/SASS/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([ 
            autoprefixer({
                cascade: false
            }) 
        ]))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
            prefix: "",
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(bs.stream());
};

// Watch files for changes
export const watchFiles = () => {
    gulp.watch("src/SASS/**/*.+(scss|sass|css)", style);
    gulp.watch("src/*.html").on('change', gulp.parallel('htmlSender','imgCompress','iconsCompress'));
    gulp.watch("src/*.html").on('change', bs.reload);
};

export const htmlSender = () => {
    return gulp.src(["src/*.html"])
        .pipe(gulp.dest("dist/"))
};

export const sender = () => {
    return gulp.src([
        "src/**/*",        
        "!src/SASS",            
        "!src/SASS/**",         
        "!src/images",          
        "!src/images/**",      
        "!src/icons",           
        "!src/icons/**"       
    ],{encoding: false})
        .pipe(gulp.dest("dist/"))
};

export const imgCompress = () => {
    return gulp.src("src/images/**/*", {
        encoding: false
    })
        .pipe(newer('dist/images'))
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))
};

export const iconsCompress = () => {
    return gulp.src("src/icons/**/*", {
        encoding: false
    })
        .pipe(newer('dist/icons'))
        .pipe(imagemin())
        .pipe(gulp.dest("dist/icons"))
};
// Default task
export default gulp.parallel(server, style, watchFiles, sender, imgCompress, iconsCompress);

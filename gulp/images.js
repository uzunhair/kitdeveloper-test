import gulp from 'gulp';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import yargs from 'yargs';
import gulpif from 'gulp-if';
import { path } from './config';

/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('gulp-imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const spritesmith = require('gulp.spritesmith');
// imageminSvgo = require('imagemin-svgo');
/* eslint-enable global-require */

const { argv } = yargs.argv;
const production = !!argv.production;

gulp.task('images', (cb) => {
  gulp.src(path.images.src)
    .pipe(changed(path.images.dist))
    .pipe(plumber())
    .pipe(gulpif(production, imagemin([
      imageminGifsicle({ interlaced: true }),
      imageminJpegtran({ progressive: true }),
      imageminOptipng({ optimizationLevel: 5 }),
      // imageminSvgo({plugins: [{removeViewBox: true}]})
    ])))
    .pipe(gulp.dest(path.images.dist));
  cb();
});


gulp.task('sprite', (cb) => {
  const spriteData = gulp.src('./src/img/img-sprite/*.*')
    .pipe(spritesmith({
      imgName: '../img/sprite.png',
      cssName: '_sprite.scss',
      cssFormat: 'scss',
      algorithm: 'binary-tree',
    }));

  spriteData.img.pipe(gulp.dest('./src/img/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('./src/sass/sprite/')); // путь, куда сохраняем стили
  cb();
});

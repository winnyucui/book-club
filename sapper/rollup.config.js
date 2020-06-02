import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import json from 'rollup-plugin-json';
import autoPreprocess from 'svelte-preprocess';
import { stylus } from 'svelte-preprocess';

import typescript from "rollup-plugin-typescript2";

// import {
// 	preprocess,
// 	createEnv,
// 	readConfigFile
//   } from "@pyoner/svelte-ts-preprocess";

// const env = createEnv();
// const compilerOptions = readConfigFile(env);
// const opts = {
//   env,
//   compilerOptions: {
//     ...compilerOptions,
//     allowNonTsExtensions: true
//   }
// };

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				/**
				* Auto preprocess supported languages with
				* '<template>'/'external src files' support
				**/
				preprocess: autoPreprocess({ /* options */ }),
				/**
				* It is also possible to manually enqueue
				* stand-alone processors
				* */
				preprocess: [
					stylus({}),
					// pug({ /* pug options */ }),
					// scss({ /* scss options */ }),
					// coffeescript({ /* coffeescript options */ })
				],
				// preprocess: preprocess(opts)
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			json(),
			typescript({
				typescript: require('typescript')
			}),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
				/**
				* Auto preprocess supported languages with
				* '<template>'/'external src files' support
				**/
				preprocess: autoPreprocess({ /* options */ }),
				/**
				* It is also possible to manually enqueue
				* stand-alone processors
				* */
				preprocess: [
					stylus({}),
					// pug({ /* pug options */ }),
					// scss({ /* scss options */ }),
					// coffeescript({ /* coffeescript options */ })
				]
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				typescript: require('typescript')
			})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};

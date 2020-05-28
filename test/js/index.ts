import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as colors from "kleur";
import { loadConfig, svelte, shouldUpdateExpected } from "../helpers";
import { sanitize } from "./update";

describe("js", () => {
	fs.readdirSync(`${__dirname}/samples`).forEach(dir => {
		if (dir[0] === ".") return;

		// add .solo to a sample directory name to only run that test
		const solo = /\.solo/.test(dir);

		if (solo && process.env.CI) {
			throw new Error("Forgot to remove `solo: true` from test");
		}

		const resolved = path.resolve(`${__dirname}/samples`, dir);

		if (!fs.existsSync(`${resolved}/input.svelte`)) {
			console.log(colors.red().bold(`Missing file ${dir}/input.svelte. If you recently switched branches you may need to delete this directory`));
			return;
		}

		(solo ? it.only : it)(dir, () => {
			const config = loadConfig(`${resolved}/_config.js`);

			const input = fs.readFileSync(`${resolved}/input.svelte`, "utf-8").replace(/\s+$/, "").replace(/\r/g, "");

			let actual;

			try {
				const options = Object.assign(config.options || {});

				actual = sanitize(svelte.compile(input, options));
			} catch (err) {
				console.log(err.frame);
				throw err;
			}

			const output = `${resolved}/_actual.js`;
			fs.writeFileSync(output, actual);

			const expectedPath = `${resolved}/expected.js`;

			let expected = '';
			try {
				expected = fs.readFileSync(expectedPath, "utf-8");
			} catch (error) {
				console.log(error);
				if (error.code === 'ENOENT') {
					// missing expected.js
					fs.writeFileSync(expectedPath, actual);
				}
			}

			try {
				assert.equal(
					actual.trim().replace(/^[ \t]+$/gm, "").replace(/\r/g, ""),
					expected.trim().replace(/^[ \t]+$/gm, "").replace(/\r/g, "")
				);
			} catch (error) {
				if (shouldUpdateExpected()) {
					fs.writeFileSync(expectedPath, actual);
					console.log(`Updated ${expectedPath}.`);
				} else {
					throw error;
				}
			}
		});
	});
});

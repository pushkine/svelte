let fulfil;
let reject;

const promise = new Promise((f, r) => {
	fulfil = f;
	reject = r;
});

export default {
	props: {
		promise
	},

	intro: true,

	test({ assert, target, raf }) {
		const p = target.querySelector('p');

		assert.equal(p.className, 'pending');
		
		raf.tick(50);
		assert.equal(p.foo, 0.5);

		fulfil(42);

		return promise.then(() => {
			raf.tick(80);
			const ps = document.querySelectorAll('p');
			assert.equal(ps[1].className, 'pending');
			assert.equal(ps[0].className, 'then');
			assert.equal(Math.round(ps[1].foo * 10) / 10, 0.2);
			assert.equal(Math.round(ps[0].foo * 10) / 10, 0.3);
		});
	}
};

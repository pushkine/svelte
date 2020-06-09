export default {
	test({ assert, component, target, window, raf }) {
		component.visible = true;
		const div = target.querySelector('div');

		raf.tick(50);
		assert.equal(div.foo, 0);

		raf.tick(100);
		assert.equal(div.foo, 0.5);

		raf.tick(125);
		assert.equal(div.foo, 0.75);

		raf.tick(150);
		assert.equal(div.foo, 1);
	}
};
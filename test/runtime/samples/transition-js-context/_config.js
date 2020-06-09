export default {
	test({ assert, component, target, window, raf }) {
		component.visible = true;

		const div = target.querySelector('div');
		
		raf.tick(50);
		assert.equal(div.foo, 42);
	}
};

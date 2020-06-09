export default {
	intro: true,

	test({ assert, component, target, raf }) {
		assert.equal(target.querySelector('div'), component.no);

		raf.tick(200);
		assert.equal(component.no.foo, 0.5);

		raf.tick(500);
		component.x = true;
		assert.equal(component.no, undefined);

		raf.tick(700);
		assert.equal(component.yes.foo, 0.5);

		raf.tick(1000);
	}
};
/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	element,
	empty,
	group_transition_out,
	init,
	insert,
	noop,
	run_out,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

import { fade } from "svelte/transition";

function create_if_block(ctx) {
	let div;
	let div_outro = noop;
	let current;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<p>wheeee</p>`;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			div_outro(1);
			current = true;
		},
		o(local) {
			div_outro = run_out(div, fade);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching) div_outro();
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*num*/ ctx[0] < 5 && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*num*/ ctx[0] < 5) {
				if (if_block) {
					if (dirty & /*num*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_transition_out(transition_out => {
					transition_out(if_block, () => {
						if_block = null;
					});
				});
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { num = 1 } = $$props;

	$$self.$set = $$props => {
		if ("num" in $$props) $$invalidate(0, num = $$props.num);
	};

	return [num];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { num: 0 });
	}
}

export default Component;
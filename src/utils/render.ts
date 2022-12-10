import { ComponentPropsOptions, EmitsOptions, FunctionalComponent } from "vue";

export function defineFunctionalComponent<T extends Record<string, unknown>, E extends EmitsOptions = []>(
	props: ComponentPropsOptions<T>,
	component: FunctionalComponent<T, E>,
	emits?: E,	
) {
	component.props = props;
	component.emits = emits;
	return component;
}
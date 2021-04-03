declare module 'react-component-queries' {
	import { ComponentClass, ComponentType } from 'react';

	export type Matching<InjectedProps, DecorationTargetProps> = {
		[P in keyof DecorationTargetProps]: P extends keyof InjectedProps
			? InjectedProps[P] extends DecorationTargetProps[P]
				? DecorationTargetProps[P]
				: InjectedProps[P]
			: DecorationTargetProps[P];
	};

	export type Shared<
		InjectedProps,
		DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
	> = {
		[P in Extract<
			keyof InjectedProps,
			keyof DecorationTargetProps
		>]?: InjectedProps[P] extends DecorationTargetProps[P]
			? DecorationTargetProps[P]
			: never;
	};

	export type GetProps<C> = C extends ComponentType<infer P> ? P : never;

	export type ConnectedComponentClass<C, P> = ComponentClass<
		JSX.LibraryManagedAttributes<C, P>
	> & {
		WrappedComponent: C;
	};

	export type InferableComponentEnhancerWithProps<
		TInjectedProps,
		TNeedsProps
	> = <C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>>(
		component: C
	) => ConnectedComponentClass<
		C,
		Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
	>;

	export type InferableComponentEnhancer<
		TInjectedProps
	> = InferableComponentEnhancerWithProps<TInjectedProps, {}>;

	// <------------------------

	export default function componentQueries<TOwnProps = {}, TStateProps = {}>(
		queries: ({ width }: { width: number }) => TStateProps
	): InferableComponentEnhancerWithProps<TStateProps, TOwnProps>;
}

declare module 'faker/lib/random';
declare module 'react/jsx-runtime' {
	export default any;
}

declare namespace JSX {
	interface IntrinsicElements {
		heyo: any;
		ReactNode: any;
		strike: any;
	}
}

declare namespace SwiperType {
	interface ISwiperType extends SwiperClass<SwiperEvents> {
		/**
		 * Object with passed initialization parameters
		 */
		params: SwiperOptions;

		/**
		 * Dom7 element with slider container HTML element. To get vanilla HTMLElement use `swiper.el`
		 */
		$el: Dom7Array;

		/**
		 * Slider container HTML element
		 */
		el: HTMLElement;

		/**
		 * Dom7 element with slider wrapper HTML element. To get vanilla HTMLElement use `swiper.wrapperEl`
		 */
		$wrapperEl: Dom7Array;

		/**
		 * Wrapper HTML element
		 */
		wrapperEl: HTMLElement;

		/**
		 * Dom7 array-like collection of slides HTML elements. To get specific slide HTMLElement use `swiper.slides[1]`
		 */
		slides: Dom7Array;

		/**
		 * Width of container
		 */
		width: number;

		/**
		 * Height of container
		 */
		height: number;

		/**
		 * Current value of wrapper translate
		 */
		translate: number;

		/**
		 * Current progress of wrapper translate (from 0 to 1)
		 */
		progress: number;

		/**
		 * Index number of currently active slide
		 *
		 * @note Note, that in loop mode active index value will be always shifted on a number of looped/duplicated slides
		 */
		activeIndex: number;

		/**
		 * Index number of currently active slide considering duplicated slides in loop mode
		 */
		realIndex: number;

		/**
		 * Index number of previously active slide
		 */
		previousIndex: number;

		/**
		 * `true` if slider on most "left"/"top" position
		 */
		isBeginning: boolean;

		/**
		 * `true` if slider on most "right"/"bottom" position
		 */
		isEnd: boolean;

		/**
		 * `true` if swiper is in transition
		 */
		animating: boolean;

		/**
		 * Object with the following touch event properties:
		 *
		 * - `swiper.touches.startX`
		 * - `swiper.touches.startY`
		 * - `swiper.touches.currentX`
		 * - `swiper.touches.currentY`
		 * - `swiper.touches.diff`
		 */
		touches: {
			startX: number;
			startY: number;
			currentX: number;
			currentY: number;
			diff: number;
		};

		/**
		 * Index number of last clicked slide
		 */
		clickedIndex: number;

		/**
		 * Link to last clicked slide (HTMLElement)
		 */
		clickedSlide: HTMLElement;

		/**
		 * Disable / enable ability to slide to the next slides by assigning `false` / `true` to this property
		 */
		allowSlideNext: boolean;

		/**
		 * Disable / enable ability to slide to the previous slides by assigning `false` / `true` to this property
		 */
		allowSlidePrev: boolean;

		/**
		 * Disable / enable ability move slider by grabbing it with mouse or by touching it with finger (on touch screens) by assigning `false` / `true` to this property
		 */
		allowTouchMove: boolean;

		rtlTranslate: boolean;

		/**
		 * Run transition to next slide.
		 *
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slideNext(speed?: number, runCallbacks?: boolean): void;

		/**
		 * Run transition to previous slide.
		 *
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slidePrev(speed?: number, runCallbacks?: boolean): void;

		/**
		 * Run transition to the slide with index number equal to 'index' parameter for the
		 *  duration equal to 'speed' parameter.
		 *
		 * @param index Index number of slide.
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slideTo(index: number, speed?: number, runCallbacks?: boolean): void;

		/**
		 * Does the same as .slideTo but for the case when used with enabled loop. So this
		 * method will slide to slides with realIndex matching to passed index
		 *
		 * @param index Index number of slide.
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slideToLoop(index: number, speed?: number, runCallbacks?: boolean): void;

		/**
		 * Reset swiper position to currently active slide for the duration equal to 'speed'
		 * parameter.
		 *
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slideReset(speed?: number, runCallbacks?: boolean): void;

		/**
		 * Reset swiper position to closest slide/snap point for the duration equal to 'speed' parameter.
		 *
		 * @param speed Transition duration (in ms).
		 * @param runCallbacks Set it to false (by default it is true) and transition will
		 *  not produce transition events.
		 */
		slideToClosest(speed?: number, runCallbacks?: boolean): void;

		/**
		 * Force swiper to update its height (when autoHeight enabled) for the duration equal to
		 * 'speed' parameter
		 *
		 * @param speed Transition duration (in ms).
		 */
		updateAutoHeight(speed?: number): void;

		/**
		 * You should call it after you add/remove slides
		 * manually, or after you hide/show it, or do any
		 * custom DOM modifications with Swiper
		 * This method also includes subcall of the following
		 * methods which you can use separately:
		 */
		update(): void;

		/**
		 * recalculate size of swiper container
		 */
		updateSize(): void;

		/**
		 * recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript
		 */
		updateSlides(): void;

		/**
		 * recalculate swiper progress
		 */
		updateProgress(): void;

		/**
		 * update active/prev/next classes on slides and bullets
		 */
		updateSlidesClasses(): void;

		/**
		 * Changes slider direction from horizontal to vertical and back.
		 *
		 * @param direction New direction. If not specified, then will automatically changed to opposite direction
		 * @param needUpdate Will call swiper.update(). Default true
		 */
		changeDirection(
			direction?: 'horizontal' | 'vertical',
			needUpdate?: boolean
		): void;

		/**
		 * Detach all events listeners
		 */
		detachEvents(): void;

		/**
		 * Attach all events listeners again
		 */
		attachEvents(): void;

		/**
		 * Initialize slider
		 */
		init(): void;

		/**
		 * Destroy slider instance and detach all events listeners
		 *
		 * @param deleteInstance Set it to false (by default it is true) to not to delete Swiper instance
		 * @param cleanStyles Set it to true (by default it is true) and all custom styles will be removed from slides, wrapper and container.
		 * Useful if you need to destroy Swiper and to init again with new options or in different direction
		 */
		destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;

		/**
		 * Add new slides to the end. slides could be
		 * HTMLElement or HTML string with new slide or
		 * array with such slides, for example:
		 *
		 * @example
		 * ```js
		 * appendSlide('<div class="swiper-slide">Slide 10"</div>')
		 *
		 * appendSlide([
		 *  '<div class="swiper-slide">Slide 10"</div>',
		 *  '<div class="swiper-slide">Slide 11"</div>'
		 * ]);
		 * ```
		 */
		appendSlide(slides: HTMLElement | string | string[] | HTMLElement[]): void;

		/**
		 * Add new slides to the beginning. slides could be
		 * HTMLElement or HTML string with new slide or array with such slides, for example:
		 *
		 * @example
		 * ```js
		 * prependSlide('<div class="swiper-slide">Slide 0"</div>')
		 *
		 * prependSlide([
		 *  '<div class="swiper-slide">Slide 1"</div>',
		 *  '<div class="swiper-slide">Slide 2"</div>'
		 * ]);
		 * ```
		 */
		prependSlide(slides: HTMLElement | string | string[] | HTMLElement[]): void;

		/**
		 * Add new slides to the required index. slides could be HTMLElement or HTML string with new slide or array with such slides, for example:
		 *
		 * @example
		 * ```js
		 * addSlide(1, '<div class="swiper-slide">Slide 10"</div>')
		 *
		 * addSlide(1, [
		 *  '<div class="swiper-slide">Slide 10"</div>',
		 *  '<div class="swiper-slide">Slide 11"</div>'
		 * ]);
		 * ```
		 */
		addSlide(
			index: number,
			slides: HTMLElement | string | string[] | HTMLElement[]
		): void;

		/**
		 * Remove selected slides. slideIndex could be a number with slide index to remove or array with indexes.
		 *
		 * @example
		 * ```js
		 * removeSlide(0); // remove first slide
		 * removeSlide([0, 1]); // remove first and second slides
		 * removeAllSlides();    // Remove all slides
		 * ```
		 */
		removeSlide(slideIndex: number | number[]): void;

		/**
		 * Remove all slides
		 */
		removeAllSlides(): void;

		/**
		 * Set custom css3 transform's translate value for swiper wrapper
		 */
		setTranslate(translate: any): void;

		/**
		 * Get current value of swiper wrapper css3 transform translate
		 */
		getTranslate(): any;

		/**
		 * Animate custom css3 transform's translate value for swiper wrapper
		 *
		 * @param translate Translate value (in px)
		 * @param speed Transition duration (in ms)
		 * @param runCallbacks Set it to false (by default it is true) and transition will not produce  transition events
		 * @param translateBounds Set it to false (by default it is true) and transition value can extend beyond min and max translate
		 *
		 */
		translateTo(
			translate: number,
			speed: number,
			runCallbacks?: boolean,
			translateBounds?: boolean
		): any;

		/**
		 * Unset grab cursor
		 */
		unsetGrabCursor(): void;

		/**
		 * Set grab cursor
		 */
		setGrabCursor(): void;

		/**
		 * Add event listener that will be fired on all events
		 */
		onAny(handler: (eventName: string, ...args: any[]) => void): void;

		/**
		 * Remove event listener that will be fired on all events
		 */
		offAny(handler: (eventName: string, ...args: any[]) => void): void;

		isHorizontal(): boolean;

		getBreakpoint(breakpoints: SwiperOptions['breakpoints']): string;

		setBreakpoint(): void;

		currentBreakpoint: any;

		destroyed: boolean;
		modules: Array<any>; //TODO: add typing
		a11y: A11yMethods;
		autoplay: AutoplayMethods;
		controller: ControllerMethods;
		coverflowEffect: CoverflowEffectMethods;
		cubeEffect: CubeEffectMethods;
		fadeEffect: FadeEffectMethods;
		flipEffect: FlipEffectMethods;
		hashNavigation: HashNavigationMethods;
		history: HistoryMethods;
		keyboard: KeyboardMethods;
		lazy: LazyMethods;
		mousewheel: MousewheelMethods;
		navigation: NavigationMethods;
		pagination: PaginationMethods;
		parallax: ParallaxMethods;
		scrollbar: ScrollbarMethods;
		thumbs: ThumbsMethods;
		virtual: VirtualMethods;
		zoom: ZoomMethods;
	}
}

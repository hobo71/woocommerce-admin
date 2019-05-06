/** @format */
/**
 * External dependencies
 */

import { addFilter } from '@wordpress/hooks';
import { Component, Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * WooCommerce dependencies
 */
import { EllipsisMenu, MenuTitle, MenuItem, SectionHeader } from '@woocommerce/components';
import SectionControls from '../../../../../client/dashboard/components/section-controls';

const apples = [
	{
		title: 'Granny Smith',
		events: [ { date: 'adf', title: 'The Granny Apple Fair' } ],
	},
	{
		title: 'Golden Delicious',
		events: [ { date: 'adf', title: 'Golden CO Golden Delicious Day' } ],
	},
	{
		title: 'Gala',
		events: [ { date: 'adf', title: 'The Met Gala Pomme' } ],
	},
	{
		title: 'Braeburn',
		events: [ { date: 'adf', title: 'Mt. Aoraki Crisper' } ],
	},
];

// Upcoming events
// Apple tasks
// Inventory levels
// Upcoming harvest dates

class Section extends Component {
	renderMenu() {
		const {
			onTitleBlur,
			onTitleChange,
			titleInput,
			onMove,
			onRemove,
			isFirst,
			isLast,
		} = this.props;

		return (
			<EllipsisMenu
				label={ __( 'Choose Apples', 'woocommerce-admin' ) }
				renderContent={ ( { onToggle } ) => (
					<Fragment>
						<div className="woocommerce-ellipsis-menu__item">
							<TextControl
								label={ __( 'Section Title', 'woocommerce-admin' ) }
								onBlur={ onTitleBlur }
								onChange={ onTitleChange }
								required
								value={ titleInput }
							/>
						</div>
						<MenuTitle>{ __( 'My Apples', 'woocommerce-admin' ) }</MenuTitle>
						{ apples.map( apple => (
							<MenuItem
								checked //for now, this needs Albert's code
								isCheckbox
								isClickable
								key={ apple.title }
								onInvoke={ () => {} } //for now, this needs Albert's code
							>
								{ apple.title }
							</MenuItem>
						) ) }
						<SectionControls
							onToggle={ onToggle }
							onMove={ onMove }
							onRemove={ onRemove }
							isFirst={ isFirst }
							isLast={ isLast }
						/>
					</Fragment>
				) }
			/>
		);
	}

	render() {
		const { title } = this.props;

		return (
			<Fragment>
				<SectionHeader title={ title } menu={ this.renderMenu() } />
				{ apples.map( apple => <p key={ apple.title }>{ apple.events[ 0 ].title }</p> ) }
			</Fragment>
		);
	}
}

addFilter( 'woocommerce_dashboard_default_sections', 'plugin-domain', sections => {
	return [
		...sections,
		{
			key: 'dashboard-apples',
			component: Section,
			title: __( 'Apples', 'woocommerce-admin' ),
			isVisible: true,
			icon: 'carrot',
			hiddenBlocks: [],
		},
	];
} );

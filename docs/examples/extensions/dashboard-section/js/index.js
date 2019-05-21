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

/**
 * Internal dependencies
 */
import UpcomingEvents from './upcoming-events';

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

const items = [ { title: 'Upcoming Events', component: UpcomingEvents, key: 'upcoming-events' } ];

// Global apple prices
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
			controls: Controls,
		} = this.props;

		return (
			<EllipsisMenu
				label={ __( 'Choose Apples', 'woocommerce-admin' ) }
				renderContent={ ( { onToggle } ) => (
					<Fragment>
						<MenuTitle>{ __( 'My Apples', 'woocommerce-admin' ) }</MenuTitle>
						{ items.map( item => (
							<MenuItem
								checked //for now, this needs Albert's code
								isCheckbox
								isClickable
								key={ item.key }
								onInvoke={ () => {} } //for now, this needs Albert's code
							>
								{ item.title }
							</MenuItem>
						) ) }
						<div className="woocommerce-ellipsis-menu__item">
							<TextControl
								label={ __( 'Section Title', 'woocommerce-admin' ) }
								onBlur={ onTitleBlur }
								onChange={ onTitleChange }
								required
								value={ titleInput }
							/>
						</div>
						<Controls
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
				<div className="woocommerce-dashboard__columns">
					{ items.map( item => <item.component key={ item.key } config={ apples } /> ) }
				</div>
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

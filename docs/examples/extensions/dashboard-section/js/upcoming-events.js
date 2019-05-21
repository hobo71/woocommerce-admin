/** @format */
/**
 * External dependencies
 */
import { Card } from '@woocommerce/components';

const UpcomingEvents = ( { config } ) => {
	return (
		<Card title={ 'Upcoming Events' }>
			{ config.map( apple => <p key={ apple.title }>{ apple.events[ 0 ].title }</p> ) }
		</Card>
	);
};

export default UpcomingEvents;

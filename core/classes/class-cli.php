<?php
/**
 * Class is responsible for WP-CLI commands.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	return;
}

use WP_CLI;

/**
 * Class Cli.
 */
class CLI extends WP_CLI {

	/**
	 * Make changes to an event.
	 *
	 * @param array $args       Arguments of the script.
	 * @param array $assoc_args Associative arguments of the script.
	 *
	 * @return void
	 */
	public function event( array $args = array(), array $assoc_args = array() ) {
		$event_id = (int) $args[0];
		$action   = (string) $args[1];

		switch ( $action ) {
			case 'add-attendee':
				$this->add_attendee( $event_id, $assoc_args );
				break;
		}
	}

	/**
	 * Generate credits for credits page.
	 *
	 * @param array $args       Arguments of the script.
	 * @param array $assoc_args Associative arguments of the script.
	 *
	 * @return void
	 */
	public function generate_credits( array $args = array(), array $assoc_args = array() ) {
		$credits = require_once GATHERPRESS_CORE_PATH . '/data/credits/credits.php';
		$version = $assoc_args['version'] ?? GATHERPRESS_VERSION;
		$latest  = GATHERPRESS_CORE_PATH . '/data/credits/latest.json';
		$data    = array();

		if ( empty( $credits[ $version ] ) ) {
			WP_CLI::error( 'Version does not exist' );
		}

		unlink( $latest );
		$file = fopen( $latest, 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fopen

		foreach ( $credits[ $version ] as $group => $users ) {
			$data[ $group ] = array();

			foreach ( $users as $user ) {
				$response         = wp_remote_request( sprintf( 'https://profiles.wordpress.org/wp-json/wporg/v1/users/%s', $user ) );
				$data[ $group ][] = json_decode( $response['body'], true );
			}
		}

		fwrite( $file, wp_json_encode( $data ) ); //phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fwrite
		fclose( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fclose

		WP_CLI::success( 'New latest.json file has been generated.' );
	}

	/**
	 * Add an attendee to an event.
	 *
	 * @param int   $event_id   Post ID of the event.
	 * @param array $assoc_args Associative arguments for script.
	 *
	 * @return void
	 */
	private function add_attendee( int $event_id, array $assoc_args ) {
		$event   = new Event( $event_id );
		$user_id = $assoc_args['user_id'];
		$status  = $assoc_args['status'];
		$guests  = $assoc_args['guests'] ?? 0;

		$response = $event->attendee->save( $user_id, $status, $guests );

		\WP_CLI::success( $response );
	}

}

\WP_CLI::add_command( 'gatherpress', CLI::class );
